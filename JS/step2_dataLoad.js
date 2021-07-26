/*jshint esversion: 6 */

// import {
//     funcSetInputFromLocalStorage
// } from './functions.js';



/*
----- INNEHÅLL i step2_onload.js -------

  
1. GET FROM LOCALSTORAGE
    1.a GET form_elDebit from LocalStorage
    1.b GET form_elCredit from LocalStorage
    1.c Set elDebitSpend_cost


2. SET INPUT    
       2a) hitta index for sista input (hidden) 
       2b) hitta vilket index som "dynamiska" vardena borjar
       2c) skriv ut de "statiska" vardena i formularet
       2d) skapa all dynamisk kod for elDebit
       2e) set all text-input from object form_elDebitFD och form_elCreditFD in LocalStorage


3. FUNKTIONER

    3.a Funktionen: funcFindDynamicIndex(iFirst, iLast, form_FD)                                        i: step2_dataLoad.js, step4_dataLoad.js

    3.b Funktionen: funcHideDeletedStaticUnits(i, NrOfStaticUnits, form_FD, previousUnitNr, unitType)   i: step2_dataLoad.js, step4_dataLoad.js
         3b-1 hitta thisUnitNr
         3b-2 specialfall for thisUnitNr i slutet pa objektet
         3b-3 stang ner lagre numrerade fieldset

    3.c Funktionen: funcRecreateDynamicElUnit(i, form_elCreditFD)
         3c-1 hitta aktuellt unitNr 
         3c-2 skapa ett elUnit-objekt
         3c-3 skapa html koden
         3c-4 lagg till koden i DOM

    3.d Funktionen: funcReturnElUnitObject(x, nameUnit)            i: step2_dataLoad.js, step2_events.js
    3.e Funktionen: funcElAddUnitCode(unitObject)                  i: step2_dataLoad.js, step2_events.js

    3.f Funktionen: funcAddCodeToDOM(code, fieldsetId)             i: step2_dataLoad.js, step4_dataLoad.js, step2_events.js, step4_events.js
    3.g Funktionen: funcSetStoredTextInput(form_FD)                i: step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
    3.h Funktionen: funcSetCost(costType)                          i: step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
    */



///////////////////////// 1. GET FROM LOCALSTORAGE AND SetCost ////////////////////////////////////////


// 1.a GET form_elDebit from LocalStorage
var form_elDebitFD = JSON.parse(window.localStorage.getItem('form_elDebit'));

// 1.b GET form_elCredit from LocalStorage
var form_elCreditFD = JSON.parse(window.localStorage.getItem('form_elCredit'));

//1.c Set elDebitSpend_cost
funcSetCost("el");



//////////////////////////////// 2. SET INPUT //////////////////////////////////////////////




let varKey, thisUnitNr, previousUnitNr, iDynamic, iLastUnit;

let checkboxDOMArray = document.querySelectorAll('input[type="checkbox"][id^="elDebitSystem_"]');
checkboxDOMArray.forEach(function (checkboxUnitDOM) {
    funcCheckCheckbox(form_elDebitFD, checkboxUnitDOM);
    // funcCheckboxDeactivateInput(checkboxUnitDOM);
});





// kör bara om det finns sparad info om formarna, annars gors inget 
if (form_elCreditFD && form_elCreditFD) {

    
    let valuePV = funcCheckRadioBoolean(form_elDebitFD, "elDebitProduction_PV");
    funcHideSelectedFieldsetUnitByBoolElement("elDebitProduction_PV", valuePV);

    let valueGenerator = funcCheckRadioBoolean(form_elDebitFD, "elDebitProduction_generator");
    funcHideSelectedFieldsetUnitByBoolElement("elDebitProduction_generator", valueGenerator);


    
    // console.log(checkboxDOMArray);
    // let valueSystemUnit = funcCheckRadioBoolean(form_elDebitFD, systemUnitId);


    



    //  2a) hitta index for sista input (hidden)
    let arrayFormFD = Object.keys(form_elCreditFD);
    iLastUnit = arrayFormFD.map(function (key) {
        return key;
    }).indexOf("elCreditAdd_hidden");



    // 2b) hitta vid vilket index som dynamiska vardena borjar, dvs nar id med ordet "namn" dyker upp, 
    //     om det inte finns nagon satts sista vardet i objektet till iDynamic
    iDynamic = funcFindDynamicIndex(0, iLastUnit, form_elCreditFD);

    console.log("iDynamic: ", iDynamic, " varKey id-namnet :", varKey, iLastUnit);




    // 2c) loopa Object.keys och skriv ut allt som hor till de 12 hardkodade Units, alltsa t.o.m. iDynamic eller till slutet pa Objektet
    previousUnitNr = 0;
    let NrOfStaticUnits = 12;
    for (let i = 0; i <= iDynamic; i++) {
        thisUnitNr = funcHideDeletedStaticUnits(i, NrOfStaticUnits, form_elCreditFD, previousUnitNr, "");
        previousUnitNr = thisUnitNr;
    }



    // 2d) skapa all dynamisk kod for elDebit
    for (let i = iDynamic; i < iLastUnit - 1; i = i + 4) {

        funcRecreateDynamicElUnit(i, form_elCreditFD);
    }
    console.log("antalet inputs inkl gomda idName: ", iLastUnit);

    
    // 2e) set all text-input from object form_elDebitFD in LocalStorage
    funcSetStoredTextInput(form_elDebitFD);
    funcSetStoredTextInput(form_elCreditFD);

}  // stora if-satsen







/////////////////////////////////////////////// 3. FUNKTIONER /////////////////////////////////////////////////////////////////


function funcCheckboxDeactivateInput(CheckboxDOM) {
    // console.log(CheckboxDOM.value);
    let inputDOM = CheckboxDOM.parentNode.querySelector('input[type="text"]');
    let hiddenDOM = CheckboxDOM.parentNode.querySelector('input[type="hidden"]');

    if (CheckboxDOM.checked === true) {
        inputDOM.readOnly = false;
        if(  hiddenDOM.value  ){    //!== " - "
            inputDOM.value = hiddenDOM.value;
        }
        console.log("CheckboxDOM", CheckboxDOM.value, hiddenDOM.value);
        
    } else if (CheckboxDOM.checked === false) {
        inputDOM.readOnly = true;
        if(inputDOM.value !== " - "){
            hiddenDOM.value = inputDOM.value;
        }
        inputDOM.value = " - ";
    }
}



function funcCheckCheckbox(form_FD, checkboxUnitDOM) {
    if (form_FD) {
        let key = checkboxUnitDOM.id;
        let inputId = key.slice(0, -3);
        let hiddenId = inputId + "Hidden";
        let inputDOM = document.getElementById(inputId);
        let hiddenDOM = document.getElementById(hiddenId);
        console.log("Kolla", form_FD[key], form_FD[inputId],form_FD[hiddenId]);
        console.log(form_FD);
        
        //if checked
        if (form_FD[key]) {
            checkboxUnitDOM.checked = true;
            inputDOM.readOnly = false;
            inputDOM.value = form_FD[inputId];
            hiddenDOM.value = form_FD[inputId];
            
        //if not
        } else {
            checkboxUnitDOM.checked = false;
            inputDOM.readOnly = true;
            hiddenDOM.value = form_FD[hiddenId];
            inputDOM.value = " - ";
        }

        console.log( "KOLL@", hiddenId, hiddenDOM.value);
        
    } else {
        funcCheckboxDeactivateInput(checkboxUnitDOM);
        console.log("noFD", checkboxUnitDOM);
    }

}



// 3.a Funktionen: exakt samma som i step4_dataLoad.js
function funcFindDynamicIndex(iFirst, iLast, form_FD) {
    let iDynamic;
    for (iDynamic = iFirst; iDynamic < (iLast); iDynamic++) {
        varKey = Object.keys(form_FD)[iDynamic];
        if (varKey.split("_").pop() == "name") {
            break;
        }
    }
    return iDynamic;
}



// 3.b Funktionen: exakt samma som i step4_dataLoad.js
function funcHideDeletedStaticUnits(i, NrOfStaticUnits, form_FD, previousUnitNr, unitType) {

    // 3.b-1 hitta thisUnitNr och UnitPreNoNr
    let varKey = Object.keys(form_FD)[i];
    let idUnitPre = varKey.split("_").shift();
    varKey = Object.keys(form_FD)[i];
    let thisUnit = idUnitPre.replace(unitType, '');

    if (thisUnit.includes("Debit")) {
        thisUnit = thisUnit.split("Debit").pop();
    } else if (thisUnit.includes("Credit")) {
        thisUnit = thisUnit.split("Credit").pop();
    }

    let idUnitPreNoNr = idUnitPre.replace(thisUnit, '');
    thisUnitNr = parseInt(thisUnit);
    // console.log(varKey, thisUnitNr, thisUnit, idUnitPre, idUnitPreNoNr);



    // 3.b-2 specialfall for sista input utan efterfoljande dynamisk kod
    if (isNaN(thisUnitNr)) {
        thisUnitNr = NrOfStaticUnits + 1;
        // console.log("det fanns inga \"dynamiska\" varden sparade");
    }
    // console.log("indexNr i Objektet: ", i, "varKey: ", varKey, "nr pa enhet: ", thisUnitNr, "datatyp: ", typeof thisUnitNr);


    // 3.b-3 stang ner fieldsets for lagre numrerade Units
    // men bara till NrOfStaticUnits
    if ((previousUnitNr + 1) < thisUnitNr) {
        for (let j = (previousUnitNr + 1); j < thisUnitNr && (j <= NrOfStaticUnits); j++) {
            // console.log("disable foodUnit nr: ", j, "with id: ", varKey);
            document.getElementById("fieldset_" + idUnitPreNoNr + j.toString()).disabled = true;
            document.getElementById("fieldset_" + idUnitPreNoNr + j.toString()).style.display = "none";
        }
    }

    return thisUnitNr;
}




// 3.c Funktionen:
function funcRecreateDynamicElUnit(i, form_elCreditFD) {

    // 3.c-1 hitta aktuellt unitNr  
    // varKey = Object.keys(form_elCreditFD)[i];
    // thisUnitNr = parseInt(varKey.slice(8).split("_").shift());
    let varKey = Object.keys(form_elCreditFD)[i];
    let idUnitPre = varKey.split("_").shift();
    let unitNr = idUnitPre.replace('elCredit', '');
    varKey = Object.keys(form_elCreditFD)[i];


    if (varKey.split("_").pop() == "name") {
        varKey = Object.keys(form_elCreditFD)[i];
        // console.log("varKey ska innehalla  _namn: ", varKey, "indexNr i Objektet: ", i);


        // 3.c-2 skapa ett elUnit-objekt med info om alla ID som behovs
        var unitObject = funcReturnElUnitObject(unitNr, form_elCreditFD[varKey]);

        // 3.c-3 skapa html koden mha objektet och lagg till i DOM
        let code = funcElAddUnitCode(unitObject);

        // 3.c-4  lagg till koden i DOM
        funcAddCodeToDOM(code, "fieldset_elCreditNew");


    } // if-sats "dynamiska" vardena

    // console.log(i)
}



// 3.d Funktionen: exakt samma som i step2_events.js
function funcReturnElUnitObject(x, nameUnit) {

    let idUnitPre = "elCredit" + x;
    let idFieldset = "fieldset_" + idUnitPre;
    let idName = idUnitPre + "_name";
    let idPower = idUnitPre + "_power";
    let idTime = idUnitPre + "_time";
    let idKWHdaily = idUnitPre + "_kWhDaily";
    let idDelete = idUnitPre + "_delete";
    // console.log(idFieldset);

    var unitObject = {
        nameUnit: nameUnit,
        idFieldset: idFieldset,
        idName: idName,
        idPower: idPower,
        idTime: idTime,
        idKWHdaily: idKWHdaily,
        idDelete: idDelete
    };

    return unitObject;

}




// 3.e Funktionen: exakt samma som i step2_events.js
function funcElAddUnitCode(unitObject) {
    // console.log(unitObject.nameUnit);
    let codeStringNewUnit = `   <fieldset id=           \"${unitObject.idFieldset}\"          class=\"elUnit\" >           <h4>${unitObject.nameUnit}</h4>     `;
    codeStringNewUnit += `   <input type=\"hidden\" id=  \"${unitObject.idName}\"  name=  \"${unitObject.idName}\"  value=  \"${unitObject.nameUnit}\"     ></input>  `;
    codeStringNewUnit += `   <label>Effekt:      <input type=  \"text\" id=   \"${unitObject.idPower}\"   name=   \"${unitObject.idPower}\"    /> W</label>  `;
    codeStringNewUnit += `   <label>Tid i drift: <input type= \"text\" id=    \"${unitObject.idTime}\"    name=   \"${unitObject.idTime}\"   /> timmar/dag</label>  `;
    codeStringNewUnit += `   <label>Förbrukning: <input type=\"text\" id=    \"${unitObject.idKWHdaily}\"    name=    \"${unitObject.idKWHdaily}\"   readonly /> kWh/dag</label>   `;
    codeStringNewUnit += `   <label><button onclick=\"funcDeleteUnit(event) \" type=\"button\" id=    \"${unitObject.idDelete}\"   onclick=\"funcHideFieldsetOnClick()\" > `;
    codeStringNewUnit += ` Ta bort!</button></label></fieldset>  `;
    // console.log(codeStringNewUnit);
    return codeStringNewUnit;
}




// 3.f Funktionen: exakt samma i step2_dataLoad.js, step4_dataLoad.js, step2_events.js, step4_events.js
function funcAddCodeToDOM(code, fieldsetId) {
    let newFieldset = document.getElementById(fieldsetId);
    var newDiv = document.createElement("div");
    newDiv.innerHTML = code;
    newFieldset.appendChild(newDiv);
}




// 3.g Funktionen: exakt samma i step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetStoredTextInput(form_FD) {
    if (form_FD) {
        let inputDOM;

        for (let [key, value] of Object.entries(form_FD)) {

            inputDOM = document.getElementById(key);

            if (inputDOM && inputDOM.getAttribute("type") === "text" && inputDOM.readOnly === false) {
                // console.log(key, value);
                inputDOM.value = value;
            }
        }
    }
}


// 3.h Funktionen: exakt samma i step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetCost(costType) {
    var form_moneyCreditFD = JSON.parse(window.localStorage.getItem('form_moneyCredit'));
    let idInputCost = costType + "DebitSpend_cost";
    let inputCostDOM = document.getElementById(idInputCost);
    let idStoredCost = "moneyCreditSpend_" + costType + "Money";
    console.log(idStoredCost);

    if (!form_moneyCreditFD) {
        inputCostDOM.value = 0;
    } else if (  form_moneyCreditFD[idStoredCost] === " - "   ){
        inputCostDOM.value = " - ";
    } else if (isNaN(parseFloat(form_moneyCreditFD[idStoredCost]))) {
        inputCostDOM.value = 0;
    } else {
        inputCostDOM.value = form_moneyCreditFD[idStoredCost];
    }
}





function funcHideSelectedFieldsetUnitByBoolElement(RadioName, eventBooleanValue) {
    let unitType = RadioName.split("_").pop();
    unitType = unitType[0].toUpperCase() + unitType.slice(1);
    let hiddenFieldsetDOM = document.querySelector(`fieldset[id$="${unitType}"]`);
    // console.log(hiddenFieldsetDOM, unitType, eventBooleanValue);

    if (eventBooleanValue === "true") {
        hiddenFieldsetDOM.style.display = "block";
        if (hiddenFieldsetDOM.previousElementSibling.tagName === "H3") {
            hiddenFieldsetDOM.previousElementSibling.style.display = "block";
        }
    } else if (eventBooleanValue === "false") {
        hiddenFieldsetDOM.style.display = "none";
        if (hiddenFieldsetDOM.previousElementSibling.tagName === "H3") {
            hiddenFieldsetDOM.previousElementSibling.style.display = "none";
        }
    }
}



// 3.c Funktionen: exakt samma som i step5_dataLoad.js
function funcCheckRadioBoolean(form_FD, key){
    let value = form_FD[key];
    let idKey = key + value.toString().replace(/^./, value[0].toUpperCase());
    // console.log("idKey: ", idKey, typeof idKey);
    document.getElementById(idKey).checked = true;

    return value;
}




////// GAMMALT///////////////////


// Object.keys(form_foodDebitFD)[iLastDry]


// varKey = Object.keys(form_elCreditFD)[i];
// form_elCreditFD[varKey]


// var unitObject = {
//     nameUnit: nameUnit,
//     idFieldset: idFieldset,
//     idName: idName,
//     idPower: idPower,
//     idTime: idTime,
//     idKWHdaily: idKWHdaily,
//     idDelete: idDelete
// };

// elDebitGrid_cost
// elDebitGrid_fixedCost
// elDebitGrid_variableCost
// elDebitGrid_kWhDaily
// elDebitPV_panelArea
// elDebitPV_peakEffectPerM2
// elDebitPV_peakEffect
// elDebitPV_irradiationDaily
// elDebitPV_systemEfficiency
// elDebitPV_elProduction
// elDebitPV_batteryLoss
// elDebitPV_batteryCapacity
// elDebitPV_kWhDaily
// elDebitTotal_kWhDaily


/*
// kör bara om det finns sparad info om formarna, annars gors inget 
if (form_elDebitFD) {

    // skriv in alla input i form_elDebit
    for (let [key, value] of Object.entries(form_elDebitFD)) {

        let inputDOM = document.getElementById(key);
        if (inputDOM.readOnly === false) {
            console.log(key, value);
            inputDOM.value = value;
        }
    }
}
*/

/*
        var newFieldset = document.getElementById("fieldset_elCreditNew");
        var newDiv = document.createElement("div");
        newDiv.innerHTML = code;
        newFieldset.appendChild(newDiv);
*/

//     hitta vid vilket index som dynamiska vardena borjar, dvs nar id med ordet "namn" dyker upp, 
//     om det inte finns nagon satts sista vardet i objektet till iDynamic
/*for (iDynamic = 0; iDynamic < (iLastUnit - 1); iDynamic++) {
    varKey = Object.keys(form_elCreditFD)[iDynamic];
    if (varKey.split("_").pop() == "name") {
        break;
    }
}*/


/*
        var unitObject = {
            nameUnit: form_elCreditFD[varKey],
            idFieldset: "fieldset_" + idUnitPre,
            idName: Object.keys(form_elCreditFD)[i],
            idPower: Object.keys(form_elCreditFD)[i + 1],
            idTime: Object.keys(form_elCreditFD)[i + 2],
            idKWHdaily: Object.keys(form_elCreditFD)[i + 3],
            idDelete: idUnitPre + "_delete"
        };*/


// 3b-4 skriv ut i formularet
/* if (i < iDynamic) {
     varKey = Object.keys(form_elCreditFD)[i];
     inputDOM = document.getElementById(varKey);
     varValue = form_elCreditFD[varKey];

     if (inputDOM.readOnly === false) {
         console.log(varKey, varValue);
         inputDOM.value = varValue;
     }
 }*/


// 3c-4 skriv ut vardena i formularet
/*for (let k = i; k < (i + 3); k++) {
            varKey = Object.keys(form_elCreditFD)[k];
            // console.log(varKey, i, k);
            inputDOM = document.getElementById(varKey);
            // console.log(inputDOM);
            varValue = form_elCreditFD[varKey];

            if (inputDOM.readOnly === false) {
                console.log("skriver ut key och value: ", varKey, varValue, "index i och k: ", i, k);
                inputDOM.value = varValue;
            }
        }*/



/*
// 3.b Funktionen:
function funcSetStaticElUnitInputValue(i, NrOfStaticUnits, form_elCreditFD, previousUnitNr, unitType){
    
    // 3a-1 hitta vilket elUnitNr som aktuellt key har
    varKey = Object.keys(form_elCreditFD)[i];
    thisUnitNr = parseInt(varKey.slice(8).split("_").shift());
    varKey = Object.keys(form_elCreditFD)[i];




    // 3b-2 specialfall om man nar sista vardet utan att det finns efterfoljande dynamisk kod
    if (isNaN(thisUnitNr)) {
        thisUnitNr = NrOfStaticUnits + 1; 
        console.log("det fanns inga \"dynamiska\" varden sparade");
    }
    console.log("indexNr i Objektet: ", i, "varKey: ", varKey, "nr pa enhet: ", thisUnitNr, "datatyp: ", typeof thisUnitNr);



    
    // 3b-3 stang ner fieldsets for lagre numrerade elUnits
    // men bara till NrOfStaticUnits
    if ((previousUnitNr + 1) < thisUnitNr) {
        for (let j = previousUnitNr + 1; j < thisUnitNr && j <= NrOfStaticUnits; j++) {
            console.log("disable unit nr: ", j, "with id: ", varKey);
            document.getElementById("fieldset_elCredit" + j).disabled = true;
            document.getElementById("fieldset_elCredit" + j).style.display = "none";
        }
    }

}
*/

//let lastKey = Object.keys(form_elCreditFD)[iLastUnit];
//let lastValue = form_elCreditFD[lastKey];
//console.log("lastKey: ", lastKey, "lastValue: ", lastValue);
// inputDOM = document.getElementById(lastKey);
// inputDOM.value = lastValue;
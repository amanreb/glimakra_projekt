/*jshint esversion: 6 */

// step4_onload.js

// import {
//     funcSetInputFromLocalStorage
// } from './functions.js';


/*
----- INNEHÅLL i step4_onload.js -------

1. GET FROM LOCALSTORAGE AND SET peopleCount
    1.a GET form_foodDebit from LocalStorage
    1.b GET form_foodCredit from LocalStorage
    1.c SET foodCreditPeople_count
    1.d Set foodDebitSpend_cost


2. SET INPUT 
       2.a hitta index for sista input (hidden) i varje kategori 
       2.b hitta vilket index som "dynamiska" vardena borjar for varje kategori   
       2.c skriv ut de "statiska" vardena i formularet for varje kategori via loop
       2.d skapa all dynamisk kod for foodDebit
       2.e skapa all dynamisk kod for foodCredit
       2.f set all text-input from object form_foodDebitFD and form_foodCreditFD in LocalStorage

3. FUNKTIONER
        3.a Funktionen: funcFindDynamicIndex(iFirst, iLast, form_FD)                                          i: step2_dataLoad.js, step4_dataLoad.js
        
        3.b Funktionen: funcHideDeletedStaticUnits(i, NrOfStaticUnits, form_FD, previousUnitNr, unitType)     i: step2_dataLoad.js, step4_dataLoad.js
            3.b-1 hitta thisUnitNr och UnitPreNoNr
            3.b-2 specialfall for sista input utan efterfoljande dynamisk kod
            3.b-3 stang ner fieldsets for lagre numrerade Units

        3.c Funktionen: funcRecreateDynamicFoodUnit(i, form_foodDebitFD, foodType)
            3.c-1 hitta aktuellt unitNr 
            3.c-2 skapa ett foodUnit-objekt
            3.c-3 skapa html koden fran objektet
            3.c-4 lagg till koden i DOM 

        3.d Funktionen: funcReturnFoodUnitObject(x, foodType, nameUnit)   i: step4_dataLoad.js, step4_events.js
        3.e Funktionen: funcFoodAddUnitCode(unitObject)                   i: step4_dataLoad.js, step4_events.js

        3.f Funktionen: funcReturnPersonObject(i)
        3.g Funktionen: funcCaloriesCreatePersonRestCode(personObject)
        3.h Funktionen: funcCaloriesCreatePersonActiveCode(personObject)
        3.i Funktionen: funcCaloriesCreatePersonFatCode(personObject)
        
        3.j Funktionen: funcAddCodeToDOM(code, fieldsetId)                i: step2_dataLoad.js, step4_dataLoad.js, step2_events.js, step4_events.js
        3.k Funktionen: funcSetStoredTextInput(form_FD)                   i: step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
        3.l Funktionen: funcSetPeopleCount(idInputPeopleCount)            i: step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
        3.m Funktionen: funcSetCost(costType)                             i: step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
        */






/////////////////////////// 1. GET FROM LOCALSTORAGE AND SET peopleCount /////////////////////////////////////////


// 1.a GET form_foodDebit from LocalStorage
var form_foodDebitFD = JSON.parse(window.localStorage.getItem('form_foodDebit'));

// 1.b GET form_foodCredit from LocalStorage
var form_foodCreditFD = JSON.parse(window.localStorage.getItem('form_foodCredit'));

// 1.c SET foodCreditPeople_count
funcSetPeopleCount("foodCreditPeople_count");

//1.d Set heatDebitSpend_cost
funcSetCost("food");

//1.e Set foodDebitEnergy
var form_elDebitFD = JSON.parse(window.localStorage.getItem('form_elDebit'));
funcSetInputFromOtherPage("elDebitSystem_fridgeSystem", "foodDebitEnergy_fridgeEl", form_elDebitFD); 
funcSetInputFromOtherPage("elDebitSystem_freezerSystem", "foodDebitEnergy_freezerEl", form_elDebitFD); 
// console.log(form_elDebitFD.elDebitSystem_freezerSystem);







///////////////////////////// 2. SET INPUT ////////////////////////////////////////


let varKey, thisUnitNr, previousUnitNr;
let iDynamicDry, iDynamicCool, iDynamicFrozen, iLastDry, iLastCool, iLastFrozen;

// kör bara om det finns sparad info om formarna, annars gors inget 
if (form_foodDebitFD) {

    //  2.a hitta index for sista input (hidden) i varje kategori   
    // varKey = Object.keys(form_foodDebitFD)[0];
    // document.getElementById(varKey).value = form_foodDebitFD[varKey];

    let arrayFormFD = Object.keys(form_foodDebitFD);

    iLastDry = arrayFormFD.map(function (key) {
        return key;
    }).indexOf("foodDebitDryAdd_hidden");

    iLastCool = arrayFormFD.map(function (key) {
        return key;
    }).indexOf("foodDebitCoolAdd_hidden");

    iLastFrozen = arrayFormFD.map(function (key) {
        return key;
    }).indexOf("foodDebitFrozenAdd_hidden");

    // console.log("iLastDry: ", iLastDry, "iLastCool: ", iLastCool, "iLastFrozen: ", iLastFrozen );
    // console.log("lastKeyDry: ", Object.keys(form_foodDebitFD)[iLastDry], "lastKeyCool: ", Object.keys(form_foodDebitFD)[iLastCool], "lastKeyFrozen: ", Object.keys(form_foodDebitFD)[iLastFrozen]);
    // console.log("lastValueDry: ", Object.values(form_foodDebitFD)[iLastDry], "lastValueCool: ", Object.values(form_foodDebitFD)[iLastCool], "lastValueFrozen: ", Object.values(form_foodDebitFD)[iLastFrozen]);

    /*  if (typeof form_foodDebitFD === 'object' && form_foodDebitFD !== null){
          console.log("Ja det ar ett objekt")
      } */




    // 2.b hitta vid vilket index som dynamiska vardena borjar, dvs nar id med ordet "namn" dyker upp, 
    //     om det inte finns nagon satts sista vardet i objektet till iDynamic

    iDynamicDry = funcFindDynamicIndex(0, iLastDry, form_foodDebitFD);
    iDynamicCool = funcFindDynamicIndex(iLastDry, iLastCool, form_foodDebitFD);
    iDynamicFrozen = funcFindDynamicIndex(iLastCool, iLastFrozen, form_foodDebitFD);

    // console.log("iDynamicDry: ", iDynamicDry, " varKey id-namnet :", Object.keys(form_foodDebitFD)[iLastDry]);
    // console.log("iDynamicCool: ", iDynamicCool, " varKey id-namnet :", Object.keys(form_foodDebitFD)[iLastCool]);
    // console.log("iDynamicFrozen: ", iDynamicFrozen, " varKey id-namnet :", Object.keys(form_foodDebitFD)[iLastFrozen]);




    // 2.c loopa Object.keys och skriv ut allt som hor till de hardkodade Units, alltsa t.o.m. iDynamic eller till slutet pa Objektet
    previousUnitNr = 0;
    let NrOfStaticUnits = 7;
    for (let i = 4; i <= iDynamicDry; i++) {
        thisUnitNr = funcHideDeletedStaticUnits(i, NrOfStaticUnits, form_foodDebitFD, previousUnitNr, "Dry");
        previousUnitNr = thisUnitNr;
        // console.log(thisUnitNr);
    }

    previousUnitNr = 0;
    NrOfStaticUnits = 4;
    for (let i = (iLastDry + 1); i <= iDynamicCool; i++) {
        thisUnitNr = funcHideDeletedStaticUnits(i, NrOfStaticUnits, form_foodDebitFD, previousUnitNr, "Cool");
        previousUnitNr = thisUnitNr;
    }

    previousUnitNr = 0;
    NrOfStaticUnits = 3;
    for (let i = (iLastCool + 3); i <= iDynamicFrozen; i++) {
        thisUnitNr = funcHideDeletedStaticUnits(i, NrOfStaticUnits, form_foodDebitFD, previousUnitNr, "Frozen");
        previousUnitNr = thisUnitNr;
    }



    // 2.d skapa all dynamisk kod for foodDebit
    for (let i = iDynamicDry; i < iLastDry; i = i + 8) {
        funcRecreateDynamicFoodUnit(i, form_foodDebitFD, "Dry");
    }

    for (let i = iDynamicCool; i < iLastCool; i = i + 8) {
        funcRecreateDynamicFoodUnit(i, form_foodDebitFD, "Cool");
    }

    for (let i = iDynamicFrozen; i < iLastFrozen; i = i + 8) {
        funcRecreateDynamicFoodUnit(i, form_foodDebitFD, "Frozen");
    }

    // console.log("antalet inputs inkl gomda idName: ", Object.keys(form_foodDebitFD).length);

} // stora if-satsen for bada formularen



// 2.e skapa all dynamisk kod for foodCredit
let NrOfPeople = document.getElementById("foodCreditPeople_count").value;

for (let i = 2; i <= NrOfPeople; i++) {
    let personObject = funcReturnPersonObject(i);

    let restCode = funcCaloriesCreatePersonRestCode(personObject);
    funcAddCodeToDOM(restCode, "fieldset_foodCreditRestNew");

    let activeCode = funcCaloriesCreatePersonActiveCode(personObject);
    funcAddCodeToDOM(activeCode, "fieldset_foodCreditActiveNew");

    let fatCode = funcCaloriesCreatePersonFatCode(personObject);
    funcAddCodeToDOM(fatCode, "fieldset_foodCreditFatNew");
}


// 2.f set all text-input from object form_foodDebitFD and form_foodCreditFD in LocalStorage
funcSetStoredTextInput(form_foodDebitFD);
funcSetStoredTextInput(form_foodCreditFD);

funcDisableTargetElementIfSourceDissabled("freezer_systemUnit", "foodDebitEnergy_freezerEl");
funcDisableTargetElementIfSourceDissabled("fridge_systemUnit", "foodDebitEnergy_fridgeEl");



///////////////////////////// 3. FUNKTIONER ///////////////////////////


function funcDisableTargetElementIfSourceDissabled(targetElement, sourceElementId) {
    let targetElementNodeList = document.querySelectorAll(`#${targetElement},.${targetElement}`);
    let sourceElementDOM = document.getElementById(sourceElementId);
    // console.log("targetElementNodeList", targetElementNodeList);

    targetElementNodeList.forEach(targetElementDOM => {       
        if (sourceElementDOM.value === " - " ) { 
            // console.log(targetElementDOM.value);
            if (targetElementDOM.getAttribute("type") === "radio"){
                // targetElementDOM.value = " - ";
                targetElementDOM.disabled = true;
                // console.log(targetElementDOM.value);
            } else if (targetElementDOM.getAttribute("type") === "text") {
                targetElementDOM.readOnly = true;
                targetElementDOM.value = " - ";
            }
        }
    });
}





// funcDisableTargetElementFromSource("fieldset_foodDebitCool1", "foodDebitEnergy_fridgeEl");
// funcDisableTargetElementFromSource("fieldset_foodDebitFrozen1", "foodDebitEnergy_freezerEl");
//gammal
// function funcDisableTargetElementFromSource(targetElementId, sourceElementId ){
//     let targetElementDOM = document.getElementById(targetElementId);
//     let sourceElementDOM = document.getElementById(sourceElementId);

//     if (sourceElementDOM.value == "0"){
//         targetElementDOM.disable = true;
//     } else {
//         targetElementDOM.disable = false;
//     }
// }



// 3.a Funktionen: exakt samma som i step2_dataLoad.js
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



// 3.b Funktionen: exakt samma som i step2_dataLoad.js
function funcHideDeletedStaticUnits(i, NrOfStaticUnits, form_FD, previousUnitNr, unitType) {

    // 3.b-1 hitta thisUnitNr och UnitPreNoNr
    let varKey = Object.keys(form_FD)[i];
    let idUnitPre = varKey.split("_").shift();
    varKey = Object.keys(form_FD)[i];
    let thisUnit = idUnitPre.replace(unitType, '');
   
    if (thisUnit.includes("Debit")){
        thisUnit = thisUnit.split("Debit").pop();
    } else if (thisUnit.includes("Credit")) {
        thisUnit = thisUnit.split("Credit").pop();
    }

    let idUnitPreNoNr = idUnitPre.replace(thisUnit,'');
    thisUnitNr = parseInt(thisUnit);
    // console.log(varKey, thisUnitNr, thisUnit, idUnitPre, idUnitPreNoNr);
    


    // 3.b-2 specialfall for sista input utan efterfoljande dynamisk kod
    if (isNaN(thisUnitNr)) {
        thisUnitNr = NrOfStaticUnits + 1;
        console.log("det fanns inga \"dynamiska\" varden sparade");
    }
    // console.log("indexNr i Objektet: ", i, "varKey: ", varKey, "nr pa enhet: ", thisUnitNr, "datatyp: ", typeof thisUnitNr);


    // 3.b-3 stang ner fieldsets for lagre numrerade Units
    // men bara till NrOfStaticUnits
    if ((previousUnitNr + 1) < thisUnitNr) {
        for (let j = (previousUnitNr + 1); j < thisUnitNr && (j <= NrOfStaticUnits); j++) {
            // console.log("disable foodUnit nr: ", j, "with id: ", varKey);
            document.getElementById( "fieldset_" + idUnitPreNoNr + j.toString() ).disabled = true;
            document.getElementById( "fieldset_" + idUnitPreNoNr + j.toString() ).style.display = "none";
        }
    }

    return thisUnitNr;
}



// 3.c Funktionen: 
function funcRecreateDynamicFoodUnit(i, form_foodDebitFD, foodType) {

    // 3.c-1 hitta aktuellt unitNr 
    // varKey = Object.keys(form_foodDebitFD)[i];
    // let sliceNr = 9 + foodType.length; 
    // let thisUnitNr = parseInt(varKey.slice(sliceNr).split("_").shift());
    let varKey = Object.keys(form_foodDebitFD)[i];
    let idUnitPre = varKey.split("_").shift();
    let unitNr = idUnitPre.replace(`foodDebit${foodType}`, '');
    // console.log(unitNr);
    varKey = Object.keys(form_foodDebitFD)[i];


    if (varKey.split("_").pop() == "name") {
        varKey = Object.keys(form_foodDebitFD)[i];
        console.log("första dynamiska input ska heta  _namn: ", varKey, "indexNr i Objektet: ", i);
        
        // 3.c-2 skapa ett Unit-objekt med info om alla ID som behovs
        var unitObject = funcReturnFoodUnitObject(unitNr, foodType, form_foodDebitFD[varKey]);
        // console.log("GGG", Object.keys(form_foodDebitFD)[i]);




        // 3.c-3 skapa html koden mha objektet och lagg till i DOM
        let code = funcFoodAddUnitCode(unitObject);

        // 3.c-4  lagg till koden i DOM
        let fieldsetFoodAddNewId = "fieldset_foodDebit" + foodType + "New";
        funcAddCodeToDOM(code, fieldsetFoodAddNewId);

        



    } // if-sats "dynamiska" vardena
} //slut pa funktion





// 3.d Funktionen: exakt samma som i step4_events.js
function funcReturnFoodUnitObject(x, foodType, nameUnit) {

    let idUnitPre = "foodDebit" + foodType + x;
    let idFieldset = "fieldset_" + idUnitPre;
    let className = foodType.toLowerCase() + "FoodUnit";
    let idName = idUnitPre + "_name";
    let idNutritionValue = idUnitPre + "_nutritionValue";
    let idPrice = idUnitPre + "_price";
    let idMonthlyCost = idUnitPre + "_monthlyCost";
    let idKgMonthlyBuy = idUnitPre + "_kgMonthlyBuy";
    let idKgStorage = idUnitPre + "_kgStorage";
    let idKcalMonthlyBuy = idUnitPre + "_kcalMonthlyBuy";
    let idKcalStorage = idUnitPre + "_kcalStorage";
    let idDelete = idUnitPre + "_delete";

    let classElScenario  = "";
    if (foodType === "Cool"){ classElScenario  = "fridge_systemUnit";}
    if (foodType === "Frozen"){ classElScenario  = "freezer_systemUnit";}

    var unitObject = {
        nameUnit: nameUnit,
        idFieldset: idFieldset,
        className: className,
        idName: idName,
        idNutritionValue: idNutritionValue,
        idPrice: idPrice,
        idMonthlyCost: idMonthlyCost,
        idKgMonthlyBuy: idKgMonthlyBuy,
        idKgStorage: idKgStorage,
        idKcalMonthlyBuy: idKcalMonthlyBuy,
        idKcalStorage: idKcalStorage,
        idDelete: idDelete,
        classElScenario: classElScenario
    };

    return unitObject;
}






// 3.e Funktionen: exakt samma som i step4_events.js
function funcFoodAddUnitCode(unitObject) {
    // console.log(unitObject.nameUnit);

    let codeStringNewUnit = `  <fieldset id="${unitObject.idFieldset}"  class="${unitObject.className}"><h4>${unitObject.nameUnit}</h4>   `;
    codeStringNewUnit += `   <input type="hidden" id="${unitObject.idName }" name="${unitObject.idName}" value="${unitObject.nameUnit}"></input>  `;
    codeStringNewUnit += `   <label>Energiinnehåll: <input type="text" id="${unitObject.idNutritionValue}" name="${unitObject.idNutritionValue}" /> kcal/100g</label>   `;
    codeStringNewUnit += `   <label>Pris: <input type="text" id="${unitObject.idPrice}" name="${unitObject.idPrice}" class="food_scenario"/> SEK/kg</label>  `;
    codeStringNewUnit += `  <label>Matinköp: <input type="text" id="${unitObject.idKgMonthlyBuy}" name="${unitObject.idKgMonthlyBuy}" class="food_scenario"/> kg/månad</label>  `;
    codeStringNewUnit += ` <label>Månadskostnad:<input type="text" id="${unitObject.idMonthlyCost}" name="${unitObject.idMonthlyCost}" class="food_scenario" readonly/>SEK/månad</label>`;
    codeStringNewUnit += `  <label><span>Matlager:</span> <input type="text" id="${unitObject.idKgStorage}" name="${unitObject.idKgStorage}"  class="${unitObject.classElScenario}" /> kg</label> `;
    codeStringNewUnit += `  <label>Kalorimängd, inköp: <input type="text" id="${unitObject.idKcalMonthlyBuy}" name="${unitObject.idKcalMonthlyBuy}" class="food_scenario" readonly /> kcal/mån</label>  `;
    codeStringNewUnit += `  <label><span>Kalorimängd, lager:</span> <input type="text" id="${unitObject.idKcalStorage}" name="${unitObject.idKcalStorage}"  class="${unitObject.classElScenario}" readonly /> kcal</label> `;
    codeStringNewUnit += `  <label><button onclick="funcDeleteUnit(event)" type="button" id="${unitObject.idDelete}">Ta bort!</button></label></fieldset> `;

    // console.log(codeStringNewUnit);
    // console.log(unitObject.idName);
    return codeStringNewUnit;
}

//////



// 3.f Funktionen: 
function funcReturnPersonObject(i) {
    let personObject = {
        namePerson: "PERSON " + i,
        idFieldsetRest: "fieldset_foodCreditRestPers" + i,
        idFieldsetActive: "fieldset_foodCreditActivePers" + i,
        idFieldsetFat: "fieldset_foodCreditFatPers" + i,
        idWeight: "foodCreditRestPers" + i + "_weight",
        idKcalDailyRest: "foodCreditRestPers" + i + "_kcalDailyRest",
        idMET1: "foodCreditActivePers" + i + "_MET1",
        idMET1_5: "foodCreditActivePers" + i + "_MET1_5",
        idMET2_5: "foodCreditActivePers" + i + "_MET2_5",
        idMET5: "foodCreditActivePers" + i + "_MET5",
        idMET7: "foodCreditActivePers" + i + "_MET7",
        idMET10: "foodCreditActivePers" + i + "_MET10",
        idMET12: "foodCreditActivePers" + i + "_MET12",
        idMET16: "foodCreditActivePers" + i + "_MET16",
        idMETsum: "foodCreditActivePers" + i + "_METsum",
        idPAL: "foodCreditActivePers" + i + "_PAL",
        idKcalDailyActive: "foodCreditActivePers" + i + "_kcalDailyActive",
        idKgFat: "foodCreditFatPers" + i + "_kgFat",
        idKcalFat: "foodCreditFatPers" + i + "_kcalFat",
        idKcalDailyFat: "foodCreditFatPers" + i + "_kcalDailyFat"
    };
    return personObject;
}


// 3.g Funktionen: 
function funcCaloriesCreatePersonRestCode(personObject) {
    let codeStringNewPerson = ` <fieldset id="${personObject.idFieldsetRest}"><h4>${personObject.namePerson}</h4>  `;
    codeStringNewPerson += `<label>Vikt: <input type="text" id="${personObject.idWeight}" name="${personObject.idWeight}" />kg</label>  `;
    codeStringNewPerson += `<label>BMR <span class="smallText">(Basal Metabolic Rate)</span>: `;
    codeStringNewPerson += `<input type="text" id="${personObject.idKcalDailyRest}" name="${personObject.idKcalDailyRest}" readonly /> kcal/dag</label></fieldset>`;

    // console.log(codeStringNewPerson);
    // console.log(personObject.namePerson);
    return codeStringNewPerson;
}





// 3.h Funktionen: 
function funcCaloriesCreatePersonActiveCode(personObject) {

    let codeStringNewPerson =  `<fieldset id="${personObject.idFieldsetActive}">                                   <h4>${personObject.namePerson}</h4>`;
    codeStringNewPerson +=      `<table><thead><tr><th><label>MET<span class="smallText">(Meta&shy;bolic Energy Turnover):</span></label></th><th><label>Tidslängd</label></th></tr></thead><tbody><tr>`;

    codeStringNewPerson +=   `<td><label for="${personObject.idMET1}">MET=1 &nbsp; <span class="labelTextSmall">ingen aktivitet (vila)</span></label></td>`;
    codeStringNewPerson +=   `<td><label for="${personObject.idMET1}">Timmar/dag</label><input type="text"         id="${personObject.idMET1}"               name="${personObject.idMET1}" value="24"/></td></tr>`;
   
    codeStringNewPerson +=`<tr><td><label for="${personObject.idMET1_5}">MET=1,5 &nbsp; <span class="labelTextSmall">mycket lätt (rull&shy;stols&shy;bunden)</span></label></td>`;
    codeStringNewPerson +=    `<td><label for="${personObject.idMET1_5}" >Timmar<wbr>/dag</label><input type="text" id="${personObject.idMET1_5}"            name="${personObject.idMET1_5}" /></td></tr>`;
   
    codeStringNewPerson +=`<tr><td><label for="${personObject.idMET2_5}">MET=2,5 &nbsp; <span class="labelTextSmall">lätt (mat&shy;lagning)</span></label></td>`;
    codeStringNewPerson +=    `<td><label for="${personObject.idMET2_5}" >Timmar<wbr>/dag</label><input type="text" id="${personObject.idMET2_5}"            name="${personObject.idMET2_5}" /></td></tr>`;
   
    codeStringNewPerson +=`<tr><td><label for="${personObject.idMET5}">MET=5  &nbsp; <span class="labelTextSmall">moderat (träd&shy;gårds&shy;arbete)</span></label></td>`;
    codeStringNewPerson +=    `<td><label for="${personObject.idMET5}" >Timmar<wbr>/dag</label><input type="text"   id="${personObject.idMET5}"              name="${personObject.idMET5}" /></td></tr>`;
   
    codeStringNewPerson +=`<tr><td><label for="${personObject.idMET7}">MET=7 &nbsp; <span class="labelTextSmall">medelhård (badminton)</span></label></td>`;
    codeStringNewPerson +=    `<td><label for="${personObject.idMET7}" >Timmar<wbr>/dag</label><input type="text"   id="${personObject.idMET7}"              name="${personObject.idMET7}" /></td></tr>`;
   
    codeStringNewPerson +=`<tr><td><label for="${personObject.idMET10}">MET=10 &nbsp; <span class="labelTextSmall">hård (löpning, 9,6km/h)</span></label></td>`;
    codeStringNewPerson +=    `<td><label for="${personObject.idMET10}" >Timmar<wbr>/dag</label><input type="text"  id="${personObject.idMET10}"             name="${personObject.idMET10}" /></td></tr>`;
   
    codeStringNewPerson +=`<tr><td><label for="${personObject.idMET12}">MET=12 &nbsp; <span class="labelTextSmall">mycket hård (cykling, 30km/h)</span></label></td>`;
    codeStringNewPerson +=    `<td><label for="${personObject.idMET12}" >Timmar<wbr>/dag</label><input type="text" id="${personObject.idMET12}"              name="${personObject.idMET12}" /></td></tr>`;
   
    codeStringNewPerson +=`<tr><td><label for="${personObject.idMET16}">MET=16 &nbsp; <span class="labelTextSmall">sten&shy;hård (skid&shy;åkning, uppför)</span></label></td>`;
    codeStringNewPerson +=    `<td><label for="${personObject.idMET16}" >Timmar<wbr>/dag</label><input type="text" id="${personObject.idMET16}"              name="${personObject.idMET16}" /></td></tr>`;
   
    codeStringNewPerson +=`<tr><td><label for="${personObject.idMETsum}">Summan av MET <span class="labelTextSmall">(max 24 timmar)</span></label></td>`;
    codeStringNewPerson +=    `<td><label for="${personObject.idMETsum}" >Timmar<wbr>/dag</label><input type="text" id="${personObject.idMETsum}"            name="${personObject.idMETsum}" readonly/></td></tr></tbody></table>`;
      
    codeStringNewPerson +=`<label>PAL <span class="smallText">(Physical Activity Level)</span> `;
    codeStringNewPerson +=                                                                       `<input type="text" id="${personObject.idPAL}"              name="${personObject.idPAL}" readonly /></label><label>Förbränning per dag `;
    codeStringNewPerson +=                                                                       `<input type="text" id="${personObject.idKcalDailyActive}"  name="${personObject.idKcalDailyActive}" readonly /> kcal/dag</label></fieldset>`;
    // console.log(codeStringNewPerson);
    // console.log(personObject.namePerson);
    return codeStringNewPerson;
}



// 3.i Funktionen: 
function funcCaloriesCreatePersonFatCode(personObject) {

    let codeStringNewPerson = `      <fieldset id="${personObject.idFieldsetFat}">   <h4>${personObject.namePerson}</h4><label>Fettmassa `;
    codeStringNewPerson += ` <input type="text" id="${personObject.idKgFat}"        name="${personObject.idKgFat}" /> kg</label><label>Energilagring i fettet `;
    codeStringNewPerson += ` <input type="text" id="${personObject.idKcalFat}"      name="${personObject.idKcalFat}" readonly /> kcal</label><label>Max möjlig fett&shy;förbränning `;
    codeStringNewPerson += ` <input type="text" id="${personObject.idKcalDailyFat}" name="${personObject.idKcalDailyFat}" readonly /> kcal/dag</label></fieldset>`;

    // console.log(codeStringNewPerson);
    // console.log(personObject.namePerson);
    return codeStringNewPerson;
}



/////



// 3.j Funktionen: exakt samma i step2_dataLoad.js, step4_dataLoad.js, step2_events.js, step4_events.js
function funcAddCodeToDOM(code, fieldsetId) {
    let newFieldset = document.getElementById(fieldsetId);
    var newDiv = document.createElement("div");
    newDiv.innerHTML = code;
    newFieldset.appendChild(newDiv);
}




// 3.k Funktionen: exakt samma i step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetStoredTextInput(form_FD){
    if (form_FD) {
        let inputDOM;
    
        for (let [key, value] of Object.entries(form_FD)) {
        
            inputDOM = document.getElementById(key);

            if (inputDOM && inputDOM.getAttribute("type")==="text" && inputDOM.readOnly === false) {
                // console.log(key, value);
                inputDOM.value = value;
            }
        } 
    }
}



// 3.l Funktionen: exakt samma i step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetPeopleCount(idInputPeopleCount){
    
    var form_moneyCreditFD = JSON.parse(window.localStorage.getItem('form_moneyCredit'));
    if (form_moneyCreditFD) {
        document.getElementById(idInputPeopleCount).value =  form_moneyCreditFD.moneyCreditPeople_count;
    } else {
        document.getElementById(idInputPeopleCount).value = 1;
    }
}


// 3.m Funktionen: exakt samma i step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetCost(costType) {
    var form_moneyCreditFD = JSON.parse(window.localStorage.getItem('form_moneyCredit'));
    let idInputCost = costType + "DebitSpend_cost";
    let inputCostDOM = document.getElementById(idInputCost);
    let idStoredCost = "moneyCreditSpend_" + costType + "Money";
    // console.log(idStoredCost);

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


//3.f  Funktionen:
function funcSetInputFromOtherPage(sourceId, targetId, form_FD) {
    
    //  var form_FD = JSON.parse(window.localStorage.getItem('form_heatCredit'));
    let targetDOM = document.getElementById(targetId);

    if (!form_FD) {
        
    } else if (  form_FD[sourceId] === " - "  )  {
        targetDOM.value = " - ";
    } else if (isNaN(parseFloat(form_FD[sourceId])) ) {
        // console.log(form_FD[sourceId]);
        targetDOM.value = 0;
    } else {
        targetDOM.value = form_FD[sourceId];
    }

}


////// GAMMALT///////////////////


/*
    namePerson:
    idFieldsetRest:
    idFieldsetActive:
    idFieldsetFat:

    idWeight:
    idKcalDailyRest:

    idMET1:
    idMET1_5:
    idMET2_5:
    idMET5:
    idMET7:
    idMET10:
    idMET12:
    idMET16:
    idPAL:
    idKcalDailyActive:

    idKgFat:
    idKcalFat:
    idKcalDailyFat:
};

PERSON1
fieldset_foodCreditRestPers1
fieldset_foodCreditActivePers1
fieldset_foodCreditFatPers1

foodCreditRestPers1_weight
foodCreditRestPers1_kcalDailyRest

foodCreditActivePers1_MET1
foodCreditActivePers1_MET1_5
foodCreditActivePers1_MET2_5
foodCreditActivePers1_MET5
foodCreditActivePers1_MET7
foodCreditActivePers1_MET10
foodCreditActivePers1_MET12
foodCreditActivePers1_MET16
foodCreditActivePers1_PAL
foodCreditActivePers1_kcalDailyActive

foodCreditFatPers1_kgFat
foodCreditFatPers1_kcalFat
foodCreditFatPers1_kcalDailyFat
*/






// <fieldset id="foodCreditActivePers1"><h4>PERSON1</h4><table><thead><tr><th><label>MET<span class="smallText">
// (Metabolic Energy Turn over):</span></label></th><th><label>Timmar/dag</label></th></tr></thead><tbody><tr><td>
// <label for="foodCreditActivePers1_MET1">MET=1  ingen aktivitet (vila)</label></td>
// <td><input type="text" id="foodCreditActivePers1_MET1" name="foodCreditActivePers1_MET1" /></td></tr>
// <tr><td><label for="foodCreditActivePers1_MET1_5">MET=1,5  mycket lätt (rullstolsbunden)</label></td>  

// <td><input type="text" id="foodCreditActivePers1_MET1_5" name="foodCreditActivePers1_MET1_5" /></td></tr>
// <tr><td><label for="foodCreditActivePers1_MET2_5">MET=2,5  lätt (matlagning)</label></td>  
// <td><input type="text" id="foodCreditActivePers1_MET2_5" name="foodCreditActivePers1_MET2_5" /></td></tr>
// <tr><td><label for="foodCreditActivePers1_MET5">MET=5  moderat (trädgårdsarbete)</label></td>  
// <td><input type="text" id="foodCreditActivePers1_MET5" name="foodCreditActivePers1_MET5" /></td></tr>

// <tr><td><label for="foodCreditActivePers1_MET7">MET=7  medelhård (badminton)</label></td>  
// <td><input type="text" id="foodCreditActivePers1_MET7" name="foodCreditActivePers1_MET7" /></td></tr>
// <tr><td><label for="foodCreditActivePers1_MET10">MET=10  hård (löpning, 9,6km/h)</label></td>  
// <td><input type="text" id="foodCreditActivePers1_MET10" name="foodCreditActivePers1_MET10" /></td></tr>
// <tr><td><label for="foodCreditActivePers1_MET12">MET=12  mycket hård (cykling, 30km/h)</label></td>

// <td><input type="text" id="foodCreditActivePers1_MET12" name="foodCreditActivePers1_MET12" /></td></tr>
// <tr><td><label for="foodCreditActivePers1_MET16">MET=16  stenhård (skidåkning, uppför)</label></td>  
// <td><input type="text" id="foodCreditActivePers1_MET16" name="foodCreditActivePers1_MET16" /></td></tr></tbody></table>
// <label>PAL <span class="smallText">(Physical Activity Level)</span>
// <input type="text" id="foodCreditActivePers1_PAL" name="foodCreditActivePers1_PAL" readonly /></label><label>Förbränning per dag
// <input type="text" id="foodCreditActivePers1_kcalDaily" name="foodCreditActivePers1_kcalDaily" readonly />kcal/dag</label></fieldset>


//  <fieldset id="foodCreditFatPers1"><h4>PERSON1</h4><label>Fettmassa
//  <input type="text" id="foodCreditFatPers1_kgFat" name="foodCreditFatPers1_kgFat" />kg</label><label>Energilagring i fettet
//  <input type="text" id="foodCreditFatPers1_kcalTotal" name="foodCreditFatPers1_kcalTotal" readonly />kcal</label><label>Max möjlig fett&shy;förbränning
//  <input type="text" id="foodCreditFatPers1_kcalMaxDaily" name="foodCreditFatPers1_kcalMaxDaily" readonly />kcal/dag</label></fieldset>



/*
<fieldset id="fieldset_foodCreditActivePers1"><h4>PERSON 1</h4>
<table><thead><tr><th><label>MET<span class="smallText">(Meta&shy;bolic Energy Turnover):</span></label></th><th><label>Tidslängd</label></th></tr></thead><tbody><tr> 
<td><label for="foodCreditActivePers1_MET1">MET=1 &nbsp; <span class="labelTextSmall">ingen aktivitet (vila)</span></label></td>
<td><label for="foodCreditActivePers1_MET1">Timmar/dag</label><input type="text" id="foodCreditActivePers1_MET1" name="foodCreditActivePers1_MET1" value="24"/></td></tr><tr>
<td><label for="foodCreditActivePers1_MET1_5">MET=1,5 &nbsp; <span class="labelTextSmall">mycket lätt (rull&shy;stols&shy;bunden)</span></label></td>
<td><label for="foodCreditActivePers1_MET1_5" >Timmar<wbr>/dag</label><input type="text" id="foodCreditActivePers1_MET1_5" name="foodCreditActivePers1_MET1_5" /></td></tr><tr>
<td><label for="foodCreditActivePers1_MET2_5">MET=2,5 &nbsp; <span class="labelTextSmall">lätt (mat&shy;lagning)</span></label></td>
<td><label for="foodCreditActivePers1_MET2_5" >Timmar<wbr>/dag</label><input type="text" id="foodCreditActivePers1_MET2_5" name="foodCreditActivePers1_MET2_5" /></td></tr><tr>
<td><label for="foodCreditActivePers1_MET5">MET=5  &nbsp; <span class="labelTextSmall">moderat (träd&shy;gårds&shy;arbete)</span></label></td>
<td><label for="foodCreditActivePers1_MET5" >Timmar<wbr>/dag</label><input type="text" id="foodCreditActivePers1_MET5" name="foodCreditActivePers1_MET5" /></td></tr><tr>
<td><label for="foodCreditActivePers1_MET7">MET=7 &nbsp; <span class="labelTextSmall">medelhård (badminton)</span></label></td>
<td><label for="foodCreditActivePers1_MET7" >Timmar<wbr>/dag</label><input type="text" id="foodCreditActivePers1_MET7" name="foodCreditActivePers1_MET7" /></td></tr><tr>
<td><label for="foodCreditActivePers1_MET10">MET=10 &nbsp; <span class="labelTextSmall">hård (löpning, 9,6km/h)</span></label></td>
<td><label for="foodCreditActivePers1_MET10" >Timmar<wbr>/dag</label><input type="text" id="foodCreditActivePers1_MET10" name="foodCreditActivePers1_MET10" /></td></tr><tr>
<td><label for="foodCreditActivePers1_MET12">MET=12 &nbsp; <span class="labelTextSmall">mycket hård (cykling, 30km/h)</span></label></td>
<td><label for="foodCreditActivePers1_MET12" >Timmar<wbr>/dag</label><input type="text" id="foodCreditActivePers1_MET12" name="foodCreditActivePers1_MET12" /></td></tr><tr>
<td><label for="foodCreditActivePers1_MET16">MET=16 &nbsp; <span class="labelTextSmall">sten&shy;hård (skid&shy;åkning, uppför)</span></label></td>
<td><label for="foodCreditActivePers1_MET16" >Timmar<wbr>/dag</label><input type="text" id="foodCreditActivePers1_MET16" name="foodCreditActivePers1_MET16" /></td></tr><tr>
<td><label for="foodCreditActivePers1_MET16">Summan av MET <span class="labelTextSmall">(max 24 timmar)</span></label></td>
<td><label for="foodCreditActivePers1_METsum" >Timmar<wbr>/dag</label><input type="text" id="foodCreditActivePers1_METsum" name="foodCreditActivePers1_METsum" readonly/></td></tr></tbody></table>
<label>PAL <span class="smallText">(Physical Activity Level)</span><input type="text" id="foodCreditActivePers1_PAL" name="foodCreditActivePers1_PAL" readonly /></label>
<label>Förbränning per dag<input type="text" id="foodCreditActivePers1_kcalDailyActive" name="foodCreditActivePers1_kcalDailyActive" readonly />kcal/dag</label></fieldset>
*/



/*
// kör bara om det finns sparad info om formen
if (form_foodCreditFD) {

    // 4b. skriv in alla input i form_foodCredit
    for (let [key, value] of Object.entries(form_foodCreditFD)) {

        inputDOM = document.getElementById(key);
        // console.log("XX: ", key, value, inputDOM);

        if (inputDOM != null) {
            if (inputDOM.readOnly === false) {
                // console.log(key, value);
                inputDOM.value = value;
            }
        }
    }
}
*/


/*
        var newFieldset = document.getElementById("fieldset_foodDebit" + foodType + "New");
        var newDiv = document.createElement("div");
        newDiv.innerHTML = code;
        newFieldset.appendChild(newDiv);
        */


    // 3e) fyll i de tva sista vardena i form_foodDebit - BEHOVS EJ
    /*let NrOfInputs = Object.keys(form_foodDebitFD).length
    let nextToLastKey = Object.keys(form_foodDebitFD)[NrOfInputs - 2];
    let lastKey = Object.keys(form_foodDebitFD)[NrOfInputs - 1];
    let nextToLastValue = form_foodDebitFD[nextToLastKey];
    let lastValue = form_foodDebitFD[lastKey];
    
    console.log("nextToLastKey: ", nextToLastKey, "nextToLastValue: ", nextToLastValue);
    console.log("lastKey: ", lastKey, "lastValue: ", lastValue);
    
    inputDOM = document.getElementById(nextToLastKey);
    inputDOM.value = nextToLastValue;
    inputDOM = document.getElementById(lastKey);
    inputDOM.value = lastValue;*/


    /* var unitObject = {
            nameUnit: form_foodDebitFD[varKey],
            idFieldset: "fieldset_" + idUnitPre,
            className: foodType.toLowerCase() + "FoodUnit",
            idName: Object.keys(form_foodDebitFD)[i],
            idNutritionValue: Object.keys(form_foodDebitFD)[i + 1],
            idPrice: Object.keys(form_foodDebitFD)[i + 2],
            idKgMonthlyBuy: Object.keys(form_foodDebitFD)[i + 3],
            idKgStorage: Object.keys(form_foodDebitFD)[i + 4],
            idKcalMonthlyBuy: Object.keys(form_foodDebitFD)[i + 5],
            idKcalStorage: Object.keys(form_foodDebitFD)[i + 6],
            idDelete: idUnitPre + "_delete"
        };*/

        /*if (foodType==="Dry") {
            console.log("Ingen ny skafferimat angiven"); 
            thisUnitNr = 8;
        } else if (foodType==="Cool") {
            thisUnitNr = 5;
            console.log("Ingen ny kylmat angiven");
        } else if (foodType==="Frozen") {
            thisUnitNr = 4;
            console.log("Ingen ny frysmat angiven");
        } */


        // 3.c-4 skriv ut vardena i formularet
        /*for (let k = i; k < (i + 7); k++) {
            varKey = Object.keys(form_foodDebitFD)[k];
            // console.log(varKey, i, k);
            inputDOM = document.getElementById(varKey);

            if (inputDOM.readOnly === false) {
                console.log("skriver ut key och value: ", varKey, varValue, "index i och k: ", i, k);
                varValue = form_foodDebitFD[varKey];
                inputDOM.value = varValue;
            }

        }*/


    // 3.b-4 skriv ut i formularet
    /*if (i < iDynamic) {
        varKey = Object.keys(form_foodDebitFD)[i];
        inputDOM = document.getElementById(varKey);

        if (inputDOM.readOnly === false) {
            console.log(varKey, varValue);
            varValue = form_foodDebitFD[varKey];
            inputDOM.value = varValue;
        }
    }*/

// GAMMLA 3.h Funktionen: 
/*function funcCaloriesCreatePersonActiveCode(personObject) {
    let codeStringNewPerson = `          <fieldset id="${personObject.idFieldsetActive}"><h4>${personObject.namePerson}</h4><table><thead><tr><th><label>MET<span class="smallText"> `;
    codeStringNewPerson += ` (Metabolic Energy Turn over):</span></label></th><th><label>Timmar/dag</label></th></tr></thead><tbody><tr><td> `;

    codeStringNewPerson += `                <label for="${personObject.idMET1}">MET=1  ingen aktivitet (vila)</label></td> `;
    codeStringNewPerson += ` <td><input type="text" id="${personObject.idMET1}" name="${personObject.idMET1}" /></td></tr> `;

    codeStringNewPerson += `        <tr><td><label for="${personObject.idMET1_5}">MET=1,5  mycket lätt (rullstolsbunden)</label></td> `;
    codeStringNewPerson += ` <td><input type="text" id="${personObject.idMET1_5}" name="${personObject.idMET1_5}" /></td></tr> `;

    codeStringNewPerson += `        <tr><td><label for="${personObject.idMET2_5}">MET=2,5  lätt (matlagning)</label></td> `;
    codeStringNewPerson += ` <td><input type="text" id="${personObject.idMET2_5}" name="${personObject.idMET2_5}" /></td></tr>`;

    codeStringNewPerson += `        <tr><td><label for="${personObject.idMET5}">MET=5  moderat (trädgårdsarbete)</label></td> `;
    codeStringNewPerson += ` <td><input type="text" id="${personObject.idMET5}" name="${personObject.idMET5}" /></td></tr> `;

    codeStringNewPerson += `        <tr><td><label for="${personObject.idMET7}">MET=7  medelhård (badminton)</label></td> `;
    codeStringNewPerson += ` <td><input type="text" id="${personObject.idMET7}" name="${personObject.idMET7}" /></td></tr> `;

    codeStringNewPerson += `        <tr><td><label for="${personObject.idMET10}">MET=10  hård (löpning, 9,6km/h)</label></td> `;
    codeStringNewPerson += ` <td><input type="text" id="${personObject.idMET10}" name="${personObject.idMET10}" /></td></tr> `;

    codeStringNewPerson += `        <tr><td><label for="${personObject.idMET12}">MET=12  mycket hård (cykling, 30km/h)</label></td> `;
    codeStringNewPerson += ` <td><input type="text" id="${personObject.idMET12}" name="${personObject.idMET12}" /></td></tr> `;

    codeStringNewPerson += `        <tr><td><label for="${personObject.idMET16}">MET=16  stenhård (skidåkning, uppför)</label></td> `;
    codeStringNewPerson += ` <td><input type="text" id="${personObject.idMET16}" name="${personObject.idMET16}" /></td></tr></tbody></table> `;

    codeStringNewPerson += ` <label>PAL <span class="smallText">(Physical Activity Level)</span> `;
    codeStringNewPerson += `     <input type="text" id="${personObject.idPAL}"             name="${personObject.idPAL}" readonly /></label><label>Förbränning per dag `;
    codeStringNewPerson += `     <input type="text" id="${personObject.idKcalDailyActive}" name="${personObject.idKcalDailyActive}" readonly />kcal/dag</label></fieldset> `;

    return codeStringNewPerson;
}*/
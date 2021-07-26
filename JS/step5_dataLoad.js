/*jshint esversion: 6 */

// step5_onload.js


/*
----- INNEHÅLL i step5_onload.js -------

1. GET FROM LOCALSTORAGE AND SET peopleCount
    1.a GET form_waterDebit from LocalStorage
    1.b GET form_waterCredit from LocalStorage
    1.c SET waterCreditPeople_count
    1.d Set waterDebitSpend_cost


2. SET INPUTS
    2.a Set all text-input from object form_waterDebitFD in LocalStorage
    2.b Set radio-buttons
    2.c Set all text-input from object form_waterCreditFD in LocalStorage
    

3. FUNKTIONER
    3.a Funktionen: funcCheckRadioBoolean(form_FD, key)                                         i: step3_dataLoad.js, step5_dataLoad.js
    3.b Funktionen: funcResetExtraBoolElements(divIdHidden, eventBooleanValue, resetValue)      i: step3_events.js, step5_events.js, step3_dataLoad.js, step5_dataLoad.js

    3.c Funktionen: funcSetStoredTextInput(form_FD)          i: step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
    3.d Funktionen: funcSetPeopleCount(idInputPeopleCount)   i: step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
    3.g Funktionen: funcSetCost(costType)                    i: step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
*/





///////////////////////////////// 1. GET FROM LOCALSTORAGE AND SET-peopleCount/SET-Cost/SET-EL/SET-waterVolume /////////////////////////////////////////

// 1.a GET form_waterDebit from LocalStorage
var form_waterDebitFD = JSON.parse(window.localStorage.getItem('form_waterDebit'));

// 1.b GET form_waterCredit from LocalStorage
var form_waterCreditFD = JSON.parse(window.localStorage.getItem('form_waterCredit'));

// 1.c SET waterCreditPeople_count
funcSetPeopleCount("waterCreditPeople_count");

//1.d Set heatDebitSpend_cost
funcSetCost("water");

//1.e Set waterDebitEnergy
var form_elDebitFD = JSON.parse(window.localStorage.getItem('form_elDebit'));
if (form_elDebitFD) {
    funcSetInputFromOtherPage("elDebitSystem_waterPumpSystem", "waterDebitEnergy_waterPumpEl", form_elDebitFD);


} else {

}



//1.f Set waterVolume
var form_heatCreditFD = JSON.parse(window.localStorage.getItem('form_heatCredit'));
// console.log(form_heatCreditFD["heatCreditDish_literPersonDaily"]);
funcSetInputFromOtherPage("heatCreditShower_literPersonDaily", "waterCreditShower_literPersonDaily", form_heatCreditFD);
funcSetInputFromOtherPage("heatCreditDish_literPersonDaily", "waterCreditDish_literPersonDaily", form_heatCreditFD);
funcSetInputFromOtherPage("heatCreditWash_literPersonWeekly", "waterCreditWash_literPersonWeekly", form_heatCreditFD);
funcSetInputFromOtherPage("heatCreditOther_literWeekly", "waterCreditOtherHot_literWeekly", form_heatCreditFD);


/////////////////////////////////// 2. SET INPUT ////////////////////////////////////////////



if (form_waterDebitFD && form_waterCreditFD) {

    // 2.a Set all text-input from object form_waterDebitFD in LocalStorage
    funcSetStoredTextInput(form_waterDebitFD);

    // console.log(  form_waterDebitFD["waterDebitOther_free"] ,  "skrivsatt1" );
    // console.log(form_waterDebitFD.waterDebitOther_free, "skrivsatt2");

    // 2.b Set radio-buttons
    let divIdHidden = "waterDebitOther_extra";
    let resetValue = "false";
    let valueAccess = funcCheckRadioBoolean(form_waterDebitFD, "waterDebitOther_access");
    console.log("valueAccess", valueAccess);
    funcResetExtraBoolElements(divIdHidden, valueAccess, resetValue);
    funcShowOnlyWhenChecked("waterDebitOther_access" + "True", "waterDebitOther_labelDrinkable");
    funcShowOnlyWhenChecked("waterDebitOther_access" + "False", "waterDebitOther_labelUnDrinkable");
    funcShowOnlyWhenChecked("waterDebitOther_access" + "True", "waterDebitPump_labelDrinkable");
    funcShowOnlyWhenChecked("waterDebitOther_access" + "False", "waterDebitPump_labelUnDrinkable");
    funcShowOnlyWhenChecked("waterDebitOther_access" + "False", "waterDebitOther_divNoPump");


    let valueDrinkable = funcCheckRadioBoolean(form_waterDebitFD, "waterDebitOther_drinkable");
    console.log("valueDrinkable", valueDrinkable);
    funcShowOnlyWhenChecked("waterDebitOther_drinkable" + "True", "waterDebitOther_labelDrinkable");
    funcShowOnlyWhenChecked("waterDebitOther_drinkable" + "False", "waterDebitOther_labelUnDrinkable");
    funcShowOnlyWhenChecked("waterDebitOther_drinkable" + "True", "waterDebitPump_labelDrinkable");
    funcShowOnlyWhenChecked("waterDebitOther_drinkable" + "False", "waterDebitPump_labelUnDrinkable");

    // funcHideSelectedFieldsetUnitByBoolElement("waterDebitOther_drinkable", valueDrinkable);

    // check radio from local-storage
    let valuePump = funcCheckRadioBoolean(form_waterDebitFD, "waterDebitOther_pump");
    // disable radio if source is disabled
    funcDisableTargetElementIfSourceDissabled("waterPump_systemUnit", "waterDebitEnergy_waterPumpEl");
   

    // reset radio if disabled
    valuePump = funcResetBoolRadioWhenDisabled("waterDebitOther_pumpTrue", "False");


    console.log("valuePump", valuePump);
    // hide fieldset if ends same IdName as value
    funcHideSelectedFieldsetUnitByBoolElement("waterDebitOther_pump", valuePump);
    // show inputs under pump only when pump-false
    funcShowOnlyWhenChecked("waterDebitOther_pump" + "False", "waterDebitOther_divNoPump");



    // 2.c Set all text-input from object form_waterCreditFD in LocalStorage
    funcSetStoredTextInput(form_waterCreditFD);

}

// funcDisableTargetElementFromSource("waterDebitOther_pumpTrue", "waterDebitEnergy_waterPumpEl"); 


///////////// 3. FUNKTIONER //////////////////////////////


function funcDisableTargetElementIfSourceDissabled(targetElement, sourceElementId) {
    let targetElementNodeList = document.querySelectorAll(`#${targetElement},.${targetElement}`);
    let sourceElementDOM = document.getElementById(sourceElementId);
    // console.log("targetElementNodeList", targetElementNodeList);

    targetElementNodeList.forEach(targetElementDOM => {
        if (sourceElementDOM.value === " - ") {
            // console.log(targetElementDOM.value);
            if (targetElementDOM.getAttribute("type") === "radio") {
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



// waterDebitOther_pump
// waterDebitOther_pumpTrue

function funcResetBoolRadioWhenDisabled(trigRadioId, resetValue) {
    let trigRadioDOM = document.getElementById(trigRadioId);
    let radioName = trigRadioDOM.getAttribute("name");
    let radioResetId = radioName + resetValue;
    let radioResetDOM = document.getElementById(radioResetId);

    console.log(trigRadioDOM, trigRadioDOM.disabled, trigRadioDOM.checked);

    if (trigRadioDOM.disabled === true ) {  //&& trigRadioDOM.checked
        radioResetDOM.checked = true;
        return radioResetDOM.value;
        
    } else if (trigRadioDOM.checked === true ) {
        return trigRadioDOM.value;
        
    } else {
        return radioResetDOM.value;
    }
}



// 3.a Funktionen: exakt samma som i step3_dataLoad.js
function funcCheckRadioBoolean(form_FD, key) {
    let value = form_FD[key];
    let idKey = key + value.toString().replace(/^./, value[0].toUpperCase());
    // console.log("idKey: ", idKey, typeof idKey);
    document.getElementById(idKey).checked = true;

    return value;
}



// 3.b Funktionen: exakt samma i step3_events.js, step5_events.js, step3_dataLoad.js, step5_dataLoad.js
function funcResetExtraBoolElements(divIdHidden, eventBooleanValue, resetValue) {

    let divHiddenDOM = document.getElementById(divIdHidden);

    if (divHiddenDOM) {
        if (eventBooleanValue === "false") {
            divHiddenDOM.style.display = "none";
            let inputBoolListDOM = divHiddenDOM.querySelectorAll(`input[value= ${resetValue} ]`);

            for (let inputRadio of inputBoolListDOM) {
                inputRadio.checked = true;
            }
        } else if (eventBooleanValue === "true") {
            divHiddenDOM.style.display = "block";
        }
    }
}



// 3.c Funktionen: exakt samma i step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetStoredTextInput(form_FD) {
    if (form_FD) {
        let inputDOM;

        for (let [key, value] of Object.entries(form_FD)) {

            inputDOM = document.getElementById(key);

            if (inputDOM && inputDOM.getAttribute("type") === "text" && inputDOM.readOnly === false) {
                console.log(key, value);
                inputDOM.value = value;
            }
        }
    }
}



// 3.d Funktionen: exakt samma i step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetPeopleCount(idInputPeopleCount) {

    var form_moneyCreditFD = JSON.parse(window.localStorage.getItem('form_moneyCredit'));
    if (form_moneyCreditFD) {
        document.getElementById(idInputPeopleCount).value = form_moneyCreditFD.moneyCreditPeople_count;
    } else {
        document.getElementById(idInputPeopleCount).value = 1;
    }
}


// 3.e Funktionen: exakt samma i step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetCost(costType) {
    var form_moneyCreditFD = JSON.parse(window.localStorage.getItem('form_moneyCredit'));
    let idInputCost = costType + "DebitSpend_cost";
    let inputCostDOM = document.getElementById(idInputCost);
    let idStoredCost = "moneyCreditSpend_" + costType + "Money";
    console.log(idStoredCost);

    if (!form_moneyCreditFD) {
        inputCostDOM.value = 0;
    } else if (form_moneyCreditFD[idStoredCost] === " - ") {
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

    } else if (form_FD[sourceId] === " - ") {
        targetDOM.value = " - ";
    } else if (isNaN(parseFloat(form_FD[sourceId]))) {
        // console.log(form_FD[sourceId]);
        targetDOM.value = 0;
    } else {
        targetDOM.value = form_FD[sourceId];
    }

}



function funcHideSelectedFieldsetUnitByBoolElement(RadioName, eventBooleanValue) {
    let unitType = RadioName.split("_").pop();
    unitType = unitType[0].toUpperCase() + unitType.slice(1);
    let hiddenFieldsetDOM = document.querySelector(`fieldset[id$="${unitType}"]`);

    console.log(hiddenFieldsetDOM, unitType, eventBooleanValue);

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

function funcShowOnlyWhenChecked(checkerId, displayElementId) {
    let checkerDOM = document.getElementById(checkerId);
    let eventBooleanValue = checkerDOM.checked;

    let displayElementDOM = document.getElementById(displayElementId);
    // console.log(eventBooleanValue, displayElementDOM);

    // let testPump = document.getElementById("waterDebitPump_divNoPump" );
    // testPump.style.display = "none";

    if (eventBooleanValue == true) {
        displayElementDOM.style.display = "block";
        // waterDebitPump_divNoPump.style.display = "block";
    } else {
        displayElementDOM.style.display = "none";
        // waterDebitPump_divNoPump.style.display = "none";
    }
}



////// GAMMALT///////////////////

// waterCreditShower_literPersonDaily
// waterCreditDish_literPersonDaily
// waterCreditWash_literPersonWeekly
// waterCreditOther_literWeeklyHot

// heatCreditShower_literPersonDaily
// heatCreditDish_literPersonDaily
// heatCreditWash_literPersonWeekly
// heatCreditOther_literWeekly

//     if (form_heatCreditFD) {
//         document.getElementById("waterCreditShower_literPersonDay").value =  (form_heatCreditFD.heatCreditShower_volumeDailyPeople);
//         document.getElementById("waterCreditDish_literDaily").value =  (form_heatCreditFD.heatCreditDish_volumeDailyPeople);
//         document.getElementById("waterCreditWash_literWeekly").value =  (form_heatCreditFD.heatCreditWash_volumeWeeklyPeople);
//         document.getElementById("waterCreditOther_literWeeklyHot").value = (form_heatCreditFD.heatCreditOther_volumeWeekly);

//     } else {
//         document.getElementById("waterCreditShower_literPersonDay").value =  25;
//         document.getElementById("waterCreditDish_literDaily").value =  2;
//         document.getElementById("waterCreditWash_literWeekly").value =  20;
//         document.getElementById("waterCreditOther_literWeeklyHot").value =  0;
//     }
// }


/*
    for (let [key, value] of Object.entries(form_waterDebitFD)) {
        inputDOM = document.getElementById(key);
        console.log(key);

        //satt alla text-inputs
        if (inputDOM) { //&& inputDOM.getAttribute("type")==="text"

            if (inputDOM.readOnly === false) {
                console.log(key, value);
                inputDOM.value = value;
            }
        }

    }
    */

/*
for (let [key, value] of Object.entries(form_waterCreditFD)) {

    inputDOM = document.getElementById(key);
    if (inputDOM.readOnly === false) {
        console.log(key, value);
        inputDOM.value = value;
    }
}
*/

// function funcDisableTargetElementFromSource(targetElementId, sourceElementId ){
//     let targetElementDOM = document.getElementById(targetElementId);
//     let sourceElementDOM = document.getElementById(sourceElementId);

//     if (sourceElementDOM.value == "0"){
//         targetElementDOM.disable = true;
//     } else {
//         targetElementDOM.disable = false;
//     }
// }
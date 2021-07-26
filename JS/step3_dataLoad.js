/*jshint esversion: 6 */

// step3_onload.js
// import {
//     funcSetInputFromLocalStorage
// } from './functions.js';


/*
----- INNEHÅLL i step3_onload.js -------

1. GET FROM LOCALSTORAGE AND SET peopleCount
    1.a GET form_heatDebit from LocalStorage
    1.b GET form_heatCredit from LocalStorage
    1.c SET heatCreditShower_peopleCount
    1.d Set heatDebitSpend_cost

2. SET INPUTS
    2.a Set radio System1
    2.b Set radio add-system2
    2.c Set radio System2

    2.d Set all text-input from object form_heatDebitFD in LocalStorage
    2.e Set all text-input from object form_heatCreditFD in LocalStorage

3. FUNKTIONER
    3.a Funktionen: funcSetHeatSource(form_FD, key) 
    3.b Funktionen: funcShowSelectedFieldsetHeatSource(systemNr, value)                         i: step3_dataLoad.js, step3_events.js
    3.c Funktionen: funcCheckRadioBoolean(form_FD, key)                                         i: step3_dataLoad.js, step5_dataLoad.js
    3.d Funktionen: funcResetExtraBoolElements(divIdHidden, eventBooleanValue, resetValue)      i: step3_events.js, step5_events.js, step3_dataLoad.js, step5_dataLoad.js

    3.e Funktionen: funcSetStoredTextInput(form_FD)           i: step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
    3.f Funktionen: funcSetPeopleCount(idInputPeopleCount)    i: step3_dataLoad.js, step4_dataLoad.js, 1step5_dataLoad.js
    3.g Funktionen: funcSetCost(costType)                     i: step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
    */




///////////////////////// 1. GET FROM LOCALSTORAGE AND SET peopleCount ////////////////////////////////////////

// 1.a GET form_heatDebit from LocalStorage
var form_heatDebitFD = JSON.parse(window.localStorage.getItem('form_heatDebit'));

// 1.b GET form_heatCredit from LocalStorage
var form_heatCreditFD = JSON.parse(window.localStorage.getItem('form_heatCredit'));

// 1.c SET heatCreditPeople_count
funcSetPeopleCount("heatCreditPeople_count");

//1.d Set heatDebitSpend_cost
funcSetCost("heat");


//1.e Set heatingEl
var form_elDebitFD = JSON.parse(window.localStorage.getItem('form_elDebit'));
// console.log(form_heatCreditFD["heatCreditDish_literPersonDaily"]);
if (form_elDebitFD) {
    funcSetInputFromOtherPage("elDebitSystem_circulationPumpSystem", "heatDebitEnergy_circulationPumpEl", form_elDebitFD);
    funcSetInputFromOtherPage("elDebitSystem_elHeaterSystem", "heatDebitEnergy_elHeaterEl", form_elDebitFD);
} else {

}



/////////////////////////////// 2. SET INPUTS ///////////////////////////////////////////////

// console.log(form_heatDebitFD["heatDebitSystem1"] , "objekt");


funcDisableTargetElementIfSourceDissabled("heatDebitSystem1_District", "heatDebitEnergy_circulationPumpEl");
funcDisableTargetElementIfSourceDissabled("heatDebitSystem1_Gas",      "heatDebitEnergy_circulationPumpEl");
funcDisableTargetElementIfSourceDissabled("heatDebitSystem1_Pellets",  "heatDebitEnergy_circulationPumpEl");
funcDisableTargetElementIfSourceDissabled("heatDebitSystem1_Oil",      "heatDebitEnergy_circulationPumpEl");
funcDisableTargetElementIfSourceDissabled("heatDebitSystem1_El",       "heatDebitEnergy_circulationPumpEl");
funcDisableTargetElementIfSourceDissabled("heatDebitSystem1_Sun",      "heatDebitEnergy_circulationPumpEl");

funcDisableTargetElementIfSourceDissabled("heatDebitSystem1_El",       "heatDebitEnergy_elHeaterEl");
funcDisableTargetElementIfSourceDissabled("heatDebitSystem2_El2",      "heatDebitEnergy_elHeaterEl");
funcDisableTargetElementIfSourceDissabled("heatDebitSystem2_El3",      "heatDebitEnergy_elHeaterEl");



if (form_heatDebitFD && form_heatCreditFD) {

    // 2.a Set radio System1
    funcSetHeatSource(form_heatDebitFD, "heatDebitSystem1");


    // 2.b Set radio add-system2
    let divIdHidden = "div_heatDebitSystem2";
    let resetValue = "none";
    let value = funcCheckRadioBoolean(form_heatDebitFD, "heatDebitSystem2_add");
    funcResetExtraBoolElements(divIdHidden, value, resetValue);


    // 2.c Set radio System2
    funcSetHeatSource(form_heatDebitFD, "heatDebitSystem2");


    // 2.d Set all text-input from object form_heatDebitFD in LocalStorage
    funcSetStoredTextInput(form_heatDebitFD);

    // 2.e Set all text-input from object form_heatCreditFD in LocalStorage
    funcSetStoredTextInput(form_heatCreditFD);

}



////////////////////// 3. FUNKTIONER ////////////////////


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



// 3.a Funktionen
function funcSetHeatSource(form_FD, key) {
    let value = form_FD[key];

    if (!value){
        value= "none";
    }

    let idKey = key + "_" + value;
    console.log("Heat Source: ", idKey);
    let elementDOM = document.getElementById(idKey);

    if (elementDOM.disabled === true) {
        value = "none";
        idKey = key + "_" + value;
        elementDOM = document.getElementById(idKey);
    }
    elementDOM.checked = true;
    let systemNr = key.charAt(key.length - 1);
    funcShowSelectedFieldsetHeatSource(systemNr, value);
}



// 3.b Funktionen: exakt samma som i step3_events.js
function funcShowSelectedFieldsetHeatSource(systemNr, value) {

    //hitta nodlista med alla fielsets
    let nodeListDOM;
    if (systemNr === "1") {
        nodeListDOM = document.querySelectorAll("fieldset.primaryHeatSource");
    } else if (systemNr === "2") {
        nodeListDOM = document.querySelectorAll("fieldset.secondaryHeatSource");
    } else {
        return;
    }
    // console.log(systemNr);

    // hide all in fieldsets/source of current system
    for (let fieldsetDOM of nodeListDOM) {
        fieldsetDOM.style.display = "none";
    }

    // hide heading or show fieldsetsource
    let headingDOM = nodeListDOM[0].previousElementSibling;
    if (value === "none") {
        headingDOM.style.display = "none";
    } else {
        headingDOM.style.display = "block";
        let fieldsetId = "fieldset_heatDebit" + value;
        let fieldsetDOM = document.getElementById(fieldsetId);
        fieldsetDOM.style.display = "block";
    }
}






// 3.c Funktionen: exakt samma som i step5_dataLoad.js
function funcCheckRadioBoolean(form_FD, key) {
    let value = form_FD[key];
    let idKey = key + value.toString().replace(/^./, value[0].toUpperCase());
    // console.log("idKey: ", idKey, typeof idKey);
    document.getElementById(idKey).checked = true;

    return value;
}





// 3.d Funktionen: exakt samma i step3_events.js, step5_events.js, step3_dataLoad.js, step5_dataLoad.js
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



// 3.e Funktionen: exakt samma i step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
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



// 3.f Funktionen: exakt samma i step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetPeopleCount(idInputPeopleCount) {

    var form_moneyCreditFD = JSON.parse(window.localStorage.getItem('form_moneyCredit'));
    if (form_moneyCreditFD) {
        document.getElementById(idInputPeopleCount).value = form_moneyCreditFD.moneyCreditPeople_count;
    } else {
        document.getElementById(idInputPeopleCount).value = 1;
    }
}


// 3.g Funktionen: exakt samma i step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetCost(costType) {
    var form_moneyCreditFD = JSON.parse(window.localStorage.getItem('form_moneyCredit'));
    let idInputCost = costType + "DebitSpend_cost";
    let inputCostDOM = document.getElementById(idInputCost);
    let idStoredCost = "moneyCreditSpend_" + costType + "Money";
    // console.log(idStoredCost);

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


//3.h  Funktionen:
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



////// GAMMALT///////////////////


//
/*
function funcDisableTargetElementIfSourceDissabled(targetElement, sourceElementId) {
    let targetElementNodeList = document.querySelectorAll(`[id = "${targetElement}"],[class = "${targetElement}"]`);
    let sourceElementDOM = document.getElementById(sourceElementId);
    // console.log(targetElementNodeList);
    targetElementNodeList.forEach(targetElementDOM => {

        if (sourceElementDOM.value === " - " ) {  //|| targetElementDOM.disabled === true
            // console.log(targetElementDOM.value);
            // targetElementDOM.value = " - ";
            targetElementDOM.disabled = true;
            // console.log(targetElementDOM.value);
            // if (targetElementDOM.getAttribute("type") === "text") {
            //     targetElementDOM.parentElement.style.color = "rgba(46, 45, 45, 0.897)";
            //     targetElementDOM.parentElement.firstElementChild.style.textDecorationLine = "line-through";
            // }
            // imgDOM.style.display = "none";
        } else {
            targetElementDOM.disabled = false;
        }
    });

    // if (targetElementDOM.checked === true) {
    //     let targetElementName = targetElementId.split("_").shift;
    //     let targetElementNoneValueId = targetElementName + "_none";
    //     document.getElementById(targetElementNoneValueId).checked = true;
    // }

    // console.log(targetElementDOM.disable);
}
*/




// function HideOrShowRadioDiv(divIdHidden, value){
//     if (value === false ){
//         //  console.log("gom", typeof form_heatDebitFD.heatDebitSystem2_add );
//         divIdHidden.style.display= "none";
//     } else if (value === true) {
//         divIdHidden.style.display= "block";
//     }

// }



// //radio System2_add
// (function(form_FD, key){ 
//     let varValue = form_FD[key];
//     let idKey = key.split("_").shift() + "_" + varValue;
//     // console.log("_add: ", idKey);
//     document.getElementById(idKey).checked = true;
// })(form_heatDebitFD,"heatDebitSystem2_add");


/*
    let inputDOM;

    // set all text-input from object form_heatDebitFD in LocalStorage
    for (let [key, value] of Object.entries(form_heatDebitFD)) {
        inputDOM = document.getElementById(key);
        // console.log(key, value);

        //satt alla text-inputs
        if (inputDOM && inputDOM.getAttribute("type")==="text" && inputDOM.readOnly === false) {
                // console.log(key, value);
                inputDOM.value = value;
        }
    }


    // set all text-input from object form_heatCreditFD in LocalStorage
    for (let [key, value] of Object.entries(form_heatCreditFD)) {
        // console.log(key, value);
        inputDOM = document.getElementById(key);

        if (inputDOM.readOnly === false) {
            // console.log(key, value);
            inputDOM.value = value;
        }
    }
*/

//condition for hiding radio-system2
// if (form_heatDebitFD["heatDebitSystem2_add"] === "false" ){
//     //  console.log("gom", typeof form_heatDebitFD.heatDebitSystem2_add );
//     document.getElementById("div_heatDebitSystem2").style.display= "none";
// }
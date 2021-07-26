/*jshint esversion: 6 */



////////////// 1. GLOBALT //////////////////

var formDebitDOM = document.getElementById("form_waterDebit");
var formCreditDOM = document.getElementById("form_waterCredit");



/////////////// 2. EVENTLISTENER //////////////////

// EV-a Skriv ut summan vid pageload
document.addEventListener("DOMContentLoaded", function () {

    funcSetTwoCostsFromTotal("waterDebitSpend_cost",          "waterDebitSpend_costTap",     "waterDebitSpend_costBottle", 0);
    funcSetEachUnitFromSource("waterDebitSpend_costTap",      "waterDebitTap_unitCost",      "form_waterDebit", 0);
    funcSetEachUnitFromSource("waterDebitSpend_costBottle",   "waterDebitBottle_unitCost",   "form_waterDebit", 0);
    funcSetEachUnitFromSource("waterDebitEnergy_waterPumpEl", "waterDebitPump_unitEl",       "form_waterDebit", 0);
    funcSetVolumefromVariableCost("Tap");
    funcSetVolumefromVariableCost("Bottle");

    funcSumAllPartialResults("_literMonthlyDrinkable", "waterDebitTotal_literMonthlyDrinkable", "form_waterDebit", 0);
    funcSumAllPartialResults("_literMonthly",          "waterDebitTotal_literMonthly",          "form_waterDebit", 0);
    funcSumAllPartialResults("_literStorage",          "waterDebitTotal_literStorage",          "form_waterDebit", 0);
    funcSumAllPartialResults("_unitCost",              "waterDebitSpend_sumUnitCost",           "form_waterDebit", 0);
    funcSumAllPartialResults("unitEl",                 "waterDebitEnergy_sumUnitEl",            "form_waterDebit", 3);
    funcSetTotalDailyFromMonthly("form_waterDebit");
    

    funcSetAllWaterVolumes();
    funcSumAllPartialResults("_literMonthlyDrinkable", "waterCreditTotal_literMonthlyDrinkable", "form_waterCredit", 0);
    funcSumAllPartialResults("_literMonthly",          "waterCreditTotal_literMonthly",          "form_waterCredit", 0);
    funcSetTotalDailyFromMonthly("form_waterCredit");
});



//EV-b Skriv ut Debit summan vid tangenttryck
formDebitDOM.addEventListener("keyup", function (event) {
    
    funcSetTwoCostsFromTotal("waterDebitSpend_cost",         "waterDebitSpend_costTap",       "waterDebitSpend_costBottle", 0, event);
    funcSetEachUnitFromSource("waterDebitSpend_costTap",      "waterDebitTap_unitCost",        "form_waterDebit", 0);
    funcSetEachUnitFromSource("waterDebitSpend_costBottle",   "waterDebitBottle_unitCost",     "form_waterDebit", 0);
    funcSetEachUnitFromSource("waterDebitEnergy_waterPumpEl", "waterDebitPump_unitEl",         "form_waterDebit", 0);
    funcSetVolumefromVariableCost("Tap");
    funcSetVolumefromVariableCost("Bottle");

    funcSumAllPartialResults("_literMonthlyDrinkable", "waterDebitTotal_literMonthlyDrinkable", "form_waterDebit", 0);
    funcSumAllPartialResults("_literMonthly",          "waterDebitTotal_literMonthly",          "form_waterDebit", 0);
    funcSumAllPartialResults("_literStorage",          "waterDebitTotal_literStorage",          "form_waterDebit", 0);
    funcSumAllPartialResults("_unitCost",              "waterDebitSpend_sumUnitCost",           "form_waterDebit", 0);
    funcSumAllPartialResults("unitEl",                 "waterDebitEnergy_sumUnitEl",            "form_waterDebit", 3);
    funcSetTotalDailyFromMonthly("form_waterDebit");
});


//EV-d Skriv ut Debit summan vid focusout
formDebitDOM.addEventListener("focusout", function (event) {
    funcSetTwoCostsFromTotal("waterDebitSpend_cost",         "waterDebitSpend_costTap",       "waterDebitSpend_costBottle", 0, event);
    funcSetEachUnitFromSource("waterDebitSpend_costTap",      "waterDebitTap_unitCost",         "form_waterDebit", 0);
    funcSetEachUnitFromSource("waterDebitSpend_costBottle",   "waterDebitBottle_unitCost",      "form_waterDebit", 0);
    funcSetEachUnitFromSource("waterDebitEnergy_waterPumpEl", "waterDebitPump_unitEl",        "form_waterDebit", 0);

    funcSetVolumefromVariableCost("Tap");
    funcSetVolumefromVariableCost("Bottle");

    funcSumAllPartialResults("_literMonthlyDrinkable", "waterDebitTotal_literMonthlyDrinkable", "form_waterDebit", 0);
    funcSumAllPartialResults("_literMonthly",          "waterDebitTotal_literMonthly",          "form_waterDebit", 0);
    funcSumAllPartialResults("_literStorage",          "waterDebitTotal_literStorage",          "form_waterDebit", 0);
    funcSumAllPartialResults("_unitCost",              "waterDebitSpend_sumUnitCost",           "form_waterDebit", 0);
    funcSumAllPartialResults("unitEl",                 "waterDebitEnergy_sumUnitEl",            "form_waterDebit", 3);
    funcSetTotalDailyFromMonthly("form_waterDebit");
});


//EV-e Skriv ut Debit summan vid musclick
formDebitDOM.addEventListener("click", function () {
    funcSetEachUnitFromSource("waterDebitSpend_costTap",      "waterDebitTap_unitCost",         "form_waterDebit", 0);
    funcSetEachUnitFromSource("waterDebitSpend_costBottle",   "waterDebitBottle_unitCost",      "form_waterDebit", 0);
    funcSetEachUnitFromSource("waterDebitEnergy_waterPumpEl", "waterDebitPump_unitEl",        "form_waterDebit", 0);
    funcSetVolumefromVariableCost("Tap");
    funcSetVolumefromVariableCost("Bottle");

    funcSumAllPartialResults("_literMonthlyDrinkable", "waterDebitTotal_literMonthlyDrinkable", "form_waterDebit", 0);
    funcSumAllPartialResults("_literMonthly",          "waterDebitTotal_literMonthly",          "form_waterDebit", 0);
    funcSumAllPartialResults("_literStorage",          "waterDebitTotal_literStorage",          "form_waterDebit", 0);
    funcSumAllPartialResults("_unitCost",              "waterDebitSpend_sumUnitCost",           "form_waterDebit", 0);
    funcSumAllPartialResults("unitEl",                 "waterDebitEnergy_sumUnitEl",            "form_waterDebit", 3);
    funcSetTotalDailyFromMonthly("form_waterDebit");
});


//EV-c Skriv ut Credit summan vid tangenttryck
formCreditDOM.addEventListener("keyup", function (event) {
    funcSetAllWaterVolumes();
    funcSumAllPartialResults("_literMonthlyDrinkable", "waterCreditTotal_literMonthlyDrinkable", "form_waterCredit", 0);
    funcSumAllPartialResults("_literMonthly",          "waterCreditTotal_literMonthly",          "form_waterCredit", 0);
    funcSetTotalDailyFromMonthly("form_waterCredit");
});



/////////////// 3. FUNKTIONER //////////////////

function funcSetTwoCostsFromTotal(sumCostId, cost1Id, cost2Id, nrOfDecimals, event){
    let cost1DOM = document.getElementById(cost1Id);
    let cost2DOM = document.getElementById(cost2Id);
    let sumCostDOM = document.getElementById(sumCostId);
    
    if(sumCostDOM.value === " - " || isNaN(parseFloat(sumCostDOM.value) )  ){
        return;
        
    } else if ( cost1DOM.value === " - " && cost1DOM.readOnly === true   ){
        cost2DOM.value = sumCostDOM.value;
        cost2DOM.readOnly = true;

    } else if (cost2DOM.value === " - " && cost2DOM.readOnly === true)  {
        cost1DOM.value = sumCostDOM.value;
        cost1DOM.readOnly = true;

    } else if ( parseFloat(cost1DOM.value)>parseFloat(sumCostDOM.value) || parseFloat(cost2DOM.value)>parseFloat(sumCostDOM.value)){
         //do nothing

    } else if (!event && cost1DOM.value === ""){
        cost2DOM.value =  sumCostDOM.value;

    } else if (!event && cost2DOM.value === ""){
        cost2DOM.value =  sumCostDOM.value;

    } else if (!event){
        let value2 = parseFloat(sumCostDOM.value) -  parseFloat(cost1DOM.value);
        cost2DOM.value = funcReturnStringifiedNr(value2, nrOfDecimals);

    } else if (event.target === cost1DOM && cost1DOM.value === ""){
        cost2DOM.value = sumCostDOM.value;

    } else if (event.target === cost2DOM && cost2DOM.value === ""){
        cost1DOM.value = sumCostDOM.value;

    } else if (event.target === cost1DOM ){
        let value2 = parseFloat(sumCostDOM.value) -  parseFloat(cost1DOM.value);
        cost2DOM.value = funcReturnStringifiedNr(value2, nrOfDecimals);

    } else if (event.target === cost2DOM ) {
        let value1 = parseFloat(sumCostDOM.value) -  parseFloat(cost2DOM.value);
        cost1DOM.value = funcReturnStringifiedNr(value1, nrOfDecimals);
    }
}








function funcSetTotalDailyFromMonthly(formId){
    let formDOM = document.getElementById(formId);
    let fieldsetDOM = formDOM.querySelector('fieldset[id$="Total"]');
    let inputDailyNodeList = fieldsetDOM.querySelectorAll('input[id*="Daily"]');
    let inputMonthlyNodeList = fieldsetDOM.querySelectorAll('input[id*="Monthly"]');

    if(inputDailyNodeList.lenght === inputMonthlyNodeList.lenght){
        for (let i = 0; i < inputDailyNodeList.length; i++) {
            inputDailyNodeList[i].value = funcMultiplyAllNrsOfArray([inputMonthlyNodeList[i].value, 0.0333], 0);
        }
    }
}



function funcSetVolumefromVariableCost(suffixSource) {
    let fieldsetDOM = document.querySelector(`fieldset[id$="${suffixSource}"]`);
    let literMonthlyDOM = fieldsetDOM.querySelector(`input[type="text"][id*="_literMonthlyDrinkable"]`);
    let monthlyCostDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_unitCost"]`);

    let fixedCostDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_fixedCost"]`);
    let variableCostDOM = fieldsetDOM.querySelector(`input[type="text"][id$="VariableCost"]`);

    // console.log(parseFloat(fixedCostDOM.value ));
    console.log("hej");
    if (monthlyCostDOM.value === " - " ) {
        console.log("hej");
        return;
        
    }

    let MonthlyMinusFixedValue = monthlyCostDOM.value;
    if(fixedCostDOM && !isNaN(parseFloat(fixedCostDOM.value))  ){
        MonthlyMinusFixedValue = parseFloat(monthlyCostDOM.value) -  parseFloat(fixedCostDOM.value );
        if (MonthlyMinusFixedValue<0){
            literMonthlyDOM.value="error";
            monthlyCostDOM.value = "error";
            return;
        }
    }

    // console.log(variableCostDOM);
    let inverseVariableCostValue;
    if (parseFloat(variableCostDOM.value) > 0 ) {
        inverseVariableCostValue= 1 / parseFloat(variableCostDOM.value);
    } else if (variableCostDOM.value === "" ) {
        literMonthlyDOM.value="";
        monthlyCostDOM.value = "";
        return;
    } else {
        literMonthlyDOM.value="error";
        monthlyCostDOM.value = "error";
        return;
    }

    let factorValueArray=[MonthlyMinusFixedValue, inverseVariableCostValue];

    //korrigera for dagar
    // factorValueArray.push(0.03333);
    
    //korrigera for m3 
    if( variableCostDOM.id.endsWith("m3VariableCost") ){
        factorValueArray.push("1000");
        // console.log();
    }

    // console.log(factorValueArray);
    literMonthlyDOM.value = funcMultiplyAllNrsOfArray(factorValueArray, 0);
}




//  3.x Funktionen: exakt samma i step1_calculate.js, step2_calculate.js, step3_calculate.js, step4_calculate.js, step5_calculate.js
function funcSumAllPartialResults(suffix, idSumma, formId, nrOfDecimals) {
    let formDOM = document.getElementById(formId);
    let suffixInputListDOM = formDOM.querySelectorAll(`input[type="text"][id$="${suffix}"]:not([id*="Total"]):not([id="${idSumma}"])`); 
    let summaInputTotalDOM = formDOM.querySelector(`input[type="text"][id="${idSumma}"], input[type="hidden"][id="${idSumma}"] `);
    // console.log(summaInputTotalDOM.value, summaInputTotalDOM);

    if(summaInputTotalDOM.value !== " - "){
        summaInputTotalDOM.value = funcSumAllElementsInArray(suffixInputListDOM, nrOfDecimals);
        funcCorrectNrOfDecimals(summaInputTotalDOM, nrOfDecimals);
    }
}



//  3.c Funktionen:
function funcSumAllElementsInArray(Array, nrOfDecimals) {
    let sum = 0;
    for (let i = 0; i < Array.length; i++) {
        let value = parseFloat(Array[i].value);
        let displayElement = window.getComputedStyle(Array[i]).getPropertyValue("display");
        let displayParent = window.getComputedStyle(Array[i].parentElement).getPropertyValue("display");
        let displayGrandParent = window.getComputedStyle(Array[i].parentElement.parentElement).getPropertyValue("display");

        // console.log(Array[i], display );

        if (!isNaN(value) && displayElement !== "none" && displayParent !== "none" && displayGrandParent !== "none" ) {  
            // console.log(Array[i].parentElement.parentElement );
            sum += value;
        }
    }
    sum = funcReturnStringifiedNr(sum, nrOfDecimals);
    return sum;
}



function funcReturnStringifiedNr(newNr, nrOfDecimals) {
    newNr=parseFloat(newNr);
    // console.log(typeof newNr);
    if (Math.floor(newNr) !== newNr) {
        newNr = newNr.toFixed(nrOfDecimals);
    } else {
        newNr = newNr.toFixed(0);
    }
    return newNr;
}




function funcCorrectNrOfDecimals(element, nrOfDecimals) {
    
    if (element.tagName === "INPUT" && !isNaN(element.value) && element.value !== "" && element.getAttribute("type") == "text")  {  
        
        if (Math.floor(parseFloat(element.value)) !== parseFloat(element.value)   ) { 
            element.value = parseFloat(element.value).toFixed(nrOfDecimals);
        }
    }
}


function funcSetAllWaterVolumes(){

    funcSetFieldsetVolume("fieldset_waterCreditDrink");
    funcSetFieldsetVolume("fieldset_waterCreditCook");
    funcSetFieldsetVolume("fieldset_waterCreditWC");
    funcSetFieldsetVolume("fieldset_waterCreditShower");
    funcSetFieldsetVolume("fieldset_waterCreditDish");
    funcSetFieldsetVolume("fieldset_waterCreditWash");
    funcSetFieldsetVolume("fieldset_waterCreditOtherHot");
    funcSetFieldsetVolume("fieldset_waterCreditOtherCold");
}


function funcSetFieldsetVolume(fieldsetId){
    let fieldsetDOM = document.getElementById(fieldsetId);
    let literMonthlyDOM = fieldsetDOM.querySelector('input[type="text"][id*="_literMonthly"]');

    let partVolumeDOM = fieldsetDOM.querySelector('input[type="text"]:not([id*="_literMonthly"])');
    let keyWord = partVolumeDOM.id.split("_").pop();
    let personDOM = document.getElementById("waterCreditPeople_count"); 


    switch (keyWord) {
        case "literPersonDaily":
            literMonthlyDOM.value = funcMultiplyAllNrsOfArray([partVolumeDOM.value, personDOM.value, 30], 0);
            break;

        case "literDaily":
            literMonthlyDOM.value = funcMultiplyAllNrsOfArray([partVolumeDOM.value, 30], 0);
            break;

        case "literPersonWeekly":
            literMonthlyDOM.value = funcMultiplyAllNrsOfArray([partVolumeDOM.value, personDOM.value, 4.3], 0);
            break;

        case "literWeekly":
            literMonthlyDOM.value = funcMultiplyAllNrsOfArray([partVolumeDOM.value, 4.3], 0);
            break;
    
        default:
            break;
    }
    
    
}




function funcMultiplyAllNrsOfArray(Array, nrOfDecimals) {
    let product;
    if (Array.length>0){
        product = 1;
    } else {
        product = "";
        return product;
    }

    for (let i = 0; i < Array.length; i++) {
        let value = Array[i];

        if (value === "") {
            product = "";
            return product;
        } else if ( isNaN(parseFloat(value)) ){   
            product = "";
            return product;
        } else {
            value = parseFloat(value);
            product *= value;
        }
    }
    product = funcReturnStringifiedNr(product, nrOfDecimals);
    return product;
}



//  3.e Funktionen:
function funcReturnStringifiedNr(newNr, nrOfDecimals) {
    newNr=parseFloat(newNr);
    // console.log(typeof newNr);
    if (Math.floor(newNr) !== newNr) {
        newNr = newNr.toFixed(nrOfDecimals);
    } else {
        newNr = newNr.toFixed(0);
    }
    return newNr;
}

function funcSetEachUnitFromSource(idSource,   suffix,  formId, nrOfDecimals) {
    let formDOM = document.getElementById(formId);
    let suffixInputListDOM = formDOM.querySelectorAll(`input[type="text"][id$="${suffix}"]:not([id="${idSource}"])`); 
    let sourceInputDOM = formDOM.querySelector(`input[type="text"][id="${idSource}"]`);
    if(sourceInputDOM.value !== " - "){
        suffixInputListDOM.forEach( function(element) {
            if(element.value !== " - ") {
                element.value = sourceInputDOM.value;
            }
        });
    }  
}


// Ppumpeffect (kW) = qflöde (liter/min) /(60*1000)* Ptryck (kPa) / verkningsgrad



// funcSumAllElementsInArray(Array, 0)
// function funcSetAllWaterVolumes(form_id) {
//     let formDOM = document.getElementById(form_id);
//     let arrayLiterMonthly
//     let sumLiterMonthly = 0;
//     let sumLiterWeekly = 0;
//     let sumLiterDaily = 0;
    
// }

    // let suffixInputListDOM = formDOM.querySelectorAll(`input[type="text"][id$="${suffix}"]:not([id*="Total"]):not([id="${idSumma}"])`); 
    // let summaInputTotalDOM = formDOM.querySelector(`input[type="text"][id="${idSumma}"]`);

    // funcSetAllWaterVolumes("form_waterDebit");

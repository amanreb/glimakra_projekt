/*jshint esversion: 6 */


////////////// 1. GLOBALT //////////////////

let formDebitDOM = document.getElementById("form_foodDebit");
let formCreditDOM = document.getElementById("form_foodCredit");
let divFridgeDOM = document.getElementById("div_foodDebitCool");
let divFreezerDOM = document.getElementById("div_foodDebitFrozen");



/////////////// 2. EVENTLISTENER //////////////////

// EV-a Skriv ut summan vid pageload
document.addEventListener("DOMContentLoaded", function () {
    funcSetKCALmonthlyBuy();
    funcSetKCALstorage();
    funcSetMonthlyCost();
    
    funcSumAllPartialResults("_kcalMonthlyBuy", "foodDebitTotal_kcalMonthlyBuy", "form_foodDebit", 3);
    funcSumAllPartialResults("_kcalStorage",    "foodDebitTotal_kcalStorage",    "form_foodDebit", 3);
    funcSumAllPartialResults("_monthlyCost",    "foodDebitSpend_sumCost",        "form_foodDebit", 3);
    funcSetTotalDailyFromMonthly("form_foodDebit");

    funcSumAllPartialResults("_kcalMonthlyBuy",   "foodDebitCoolAdd_kcalMonthlyBuyFridge",     "div_foodDebitCool",   3);
    funcSumAllPartialResults("_kcalStorage",      "foodDebitCoolAdd_kcalStorageFridge",        "div_foodDebitCool",   3);
    funcSumAllPartialResults("_kcalMonthlyBuy",   "foodDebitFrozenAdd_kcalMonthlyBuyFreezer",    "div_foodDebitFrozen", 3);
    funcSumAllPartialResults("_kcalStorage",      "foodDebitFrozenAdd_kcalStorageFreezer",       "div_foodDebitFrozen", 3);


    funcSumAllPartialResults("_kcalDailyActive", "foodCreditPart_kcalDailyActive",  "form_foodCredit", 3);
    funcSumAllPartialResults("_kcalDailyCold",   "foodCreditPart_kcalDailyCold",    "form_foodCredit", 3);
    funcSumAllPartialResults("_kcalDailyFat",    "foodCreditPart_kcalDailyFat",     "form_foodCredit", 3);
    funcSumAllPartialResults("_kcalFat",         "foodCreditPart_kcalStorage",      "form_foodCredit", 3);
    
});


//EV-b Skriv ut Debit summan vid tangenttryck
formDebitDOM.addEventListener("keyup", function (event) {
    funcSetKCALmonthlyBuy();
    funcSetKCALstorage();
    funcSetMonthlyCost();

    funcSumAllPartialResults("_kcalMonthlyBuy", "foodDebitTotal_kcalMonthlyBuy", "form_foodDebit", 3);
    funcSumAllPartialResults("_kcalStorage", "foodDebitTotal_kcalStorage", "form_foodDebit", 3);
    funcSumAllPartialResults("_monthlyCost", "foodDebitSpend_sumCost", "form_foodDebit", 3);
    funcSetTotalDailyFromMonthly("form_foodDebit");
});


//EV-b Skriv ut Credit summan vid tangenttryck
formCreditDOM.addEventListener("keyup", function (event) {
    funcSumAllPartialResults("_kcalDailyActive", "foodCreditPart_kcalDailyActive",  "form_foodCredit", 3);
    funcSumAllPartialResults("_kcalDailyCold",   "foodCreditPart_kcalDailyCold",    "form_foodCredit", 3);
    funcSumAllPartialResults("_kcalDailyFat",    "foodCreditPart_kcalDailyFat",     "form_foodCredit", 3);
    funcSumAllPartialResults("_kcalFat",         "foodCreditPart_kcalStorage",      "form_foodCredit", 3);
});



//EV-d Skriv ut Debit summan vid musklick
formDebitDOM.addEventListener("click", function () {
    funcSetKCALmonthlyBuy();
    funcSetKCALstorage();
    funcSetMonthlyCost();

    funcSumAllPartialResults("_kcalMonthlyBuy", "foodDebitTotal_kcalMonthlyBuy", "form_foodDebit", 3);
    funcSumAllPartialResults("_kcalStorage", "foodDebitTotal_kcalStorage", "form_foodDebit", 3);
    funcSumAllPartialResults("_monthlyCost", "foodDebitSpend_sumCost", "form_foodDebit", 3);
    funcSetTotalDailyFromMonthly("form_foodDebit");
});




/////////////// 3. FUNKTIONER //////////////////

function funcSetKCALmonthlyBuy(){
    let unitArray = document.querySelectorAll("fieldset.dryFoodUnit, fieldset.coolFoodUnit, fieldset.frozenFoodUnit");
    unitArray.forEach(function (fieldsetDOM) {
        let nutritionDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_nutritionValue"]`);
        let kgMonthlyBuyDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_kgMonthlyBuy"]`);
        let kcalMonthlyBuyDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_kcalMonthlyBuy"]`);
        let kcalMonthlyBuyValue = funcMultiplyAllNrsOfArray([nutritionDOM.value, kgMonthlyBuyDOM.value, 10], 3);
        // console.log("kcalValue",kcalValue)
        if (kcalMonthlyBuyDOM.value !== " - ") {
            kcalMonthlyBuyDOM.value = kcalMonthlyBuyValue ;
        }
    });
}

function funcSetKCALstorage(){
    let unitArray = document.querySelectorAll("fieldset.dryFoodUnit, fieldset.coolFoodUnit, fieldset.frozenFoodUnit");
    
    unitArray.forEach(function (fieldsetDOM) {
        let nutritionDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_nutritionValue"]`);
        let kgStorageDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_kgStorage"]`);
        let kcalStorageDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_kcalStorage"]`);
        if (kgStorageDOM.value !== " - ") {
            let kcalStorageValue = funcMultiplyAllNrsOfArray([nutritionDOM.value, kgStorageDOM.value, 10], 3);
            // console.log("kcalStorageValue",kcalStorageValue)
            kcalStorageDOM.value = kcalStorageValue;
        }
    });
}


function funcSetMonthlyCost(){
    let unitArray = document.querySelectorAll("fieldset.dryFoodUnit, fieldset.coolFoodUnit, fieldset.frozenFoodUnit");
    unitArray.forEach(function (fieldsetDOM) {
        let kgMonthlyBuyDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_kgMonthlyBuy"]`);
        let priceDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_price"]`);
        let monthlyCostDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_monthlyCost"]`);
        let monthlyCostValue = funcMultiplyAllNrsOfArray([kgMonthlyBuyDOM.value, priceDOM.value], 3);
        // console.log("kcalStorageValue",kcalStorageValue)
        if (monthlyCostDOM.value !== " - ") {
            monthlyCostDOM.value = monthlyCostValue;
        }
    });
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
            console.log(Array[i].parentElement.parentElement );
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
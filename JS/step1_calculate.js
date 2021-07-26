/*jshint esversion: 6 */

/*
----- INNEHÅLL i step1_calculate.js -------
1. GLOBALT
    

2. EVENTLISTENER 
    2.a Eventet:  addEventListener("DOMContentLoaded", funcSetAllMoneySums)
    2.b Eventet:  addEventListener("keyup", funcSetAllMoneySums)
    2.c Eventet:  addEventListener("focusout", funcSetAllMoneySums)


3. FUNKTIONER           
    3.a Funktionen:  funcSetAllMoneySums()                                       i:    
    3.b Funktionen:  funcSumAllPartialResults(suffix, formId, nrOfDecimals)      i:  
    3.c Funktionen:  funcSumAllNrsInNodeList(nodeList)                           i:
    3.d Funktionen:  funcCorrectNrOfDecimals(element, nrOfDecimals)              i: step1_events.js, step1_calculate.js
 
*/



/////////////// 1. GLOBALT //////////////////

// var formDebitDOM = document.getElementById("form_moneyDebit");
// var formCreditDOM = document.getElementById("form_moneyCredit");



/////////////// 2. EVENTLISTENER //////////////////

// EV-a Skriv ut summan vid pageload
document.addEventListener("DOMContentLoaded", function () {
    funcSetAllMoneySums();
});


//EV-b Skriv ut summan vid tangenttryck
document.addEventListener("keyup", function () {
    funcSetAllMoneySums();
});

//EV-c Skriv ut summan vid focusout
document.addEventListener("focusout", function () {
    funcSetAllMoneySums();
});



/////////////// 3. FUNKTIONER //////////////////

//  3.a Funktionen:
function funcSetAllMoneySums() {
    let suffix = "Money";
    let nrOfDecimals = 0;
    funcSumAllPartialResults(suffix, "moneyDebitAssets_TotalMoney","fieldset_moneyDebitAssets", nrOfDecimals);
    funcSumAllPartialResults(suffix, "moneyDebitIncome_TotalMoney","fieldset_moneyDebitIncome", nrOfDecimals);
    funcSumAllPartialResults(suffix, "moneyCreditSpend_TotalMoney","fieldset_moneyCreditSpend", nrOfDecimals);
}




//  3.x Funktionen: exakt samma i step1_calculate.js, step2_calculate.js, step3_calculate.js, step4_calculate.js, step5_calculate.js
function funcSumAllPartialResults(suffix, idSumma, formId, nrOfDecimals) {
    let formDOM = document.getElementById(formId);
    let suffixInputListDOM = formDOM.querySelectorAll(`input[type="text"][id$="${suffix}"]:not([id*="Total"]):not([id="${idSumma}"])`); 
    let summaInputTotalDOM = formDOM.querySelector(`input[type="text"][id="${idSumma}"], input[type="hidden"][id="${idSumma}"] `);
    console.log(summaInputTotalDOM.value, summaInputTotalDOM);

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




//  3.d Funktionen: 
function funcCorrectNrOfDecimals(element, nrOfDecimals) {
    
    if (element.tagName === "INPUT" && !isNaN(element.value) && element.value !== "" && element.getAttribute("type") == "text")  {  
        
        if (Math.floor(parseFloat(element.value)) !== parseFloat(element.value)   ) { 
            element.value = parseFloat(element.value).toFixed(nrOfDecimals);
        }
    }
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




////// GAMMALT///////////////////

// querySelectorAll('input[value][type="checkbox"]:not([value=""])')
// :not([type="hidden"]):not([disabled])  :not([readonly])

// fieldset_moneyDebitAssets
// fieldset_moneyDebitIncome
// fieldset_moneyCreditSpend


/*
let assetsArray = document.querySelectorAll('#fieldset_moneyDebitAssets input[type="text"]:not([readonly])');
let sumAssets = funcSumAllNrOfArray(assetsArray);
document.getElementById("moneyDebitAssets_Total").value=sumAssets;

let incomeArray = document.querySelectorAll('#fieldset_moneyDebitIncome input[type="text"]:not([readonly])');
let sumIncome= funcSumAllNrOfArray(incomeArray);
document.getElementById("moneyDebitIncome_Total").value=sumIncome;

let spendArray = document.querySelectorAll('#fieldset_moneyCreditSpend input[type="text"]:not([readonly])');
let sumSpend= funcSumAllNrOfArray(spendArray);
document.getElementById("moneyCreditSpend_Total").value=sumSpend;
*/
// console.log(sumAssets, sumIncome, assetsArray, incomeArray);

/*
//  3.c Funktionen: exakt samma i step1_calculate.js, step2_calculate.js
function funcSumAllNrsInNodeList(nodeList) {
    let sum = 0;
    for (let i = 0; i < nodeList.length; i++) {
        let value = parseFloat(nodeList[i].value);
        if (!isNaN(value)) {
            sum += value;
        }
    }
    // console.log("sum", sum);
    return sum;
}*/
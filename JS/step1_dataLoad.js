/*jshint esversion: 6 */

// import {
//     funcSetInputFromLocalStorage
// } from './functions.js';


/*
----- INNEHÅLL i step1_onload.js -------

1. GET FROM LOCALSTORAGE
    1.a GET form_moneyDebit from LocalStorage
    1.b GET form_moneyCredit from LocalStorage

2. SET INPUT
    2.a Set all text-input from object form_moneyDebitFD in LocalStorage    
    2.b Set all text-input from object form_moneyCreditFD in LocalStorage

3. FUNKTIONER
    3.a Funktionen: funcSetStoredTextInput(form_FD)  i: step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
*/


///////////////////////// 1. GET FROM LOCALSTORAGE ////////////////////////////////////////

// 1.a GET form_moneyDebit from LocalStorage
var form_moneyDebitFD = JSON.parse(window.localStorage.getItem('form_moneyDebit'));

// 1.b GET form_moneyCredit from LocalStorage
var form_moneyCreditFD = JSON.parse(window.localStorage.getItem('form_moneyCredit'));



///////////////////////// 2. SET INPUT ///////////////////////////////////////////////////////////

// console.log(window.localStorage.getItem('form_moneyDebit'));
// console.log(window.localStorage.getItem('form_moneyCredit'));

// 2.a Set all text-input from object form_moneyDebitFD in LocalStorage
funcSetStoredTextInput(form_moneyDebitFD);

// 2.b Set all text-input from object form_moneyCreditFD in LocalStorage
funcSetStoredTextInput(form_moneyCreditFD);



///////////////////////// 3. FUNKTIONER ///////////////////////////////////////////////////////////


// 3.a Funktionen: exakt samma i step1_dataLoad.js, step2_dataLoad.js, step3_dataLoad.js, step4_dataLoad.js, step5_dataLoad.js
function funcSetStoredTextInput(form_FD){
    if (form_FD) {
        let inputDOM;
    
        for (let [key, value] of Object.entries(form_FD)) {
        
            inputDOM = document.getElementById(key);

            if (inputDOM && inputDOM.getAttribute("type")==="text" && inputDOM.readOnly === false) {
                console.log(key, value);
                inputDOM.value = value;
            }
        } 
    }
}




////// GAMMALT///////////////////

// moneyDebitAssets_bank
// moneyDebitAssets_cash
// moneyDebitAssets_valuables
// moneyDebitAssets_total
// moneyDebitIncome_bank
// moneyDebitIncome_cash
// moneyDebitIncome_total

// moneyCreditSpend_el
// moneyCreditSpend_heat
// moneyCreditSpend_food
// moneyCreditSpend_water
// moneyCreditSpend_other
// moneyCreditSpend_total
// moneyCreditPeople_count

/*
if (form_moneyDebitFD && form_moneyCreditFD) {
    let inputDOM;
    
    for (let [key, value] of Object.entries(form_moneyDebitFD)) {
        
        inputDOM = document.getElementById(key);

        if (inputDOM.readOnly === false){
            console.log(key, value);
            inputDOM.value = value;
        }
    }


    for (let [key, value] of Object.entries(form_moneyCreditFD)) {
        
        inputDOM = document.getElementById(key);

        if (inputDOM.readOnly === false){
            console.log(key, value);
            inputDOM.value = value;
        }
    }

}

*/






/*jshint esversion: 6 */

//step3_calculate.js


////////////// 1. GLOBALT //////////////////

let formDebitDOM = document.getElementById("form_heatDebit");
let formCreditDOM = document.getElementById("form_heatCredit");


/////////////// 2. EVENTLISTENER //////////////////


// EV-a Skriv ut summan vid pageload
document.addEventListener("DOMContentLoaded", function () {

    funcSetEachUnitFromSource("heatDebitSpend_cost",               "_unitCost",              "form_heatDebit", 3);
    funcSetEachUnitFromSource("heatDebitEnergy_circulationPumpEl", "_circulationPumpUnitEl", "form_heatDebit", 3);
    funcSetEachUnitFromSource("heatDebitEnergy_elHeaterEl",        "_elHeaterUnitEl",        "form_heatDebit", 3);

    funcSetKWHstorage();
    funcSetKWHfromPrimarySourceDaily();
    funcSetKWHfromSecondarySourceDaily();
    funcSumAllPartialResults("_kWhDaily",      "heatDebitTotal_kWhDaily",       "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhDailyAir",   "heatDebitTotal_kWhDailyAir",    "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhDailyWater", "heatDebitTotal_kWhDailyWater",  "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhStorage",    "heatDebitTotal_kWhStorage",     "form_heatDebit", 3);
    funcSumAllPartialResults("_unitCost",      "heatDebitSpend_sumUnitCost",    "form_heatDebit", 2);
    funcSumAllPartialResults("UnitEl",         "heatDebitEnergy_sumUnitEl",     "form_heatDebit", 3);

    funcSumAllPartialResults("_kWhDailyAir",   "heatCreditTotal_kWhDailyAir",   "form_heatCredit", 3);
    funcSumAllPartialResults("_kWhDailyWater", "heatCreditTotal_kWhDailyWater", "form_heatCredit", 3);

});



//EV-b Skriv ut Debit summan vid tangenttryck
formDebitDOM.addEventListener("keyup", function (event) {
    funcSetEachUnitFromSource("heatDebitSpend_cost",               "_unitCost",              "form_heatDebit", 3);
    funcSetEachUnitFromSource("heatDebitEnergy_circulationPumpEl", "_circulationPumpUnitEl", "form_heatDebit", 3);
    funcSetEachUnitFromSource("heatDebitEnergy_elHeaterEl",        "_elHeaterUnitEl",        "form_heatDebit", 3);

    funcSetKWHstorage();
    funcSetKWHfromPrimarySourceDaily();
    funcSetKWHfromSecondarySourceDaily();
    funcSumAllPartialResults("_kWhDaily",      "heatDebitTotal_kWhDaily",       "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhDailyAir",   "heatDebitTotal_kWhDailyAir",    "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhDailyWater", "heatDebitTotal_kWhDailyWater",  "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhStorage",    "heatDebitTotal_kWhStorage",     "form_heatDebit", 3);
    funcSumAllPartialResults("_unitCost",      "heatDebitSpend_sumUnitCost",    "form_heatDebit", 2);
    funcSumAllPartialResults("UnitEl",         "heatDebitEnergy_sumUnitEl",     "form_heatDebit", 3);
});






//EV-d Skriv ut Debit summan vid focusout
formDebitDOM.addEventListener("focusout", function () {
    funcSetEachUnitFromSource("heatDebitSpend_cost",               "_unitCost",              "form_heatDebit", 3);
    funcSetEachUnitFromSource("heatDebitEnergy_circulationPumpEl", "_circulationPumpUnitEl", "form_heatDebit", 3);
    funcSetEachUnitFromSource("heatDebitEnergy_elHeaterEl",        "_elHeaterUnitEl",        "form_heatDebit", 3);
    
    funcSetKWHstorage();
    funcSetKWHfromPrimarySourceDaily();
    funcSetKWHfromSecondarySourceDaily();
    funcSumAllPartialResults("_kWhDaily",      "heatDebitTotal_kWhDaily",       "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhDailyAir",   "heatDebitTotal_kWhDailyAir",    "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhDailyWater", "heatDebitTotal_kWhDailyWater",  "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhStorage",    "heatDebitTotal_kWhStorage",     "form_heatDebit", 3);
    funcSumAllPartialResults("_unitCost",      "heatDebitSpend_sumUnitCost",    "form_heatDebit", 2);
    funcSumAllPartialResults("UnitEl",         "heatDebitEnergy_sumUnitEl",     "form_heatDebit", 3);
});


//EV-e Skriv ut Debit summan vid musclick
formDebitDOM.addEventListener("click", function () {
    funcSetEachUnitFromSource("heatDebitSpend_cost",               "_unitCost",              "form_heatDebit", 3);
    funcSetEachUnitFromSource("heatDebitEnergy_circulationPumpEl", "_circulationPumpUnitEl", "form_heatDebit", 3);
    funcSetEachUnitFromSource("heatDebitEnergy_elHeaterEl",        "_elHeaterUnitEl",        "form_heatDebit", 3);

    funcSetKWHstorage();
    funcSetKWHfromPrimarySourceDaily();
    funcSetKWHfromSecondarySourceDaily();
    funcSumAllPartialResults("_kWhDaily",      "heatDebitTotal_kWhDaily",       "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhDailyAir",   "heatDebitTotal_kWhDailyAir",    "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhDailyWater", "heatDebitTotal_kWhDailyWater",  "form_heatDebit", 3);
    funcSumAllPartialResults("_kWhStorage",    "heatDebitTotal_kWhStorage",     "form_heatDebit", 3);
    funcSumAllPartialResults("_unitCost",      "heatDebitSpend_sumUnitCost",    "form_heatDebit", 2);
    funcSumAllPartialResults("UnitEl",         "heatDebitEnergy_sumUnitEl",     "form_heatDebit", 3);
});



//EV-c Skriv ut Credit summan vid tangenttryck
formCreditDOM.addEventListener("keyup", function (event) {
    funcSumAllPartialResults("_kWhDailyAir",    "heatCreditTotal_kWhDailyAir",   "form_heatCredit", 3);
    funcSumAllPartialResults("_kWhDailyWater",  "heatCreditTotal_kWhDailyWater", "form_heatCredit", 3);
});





/////////////// 3. FUNKTIONER //////////////////


function funcSetKWHfromSecondarySourceDaily(){
    let system2radioValue;
    let system2radioNodeList = document.querySelectorAll(`input[name ="heatDebitSystem2"]`);
    for (let i=0; i<system2radioNodeList.length; i++){
        if (system2radioNodeList[i].checked === true) {
            system2radioValue = system2radioNodeList[i].value;
            break;
        }
    }

    switch (system2radioValue) {
        case "El2":
            funcSetKWHfromElHeating("El2");
            break;

        case "Wood":
            funcSetKWHfromCalorificFuel("Wood");
            break;

        case "Sun2":
            // funcSetKWHfromSunHeating();
            break;

        case "El3":
            funcSetKWHfromElHeating("El3");
            break;
    
        default:
            break;
    }
}


// function funcSubstract(bruttoId, substractId, nettoId ){
//     let bruttoDOM = document.getElementById(bruttoId);
//     let substracDOM = document.getElementById(substractId);
//     let nettoDOM = document.getElementById(nettoId);

//     let nettoValue = parseFloat(bruttoDOM.value) - parseFloat(substracDOM .value);
//     if (nettoValue >= 0){
//         nettoDOM.value = funcReturnStringifiedNr(nettoValue, 0);
//     } else {
//         nettoDOM.value = "error";
//     }
// }



function funcSetKWHfromVariableCost(suffixSource) { 
    let fieldsetDOM = document.querySelector(`fieldset[id$="${suffixSource}"]`);
    let efficiencyDOM = fieldsetDOM.querySelector(`input[id$="_efficiency"]`);
    let kWhDailyDOM = fieldsetDOM.querySelector(`input[type="text"][id*="_kWhDaily"]`);
    let monthlyCostDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_unitCost"]`);
    let fixedCostDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_fixedCost"]`);
    let variableCostDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_variableCost"]`);

    if (monthlyCostDOM.value === " - " ) {
        return;
    }

    let MonthlyMinusFixedValue = kWhDailyDOM.value;
    if (fixedCostDOM.value === "" || isNaN(parseFloat(fixedCostDOM.value )) ){
        MonthlyMinusFixedValue = monthlyCostDOM.value;
    } else if (parseFloat(monthlyCostDOM.value) -  parseFloat(fixedCostDOM.value )<0){
        kWhDailyDOM.value="error";
        monthlyCostDOM.value = "error";
        return;
    } else {
        MonthlyMinusFixedValue = parseFloat(monthlyCostDOM.value) -  parseFloat(fixedCostDOM.value );
    }

    let inverseVariableCostValue;
    if (parseFloat(variableCostDOM.value) > 0 ) {
        inverseVariableCostValue= 1 / parseFloat(variableCostDOM.value);
    } else if (variableCostDOM.value === "" ) {
        kWhDailyDOM.value="";
        monthlyCostDOM.value = "";
        return;
    } else {
        kWhDailyDOM.value="error";
        monthlyCostDOM.value = "error";
        return;
    }

    let factorValueArray=[MonthlyMinusFixedValue, inverseVariableCostValue];

    //korrigera for dagar
    factorValueArray.push(0.03333);
    
    //procentandelar
    if(efficiencyDOM){
        factorValueArray.push(0.01);
        factorValueArray.push(efficiencyDOM.value);
    }

    // console.log(factorValueArray);
    kWhDailyDOM.value = funcMultiplyAllNrsOfArray(factorValueArray, 3);
}




function funcSetKWHfromCalorificFuel(suffixSource){ 
    let fieldsetFuelDOM = document.querySelector(`fieldset[id$="${suffixSource}"]`);
    let kWhDailyDOM = fieldsetFuelDOM.querySelector(`input[type="text"][id*="_kWhDaily"]`);
    // console.log(kWhDailyDOM, fieldsetFuelDOM);
    let efficiencyDOM = fieldsetFuelDOM.querySelector(`input[type="text"][id$="_efficiency"]`);
    let calorificDOM = fieldsetFuelDOM.querySelector(`input[type="text"][id$="calorific"]`);

    let monthlyCostDOM = fieldsetFuelDOM.querySelector(`input[type="text"][id$="_unitCost"]`);
    let priceDOM = fieldsetFuelDOM.querySelector(`input[type="text"][id$="_price"]`);
    
    let densityDOM = fieldsetFuelDOM.querySelector(`input[type="text"][id$="_density"]`);
    let kgAccessDOM = fieldsetFuelDOM.querySelector(`input[type="text"][id$="_kgAccess"]`);
    
    // console.log( calorificDOM.value );
    // console.log(efficiencyDOM.value, calorificDOM.value, monthlyCostDOM.value, densityDOM.value);

    if (monthlyCostDOM) {
        if (monthlyCostDOM.value === " - " ) {
            return;
        }
    }


    let factorValueArray=[];
    let factorDOMarray = [efficiencyDOM, calorificDOM, monthlyCostDOM, densityDOM, kgAccessDOM ];
    factorDOMarray.forEach( function (DOM) {
        
        if (DOM) {
            // console.log(DOM);
            if ( !isNaN(parseFloat(DOM.value)) && DOM.value !== ""){
                factorValueArray.push(DOM.value);
                // console.log(DOM.value);
            } else {
                // console.log(monthlyCostDOM.value);
                kWhDailyDOM.value = "";
                if (monthlyCostDOM) {
                    monthlyCostDOM.value = "";
                }
                return;
            }
        }
    });

    if (priceDOM) {
        // console.log(  parseFloat(priceDOM.value)  );
        if (parseFloat(priceDOM.value) > 0 ) {
            let inversePriceDaily= 1 / parseFloat(priceDOM.value);
            factorValueArray.push(inversePriceDaily);
        } else if (priceDOM.value === " - ") {
            monthlyCostDOM.value = "";
            return;
        } else if (priceDOM.value === "") {
            kWhDailyDOM.value="";
            monthlyCostDOM.value = "";
            // console.log("check", monthlyCostDOM);
            return;
        } else {
            kWhDailyDOM.value="error";
            monthlyCostDOM.value = "";
            return;
        }
    } 
    
    //korrigera for dagar i manaden
    if (monthlyCostDOM){
        factorValueArray.push(0.03333);
    }

    //korrigera procentandelar
    if(efficiencyDOM){
        factorValueArray.push(0.01);
    }

    //korrigera for kJ (MJ) (1/3600)
    if( calorificDOM.id.endsWith("MJcalorific") ){
        factorValueArray.push("0.2778");
        // console.log(calorificDOM.id.endsWith("MJcalorific"));
    }

    //korrigera for liter
    if(densityDOM){
        factorValueArray.push(0.001);
    }

    // console.log(factorValueArray);
    kWhDailyDOM.value = funcMultiplyAllNrsOfArray(factorValueArray, 3);
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




function funcSetKWHfromPrimarySourceDaily(){
    let system1radioValue;
    let system1radioNodeList = document.querySelectorAll(`input[name ="heatDebitSystem1"]`);
    for (let i=0; i<system1radioNodeList.length; i++){
        if (system1radioNodeList[i].checked === true) {
            system1radioValue = system1radioNodeList[i].value;
            break;
        }
    }

    switch (system1radioValue) {
        case "District":
            funcSetKWHfromVariableCost("District");
            break;

        case "Gas":
            funcSetKWHfromVariableCost("Gas");
            break;

        case "Pellets":
            funcSetKWHfromCalorificFuel("Pellets");
            break;

        case "Oil":
            funcSetKWHfromCalorificFuel("Oil");
            break;

        case "El":
            funcSetKWHfromElHeating("El");
            break;

        case "Sun":
            // funcSetKWHfromSunHeating();
            break;
    
        default:
            break;
    }
}
    



function funcSetKWHfromElHeating(suffixSource){
    let fieldsetElDOM = document.querySelector(`fieldset[id$="${suffixSource}"]`);
    let efficiencyDOM = fieldsetElDOM.querySelector(`input[id$="_efficiency"]`);
    let elHeaterUnitElDOM = fieldsetElDOM.querySelector(`input[id$="_elHeaterUnitEl"]`);
    let kWhDailyDOM = fieldsetElDOM.querySelector(`input[type="text"][id*="_kWhDaily"]`);
    // console.log(kWhDailyDOM)
    kWhDailyDOM.value = funcMultiplyAllNrsOfArray([elHeaterUnitElDOM.value, efficiencyDOM.value, 0.01], 3);
}







function funcSetKWHstorage(){
    let kWhStorageNodeList = document.querySelectorAll(`input[type="text"][id$="_kWhStorage"]:not([id ="heatDebitTotal_kWhStorage"])`);
    // console.log(kWhStorageNodeList);
    kWhStorageNodeList.forEach(function(kWhStorageElement){
        let fieldsetDOM = kWhStorageElement.parentElement.parentElement;
        if (fieldsetDOM.style.display !== "none"){
            let efficiencyDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_efficiency"]`);
            let calorificDOM = fieldsetDOM.querySelector(`input[type="text"][id$="calorific"]`);
            let kgStorageDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_kgStorage"]`);
            let literStorageDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_literStorage"]`);
            let densityDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_density"]`);

            let factorValueArray=[];
            let factorDOMarray = [efficiencyDOM, calorificDOM, kgStorageDOM, literStorageDOM, densityDOM];
            factorDOMarray.forEach( function (DOM) {
                if (DOM !== null) {
                    if ( parseFloat(DOM.value)!== null ){
                        factorValueArray.push(DOM.value);
                    } else {
                        kWhStorageElement.value = 0;
                        return;
                    }
                }
            });

            //korrigera kJ (MJ)
            if( calorificDOM.id.endsWith("MJcalorific") ){
                factorValueArray.push("0.2778");
                // console.log(calorificDOM.id.endsWith("MJcalorific"));
            }

            //korrigera for liter
            if(densityDOM) {
                factorValueArray.push(0.001);
            }

            //korrigera procentandelar
            if(efficiencyDOM){
                factorValueArray.push(0.01);
            }

            kWhStorageElement.value = funcMultiplyAllNrsOfArray(factorValueArray, 0);
        }
    });
}




//  3.d Funktionen:
function funcMultiplyAllNrsOfArray(Array, nrOfDecimals) {
    let product;
    // console.log(Array.length);
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
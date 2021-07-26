/*jshint esversion: 6 */

/*
----- INNEHÅLL i step2_calculate.js -------
1. GLOBALT
    

2. EVENTLISTENER 
    2.a Eventet:  addEventListener("DOMContentLoaded", function)
            funcElectricityFromPVdaily();
            funcSumAllPartialResults("kWhDaily","form_elDebit")
            funcSumAllPartialResults("kWhDaily","form_elCredit")

    2.b Eventet:  formDebitDOM.addEventListener("keyup", function)
            funcElectricityFromPVdaily();
            funcSumAllPartialResults("kWhDaily","form_elDebit")

    2.c Eventet:  formCreditDOM.addEventListener("keyup", function)
            funcSumAllPartialResults("kWhDaily","form_elCredit")


3. FUNKTIONER           
    3.a Funktionen:  funcSetAllMoneySums()                                       i:    
    3.b Funktionen:  funcSumAllPartialResults(suffix, formId, nrOfDecimals)      i:  
    3.c Funktionen:  funcSumAllElementsInArray(Array, nrOfDecimals)                    i:

*/


////////////// 1. GLOBALT //////////////////

var formDebitDOM = document.getElementById("form_elDebit");
var formCreditDOM = document.getElementById("form_elCredit");


/////////////// 2. EVENTLISTENER //////////////////


// EV-a Skriv ut summan vid pageload
document.addEventListener("DOMContentLoaded", function () {
    // funcCheckFixedCost("elDebitGrid_fixedCost", "elDebitGrid_variableCost", "elDebitSpend_grid", 2);
    // funcKWHdailyFromFixedAndVariableCost("elDebitGrid_fixedCost", "elDebitGrid_variableCost", "elDebitSpend_grid", "elDebitGrid_kWhDaily", "", 3);
    funcSetTwoCostsFromTotal("elDebitSpend_cost",   "elDebitSpend_costGrid",     "elDebitSpend_costGenerator", 0);
    
    funcSetEachUnitFromSource( "elDebitSpend_costGrid",   "elDebitGrid_unitCost",  "form_elDebit" , 0 );
    funcSetEachUnitFromSource( "elDebitSpend_costGenerator",   "elDebitGenerator_unitCost",  "form_elDebit" , 0 );
    funcSetKWHfromVariableCost("Grid");
    funcElectricityFromPVdaily();
    funcElectricityFromGenerator();
    funcSumAllPartialResults("System", "elDebitTotal_kWhDailySystem", "form_elDebit", 3);
    funcSumAllPartialResults("_kWhDaily", "elDebitTotal_kWhDailyBrutto", "form_elDebit", 3);
    funcSumAllPartialResults("_unitCost", "elDebitSpend_sumUnitCost", "form_elDebit", 0);
    funcSubstract("elDebitTotal_kWhDailyBrutto", "elDebitTotal_kWhDailySystem","elDebitTotal_kWhDailyNetto", 3 );

    funcSetAllElUnits();
    funcSumAllPartialResults("_kWhDaily", "elCreditTotal_kWhDaily", "form_elCredit", 3);
});



//EV-b Skriv ut Debit summan vid tangenttryck
formDebitDOM.addEventListener("keyup", function (event) {
    funcSetTwoCostsFromTotal("elDebitSpend_cost",         "elDebitSpend_costGrid",       "elDebitSpend_costGenerator", 0, event);
    funcSetEachUnitFromSource( "elDebitSpend_costGrid",   "elDebitGrid_unitCost",  "form_elDebit" , 0 );
    funcSetEachUnitFromSource( "elDebitSpend_costGenerator",   "elDebitGenerator_unitCost",  "form_elDebit" , 0 );
    funcSetKWHfromVariableCost("Grid");
    funcElectricityFromPVdaily();
    funcElectricityFromGenerator();
    funcSumAllPartialResults("System", "elDebitTotal_kWhDailySystem", "form_elDebit", 3);
    funcSumAllPartialResults("_kWhDaily", "elDebitTotal_kWhDailyBrutto", "form_elDebit", 3);
    funcSumAllPartialResults("_unitCost", "elDebitSpend_sumUnitCost", "form_elDebit", 0);
    funcSubstract("elDebitTotal_kWhDailyBrutto", "elDebitTotal_kWhDailySystem","elDebitTotal_kWhDailyNetto",3 );

    // let fixedCostDOM = document.getElementById("elDebitGrid_fixedCost");
    // let variableCostDOM = document.getElementById("elDebitGrid_variableCost");

    // if (event.target === variableCostDOM) {
    //     funcCheckFixedCost("elDebitGrid_fixedCost", "elDebitGrid_variableCost", "elDebitSpend_grid", 2);
    //     funcKWHdailyFromFixedAndVariableCost("elDebitGrid_fixedCost", "elDebitGrid_variableCost", "elDebitSpend_grid", "elDebitGrid_kWhDaily", "", 3);
    // } else if (event.target === fixedCostDOM) {
    //     funcKWHdailyFromFixedAndVariableCost("elDebitGrid_fixedCost", "elDebitGrid_variableCost", "elDebitSpend_grid", "elDebitGrid_kWhDaily", "", 3);
    // }

});


//EV-d Skriv ut Debit summan vid focusout
formDebitDOM.addEventListener("focusout", function (event) {
    funcSetTwoCostsFromTotal("elDebitSpend_cost",      "elDebitSpend_costGrid",    "elDebitSpend_costGenerator", 0, event);
    funcSetEachUnitFromSource( "elDebitSpend_costGrid",   "elDebitGrid_unitCost",  "form_elDebit" , 0 );
    funcSetEachUnitFromSource( "elDebitSpend_costGenerator",   "elDebitGenerator_unitCost",  "form_elDebit" , 0 );
    funcSetKWHfromVariableCost("Grid");
    funcElectricityFromPVdaily();
    funcElectricityFromGenerator();
    funcSumAllPartialResults("System", "elDebitTotal_kWhDailySystem", "form_elDebit", 3);
    funcSumAllPartialResults("_kWhDaily", "elDebitTotal_kWhDailyBrutto", "form_elDebit", 3);
    funcSumAllPartialResults("_unitCost", "elDebitSpend_sumUnitCost", "form_elDebit", 0);
    funcSubstract("elDebitTotal_kWhDailyBrutto", "elDebitTotal_kWhDailySystem","elDebitTotal_kWhDailyNetto",3 );
});
 


//EV-c Skriv ut Credit summan vid tangenttryck
formCreditDOM.addEventListener("keyup", function () {
    funcSetAllElUnits();
    funcSumAllPartialResults("_kWhDaily", "elCreditTotal_kWhDaily", "form_elCredit", 3);
});


//EV-d Skriv ut Debit summan vid musklick
formDebitDOM.addEventListener("click", function () {
    funcSetEachUnitFromSource( "elDebitSpend_costGrid",   "elDebitGrid_unitCost",  "form_elDebit" , 0 );
    funcSetEachUnitFromSource( "elDebitSpend_costGenerator",   "elDebitGenerator_unitCost",  "form_elDebit" , 0 );
    funcSetKWHfromVariableCost("Grid");
    funcElectricityFromPVdaily();
    funcElectricityFromGenerator();
    funcSumAllPartialResults("System", "elDebitTotal_kWhDailySystem", "form_elDebit", 3);
    funcSumAllPartialResults("_kWhDaily", "elDebitTotal_kWhDailyBrutto", "form_elDebit", 3);
    funcSumAllPartialResults("_unitCost", "elDebitSpend_sumUnitCost", "form_elDebit", 0);
    funcSubstract("elDebitTotal_kWhDailyBrutto", "elDebitTotal_kWhDailySystem","elDebitTotal_kWhDailyNetto", 3 );
});


//EV-e Skriv ut Credit summan vid musklick
formCreditDOM.addEventListener("click", function () {
    funcSetAllElUnits();
    funcSumAllPartialResults("_kWhDaily", "elCreditTotal_kWhDaily", "form_elCredit", 3);
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

    let MonthlyMinusFixedValue;
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







function funcSubstract(bruttoId, substractId, nettoId, nrOfDecimals ){
    let bruttoDOM = document.getElementById(bruttoId);
    let substracDOM = document.getElementById(substractId);
    let nettoDOM = document.getElementById(nettoId);

    nettoDOM.value = "";

    let nettoValue = parseFloat(bruttoDOM.value) - parseFloat(substracDOM .value);
    if (nettoValue >= 0){
        nettoDOM.value = funcReturnStringifiedNr(nettoValue, nrOfDecimals );
    } else {
        nettoDOM.value = "error";
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

function funcElectricityFromGenerator(){
    
    let nomEffectDOM = document.getElementById("elDebitGenerator_nomEffect");
    let fuelConsumeDOM = document.getElementById("elDebitGenerator_fuelConsume");
    let oilPriceDOM = document.getElementById("elDebitGenerator_oilPrice");
    let kWhCostDOM = document.getElementById("elDebitGenerator_kWhCost");

    let monthlyCostDOM = document.getElementById("elDebitGenerator_unitCost");
    let kWhDailyDOM = document.getElementById("elDebitGenerator_kWhDaily");


    // console.log(nomEffectDOM.value);
    // console.log( parseFloat(nomEffectDOM.value) );

    if (monthlyCostDOM.value === " - " ) {
        return;
    }

    let inverseNomEffectValue;
    if(nomEffectDOM.value === ""){
        kWhCostDOM.value="";
        monthlyCostDOM.value = "XXX" ;
        return;
    } else if (parseFloat(nomEffectDOM.value) > 0 ) {
        inverseNomEffectValue = 1 / parseFloat(nomEffectDOM.value);
    } else {
        kWhCostDOM.value="error";
        kWhDailyDOM.value="error";
        monthlyCostDOM.value = "error" ;
        return;
    }

    kWhCostDOM.value = funcMultiplyAllNrsOfArray([inverseNomEffectValue, fuelConsumeDOM.value, oilPriceDOM.value], 3);

    let inverseKWhCostValue;
    if(kWhCostDOM.value === "") {
        kWhDailyDOM.value="";
        monthlyCostDOM.value = "XXX" ;
        return;
    } else if (parseFloat(kWhCostDOM.value) > 0 ) {
        inverseKWhCostValue = 1 / parseFloat(kWhCostDOM.value);
    } else {
        kWhDailyDOM.value="error";
        monthlyCostDOM.value = "error" ;
        return;
    }

    //korrigera med dagar
    let monthToDay = 0.03333;

    kWhDailyDOM.value = funcMultiplyAllNrsOfArray([monthlyCostDOM.value, inverseKWhCostValue, monthToDay], 3);
}


//  3.a Funktionen:
function funcElectricityFromPVdaily() {
    let areaDOM = document.getElementById("elDebitPV_panelArea");
    let peakEffM2DOM = document.getElementById("elDebitPV_peakEffectPerM2");
    let peakEffDOM = document.getElementById("elDebitPV_peakEffect");
    let irrDailyDOM = document.getElementById("elDebitPV_irradiationDaily");
    let systemEfficDOM = document.getElementById("elDebitPV_systemEfficiency");
    let elBruttoDOM = document.getElementById("elDebitPV_elProduction");
    let batteryLossDOM = document.getElementById("elDebitPV_batteryLoss");
    let batteryCapDOM = document.getElementById("elDebitPV_batteryCapacity");
    let elNettoDOM = document.getElementById("elDebitPV_kWhDaily");

    // peakEffDOM.value = (parseFloat(areaDOM.value) * parseFloat(peakEffM2DOM.value)).toFixed(3);	
    peakEffDOM.value = funcMultiplyAllNrsOfArray([areaDOM.value, peakEffM2DOM.value], 3);
    // peakEffDOM.value = (parseFloat(areaDOM.value) * parseFloat(peakEffM2DOM.value)).toFixed(3);			

    elBruttoDOM.value = (parseFloat(peakEffDOM.value) * parseFloat(irrDailyDOM.value) * parseFloat(systemEfficDOM.value) / 100).toFixed(3);
    if (parseFloat(elBruttoDOM.value) > parseFloat(batteryCapDOM.value) * 12) {
        elNettoDOM.value = (parseFloat(batteryCapDOM.value) * 12 * (100 - parseFloat(batteryLossDOM.value)) / 100).toFixed(3);
    } else {
        elNettoDOM.value = (parseFloat(elBruttoDOM.value) * (100 - parseFloat(batteryLossDOM.value)) / 100).toFixed(3);
    }
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






//  3.d Funktionen:
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




//  3. Funktionen: 
function funcCorrectNrOfDecimals(element, nrOfDecimals) {
    
    if (element.tagName === "INPUT" && !isNaN(element.value) && element.value !== "" && element.getAttribute("type") == "text")  {  
        
        if (Math.floor(parseFloat(element.value)) !== parseFloat(element.value)   ) { 
            element.value = parseFloat(element.value).toFixed(nrOfDecimals);
        }
    }
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




//  3.f Funktionen:
function funcSetAllElUnits() {
    let unitArray = document.querySelectorAll("fieldset.elUnit");
    unitArray.forEach(function (fieldsetDOM) {
        let powerDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_power"]`);
        let timeDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_time"]`);
        let kWhDOM = fieldsetDOM.querySelector(`input[type="text"][id$="_kWhDaily"]`);
        let kWhValue = funcMultiplyAllNrsOfArray([timeDOM.value, powerDOM.value, 0.001], 3);
        kWhDOM.value = kWhValue;
    });
}


//  3.g Funktionen:
//Förklaring: Om rörlig kostnad är noll ska fasta kostnaden motsvara hela totala kostnaden
function funcCheckFixedCost(fixedCostId, variableCostId, totalCostId, nrOfDecimals) {
    let fixedCost = document.getElementById(fixedCostId);
    let variableCost = document.getElementById(variableCostId);
    let totalCost = document.getElementById(totalCostId);

    if ((parseFloat(variableCost.value) === 0) || (variableCost.value === "") || (parseFloat(fixedCost.value) >= parseFloat(totalCost.value))) {
        fixedCost.value = funcReturnStringifiedNr(totalCost.value, nrOfDecimals);
    }
}




//  3.h Funktionen:
//Förklaring: Beräknar dagliga kWh-tillgången från fast och rörligt pris
function funcKWHdailyFromFixedAndVariableCost(fixedCostId, variableCostId, totalCostId, kwhDailyId, efficiencyId, nrOfDecimals) {
    let fixedCostFloat = parseFloat(document.getElementById(fixedCostId).value);
    let variableCostFloat = parseFloat(document.getElementById(variableCostId).value);
    let totalCostFloat = parseFloat(document.getElementById(totalCostId).value);
    let kWhDailyDOM = document.getElementById(kwhDailyId);
    let efficiencyFloat;
    if (efficiencyId === "") {
        efficiencyFloat = 100;
    } else {
        efficiencyFloat = parseFloat(document.getElementById(efficiencyId).value);
    }

    // console.log(fixedCostFloat, typeof fixedCostFloat);

    if (variableCostFloat === 0) {
        kWhDailyDOM.value = "XXX";
    } else if (isNaN(fixedCostFloat)) {
        kWhDailyDOM.value = "YYY";
    } else if (isNaN(variableCostFloat)) {
        kWhDailyDOM.value = "ZZZ";
    } else if (isNaN(efficiencyFloat)) {
        kWhDailyDOM.value = "PPP";
    } else if (document.getElementById(fixedCostId).disabled === true) {
        kWhDailyDOM.value = "0";
    } else {
        let KWHfloat = (totalCostFloat - fixedCostFloat) / variableCostFloat * efficiencyFloat / 100 * 1 / 30;
        kWhDailyDOM.value = funcReturnStringifiedNr(KWHfloat, nrOfDecimals);
    }

}






/*
function funcSetDependentVariable(sumId, varDependentId, freeVar1Id) {
    if(freeVar1DOM.value === ""){
        freeVar1DOM.value = 0;
    }

    if(freeVar2DOM.value === ""){
        freeVar2DOM.value = 0;
    }

    let freeVar1Float = parseFloat(freeVar1DOM.value);
    let freeVar2Float = parseFloat(freeVar2DOM.value);
  
    if (  sumFloat < (freeVar1Float + freeVar2Float)  ) {
        varDependentDOM.value = "errX";
    }
}*/






////// GAMMALT///////////////////

/*
elDebitOil_kWhDaily =  elDebitGenerator_nomEffect * elDebitSpend_grid/30 / elDebitOil_price  /  elDebitGenerator_consume

elDebitOil_kWhStorage = elDebitSpend_grid  * elDebitOil_storage /  elDebitGenerator_consume

elCredit1_kWhDaily = funcKWHfromPowerTime ( elCredit1_power , elCredit1_time )


elDebitGrid_fixedCost  CheckFixedCost ( elDebitGrid_fixedCost,    elDebitGrid_variableCost,      elDebitGrid_cost )
elDebitGrid_kWhDaily   funcKWHdailyFromFixedAndVariableCost ( elDebitGrid_fixedCost,    elDebitGrid_variableCost,   elDebitGrid_cost,     100)   Excecute onPageLoad och on setting variableCost and fixedCost



funcElectricityFromPVdaily() Execute when inputvalues of fieldset #fieldset_elDebitPV are given : 
condition:  elDebitPV_peakEffectPerM2<0.3
elDebitPV_peakEffect = elDebitPV_panelArea* elDebitPV_peakEffectPerM2
condition:  elDebitPV_systemEfficiency<=100
elDebitPV_elProcuction  = elDebitPV_peakEffect * elDebitPV_irradiationDaily *  elDebitPV_systemEfficiency/100
condition:  elDebitPV_batteryLoss<=100
elDebitPV_kWhDaily =  elDebitPV_elProcuction * (1- elDebitPV_batteryLoss/100)




condition:  elCredit1_time<=24

funcKWHfromPowerTime ( powerW, timeH)
KWH =  powerW * timeH / 1000
return KWH


*/

/*

funcElectricityFromPVdaily()				
  var area = GetElementById(elDebitPV_panelArea )				
  var peakEffM2 = GetElementById(elDebitPV_peakEffectPerM2)				
  var peakEff = GetElementById(elDebitPV_peakEffect)				
  var irrDaily = GetElementById(elDebitPV_irradiationDaily)				
  var systemEffic = GetElementById(elDebitPV_systemEfficiency)				
  var elBrutto = GetElementById(elDebitPV_elProcuction)				
  var batteryLoss = GetElementById(elDebitPV_batteryLoss)				
  var batteryCap = GetElementById(elDebitPV_batteryCapacity)				
  var elNetto = GetElementById(elDebitPV_kWhDaily)				
  peakEff.value = area.value * peakEffM2				
  elBrutto.value = peakEff.value * irrDaily.value * systemEffic.value /100				
   if (elBrutto.value > batteryCap.value*12)				
         elNetto.value = batteryCap.value * 12 * (100- batteryLoss)/100				
   else 				
          elNetto.value = elBrutto.value * (100-batteryLoss)/100	
          
          




//Förklaring: Om rörlig kostnad är noll ska fasta kostnaden motsvara hela totala kostnaden
CheckFixedCost ( fixedCostID, variableCostID, totalCostID )							
var fixedCost = document.GetElementById(fixedCostID)							
var variableCost = document.GetElementById(variableCostID)							
var totalCost = document.GetElementById(totalCostID)							
   if (variableCost.value == 0) ||  (variableCost.value == null)  ||  (fixedCost.value >= totalCost.value)							
   fixedCost.value = totalCost.value	
   

   
//Förklaring: Beräknar dagliga kWh-tillgången från fast och rörligt pris
funcKWHdailyFromFixedAndVariableCost ( fixedCostID,     variableCostID,     totalCostID,   kwhDailyID,    efficiencyID)  									
var fixedCost = document.GetElementById(fixedCostID)									
var variableCost = document.GetElementById(variableCostID)									
var totalCost = document.GetElementById(totalCostID)									
var efficiency = document.GetElementById(efficiencyID)									
var kwhDaily = document.GetElementById(kwhDailyD)									
 if (variableCost.value == 0)   ||   (variableCost.value == null)  ||   (fixedCost.value == null) 									
        kwhDaily.value = null  (unknown)									
else if (fixedCost.disabled == true)									
        kwhDaily.value = 0									
else 									
         KWHdaily.value = (totalCost.value -  fixedCost.value) / variableCost.value * efficiency.value/100  * 1/30									


          
          */
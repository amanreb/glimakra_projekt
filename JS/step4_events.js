/*jshint esversion: 6 */

// step4_events.js 


/*
----- INNEHÅLL i step4_events.js -------

1. FUNKTIONER I HTML-KODEN 
    1.a Funktionen: funcDeleteUnit(event)                               i: step2_events.js, step4_events.js
    1.b Funktionen: funcFoodAddUnit(event)                              
    1.c Funktionen: funcReturnFoodUnitObject(x, foodType, nameUnit)     i: step4_dataLoad.js, step4_events.js
    1.d Funktionen: funcFoodAddUnitCode(unitObject)                     i: step4_dataLoad.js, step4_events.js
    1.e Funktionen: funcAddCodeToDOM(code, fieldsetId)                  i: step2_dataLoad.js, step4_dataLoad.js, step2_events.js, step4_events.js
    1.e Funktionen: funcDeactivateScenarioRelatedElements(scenarioType) i: step4_events.js, func_scenario.js
    */



/////////////// 1. GLOBAL - OM INGEN TIDIGARE SPARAD FORM //////////////////




//////////////// 2. EVENTLISTENER /////////////////////////////

let buttonAddCoolUnitDOM = document.getElementById("foodDebitCoolAdd_new");
buttonAddCoolUnitDOM.addEventListener("click", function () {
    funcDisableTargetElementIfSourceDissabled("fridge_systemUnit", "foodDebitEnergy_fridgeEl");
});


let buttonAddFrozenUnitDOM = document.getElementById("foodDebitFrozenAdd_new");
buttonAddFrozenUnitDOM.addEventListener("click", function () {
    funcDisableTargetElementIfSourceDissabled("freezer_systemUnit", "foodDebitEnergy_freezerEl");
});




/////////////// 3. FUNKTIONER IFRÅN JS-FILEN //////////////////


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




///////////////////// 4. FUNKTIONER I HTML-KODEN ///////////////////////////////////////


// 1.a Funktionen: exakt samma som i step2_events.js
function funcDeleteUnit(event) {
    if (document.readyState === 'complete') {
        let fieldsetElement = event.target.closest("fieldset");
        fieldsetElement.disabled = true;
        fieldsetElement.style.display = "none";
    }
}



// 1.b Funktionen:
function funcFoodAddUnit(event) {

    if (document.readyState === 'complete') {

        let idButton = event.target.id;
        console.log(event.target.id);
        let foodType = idButton.substring(9, idButton.length - 7); //"Cool" or "Dry" or "Froze"
        let allUnits = document.querySelectorAll(`fieldset.${foodType.toLowerCase()}FoodUnit`); //
        let x = 1 + allUnits.length;
        console.log(allUnits);
        console.log(x);

        let nameUnit = window.prompt("Ange matvarans namn:");
        if (nameUnit == undefined || nameUnit == null) {
            return;
        } else(nameUnit = nameUnit.toUpperCase());

        var unitObject = funcReturnFoodUnitObject(x, foodType, nameUnit);
        let code = funcFoodAddUnitCode(unitObject);

        let fieldsetFoodAddNewId = "fieldset_foodDebit" + foodType + "New";
        funcAddCodeToDOM(code, fieldsetFoodAddNewId);

        funcDeactivateScenarioRelatedElements("food");

    }
}



// 1.c Funktionen: exakt samma som i step4_dataLoad.js
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

    let classElScenario = "";
    if (foodType === "Cool") {
        classElScenario = "fridge_systemUnit";
    }
    if (foodType === "Frozen") {
        classElScenario = "freezer_systemUnit";
    }

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



// 1.d Funktionen: exakt samma som i step4_dataLoad.js
function funcFoodAddUnitCode(unitObject) {
    console.log(unitObject.nameUnit);

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

    console.log(codeStringNewUnit);
    console.log(unitObject.idName);
    return codeStringNewUnit;
}



// 1.e Funktionen: exakt samma i step2_dataLoad.js, step4_dataLoad.js, step2_events.js, step4_events.js
function funcAddCodeToDOM(code, fieldsetId) {
    let newFieldset = document.getElementById(fieldsetId);
    var newDiv = document.createElement("div");
    newDiv.innerHTML = code;
    newFieldset.appendChild(newDiv);
}



// 1.f Funktionen: exakt samma i func_scenario.js
function funcDeactivateScenarioRelatedElements(scenarioType) {

    let path = window.location.pathname;
    let pageName = path.split("/").pop().split(".").shift();
    let spanId = scenarioType + "_span_" + pageName;
    let spanOFFId = scenarioType + "_spanOFF_" + pageName;
    let spanIdDOM = document.getElementById(spanId);
    let spanOFFIdDOM = document.getElementById(spanOFFId);

    if (spanIdDOM.style.display !== "none" || spanOFFIdDOM.style.display !== "none") {

        let elementListDOM = document.querySelectorAll("." + scenarioType + "_scenario");
        console.log(elementListDOM);
        elementListDOM.forEach(function (itemDOM) {
            if (itemDOM.tagName === "INPUT" && itemDOM.getAttribute("type") == "text") {
                console.log("AAAA");
                itemDOM.readOnly = true;
                itemDOM.value = " - ";
                // } else if (itemDOM.tagName === "INPUT" && itemDOM.getAttribute("type") == "radio") {
                // console.log("BBB");
                // itemDOM.disabled = true;
            } else if (itemDOM.tagName === "FIELDSET") {
                itemDOM.disable = true;
            }
        });

    }
}



/////////////////// GAMMALT /////////

/* <fieldset id="fieldset_foodDebitDry1"  class="dryFoodUnit"><h4>VETEMJÖL</h4>
<label>Energiinnehåll: <input type="text" id="foodDebitDry1_nutritionValue" name="foodDebitDry1_nutritionValue" value="357" /> kcal/100g</label>
<label>Pris: <input type="text" id="foodDebitDry1_price" name="foodDebitDry1_price" /> SEK/kg</label>
<label>Matnköp: <input type="text" id="foodDebitDry1_kgMonthlyBuy" name="foodDebitDry1_kgMonthlyBuy" /> kg/månad</label>
<label>Matlager: <input type="text" id="foodDebitDry1_kgStorage" name="foodDebitDry1_kgStorage" /> kg</label>
<label>Kalorimängd, inköp: <input type="text" id="foodDebitDry1_kcalMonthlyBuy" name="foodDebitDry1_kcalMonthlyBuy" readonly /> kcal/mån</label>
<label>Kalorimängd, lager: <input type="text" id="foodDebitDry1_kcalStorage" name="foodDebitDry1_kcalStorage" readonly /> kcal</label>
<label><button onclick="funcDeleteUnit(event)" type="button" id="foodDebitDry1_delete">Ta bort!</button></label></fieldset> */

/*
function funcDryFoodAddUnit(event) {
    // let allUnits = document.querySelectorAll('fieldset.frozenFoodUnit:not(:disabled)');
    // let unitCount = allUnits.length;
    // console.log(unitCount);
    // let x;
    // if (unitCount < 7) {x = 8;} 
    // else { x = unitCount + 1;}

    let allUnits = document.querySelectorAll("fieldset.dryFoodUnit");
    let x = 1 + allUnits.length;
    let foodType = "Dry";
    console.log(x);
    let nameUnit = prompt("Ange matvarans namn:").toUpperCase();
    let unitObject = funcReturnFoodUnitObject(x, foodType,nameUnit);

    let code = funcFoodAddUnitCode(unitObject);
    let newFieldset = document.getElementById("fieldset_foodDebitDryNew");
    let newDiv = document.createElement("div");
    newDiv.innerHTML = code;
    newFieldset.appendChild(newDiv);
}

function funcFrozenFoodAddUnit(event) {
    let allUnits = document.querySelectorAll("fieldset.frozenFoodUnit");
    let x = 1 + allUnits.length;
    let foodType = "Frozen";
    console.log(x);
    let nameUnit = prompt("Ange matvarans namn:").toUpperCase();
    var unitObject = funcReturnFoodUnitObject(x, foodType, nameUnit);

    let code = funcFoodAddUnitCode(unitObject);  
    var newFieldset= document.getElementById("fieldset_foodDebitFrozenNew");
    var newDiv = document.createElement("div");
    newDiv.innerHTML=code;
    newFieldset.appendChild(newDiv);
}

*/


/*
   var newFieldset= document.getElementById(`fieldset_foodDebit${foodType}New`); //
   var newDiv = document.createElement("div");
   newDiv.innerHTML=code;
   newFieldset.appendChild(newDiv);
   */
/*jshint esversion: 6 */

// step2_events.js


/*
----- INNEHÅLL i step2_events.js -------

4. FUNKTIONER I HTML-KODEN
    4.a Funktionen: funcDeleteUnit(event)                         i: step2_events.js, step4_events.js
    4.b Funktionen: funcElAddUnit()
    4.c Funktionen: funcReturnElUnitObject(x, nameUnit)           i: step2_dataLoad.js, step2_events.js
    4.d Funktionen: funcElAddUnitCode(unitObject)                 i: step2_dataLoad.js, step2_events.js
    4.e Funktionen: funcAddCodeToDOM(code, fieldsetId)            i: step2_dataLoad.js, step4_dataLoad.js, step2_events.js, step4_events.js
*/



var form_elDebitFD = JSON.parse(window.localStorage.getItem('form_elDebit'));

/////////////// 1. OM INGEN TIDIGARE SPARAD FORM //////////////////

if (!form_elDebitFD) {
    
    funcHideSelectedFieldsetUnitByBoolElement("elDebitProduction_PV", "false");
    funcHideSelectedFieldsetUnitByBoolElement("elDebitProduction_Generator", "false" );
    // funcCheckboxDeactivateInput(CheckboxDOM);

}



//////////////// 2. EVENTLISTENER /////////////////////////////

var form_elDebitDOM = document.getElementById("form_elDebit");
var form_elCreditDOM = document.getElementById("form_elCredit");

document.addEventListener("DOMContentLoaded", function () {
    
    let nrOfDecimalsKWH = 3;
    let minValueKWH = 0.01;
    let maxValueKWH;
    let rangeSuffixKWH = "System";
    let suffixNodeListKWH = document.querySelectorAll(`input[type="text"]:not([readonly])[id$="${rangeSuffixKWH}"]`);
    for (let i = 0; i < suffixNodeListKWH.length; i++) {
        funcCorrectNrOfDecimals(suffixNodeListKWH[i], nrOfDecimalsKWH);
        funcCorrectRangeInput(suffixNodeListKWH[i], minValueKWH, maxValueKWH);
    }
   
    let nrOfDecimalsHour = 2;
    let minValueHour = 0;
    let maxValueHour = 24;
    let rangeSuffixHour = "_time";
    let suffixNodeListHour = document.querySelectorAll(`input[type="text"]:not([readonly])[id$="${rangeSuffixHour}"]`);
    for (let i = 0; i < suffixNodeListHour.length; i++) {
        funcCorrectRangeInput(suffixNodeListHour[i], minValueHour, maxValueHour);
        funcCorrectNrOfDecimals(suffixNodeListHour[i], nrOfDecimalsHour);
    }

    let sumCostDOM = document.getElementById("elDebitSpend_cost");
    if ( parseFloat(sumCostDOM.value ) >=0  ){
        let maxValue = parseFloat(sumCostDOM.value);
        let minValue = 0;
        let gridInputDOM = document.getElementById("elDebitSpend_costGrid");
        let generatorInputDOM = document.getElementById("elDebitSpend_costGenerator");

        let correctionBool1 = funcCorrectRangeInput(gridInputDOM, minValue, maxValue);
        let correctionBool2 = funcCorrectRangeInput(generatorInputDOM, minValue, maxValue);
        // if (correctionBool1 || correctionBool2) {
        //     event.target.blur();
        // }
    }  

});


//EV-b 
document.addEventListener("keyup", function (event) {
    if(event.target.id === "elDebitSpend_costGrid" || event.target.id === "elDebitSpend_costGenerator"){
        let sumCostDOM = document.getElementById("elDebitSpend_cost");
        if ( parseFloat(sumCostDOM.value ) >=0  ){
            let maxValue = parseFloat(sumCostDOM.value);
            let minValue = 0;

            let correctionBool = funcCorrectRangeInput(event.target, minValue, maxValue);
            if (correctionBool) {
                event.target.blur();
            }
        }  
    }
});


form_elDebitDOM.addEventListener("focusout", function () {
    
    let nrOfDecimalsKWH = 3;
    let minValueKWH = 0.01;
    let maxValueKWH;
    let rangeSuffixKWH = "System";
    let suffixNodeListKWH = document.querySelectorAll(`input[type="text"]:not([readonly])[id$="${rangeSuffixKWH}"]`);
    for (let i = 0; i < suffixNodeListKWH.length; i++) {
        funcCorrectNrOfDecimals(suffixNodeListKWH[i], nrOfDecimalsKWH);
        funcCorrectRangeInput(suffixNodeListKWH[i], minValueKWH, maxValueKWH);
    }
});

form_elDebitDOM.addEventListener("click", function () {
    
    let nrOfDecimalsKWH = 3;
    let minValueKWH = 0.01;
    let maxValueKWH;
    let rangeSuffixKWH = "System";
    let suffixNodeListKWH = document.querySelectorAll(`input[type="text"]:not([readonly])[id$="${rangeSuffixKWH}"]`);
    for (let i = 0; i < suffixNodeListKWH.length; i++) {
        funcCorrectNrOfDecimals(suffixNodeListKWH[i], nrOfDecimalsKWH);
        funcCorrectRangeInput(suffixNodeListKWH[i], minValueKWH, maxValueKWH);
    }
});



form_elCreditDOM.addEventListener("focusout", function () {
    
    let nrOfDecimals = 2;
    let minValue = 0;
    let maxValue = 24;
    let rangeSuffix = "_time";
    let suffixNodeList = document.querySelectorAll(`input[type="text"]:not([readonly])[id$="${rangeSuffix}"]`);

    for (let i = 0; i < suffixNodeList.length; i++) {
        funcCorrectRangeInput(suffixNodeList[i], minValue, maxValue);
        funcCorrectNrOfDecimals(suffixNodeList[i], nrOfDecimals);
    }
});



let fieldsetProductionDOM = document.getElementById("fieldset_elDebitProduction");
fieldsetProductionDOM.addEventListener("click", function (event) {
    
    // console.log("RADIOout");

    let RadioDOM = event.target.closest("input[type='radio']");
    if (RadioDOM === null) {
        // console.log("RADIO_pass");
        return;
    }

    let RadioName = RadioDOM.getAttribute("name"); 
    if (RadioName.startsWith("elDebitProduction")) {     

        funcHideSelectedFieldsetUnitByBoolElement(RadioName, RadioDOM.value);
    }

});




let fieldsetSystemDOM = document.getElementById("fieldset_elDebitSystem");
fieldsetSystemDOM.addEventListener("click", function (event) {

    // console.log("CHECKout");

    let CheckboxDOM = event.target.closest("input[type='checkbox']");
    if (CheckboxDOM === null) {
        // console.log("CHECK_pass");
        return;
    }

    if (CheckboxDOM.getAttribute("name").startsWith("elDebitSystem")) {
    
        funcCheckboxDeactivateInput(CheckboxDOM);
        // console.log("CHECK_on");

        // let inputDOM = CheckboxDOM.nextElementSibling.nextElementSibling.firstElementChild;
        let inputDOM = CheckboxDOM.parentNode.querySelector('input[type="text"]');
        inputDOM.focus();
    }
});



/////////////// 3. FUNKTIONER IFRÅN JS-FILEN //////////////////


function funcCheckboxDeactivateInput(CheckboxDOM) {
    // console.log(CheckboxDOM.value);
    let inputDOM = CheckboxDOM.parentNode.querySelector('input[type="text"]');
    let hiddenDOM = CheckboxDOM.parentNode.querySelector('input[type="hidden"]');

    if (CheckboxDOM.checked === true) {
        inputDOM.readOnly = false;
        if(hiddenDOM.value !== " - "){
            inputDOM.value = hiddenDOM.value;
        }
        console.log("CheckboxDOM", CheckboxDOM.value, hiddenDOM.value);
        
    } else if (CheckboxDOM.checked === false) {
        inputDOM.readOnly = true;
        if(inputDOM.value !== " - "){
            hiddenDOM.value = inputDOM.value;
        }
        inputDOM.value = " - ";
    }
}


function funcHideSelectedFieldsetUnitByBoolElement(RadioName, eventBooleanValue ){
    let unitType = RadioName.split("_").pop();
    unitType = unitType[0].toUpperCase() + unitType.slice(1); 
    let hiddenFieldsetDOM = document.querySelector(`fieldset[id$="${unitType}"]`);
    // console.log(hiddenFieldsetDOM, unitType, eventBooleanValue);

    if (eventBooleanValue === "true"){
        hiddenFieldsetDOM.style.display = "block";
        if (hiddenFieldsetDOM.previousElementSibling.tagName === "H3"){
            hiddenFieldsetDOM.previousElementSibling.style.display = "block";
        }
    } else if (eventBooleanValue === "false"){
        hiddenFieldsetDOM.style.display = "none";
        if (hiddenFieldsetDOM.previousElementSibling.tagName === "H3"){
            hiddenFieldsetDOM.previousElementSibling.style.display = "none";
        }
    }
}


//  3.b Funktionen:  when focusout - peopleCount
function funcCorrectRangeInput(element, minValue, maxValue) {
    let corrBool = false;
    if (element.readOnly === true){
        return;

    } else if (parseFloat(element.value) < minValue || isNaN(element.value)) {
        setTimeout(function() { alert(`Minsta tillåtna värdet är ${minValue}`); }, 1);
        element.value = minValue.toString();
        corrBool = true;

    } else if (parseFloat(element.value) > maxValue) {
        setTimeout(function() { alert(`Högsta tillåtna värdet är ${maxValue}`); }, 1);
        element.value = maxValue.toString();
        corrBool = true;
    }
    return corrBool;
}


//  3.c Funktionen:  when focusout 
function funcCorrectNrOfDecimals(element, nrOfDecimals) {
    
    if (element.tagName === "INPUT" && !isNaN(parseFloat(element.value)) && element.value !== "" && element.getAttribute("type") == "text")  {  
        
        if (Math.floor(parseFloat(element.value)) !== parseFloat(element.value)   ) { 
            element.value = parseFloat(element.value).toFixed(nrOfDecimals);
        }
    }
}






///////////////////// 4. FUNKTIONER I HTML-KODEN ///////////////////////////////////////


// 4.a Funktionen: exakt samma som i step4_events.js
function funcDeleteUnit(event) {
    if (document.readyState === 'complete') {
        let fieldsetElement = event.target.closest("fieldset");
        fieldsetElement.disabled = true;
        fieldsetElement.style.display = "none";
    }
}



// 4.b Funktionen:
function funcElAddUnit() {

    if (document.readyState === 'complete') {

        let allUnits = document.querySelectorAll('fieldset.elUnit');
        let x = 1 + allUnits.length;
        console.log(x);

        let nameUnit = window.prompt("Ange enhetens namn:");
        if (nameUnit == undefined || nameUnit == null) {
            return;
        } else(nameUnit = nameUnit.toUpperCase());

        var unitObject = funcReturnElUnitObject(x, nameUnit);
        let code = funcElAddUnitCode(unitObject);

        funcAddCodeToDOM(code, "fieldset_elCreditNew");

    }
}


// 4.c Funktionen: exakt samma som i step2_dataLoad.js
function funcReturnElUnitObject(x, nameUnit) {

    let idUnitPre = "elCredit" + x;
    let idFieldset = "fieldset_" + idUnitPre;
    let idName = idUnitPre + "_name";
    let idPower = idUnitPre + "_power";
    let idTime = idUnitPre + "_time";
    let idKWHdaily = idUnitPre + "_kWhDaily";
    let idDelete = idUnitPre + "_delete";
    console.log(idFieldset);

    var unitObject = {
        nameUnit: nameUnit,
        idFieldset: idFieldset,
        idName: idName,
        idPower: idPower,
        idTime: idTime,
        idKWHdaily: idKWHdaily,
        idDelete: idDelete
    };

    return unitObject;

}



// 4.d Funktionen: exakt samma som i step2_dataLoad.js
function funcElAddUnitCode(unitObject) {
    console.log(unitObject.nameUnit);
    let codeStringNewUnit = `   <fieldset id=     \"${unitObject.idFieldset}\"    class=\"elUnit\" ><h4>   ${unitObject.nameUnit}       </h4>     `;
    codeStringNewUnit += `   <input type=\"hidden\" id=  \"${unitObject.idName}\"  name=  \"${unitObject.idName}\"  value=  \"${unitObject.nameUnit}\"     ></input>  `;
    codeStringNewUnit += `   <label>Effekt:      <input type=  \"text\" id=   \"${unitObject.idPower}\"   name=   \"${unitObject.idPower}\"    /> W</label>  `;
    codeStringNewUnit += `   <label>Tid i drift: <input type= \"text\" id=    \"${unitObject.idTime}\"    name=   \"${unitObject.idTime}\"   /> timmar/dag</label>  `;
    codeStringNewUnit += `   <label>Förbrukning: <input type=\"text\" id=    \"${unitObject.idKWHdaily}\"    name=    \"${unitObject.idKWHdaily}\"   readonly /> kWh/dag</label>   `;
    codeStringNewUnit += `   <label><button onclick=\"funcDeleteUnit(event) \" type=\"button\" id=    \"${unitObject.idDelete}\"   onclick=\"funcHideFieldsetOnClick()\" > `;
    codeStringNewUnit += ` Ta bort!</button></label></fieldset>  `;
    console.log(codeStringNewUnit);
    return codeStringNewUnit;
}



// 4.e Funktionen: exakt samma i step2_dataLoad.js, step4_dataLoad.js, step2_events.js, step4_events.js
function funcAddCodeToDOM(code, fieldsetId) {
    let newFieldset = document.getElementById(fieldsetId);
    var newDiv = document.createElement("div");
    newDiv.innerHTML = code;
    newFieldset.appendChild(newDiv);
}





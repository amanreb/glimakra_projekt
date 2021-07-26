/*jshint esversion: 6 */

/*
----- INNEHÅLL i step5_events.js -------

1. OM INGEN TIDIGARE SPARAD FORM 

2. EVENTLISTENER
    2.a Eventet: formDOM.addEventListener("click", function (event)

3. FUNKTIONER
    3.a Funktionen: funcResetExtraBoolElements(divIdHidden, eventBooleanValue, resetValue)   i: step3_events.js, step5_events.js, step3_dataLoad.js, step5_dataLoad.js
*/



var form_waterDebitFD = JSON.parse(window.localStorage.getItem('form_waterDebit'));
var form_waterCreditFD = JSON.parse(window.localStorage.getItem('form_waterCredit'));


///////////////// 1. OM INGEN TIDIGARE SPARAD FORM ////////////////////////

if (!form_waterDebitFD) {
    funcResetExtraBoolElements("waterDebitOther_extra", "false", "false");
    funcHideSelectedFieldsetUnitByBoolElement("waterDebitOther_pump", "false");
}

//////////////// 2. EVENTLISTENER /////////////////////////////

document.addEventListener("DOMContentLoaded", function (event) {
    let sumCostDOM = document.getElementById("waterDebitSpend_cost");
    if (parseFloat(sumCostDOM.value) >= 0) {
        let maxValue = parseFloat(sumCostDOM.value);
        let minValue = 0;
        let tapInputDOM = document.getElementById("waterDebitSpend_costTap");
        let bottleInputDOM = document.getElementById("waterDebitSpend_costBottle");

        let correctionBool1 = funcCorrectRangeInput(tapInputDOM, minValue, maxValue);
        let correctionBool2 = funcCorrectRangeInput(bottleInputDOM, minValue, maxValue);
        // if (correctionBool1 || correctionBool2) {
        //     event.target.blur();
        // }
    }

});


//EV-b  focusout
document.addEventListener("keyup", function (event) {
    
    if (event.target.id === "waterDebitSpend_costTap" || event.target.id === "waterDebitSpend_costBottle") {
        let sumCostDOM = document.getElementById("waterDebitSpend_cost");
        if (parseFloat(sumCostDOM.value) >= 0) {
            let maxValue = parseFloat(sumCostDOM.value);
            let minValue = 0;

            let correctionBool = funcCorrectRangeInput(event.target, minValue, maxValue);
            if (correctionBool) {
                event.target.blur();
            }
                
        }
    }
});



var formDebitDOM = document.getElementById("form_waterDebit");
formDebitDOM.addEventListener("click", function (event) {

    let RadioDOM = event.target.closest("input[type='radio']");
    if (RadioDOM === null) {
        return;
    }

    let RadioName = RadioDOM.getAttribute("name");
    console.log(event.target);
    if (RadioName === "waterDebitOther_access") {

        funcResetExtraBoolElements("waterDebitOther_extra", RadioDOM.value, "false");

        //hide Pump-info och reset
        if (RadioDOM.value === "false") {
            funcHideSelectedFieldsetUnitByBoolElement("waterDebitOther_pump", "false");
            funcShowOnlyWhenChecked(RadioName + "True", "waterDebitOther_labelDrinkable");
            funcShowOnlyWhenChecked(RadioName + "False", "waterDebitOther_labelUnDrinkable");
            funcShowOnlyWhenChecked(RadioName + "True", "waterDebitPump_labelDrinkable");
            funcShowOnlyWhenChecked(RadioName + "False", "waterDebitPump_labelUnDrinkable");
            funcShowOnlyWhenChecked(RadioName + "False", "waterDebitOther_divNoPump");
        }
    } else if (RadioName === "waterDebitOther_drinkable") {

        funcShowOnlyWhenChecked(RadioName + "True", "waterDebitOther_labelDrinkable");
        funcShowOnlyWhenChecked(RadioName + "False", "waterDebitOther_labelUnDrinkable");
        funcShowOnlyWhenChecked(RadioName + "True", "waterDebitPump_labelDrinkable");
        funcShowOnlyWhenChecked(RadioName + "False", "waterDebitPump_labelUnDrinkable");

    } else if (RadioName === "waterDebitOther_pump") {

        funcHideSelectedFieldsetUnitByBoolElement("waterDebitOther_pump", RadioDOM.value);
        funcShowOnlyWhenChecked(RadioName + "False", "waterDebitOther_divNoPump");

    }

});





var formCreditDOM = document.getElementById("form_waterCredit");
formCreditDOM.addEventListener("focusout", function (event) {

    let nrOfDecimals = 1;
    funcCorrectNrOfDecimals(event.target, nrOfDecimals);

});

///////////// 3. FUNKTIONER //////////////////////////////




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




function funcHideSelectedFieldsetUnitByBoolElement(RadioName, eventBooleanValue) {
    let unitType = RadioName.split("_").pop();
    unitType = unitType[0].toUpperCase() + unitType.slice(1);
    let hiddenFieldsetDOM = document.querySelector(`fieldset[id$="${unitType}"]`);
    // console.log(hiddenFieldsetDOM, unitType, eventBooleanValue);

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



// 3.a Funktionen: exakt samma i step3_events.js, step5_events.js, step3_dataLoad.js, step5_dataLoad.js
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


//  
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

    if (element.tagName === "INPUT" && !isNaN(element.value) && element.value !== "" && element.getAttribute("type") == "text") {

        if (Math.floor(parseFloat(element.value)) !== parseFloat(element.value)) {
            element.value = parseFloat(element.value).toFixed(nrOfDecimals);
        }
    }
}
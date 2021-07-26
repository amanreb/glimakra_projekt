/*jshint esversion: 6 */

// step3_events.js


/*
----- INNEHÅLL i step3_events.js -------

1. OM INGEN TIDIGARE SPARAD FORM 

2. EVENTLISTENER
    2.a Eventet: formDOM.addEventListener("click", function (event)

3. FUNKTIONER
    3.a Funktionen: funcShowSelectedFieldsetHeatSource(systemNr, value)                       i: step3_dataLoad.js, step5_dataLoad.js 
    3.b Funktionen: funcResetExtraBoolElements(divIdHidden, eventBooleanValue, resetValue)    i: step3_events.js, step5_events.js, step3_dataLoad.js, step5_dataLoad.js
*/


var form_heatDebitFD = JSON.parse(window.localStorage.getItem('form_heatDebit'));


///////////////// 1. OM INGEN TIDIGARE SPARAD FORM ////////////////////////

if (!form_heatDebitFD){
    funcShowSelectedFieldsetHeatSource("1", "none");
    funcResetExtraBoolElements("div_heatDebitSystem2", "false","false");
    funcShowSelectedFieldsetHeatSource("2", "none");
}



//////////////// 2. EVENTLISTENER /////////////////////////////

//maste vara efter func_scenario.js och step3_dataLoad.js
document.addEventListener("DOMContentLoaded", function () {
    funcDisableConflictingRadio("heatDebitSystem1", "heatDebitSystem2", "");
    funcDisableConflictingRadio("heatDebitSystem2", "heatDebitSystem1", "");
});


let formDOM = document.getElementById("form_heatDebit");
formDOM.addEventListener("click", function (event) {

    let RadioDOM = event.target.closest("input[type='radio']");
    if (RadioDOM === null) {return;}
    console.log(RadioDOM.name);

    //radio-group nr1
    if (RadioDOM.name === "heatDebitSystem1")  {

        funcShowSelectedFieldsetHeatSource("1", RadioDOM.value);
        funcDisableConflictingRadio("heatDebitSystem1", "heatDebitSystem2", event);

    //radio-group nr2
    } else if (RadioDOM.name === "heatDebitSystem2_add") {
        
        let divIdHidden = "div_heatDebitSystem2";
        let eventBooleanValue = RadioDOM.value;
        let resetValue = "none";
        
        funcResetExtraBoolElements(divIdHidden, eventBooleanValue, resetValue);

        if (RadioDOM.value === "false"){
            funcShowSelectedFieldsetHeatSource("2", "none");
            funcDisableConflictingRadio("heatDebitSystem2", "heatDebitSystem1", event);
        }

    //radio-group nr3
    } else if (RadioDOM.name === "heatDebitSystem2"){

        funcShowSelectedFieldsetHeatSource("2", RadioDOM.value);
        funcDisableConflictingRadio("heatDebitSystem2", "heatDebitSystem1", event);
        
    }



});







// funcDisableMultipleRadioButtons(){
// heatDebitSystem1_El
// heatDebitSystem2_El2
// heatDebitSystem2_El3

// heatDebitSystem1_Sun
// heatDebitSystem2_Sun2
// }



///////////////////// 3. FUNKTIONER ///////////////////////////////////////


function funcDisableConflictingRadio(thisRadioName, otherRadioName, event) {
    let thisRadioNodeList = document.getElementsByName(thisRadioName);
    let otherRadioNodeList = document.getElementsByName(otherRadioName);
    let thisRadioCheckedDOM;
    let otherRadioCheckedDOM;

    // console.log(otherRadioNodeList);

    // let noneTest = document.getElementById("heatDebitSystem1_none");    
    // console.log(thisRadioNodeList[0].checked,  "none");

    for (let i = 0; i < thisRadioNodeList.length; i++) {

        if (thisRadioNodeList[i].checked === true) {
            // console.log(thisRadioNodeList[0],  "none");
            thisRadioCheckedDOM = thisRadioNodeList[i];
            // console.log(thisRadioCheckedDOM,  "none");
            break;
        }
    }

    for (let i = 0; i < otherRadioNodeList.length; i++) {
        if (otherRadioNodeList[i].classList.contains("radioReadOnly")){
            otherRadioNodeList[i].classList.remove("radioReadOnly");
            otherRadioNodeList[i].disabled=false;
        }
        
        if (otherRadioNodeList[i].checked === true) {
            otherRadioCheckedDOM = otherRadioNodeList[i];
            
        }
    }

    console.log(thisRadioCheckedDOM, otherRadioCheckedDOM);


    let thisCheckedValue = thisRadioCheckedDOM.value;
    // let thisSubstringValue = thisCheckedValue.substring(0, thisCheckedValue.length -1); 
    let thisCheckedValueNoNr = funcReturnStringWithoutEndNrs(thisCheckedValue);

    console.log(thisCheckedValueNoNr);


    for (let i = 0; i < otherRadioNodeList.length; i ++) {
        let otherValueNoNr = funcReturnStringWithoutEndNrs(otherRadioNodeList[i].value) ;
        if (otherValueNoNr === thisCheckedValueNoNr && otherValueNoNr !== "none" && otherRadioNodeList[i].disabled === false){
            otherRadioNodeList[i].disabled = true;
            otherRadioNodeList[i].classList.add("radioReadOnly");
        }
        // console.log(otherRadioNodeList[i].id, otherRadioNodeList[i].disabled);
    } 
}




function funcReturnStringWithoutEndNrs(fullString) {
    let noNrString = fullString;
    // console.log(Number.isInteger(parseInt(fullString[fullString.length-1])) );

    for (let i = 0; i <= fullString.length; i++) {
        if (  !Number.isInteger(parseInt(fullString[fullString.length -1 -i]) ) ){
            noNrString = fullString.substring(0, fullString.length  - i);
            console.log(noNrString);
            break;
        }
    }
    return noNrString;
}




// 3.a Funktionen: exakt samma som i step3_dataLoad.js
function funcShowSelectedFieldsetHeatSource(systemNr, value) {

    //hitta nodlista med alla fielsets
    let nodeListDOM;
    if (systemNr === "1") {
        nodeListDOM = document.querySelectorAll("fieldset.primaryHeatSource");
    } else if (systemNr === "2"){
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
    if (value === "none" ) {
        headingDOM.style.display = "none";
    } else {
        headingDOM.style.display = "block";
        let fieldsetId = "fieldset_heatDebit" + value;
        let fieldsetDOM = document.getElementById(fieldsetId);
        fieldsetDOM.style.display = "block";
    }
}




// 3.b Funktionen: exakt samma i step3_events.js, step5_events.js, step3_dataLoad.js, step5_dataLoad.js
function funcResetExtraBoolElements(divIdHidden, eventBooleanValue, resetValue) {

    let divHiddenDOM = document.getElementById(divIdHidden);

    if (divHiddenDOM){
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




////// GAMMALT///////////////////

// exakt samma som i step3_onload.js - anvands ej
/*function funcSetHeatSource(form_FD, key) {
    let value = form_FD[key];
    let idKey = key + "_" + value;
    // console.log("Heat Source: ", idKey);
    document.getElementById(idKey).checked = true;

    let systemNr = key.charAt(key.length - 1);

    funcShowSelectedFieldsetHeatSource(systemNr, value);
}*/




/*
// exakt samma som i step5.onload.js och step3_onload.js
function funcCheckRadioBoolean(value, key){
    let value = form_FD[key];
    value=value.replace(/^./, value[0].toUpperCase());
    let idKey = key + value.toString();
    console.log("idKey: ", idKey, typeof idKey);
    document.getElementById(idKey).checked = true;
} */

// function HideOrShowRadioDiv(divIdHidden, value){
//     if (value === false ){
//         //  console.log("gom", typeof form_heatDebitFD.heatDebitSystem2_add );
//         divIdHidden.style.display= "none";
//     } else if (value === true) {
//         divIdHidden.style.display= "block";
//     }

// }




// Hide div_heatDebitSystem2 if heatDebitSystem2_addFalse checked, otherwise show:
/*
//lyssna efter NEJ-klick
let hideHeatSourceDOM = document.getElementById("heatDebitSystem2_addFalse");
hideHeatSourceDOM.addEventListener("click", function (event) {
    // console.log("NEJ checked: ", hideHeatSourceDOM.checked);
    if (hideHeatSourceDOM.checked == true) {
        document.getElementById("div_heatDebitSystem2").style.display = "none";
        let system2noneDOM =document.getElementById("heatDebitSystem2_none");
        system2noneDOM.checked=true;
        // console.log("system2-none: ", system2noneDOM.checked )

        funcShowSelectedFieldsetHeatSource("2", "none");
    }
})
*/

/*
//lyssna efter JA-klick
let showHeatSourceDOM = document.getElementById("heatDebitSystem2_addTrue");
showHeatSourceDOM.addEventListener("click", function (event) {
    // console.log("JA checked: ", showHeatSourceDOM.checked);
    if (showHeatSourceDOM.checked == true) {
        document.getElementById("div_heatDebitSystem2").style.display = "block";
    }
})
*/

// let reloadButton = document.querySelector('div.mainControlsReload>a');
// if (reloadButton) {
//     reloadButton.addEventListener("click", function (event) {
//         event.preventDefault();
//         console.log("hej");
//         console.log("click", event);
//         window.location.href = window.location.href;
//         // window.location.reload();
//     })
// }

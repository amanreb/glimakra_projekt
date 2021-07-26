/*jshint esversion: 6 */

/*
----- INNEHÅLL i step1_events.js -------
1. GLOBALT
    

2. EVENTLISTENER 
    2.a Eventet: addEventListener("DOMContentLoaded", function (event) )
                    funcCorrectIntInput(peopleCountDOM, mathType);
                    funcCorrectRangeInput(peopleCountDOM, minValue, maxValue)
                    funcCorrectNrOfDecimals(suffixNodeList[i], nrOfDecimals)

    2.b Eventet: addEventListener("focusout", function(event) )
                    funcCorrectIntInput(event.target, mathType)
                    funcCorrectRangeInput(event.target,minValue, maxValue)
                    funcCorrectNrOfDecimals(event.target, nrOfDecimals)


3. FUNKTIONER           
    
    3.a Funktionen: funcCorrectIntInput(element, mathType)                 i:  
    3.b Funktionen: funcCorrectRangeInput(element, minValue, maxValue)     i:
    3.c Funktionen: funcCorrectNrOfDecimals(element, nrOfDecimals)         i:  step1_events.js, step1_calculate.js
*/





/////////////// 1. GLOBALT //////////////////

let peopleCountDOM = document.getElementById("moneyCreditPeople_count");




//////////////// 2. EVENTLISTENER /////////////////////////////

// EV-a  onload
document.addEventListener("DOMContentLoaded", function () {

    let mathType = "floor";
    let minValue = 1;
    let maxValue = 7;
    funcCorrectIntInput(peopleCountDOM, mathType);
    funcCorrectRangeInput(peopleCountDOM, minValue, maxValue);

    let nrOfDecimals = 2;
    let suffix = "Money";
    let suffixNodeList = document.querySelectorAll(`input[type="text"]:not([readonly])[id$="${suffix}"]`); //input[type="text"][id$="${suffix}"]:not([readonly])
    for (let i = 0; i < suffixNodeList.length; i++) {
            //   console.log(suffixNodeList[i]);
        funcCorrectNrOfDecimals(suffixNodeList[i], nrOfDecimals);
    } 
});




//EV-b  focusout
document.addEventListener("focusout", function (event) {

    if (event.target.id === "moneyCreditPeople_count") {
        let mathType = "floor";
        let minValue = 1;
        let maxValue = 7;
        funcCorrectIntInput(event.target, mathType);
        funcCorrectRangeInput(event.target, minValue, maxValue);

    } else if (event.target.tagName === "INPUT" && !event.target.readOnly) {
        let nrOfDecimals = 2;
        funcCorrectNrOfDecimals(event.target, nrOfDecimals);
    }
});




/////////////// 3. FUNKTIONER //////////////////


//  3.a Funktionen: when focusout - peopleCount
function funcCorrectIntInput(element, mathType) {
    let floatValue = parseFloat(element.value);
    let intValue = Math[mathType](floatValue);
    element.value = intValue.toString();
    // console.log("correct int-Value");
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




////// GAMMALT///////////////////

// finns i annan eventlistener
//EV-3  Korrigera People_count-vardet
// let peopleInputDOM = document.getElementById("moneyCreditPeople_count");
// peopleInputDOM.addEventListener("focusout", function(){

//     let intValue = Math.floor(parseFloat(peopleInputDOM.value));
//     console.log ("intValue", intValue)
//     if (peopleInputDOM.value<1 || isNaN(peopleInputDOM.value) ) {
//         peopleInputDOM.value = "1";
//         alert("Det måste ingå minst 1 person i hushållet")
//     } else if (peopleInputDOM.value>7) {
//         peopleInputDOM.value = "7";
//         alert("Du får ange maximalt 7 person i hushållet");
//     }
// })

//funcCorrectFloatInput(event.target);
// 3.b Funktionen: funcCorrectFloatInput (element)                       focusout

// 
// function funcReturnStringifiedNr(newNr, nrOfDecimals) {
//     console.log("newNrXX", newNr, typeof newNr);
//     // if (Math.floor(parseFloat(newNr)) !== parseFloat(newNr)) {
//     //     newNr = parseFloat(newNr).toFixed(nrOfDecimals);
//     // } else {
//     //     newNr = parseFloat(newNr).toFixed(0);
//     // }
//     if (newNr === ""){

//     } else if (Math.floor(newNr) !== newNr) {
//         newNr = newNr.toFixed(2);
//     } else {
//         newNr = parseFloat(newNr).toFixed();
//     }
    
//     console.log(newNr,"newnrsHH", typeof newNr);
//     return newNr;
// }
//  3.d Funktionen:
// ta bort ovan function
// function funcReturnStringifiedNr(newNr, nrOfDecimals) {
//     if (Math.floor(parseFloat(newNr)) !== parseFloat(newNr)) {
//         newNr = parseFloat(newNr).toFixed(nrOfDecimals);
//     } else {
//         newNr = parseFloat(newNr).toFixed(0);
//     }
//     console.log(newNr);
//     return newNr;
// }

// arrayInputDOM[i].value =  funcReturnStringifiedNr(test, nrOfDecimals) ;
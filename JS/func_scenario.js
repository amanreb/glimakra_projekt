/*jshint esversion: 6 */

/*
----- INNEHÅLL i step1_scenario.js -------

1. GLOBAL
    1.a SET mainGeneralInfo - BOXEN          - funcSetMainGeneralInfoBoxen()
    1.b Deactivate according to scenario     - funcDeactivateScenarioRelatedElements(scenarioType)
    1.c Clean all number-inputs              - funcEliminateNaNfromFloatInput(element)

2. EVENTLISTENERS
    2.a Eventet: addEventListener("keyup", function(event)     
                    funcFocusoutOnEnter(event)
                    funcEliminateMinusNr(event)
                    funcCorrectComma(event)

    2.b Eventet: addEventListener("focusout", function(event)  
                    funcEliminateNaNfromFloatInput(event.target)

    2.c Eventet: addEventListener("mousedown", function(event) 
                    funcInfoAboutScenarioDeactivation(event)


3. FUNKTIONER
    3.a Funktionen: funcSetMainGeneralInfoBoxen()
    3.b Funktionen: funcDeactivateScenarioRelatedElements(scenarioType)
    3.c Funktionen: funcEliminateNaNfromFloatInput(element)
    3.d Funktionen: funcFocusoutOnEnter(event)
    3.e Funktionen: funcEliminateMinusNr(event)
    3.f Funktionen: funcCorrectComma(event)
    3.g Funktionen: funcInfoAboutScenarioDeactivation(event)
*/


///////////////////////////// 1. GLOBAL //////////////////////////////////////////////////////

// 1.a SET mainGeneralInfo - BOXEN
funcSetMainGeneralInfoBoxen();


// 1.b Deactivate according to scenario
// no money-system
funcDeactivateScenarioRelatedElements("money");

// no el-system
funcDeactivateScenarioRelatedElements("el");

// no heatOil-market
funcDeactivateScenarioRelatedElements("heatOil");

// no heatOther-system
funcDeactivateScenarioRelatedElements("heatOther");

// no food-chain
funcDeactivateScenarioRelatedElements("food");

// no water-system
funcDeactivateScenarioRelatedElements("water");

//no el-system + no heatOil-market
funcDeactivateScenarioRelatedElements("heatOilANDheatOther");

//no food-chain + no water-system
funcDeactivateScenarioRelatedElements("foodANDwater");

//no food-chain + no water-system
funcDeactivateScenarioRelatedElements("elANDheatOil");




// 1.c Clean all number-inputs
let arrayOfInputDOM = document.querySelectorAll('input[type="text"]:not([readonly])');
arrayOfInputDOM.forEach(funcEliminateNaNfromFloatInput);


funcDistortFrameOfScenarioInput();
funcDistortFrameOfSystemUnitInput();


// 1.d Set cost variables 
// funcSetScenarioCosts();

// 1.e infor about cost error
// funcInfoCostError();



//////////////// 2. EVENTLISTENER /////////////////////////////



//EV-a keyup
document.addEventListener("keyup", function (event) {
    funcFocusoutOnEnter(event);
    funcEliminateMinusNr(event);
    funcCorrectComma(event);
});


//EV-b Focusout
document.addEventListener("focusout", function (event) {
    funcEliminateNaNfromFloatInput(event.target);
});


//EV-c Mousedown 
// document.addEventListener("mousedown", function (event) {
//     funcInfoAboutScenarioDeactivation(event);
//     funcInfoAboutDisabledRadio(event);
//     funcDistortFrameOfScenarioInput();
//     funcDistortFrameOfSystemUnitInput();
// });

document.addEventListener("click", function (event) {
    funcInfoAboutScenarioDeactivation(event);
    funcInfoAboutSystemUnitDeactivation(event);
    funcInfoAboutDisabledRadio(event);
    funcDistortFrameOfScenarioInput();
    funcDistortFrameOfSystemUnitInput();
});

// energirutan
// let energyInfoDOM = document.querySelector(`fieldset[id$="DebitEnergy"]`);
// if(energyInfoDOM){
//     energyInfoDOM.addEventListener("click", function (event){
//         funcInfoAboutSystemUnitDeactivation(event);
//     });
// }




// food dissabled
// let foodDebitDOM = document.getElementById("form_foodDebit");
// if (foodDebitDOM){
//     foodDebitDOM.addEventListener("mousedown", function (event){
//         funcInfoAboutDisabledTextInput(event);
//     });
// }



///////////////////////// 3. FUNKTIONER ///////////////////////////////////////////////////////////


///1---
function funcDistortFrameOfScenarioInput() {
    let inputNodeList = document.querySelectorAll(`input[class$="_scenario"][readonly]`);
    inputNodeList.forEach(Node => {
        if (Node.value === " - ") {
            // Node.style.border = "4px solid #0000FF"; //rgb(138, 16, 112) #cd18a6 #8a1070"  #a01381
            Node.style.border = "4px solid #800464";
            Node.style.color = "#a01381";
            Node.style.fontSize = "40px";
            // Node.style.backgroundColor = "#ea48c7";
            Node.style.backgroundColor = "#bf58a9";
            // Node.style.margin = "auto 0px auto 0px";
            // Node.style.justifySelf= "space-around"; 
            // Node.style.borderRadius = "4px";
            // Node.style.outline = "4px inset #800464";
        }
    });
}




///2---

function funcDistortFrameOfSystemUnitInput() {

    let inputNodeList = document.querySelectorAll(`input[type="text"][class$="systemUnit"]`);
    console.log(inputNodeList);
    inputNodeList.forEach(Node => {
        console.log(Node.value, Node.readOnly);
        if (Node.value === " - " && Node.readOnly === true) {
            // Node.style.border = "thick solid #0000FF"; //rgb(138, 16, 112) #cd18a6 #8a1070"
            Node.style.border = "4px solid #bd551a";
            Node.style.color = "#bd551a";
            Node.style.fontSize = "40px";
            Node.style.backgroundColor = "#d68f66";
            // Node.style.borderRadius = "4px";
            // Node.style.outline = "4px solid #bd551a";
        } else if (Node.readOnly === true) {} else {
            console.log(Node);
            // Node.style.border = "#383838"; 
            Node.style.border = " 1px solid rgba(56, 56, 56, 0.767)";
            Node.style.color = "black";
            Node.style.fontSize = "22px";
            // Node.style.backgroundColor = "#F0E9C3";
            Node.style.backgroundColor = "rgb(240, 233, 195)";
        }
    });
}


// background-color:rgb(214, 143, 102);
//     color:rgb(189, 85, 26);
//     border:thick solid rgb(189, 85, 26); #bd551a




///3---

function funcCheckConditionOfScenarioType(scenarioType) {
    let scenarioConditionsArray = [false, false];
    let path = window.location.pathname;
    let pageName = path.split("/").pop().split(".").shift();
    let spanId = scenarioType + "_span_" + pageName;
    let spanOFFId = scenarioType + "_spanOFF_" + pageName;
    let spanONId = scenarioType + "_spanON_" + pageName;
    let spanIdDOM = document.getElementById(spanId);
    let spanOFFIdDOM = document.getElementById(spanOFFId);
    let spanONIdDOM = document.getElementById(spanONId);

    console.log(spanIdDOM.style.display, spanONIdDOM.style.display);
    if (window.getComputedStyle(spanIdDOM).display !== "none" && window.getComputedStyle(spanONIdDOM).display !== "none") {
        scenarioConditionsArray[0] = true;
    } else if (spanOFFIdDOM.style.display !== "none") {
        scenarioConditionsArray[1] = true;
    }

    console.log("har", scenarioConditionsArray, scenarioType);
    return scenarioConditionsArray;
}


///4---
// 3.b Funktionen: Globalt, Exakt samma i step4_events.js
function funcDeactivateScenarioRelatedElements(scenarioType) {

    let totalScenarioCondition = false;

    if (scenarioType.includes("AND")) {
        let scenarioTypeList = scenarioType.split("AND");
        let scenarioWord1_Conditions = funcCheckConditionOfScenarioType(scenarioTypeList[0]);
        let scenarioWord2_Conditions = funcCheckConditionOfScenarioType(scenarioTypeList[1]);
        if ((scenarioWord1_Conditions[0] || scenarioWord1_Conditions[1]) && (scenarioWord2_Conditions[0] || scenarioWord2_Conditions[1])) {
            totalScenarioCondition = true;
        }
    } else {
        let scenarioWord_Conditions = funcCheckConditionOfScenarioType(scenarioType);
        if (scenarioWord_Conditions[0] || scenarioWord_Conditions[1]) {
            totalScenarioCondition = true;
        }
    }


    if (totalScenarioCondition === true) {
        let elementListDOM = document.querySelectorAll("." + scenarioType + "_scenario");
        // console.log(elementListDOM);
        elementListDOM.forEach(function (itemDOM) {
            if (itemDOM.tagName === "INPUT" && itemDOM.getAttribute("type") == "text") {
                console.log("AAAA");
                itemDOM.readOnly = true;
                itemDOM.value = " - ";
                // } else if (itemDOM.tagName === "INPUT" && itemDOM.getAttribute("type") == "radio") {
                // console.log("BBB");
                // itemDOM.disabled = true;
                // } else if (itemDOM.tagName === "FIELDSET") {
                //     itemDOM.disable = true;
            }
        });
    }
}




///5---
// 3.g Funktionen: when mousedown
function funcInfoAboutScenarioDeactivation(event) {
    // console.log(event.target.className.includes("_scenario") );
    if (event.target.value === " - " && event.target.tagName === "INPUT" && event.target.readOnly && event.target.className.includes("_scenario")) {
        let scenarioType = event.target.classList[0].split("_").shift();
        let scenarioWord_Conditions, scenarioWord1_Conditions, scenarioWord2_Conditions;
        scenarioWord_Conditions = scenarioWord1_Conditions = scenarioWord2_Conditions = [false, false];

        console.log(scenarioWord_Conditions, event.target.classList, scenarioType);
        if (scenarioType.includes("AND")) {
            let scenarioTypeList = scenarioType.split("AND");
            console.log(scenarioTypeList);
            scenarioWord1_Conditions = funcCheckConditionOfScenarioType(scenarioTypeList[0]);
            scenarioWord2_Conditions = funcCheckConditionOfScenarioType(scenarioTypeList[1]);
        } else {
            scenarioWord_Conditions = funcCheckConditionOfScenarioType(scenarioType);
        }


        let stringAlert;

        switch (scenarioType) {
            case "money":
                stringAlert = "banksystemet";
                break;
            case "el":
                stringAlert = "elnätet";
                break;
            case "heatOil":
                stringAlert = "bensin-/oljemarknaden";
                break;
            case "heatOther":
                stringAlert = "fjärrvärme/naturgasnätet, pelletsmarknaden";
                break;
            case "food":
                stringAlert = "livsmedelskedjan";
                break;
            case "water":
                stringAlert = "vattenledningsnätet";
                break;
            case "elANDheatOil":
                stringAlert = "elnätet och bensin-/oljemarknaden";
                break;
            case "foodANDwater":
                stringAlert = "livsmedelskedjan och vattenledningsnätet";
                break;
            case "heatOilANDheatOther":
                stringAlert = "bensin-/oljemarknaden och fjärrvärme-/naturgasnätet/pelletsmarknaden";
                break;
            default:
                stringAlert = "något";
        }

        if (scenarioWord_Conditions[0] || (scenarioWord1_Conditions[0] && scenarioWord2_Conditions[0])) {
            console.log("tjo", scenarioWord2_Conditions[0]);
            alert("Rutan är deaktiverad p.g.a ditt valda scenario: - att " + stringAlert + " inte fungerar!");
        } else if (scenarioWord_Conditions[1] || (scenarioWord1_Conditions[1] && scenarioWord2_Conditions[1])) {
            alert("Rutan är deaktiverad p.g.a valda scenariot - att " + stringAlert + " inte har relevans!");
        } else if ((scenarioWord1_Conditions[0] && scenarioWord2_Conditions[1]) || (scenarioWord1_Conditions[1] && scenarioWord2_Conditions[0])) {
            alert("Rutan är deaktiverad p.g.a valda scenariot - att " + stringAlert + " inte fungerar eller inte har relevans!");
        }
    }
}



///6---
function funcInfoAboutSystemUnitDeactivation(event) {
    let keyWord;
    let extraInfo = "";
    let systemUnitClassString = event.target.className;
    console.log("systemUnitClassString", systemUnitClassString);

    let path = window.location.pathname;
    let pageName = path.split("/").pop().split(".").shift();
    if (pageName !== "step2") {
        extraInfo = "Enheten kan slås på i steg 2.";
    }

    //systemUnit i inforutan
    if (event.target.value === " - " && event.target.tagName === "INPUT" && event.target.readOnly && systemUnitClassString.includes("systemUnit")) {
        console.log(keyWord);

        console.log(systemUnitClassString);
        if (systemUnitClassString.includes("circulationPump")) {
            keyWord = "för vattenburen värmecirkulation";
        } else if (systemUnitClassString.includes("elHeater")) {
            keyWord = "för uppvärmning";
        } else if (systemUnitClassString.includes("fridge")) {
            keyWord = "kylen";
        } else if (systemUnitClassString.includes("freezer")) {
            keyWord = "frysen";
        } else if (systemUnitClassString.includes("waterPump")) {
            keyWord = "vattenpumpen";
        }
    }
    console.log(keyWord);
    // radio
    /* } else if (event.target.tagName === "img" && event.target.parentNode.parentNode.parentNode.firstElementChild.hasAttribute("class")) {
        letRadioClassName = event.target.parentNode.parentNode.parentNode.firstElementChild.className;

        if (RadioClassName.includes("elHeaterEl_scenario") && RadioClassName.includes("circulationPumpEl_scenario")) {
            keyWord = "för vattenburen värmecirkulation och elektrisk uppvärmning";
        } else if (RadioClassName.includes("circulationPumpEl_scenario")) {
            keyWord = "för vattenburen värmecirkulation";
        } else if (RadioClassName.includes("elHeaterEl_scenario")) {
            keyWord = "för elektrisk uppvärmning";
        } else if (RadioClassName.includes("waterPumpEl_scenario")) {
            keyWord = "för elektrisk uppvärmning";
        }

    // kyl   hasDescendant 
    } else if (event.target.hasDescendant("input:disabled")        firstElementChild.classList.contains("fridgeEl_scenario") && event.target.firstElementChild.disabled === true) {
        keyWord = "kylen";

    // frys
    } else if (event.target.firstElementChild.classList.contains("freezerEl_scenario")  && event.target.firstElementChild.disabled === true) {
        keyWord = "frysen";
    }
*/
    if (keyWord) {
        alert(`Rutan är deaktiverad p.g.a att den elektriska enheten ${keyWord} har stängts ner! ${extraInfo}`);
    }
}


///6---
function funcInfoAboutDisabledRadio(event) {
    let keyWord;
    let divDOM;
    console.log(event.target.parentNode.tagName);
    if (event.target.tagName === "IMG" && event.target.parentNode.parentNode ) {

        if (event.target.parentNode.parentNode.parentNode.tagName === "DIV") {
            divDOM = event.target.parentNode.parentNode.parentNode;

            if (divDOM.classList.contains("squareRadioLine")) {

                if (divDOM.firstElementChild.hasAttribute("type") && divDOM.firstElementChild.hasAttribute("class")) {

                    if (divDOM.firstElementChild.getAttribute("type") === "radio") {

                        if (divDOM.firstElementChild.disabled === true && !divDOM.firstElementChild.classList.contains("radioReadOnly")) {

                            let classString = divDOM.firstElementChild.className;
                            // console.log("HEJ");
                            if (classString.includes("circulationPumpEl_scenario") && classString.includes("elHeaterEl_scenario")) {
                                keyWord = "för vattenburen värmecirkulation och elektrisk uppvärmning";
                            } else if (classString.includes("circulationPumpEl_scenario")) {
                                keyWord = "för vattenburen värmecirkulation";
                            } else if (classString.includes("elHeaterEl_scenario")) {
                                keyWord = "för uppvärmning";
                            } else if (classString.includes("waterPumpEl_scenario")) {
                                keyWord = "vattenpumpen";
                            }

                            if (keyWord) {
                                alert(`Rutan är deaktiverad p.g.a att den elektriska enheten ${keyWord} har stängts ner! Enheten kan slås på i steg 2.`);
                            }
                        }
                    }
                }
            }
        }
    }
}



/////////////////////////////////////////////

// function funcInfoAboutDisabledTextInput(event) {
//     let keyWord;

//     if (event.target.tagName === "LABEL"){
//         let disabledScenarioInputDOM = event.target.querySelector('input[type="text"][class $="El_scenario"][disabled]');
//         if (disabledScenarioInputDOM){
//             if (disabledScenarioInputDOM.classList.contains("fridgeEl_scenario") ){
//                 keyWord = "kylen";
//             } else if (disabledScenarioInputDOM.classList.contains("freezerEl_scenario") ){
//                 keyWord = "frysen";
//             }
//         console.log(keyWord, disabledScenarioInputDOM.id);

//         }
//     }

//     if(keyWord){
//         alert(`Rutan är deaktiverad p.g.a att den elektriska enheten ${keyWord} har stängts ner!`);
//     }
// }



// 3.a Funktionen: Globalt
function funcSetMainGeneralInfoBoxen() {

    var form_scenarioFD = JSON.parse(window.localStorage.getItem('form_scenario'));
    let path = window.location.pathname;
    let pageName = path.split("/").pop().split(".").shift();

    if (form_scenarioFD) {

        for (let [key, value] of Object.entries(form_scenarioFD)) {
            let scenarioType = key.split("_").pop();
            let spanId = scenarioType + "_span_" + pageName;
            let spanONId = scenarioType + "_spanON_" + pageName;
            let spanOFFId = scenarioType + "_spanOFF_" + pageName;
            document.getElementById(spanOFFId).style.display = "none";

            // console.log(spanId);
            if (value === "true") {
                document.getElementById(spanId).style.display = "none";
            } else if (value === "false") {

            } else if (value === "none") {
                document.getElementById(spanONId).style.display = "none";
                document.getElementById(spanOFFId).style.display = "inline";
            }
        }
    } else {
        let nodeListSpanDOM = document.querySelectorAll('[id*="_span_"]');
        for (let spanDOM of nodeListSpanDOM) {
            spanDOM.style.display = "none";
        }
        let nodeListSpanOFFDOM = document.querySelectorAll('[id*="_spanOFF_"]');
        for (let spanOFFDOM of nodeListSpanOFFDOM) {
            spanOFFDOM.style.display = "none";
        }
    }

}



//  3.c Funktionen: when foucusout and GLOBAL
function funcEliminateNaNfromFloatInput(element) {
    // console.log('value', element.value);

    let value = element.value;

    if (element.readOnly || element.getAttribute("type") !== "text" || value == "") {} //|| element.id === "moneyCreditPeople_count")
    else if (isNaN(parseFloat(value))) {
        element.value = "";
        console.log("eliminateNan");
    } else {
        element.value = parseFloat(value).toString();
    }
}



//  3.d Funktionen: when keyup
function funcFocusoutOnEnter(event) {
    if (event.keyCode == 13) {
        event.target.blur();
        console.log("blur");
    }
}



//  3.e Funktionen:  when keyup
function funcEliminateMinusNr(event) {
    if (event.keyCode === 109 || event.keyCode === 189 || event.keyCode === 173) {
        if (event.target.tagName === "INPUT" && event.target.value.startsWith("-") && !event.target.readOnly) {
            if (event.target.id !== "heatCreditRoom_outsideTemp") {
                event.target.value = "0";
            }
        }
    }
    console.log(event.keyCode, event.target.tagName);
}



//  3.f Funktionen:  when keyup
function funcCorrectComma(event) {
    if (event.keyCode === 188 || event.keyCode === 110) {
        if (event.target.tagName === "INPUT" && event.target.getAttribute("type") === ("text") && !event.target.readOnly) {
            event.target.value = event.target.value.replace(",", ".");
        }
    }
}





////// GAMMALT///////////////////
/*
// 3.h Funktionen: when pageload
function funcSetScenarioCosts() {
    let costFieldsetDOM = document.querySelector(`fieldset[id$="DebitSpend"]`);
    let arrayOfCostInputs = document.querySelectorAll(`fieldset[id$="DebitSpend"] input`);

    if (arrayOfCostInputs.length === 3) {

        // sumId, varDependentId, freeVar1Id
        let sumDOM = costFieldsetDOM.querySelector(`input[id$="_cost"]`);
        let varDependentDOM = arrayOfCostInputs[1];
        let freeVarDOM = arrayOfCostInputs[2];;

        let sumFloat = parseFloat(sumDOM.value);

        // om en eller bada ar disabled
        if (freeVarDOM.value === " - " && varDependentDOM.value === " - " && sumFloat > 0) {
            varDependentDOM.value = "cost-err";
        } else if (freeVarDOM.value === " - ") {
            varDependentDOM.value = sumFloat;
            varDependentDOM.readOnly = true;
        } else if (varDependentDOM.value === " - ") {
            freeVarDOM.value = sumFloat;
            freeVarDOM.readOnly = true;
        }

    }
}



function funcInfoCostError() {
    let arrayOfCostInputs = document.querySelectorAll(`fieldset[id$="DebitSpend"] input`);
    let inputErr = false;

    arrayOfCostInputs.forEach(function (inputDOM) {
        if (inputDOM.value === "cost-err") {
            inputErr = true;
        }
    });

    // console.log(inputErr);
    if (inputErr) {

        let path = window.location.pathname;
        let pageName = path.split("/").pop().split(".").shift();

        if (pageName === "step2" || pageName === "step5") {
            let debitSpendCostDOM = document.querySelector(`input[id$="DebitSpend_cost"]`);
            // var form_moneyCreditFD = JSON.parse(window.localStorage.getItem('form_moneyDebit'));
            // debitSpendCostDOM.value=0;
            // inputErrDOM = 0;
            let alertText1 = "Du har angett en månads-kostnad på " + debitSpendCostDOM.value + " SEK.";
            let alertText2 = " Men ditt valda scenario ger en kostnad på 0 SEK."
            if (pageName === "step2") {
                alert(alertText1 + alertText2);
            }
        }
    }

}
*/





// console.log(document.getElementById("money_span_step1").style.display, "x");
// console.log(document.getElementById("el_span_step1").style.display, "y");

// EV-1 Skriv ut summan vid pageload
// document.addEventListener("DOMContentLoaded", function(){

// });

// console.log(`span[ id^= "${scenarioType}_span_" ]`, "har");    
// (`span[id^="${scenarioType}_span_"]`).style.display

// ('*[id^="createdOnID"]')


// 3.b Funktionen:
/*function funcDeactivateInput(idInput) {
    let inputDOM = document.getElementById(idInput);
    inputDOM.readOnly = true;
    inputDOM.value = " - ";
}*/


// 1.c scenario  el-false
/*if (document.getElementById("el_span_step1").style.display !== "none") {
    console.log("no el");
    funcDeactivateInput("moneyCreditSpend_el");
}


//1.d scenario  food-false
if (document.getElementById("food_span_step1").style.display !== "none") {
    console.log("no food");
    funcDeactivateInput("moneyCreditSpend_food");
}*/

// funcDeactivateInput("moneyDebitAssets_bank");
// funcDeactivateInput("moneyDebitIncome_bank");



/*console.log("classList", event.target.classList[0]);
let path = window.location.pathname;
let pageName = path.split("/").pop().split(".").shift();

let spanId = scenarioType + "_span_" + pageName;
let spanOFFId = scenarioType + "_spanOFF_" + pageName;*/

// let idInput = event.target.id;
// console.log(event.target.value, idInput, idInput.split(/[A-Z]/).shift() );
// let systemType = idInput.split("_").pop() ;


// function funcInfoAboutDisabledElUnitScenarioInputs(event){
//     console.log(event.target);
//     let inputDOM = event.target.closest("input[type='radio'],input[type='text']");
//     let stringVariable;

//     if (inputDOM === null) { return;}
//     console.log(inputDOM, event.target);
//     if (inputDOM.classList.contains("circulationPumpEl_scenario") && event.target.classList.contains("elHeaterEl_scenario") ){
//         stringVariable = "cirulationspumpen och elvärmen";
//     } else if ( inputDOM.classList.contains("circulationPumpEl_scenario") ){
//         stringVariable = "cirulationspumpen";
//     } else if ( inputDOM.classList.contains("elHeaterEl_scenario") ){
//         stringVariable = "elvärmen";
//     } else if ( inputDOM.classList.contains("fridgeEl_scenario") ){
//         stringVariable = "kylen";
//     } else if ( inputDOM.classList.contains("freezerEl_scenario") ){
//         stringVariable = "frysen";
//     } else if ( inputDOM.classList.contains("waterPumpEl_scenario") ){
//         stringVariable = "vattenpumpen";
//     } 

//     alert(`Rutan är deaktiverad p.g.a att den elektriska enheten ${stringVariable} har stängts ner!`);

//     // disabledLabelDOM= document.querySelector(`label[for="${event.target.id}"]`);  

// }
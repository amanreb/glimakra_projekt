/*jshint esversion: 6 */


/////////////// 1. GLOBALT //////////////////



//////////////// 2. EVENTLISTENER /////////////////////////////

//--FORWARDS STORAGE--


// PLAY - BUTTON  (forwards-storage)

let playButton = document.querySelector('div.mainControlsStartPlay>a');

if (playButton) {

    playButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("click", event);

        let checked = document.querySelectorAll("input:checked");
        console.log(checked.length);
        console.log(checked);

        if (checked.length == 6) {
            funcAddFormToLocalStorage("scenario");
            let playHref = playButton.href;
            window.location.href = playHref;
        } else {
            alert("Välj ditt scenario för att kunna fortsätta.");
        }
    });

}


// NEXT - BUTTON  (forwards-storage)

let nextButton = document.querySelector('div.mainControlsNext>a');

if (nextButton) {

    nextButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("hej");
        console.log("click", event);

        let path = window.location.pathname;
        let pageName = path.split("/").pop().split(".").shift();
        console.log(pageName);
        let conditionMoney = funcTestNextButtonConditionMoney(pageName);
        let conditionEl = funcTestNextButtonConditionEl(pageName);
        let conditionOther = funcTestNextButtonConditionOther(pageName);
        if (conditionMoney === true && conditionEl === true && conditionOther === true) {
            funcAddFormToLocalStorage("Debit");
            funcAddFormToLocalStorage("Credit");
            let nextHref = nextButton.href;
            window.location.href = nextHref;
        }

    });
}



//--NO STORAGE--


// RESTART - BUTTON

let restartButton = document.querySelector('div.mainControlsRestart>a');

if (restartButton) {
    restartButton.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.clear();
        let restartHref = restartButton.href;
        window.location.href = restartHref;
    });
}




// RELOAD - BUTTON
let reloadButton = document.querySelector('div.mainControlsReload>a');

if (reloadButton) {
    reloadButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("hej");
        console.log("click", event);
        window.location.href = window.location.href;
        // window.location.reload();
    });
}




//--BACK STORAGE--

// BACK - BUTTON  (back-storage)
let backButton = document.querySelector('div.mainControlsBack>a');

if (backButton) {
    funcAddEventListenerForBackStoring(backButton);
}





// FORM-LINK (back-storage)
let changePreviousFormNodeList = document.querySelectorAll('a.changePreviousFormLink');

if (changePreviousFormNodeList) {

    changePreviousFormNodeList.forEach(nodeListElement => {
        funcAddEventListenerForBackStoring(nodeListElement);
    });
}




//BOX-LINK (back-storage)
let changePreviousBoxNodeList = document.querySelectorAll('a.changePreviousBoxLink');

if (changePreviousBoxNodeList) {

    changePreviousBoxNodeList.forEach(nodeListElement => {
        funcAddEventListenerForBackStoring(nodeListElement);
    });
}




// NAV-LINK (back-storage)
let changePreviousNavNodeList = document.querySelectorAll('a.changePreviousNavLink');

if (changePreviousNavNodeList) {

    changePreviousNavNodeList.forEach(nodeListElement => {
        funcAddEventListenerForBackStoring(nodeListElement);
    });
}






/////////////// 3. FUNKTIONER //////////////////


function funcAddEventListenerForBackStoring(storageElement) {

    storageElement.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("hej");
        console.log("click", event);

        funcAddFormToLocalStorage("Debit");
        funcAddFormToLocalStorage("Credit");

        let goToHref = storageElement.href;
        window.location.href = goToHref;
    });

}





function funcAddFormToLocalStorage(keyword) {

    let form_DOM = document.querySelector(`form[id$="${keyword}"]`);

    if (form_DOM) {
        let form_Id = form_DOM.id;
        let form_FD = new FormData(form_DOM);
        // console.log(form_FD.values);
        window.localStorage.removeItem(form_Id);
        window.localStorage.setItem(form_Id, JSON.stringify(Object.fromEntries(form_FD)));
        // console.log(JSON.stringify(Object.fromEntries(form_FD)));
    }
}




function funcTestNextButtonConditionMoney(pageName) {
    let condition = true;
    let conditionStrong = true;
    let conditionSpecial = true;
    let cost = 0;
    let sum = 0;

    // console.log("switch");
    switch (pageName) {

        case "step1":
            let assets = parseFloat(document.getElementById("moneyDebitAssets_TotalMoney").value);
            let income = parseFloat(document.getElementById("moneyDebitIncome_TotalMoney").value);
            let spend = parseFloat(document.getElementById("moneyCreditSpend_TotalMoney").value);
            console.log(assets, income, spend);
            if (assets + income < spend) {
                conditionSpecial = false;
            }
            break;


        case "step2":
            cost = parseFloat(document.getElementById("elDebitSpend_cost").value);
            sum = parseFloat(document.getElementById("elDebitSpend_sumUnitCost").value);

            // if (sum < cost) {
            //     condition = false;
            // } else if (cost < sum) {
            //     conditionStrong = false;
            // }
            break;


        case "step3":
            cost = parseFloat(document.getElementById("heatDebitSpend_cost").value);
            sum = parseFloat(document.getElementById("heatDebitSpend_sumUnitCost").value);
            break;


        case "step4":
            cost = parseFloat(document.getElementById("foodDebitSpend_cost").value);
            sum = parseFloat(document.getElementById("foodDebitSpend_sumCost").value);
            // console.log("sum and cost", sum, cost);

            // if (sum < cost) {
            //     condition = false;
            // } else if (cost < sum) {
            //     conditionStrong = false;
            // }
            break;


        case "step5":
            cost = parseFloat(document.getElementById("waterDebitSpend_cost").value);
            sum = parseFloat(document.getElementById("waterDebitSpend_sumUnitCost").value);
            break;


        default:
            break;
    }


    //conditions
    if (sum < cost) {
        condition = false;
    } else if (cost < sum) {
        conditionStrong = false;
    }
    
    //alert - confirm 
    if (condition === false) {
        condition = confirm("Summan av dina kostnader är lägre än det du anget i steg 1. Vill du fortsätta?");
    } else if (conditionStrong === false) {
        condition = conditionStrong;
        alert("Summan av dina kostnader är högre än det du anget i steg 1. Minska summan för att kunna fortsätta eller gå tillbaks till steg 1.");
    } else if (conditionSpecial === false) {
        condition = confirm("Din inkomst och dina tillgångar räcker i mindre än 1 månad. Vill du fortsätta?");
    }

    return condition;
}




function funcTestNextButtonConditionEl(pageName) {
    let condition = true;
    let conditionStrong = true;
    let conditionSpecial = true;
    let access1, access2;

    let access = 0;
    let sum = 0;

    // console.log("switch");
    switch (pageName) {

        case "step1":
            condition = true;
            break;


        case "step2":
            condition = true;

            let systemEl = parseFloat(document.getElementById("elDebitTotal_kWhDailySystem").value);
            let bruttoEl = parseFloat(document.getElementById("elDebitTotal_kWhDailyBrutto").value);

            if (systemEl > bruttoEl) {
                conditionSpecial = false;
            }
            break;


        case "step3":
            access1 = document.getElementById("heatDebitEnergy_circulationPumpEl").value;
            access2 = document.getElementById("heatDebitEnergy_elHeaterEl").value;
            if (access1 === " - "){access1 = 0;}
            if (access2 === " - "){access2 = 0;}
            access = parseFloat(access1) + parseFloat(access2) ;
            sum = parseFloat(document.getElementById("heatDebitEnergy_sumUnitEl").value);
            break;


        case "step4":
            access1 = document.getElementById("foodDebitEnergy_fridgeEl").value;
            access2 = document.getElementById("foodDebitEnergy_freezerEl").value;
            let sumStorageFridge = document.getElementById("foodDebitCoolAdd_kcalStorageFridge").value;
            let sumBuyFridge = document.getElementById("foodDebitCoolAdd_kcalMonthlyBuyFridge").value;
            let sumStorageFreezer = document.getElementById("foodDebitFrozenAdd_kcalStorageFreezer").value;
            let sumBuyFreezer = document.getElementById("foodDebitFrozenAdd_kcalMonthlyBuyFreezer").value;
            if (access1 === " - "){access1 = 0;}
            if (access2 === " - "){access2 = 0;}
            let sumFridge = parseFloat(sumStorageFridge) + parseFloat(sumBuyFridge) ;
            let sumFreezer = parseFloat(sumStorageFreezer) +parseFloat(sumBuyFreezer) ;

            // let sumMonthlyBuyFreezer = 
            let conditionFridge, conditionFreezer;
            conditionFridge = conditionFreezer = true;
            if (access1 > 0 && sumFridge === 0 ) {
                conditionFridge = confirm("Din kyl är tom. Du kan stänga ner den i steg 2. Vill du fortsätta utan förändring?");
            } else if (access2 > 0 && sumFreezer === 0) {
                conditionFreezer= confirm("Din frys är tom. Du kan stänga ner den i steg 2. Vill du fortsätta utan förändring?");
            } else {
                condition = true;
            }
            if ( !conditionFridge || !conditionFreezer ){
                condition = false;
                return;
            }
            break;


        case "step5":
            access = parseFloat(document.getElementById("waterDebitEnergy_waterPumpEl").value);
            sum = parseFloat(document.getElementById("waterDebitEnergy_sumUnitEl").value);
            break;


        default:
            break;
    }

    //conditions
    if (sum < access) {
        condition = false;
    } else if (access < sum) {
        conditionStrong = false;
    }


    if (condition === false) {
        condition = confirm("Summan av din elförbrukning är lägre än det du anget i steg 2. Vill du fortsätta?");
    } else if (conditionStrong === false) {
        condition = conditionStrong;
        alert("Summan av din elförbrukning är högre än det du anget i steg 2. Minska summan för att kunna fortsätta eller gå tillbaks till steg 2.");
    } else if (conditionSpecial === false) {
        condition = conditionSpecial;
        alert("Elbehovet för att driva dina system är högre än din total tillgång till el. Öka din el-tillgång eller minska system-elen, för att komma vidare.");
    }
   
    return condition;
}


function funcTestNextButtonConditionOther(pageName) {
    let condition = true;
    // let conditionStrong = true;
    // let conditionSpecial = true;

    // console.log("switch");
    switch (pageName) {

        case "step1":
            condition = true;
            break;


        case "step2":
            condition = true;
            break;


        case "step3":
            condition = true;
            break;


        case "step4":
            condition = true;
            break;


        case "step5":
            condition = true;
            break;


        default:
            break;
    }

    /*if (condition === false) {
        condition = confirm("Summan av din elförbrukning är lägre än det du anget i steg 2. Vill du fortsätta?");
    } else if (conditionStrong === false) {
        condition = conditionStrong;
        alert("Summan av din elförbrukning är högre än det du anget i steg 2. Minska summan för att kunna fortsätta eller gå tillbaks till steg 2.");
    } else if (conditionSpecial === false) {
        condition = conditionSpecial;
        confirm("Din inkomst och dina tillgångar räcker i mindre än 1 månad. Vill du fortsätta?");
    }*/

    return condition;
}



////// GAMMALT///////////////////



// let form_DebitDOM = document.querySelector("form[id$='Debit'] ");
// let form_CreditDOM = document.querySelector("form[id$='Credit'] ");
// let form_startDOM = document.querySelector("form#form_scenario");

//     if (form_DebitDOM && form_CreditDOM) {

//         let form_DebitId = form_DebitDOM.id;
//         let form_DebitFD = new FormData(form_DebitDOM);
//         console.log(form_DebitFD.values);
//         window.localStorage.removeItem(form_DebitId);
//         window.localStorage.setItem(form_DebitId, JSON.stringify(Object.fromEntries(form_DebitFD)));

//         let form_CreditId = form_CreditDOM.id;
//         let form_CreditFD = new FormData(form_CreditDOM);
//         console.log(form_CreditFD.values);
//         window.localStorage.removeItem(form_CreditId);
//         window.localStorage.setItem(form_CreditId, JSON.stringify(Object.fromEntries(form_CreditFD)));



//     } else if (form_startDOM) {
//         let form_startId = form_startDOM.id;
//         let form_startFD = new FormData(form_startDOM);
//         window.localStorage.removeItem(form_startId);
//         window.localStorage.setItem(form_startId, JSON.stringify(Object.fromEntries(form_startFD)));

//         console.log(JSON.stringify(Object.fromEntries(form_startFD)));
//     }

// }








// let form_Debit = document.querySelector("form[id$='Debit'] ");
// let form_Credit = document.querySelector("form[id$='Credit'] ");

// let form_DebitLS = new FormData(form_Debit);
// let form_CreditLS = new FormData(form_Credit);

// for (let [key, value] of form_DebitLS) {
//     console.log(key);
//     console.log(value);
//     localStorage.removeItem(key);
//     localStorage.setItem(key, value)
// }

// for (let [key, value] of form_CreditLS) {
//     console.log(key);
//     console.log(value);
//     localStorage.removeItem(key);
//     localStorage.setItem(key, value)
// }



// let form_Debit = document.querySelector("form[id$='Debit'] ");
// let form_Credit = document.querySelector("form[id$='Credit'] ");

// if (form_Debit && form_Credit) {

//     let form_DebitLS = new FormData(form_Debit);
//     let form_CreditLS = new FormData(form_Credit);

//     for (let [key, value] of form_DebitLS) {
//         console.log(key);
//         console.log(value);
//         localStorage.removeItem(key);
//         localStorage.setItem(key, value)
//     }

//     for (let [key, value] of form_CreditLS) {
//         console.log(key);
//         console.log(value);
//         localStorage.removeItem(key);
//         localStorage.setItem(key, value)
//     }
// }


// let form_start = document.querySelector("form");
// let form_startLS = new FormData(form_start);
// let i = 0;

// for (let [key, value] of form_startLS) {
//     console.log(key);
//     console.log(value);
//     localStorage.setItem(key, value)
//     i++;
// }



// alert(JSON.stringify(Object.fromEntries(form_CreditFD)));
// for (let [key, value] of form_DebitFD) {
//     console.log(key);
//     console.log(value);
// localStorage.removeItem(key);
// localStorage.setItem(key, value)
// }




// for (let [key, value] of form_CreditLS) {
//     console.log(key);
//     console.log(value);
//     localStorage.removeItem(key);
//     localStorage.setItem(key, value)
// }
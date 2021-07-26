
/*
----- INNEHÅLL i step4_scenario.js -------

1. SET mainGeneralInfo - BOXEN

2. 

3. FUNKTIONER
    3.a Funktionen: funcSetMainGeneralInfoBoxen()
*/


///////////////////////////// 1. SET mainGeneralInfo - BOXEN //////////////////////////////////////////////////////

funcSetMainGeneralInfoBoxen();


///////////////////////////// 2. //////////////////////////////////////////////////////




///////////////////////// 3. FUNKTIONER ///////////////////////////////////////////////////////////


// 3.a Funktionen: exakt samma i step1_scenario.js, step2_scenario.js, step3_scenario.js, step4_scenario.js, step5_scenario.js
function funcSetMainGeneralInfoBoxen() {

    var form_scenarioFD = JSON.parse(window.localStorage.getItem('form_scenario'));

    if (form_scenarioFD) {

        for (let [key, value] of Object.entries(form_scenarioFD)) {

            let path = window.location.pathname;
            let pageName = path.split("/").pop().split(".").shift();
            let spanId = key.split("_").pop() + "_span_" + pageName;

            if (value === "true") {
                document.getElementById(spanId).style.display = "none";
            }
        }
    } else {
        let nodeListSpanDOM = document.querySelectorAll('[id*="_span_"]');
        for (let spanDOM of nodeListSpanDOM) {
            spanDOM.style.display = "none";
        }
    }

}


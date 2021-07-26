/*jshint esversion: 6 */

// result_onload.js

/*
----- INNEHALL i step2_onload.js -------

1. SET mainGeneralInfo - BOXEN
2. SKRIV UT RESULTAT 
3. FUNKTIONER

*/

////////////////////////// 1. SET mainGeneralInfo - BOXEN //////////////////////////

var form_scenarioFD = JSON.parse(window.localStorage.getItem('form_scenario'));

if (form_scenarioFD) {

    for (let [key, value] of Object.entries(form_scenarioFD)) {

        let path = window.location.pathname;
        let pageName = path.split("/").pop().split(".").shift();
        let spanId =  key.split("_").pop() + "_span_" + pageName ;
       
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


/////////////////////// 2. SKRIV UT RESULTAT ////////////////////////////////



///////////////////////////// 3. FUNKTIONER /////////////////////////////////



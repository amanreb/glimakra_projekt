/*jshint esversion: 6 */

// import {
//     MM_swapImage
// } from './imgSwap.js';



/*
----- INNEHALL i start_onload.js -------

1. SET RADIO BUTTONS
2. FUNKTIONER
*/

//////////////////// 1. SET RADIO BUTTONS /////////////////////////////////////

var form_scenarioFD = JSON.parse(window.localStorage.getItem('form_scenario'));

console.log(window.localStorage.getItem('form_scenario'));

if (form_scenarioFD) {

    // let idName;
    let idImg;
    for (let [key, value] of Object.entries(form_scenarioFD)) {

        if (value === "true") {
            document.getElementById(key + "True").checked = true;
            idImg = document.getElementById(key + "True").nextElementSibling.id;
            console.log(key + "True: ", value, "idImg: ", idImg);
            MM_swapImage(idImg,'','images/icon_yes_active.png',1);

        } else if (value === "false") {
            document.getElementById(key + "False").checked = true;
            idImg = document.getElementById(key + "False").nextElementSibling.id;
            console.log(key + "False: ", value, "idImg: ", idImg);
            MM_swapImage(idImg,'','images/icon_no_active.png',1);

        } else if (value === "none") {
            document.getElementById(key + "None").checked = true;
        }

    }

}


/////////////////// 2. FUNKTIONER ////////////////////////
// exakta kopior fran imgSwap.js

// exakt kopia fran imgSwap.js
function MM_swapImgRestoreThis(imgID) {
    var bilden= document.getElementById(imgID);
    var originalSource = bilden.oSrc;
    if (originalSource){
        // document.getElementById(imgID).src=originalSource;
        bilden.src=originalSource;
    } 
    // document.getElementById('hej').innerHTML=originalSource;
}




// exakt kopia fran imgSwap.js
//KOPIERAD FUNKTION
function MM_preloadImages() { //v3.0
    var d = document;
    if (d.images) {
        if (!d.MM_p)
            d.MM_p = new Array();
        var i,
            j = d.MM_p.length,
            a = MM_preloadImages.arguments;

        for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) {
                d.MM_p[j] = new Image();
                d.MM_p[j++].src = a[i];
            }
    }
}




// exakt kopia fran imgSwap.js
// KOPIERAD FUNKTION
function MM_swapImgRestore() { //v3.0
    var i, x, a = document.MM_sr;
    for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
        x.src = x.oSrc;
}



// exakt kopia fran imgSwap.js
// KOPIERAD FUNKTION
function MM_swapImage() { //v3.0
    var i,
        j = 0,

        x, a = MM_swapImage.arguments;

    document.MM_sr = new Array();

    for (i = 0; i < (a.length - 2); i += 3)

        if ((x = MM_findObj(a[i])) != null) {
            document.MM_sr[j++] = x;

            if (!x.oSrc) { 
                x.oSrc = x.src;
            }
            x.src = a[i + 2];
        }
}



// exakt kopia fran imgSwap.js
// KOPIERAD FUNKTION
function MM_findObj(n, d) { //v4.01
    var p, i, x;
    if (!d)
        d = document;

    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }

    if (!(x = d[n]) && d.all)
        x = d.all[n];

    for (i = 0; !x && i < d.forms.length; i++)
        x = d.forms[i][n];

    for (i = 0; !x && d.layers && i < d.layers.length; i++)
        x = MM_findObj(n, d.layers[i].document);

    if (!x && d.getElementById) x = d.getElementById(n);
    return x;
}





/*jshint esversion: 6 */


///////////////////////////// 1. GLOBAL //////////////////////////////////////////////////////

// Web source  https://codepen.io/antonandoff/pen/PmQvBz

funcSetLanguageFromStorage();


//////////////// 2. EVENTLISTENER /////////////////////////////

let buttonSelectDOM = document.querySelector("button.btn-select");
let ulaDOM = document.querySelector("ul#a");

if (buttonSelectDOM && ulaDOM) {

    document.addEventListener("click", function (event) {

        let eventTargetDOM = event.target.closest("button.btn-select");

        if (eventTargetDOM === null) {
            if ($(".b").is(":visible")) {
                $(".b").toggle();
            }
            return;

        } else if (eventTargetDOM === buttonSelectDOM) {
            console.log(eventTargetDOM.name);
            console.log(event.target);
            funcSetAppLanguage();
            funcStoreLanguage();
            $(".b").toggle();
        }
    });


    ulaDOM.addEventListener("click", function (event) {
        // $('#a li').click(function (event) {
        console.log(event.target);

        if (event.target.tagName === "IMG") {
            var img = event.target.getAttribute("src");
            var value = event.target.getAttribute('value');
            var text = event.target.innerText;
            var item = '<li><img src="' + img + '" alt="" /><span>' + text + '</span></li>';
            $('.btn-select').html(item);
            $('.btn-select').attr('value', value);
            funcSetSelectButtonImg(value);
            funcSetAppLanguage();
            funcStoreLanguage();
            $(".b").toggle();
            //console.log(value); 
        }
    });
}


/*
//change button stuff on click
$('#a li').click(function () {

    var img = $(this).find('img').attr("src");
    var value = $(this).find('img').attr('value');
    var text = this.innerText;
    var item = '<li><img src="' + img + '" alt="" /><span>' + text + '</span></li>';
    $('.btn-select').html(item);
    $('.btn-select').attr('value', value);
    $(".b").toggle();
    //console.log(value);
});
*/

// $(".btn-select").click(function () {
//     $(".b").toggle();
// });


///////////////////////// 3. FUNKTIONER ///////////////////////////////////////////////////////////



function funcSetLanguageFromStorage() {
    let language;
    let selectSprakDOM = document.getElementById("select_sprak");
    let buttonSelectDOM = document.querySelector(".btn-select");
    let selectSprakValue = window.localStorage.getItem('select_sprak');

    console.log(selectSprakValue);

    if (!selectSprakValue) {
        selectSprakValue = "swedish";
    }

    if (buttonSelectDOM) {
        // $('.btn-select').attr('value', 'en');
        $('.btn-select').attr('value', selectSprakValue);
        buttonSelectDOM.value = selectSprakValue;

        selectSprakDOM.value = selectSprakValue;
        console.log(selectSprakDOM.value, language);

        funcSetSelectButtonImg(selectSprakValue);

        funcSetAppLanguage();
    }
}


function funcSetSelectButtonImg(selectSprakValue) {

    //test for iterating over child elements
    var langArray = [];
    $('.vodiapicker option').each(function () {
        var img = $(this).attr("data-thumbnail");
        var text = this.innerText;
        var value = $(this).val();
        var item = '<li><img src="' + img + '" alt="" value="' + value + '"/><span>' + text + '</span></li>';
        langArray.push(item);
    });

    $('#a').html(langArray);

    let index;
    switch (selectSprakValue) {
        case "swedish":
            index = 0;
            break;

        case "english":
            index = 1;
            break;

        default:
            index = 0;
            break;
    }
    $('.btn-select').html(langArray[index]);

    //Set the button value to the first el of the array
    // $('.btn-select').html(langArray[0]);





}



function funcSetAppLanguage() {
    let language = 'sv';
    let buttonSelectDOM = document.querySelector(".btn-select");
    let selectSprakDOM = document.getElementById("select_sprak");

    selectSprakDOM.value = buttonSelectDOM.value;

    if (buttonSelectDOM.value === "swedish") {
        language = 'sv';
    } else if (buttonSelectDOM.value === "english") {
        language = 'en';
    }

    // self invoked function
    (function translate() {
        let elements = document.querySelectorAll(".translate");
        elements.forEach(element => {
            // console.log("language", language);
            element.textContent = element.getAttribute("data-" + language);
        });
    })();

    // console.log(selectSprakDOM.value);
}



function funcStoreLanguage() {

    let buttonSelectDOM = document.querySelector(".btn-select");
    let selectSprakDOM = document.getElementById("select_sprak");

    console.log(buttonSelectDOM.value, selectSprakDOM.value);

    if (selectSprakDOM) {

        // let selectSprak_FD = new FormData(selectSprakDOM);

        let selectSprakKey = selectSprakDOM.id;
        let selectSprakValue = selectSprakDOM.value;

        window.localStorage.removeItem(selectSprakKey);
        window.localStorage.setItem(selectSprakKey, selectSprakValue);
    }
}





/*
//check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang) {
    //find an item with value of sessionLang
    var langIndex = langArray.indexOf(sessionLang);
    $('.btn-select').html(langArray[langIndex]);
    $('.btn-select').attr('value', sessionLang);
} else {
    var langIndex = langArray.indexOf('ch');
    console.log(langIndex);
    $('.btn-select').html(langArray[langIndex]);
    //$('.btn-select').attr('value', 'en');
}*/

















/*Custom select design 
jQuery().ready(function () {

    jQuery('.drop-down').append('<div class="button"></div>');
    jQuery('.drop-down').append('<ul class="select-list"></ul>');
    jQuery('.drop-down select option').each(function () {
        var bg = jQuery(this).css('background-image');
        jQuery('.select-list').append('<li class="clsAnchor"><span value="' + jQuery(this).val() + '" class="' + jQuery(this).attr('class') + '" style=background-image:' + bg + '>' + jQuery(this).text() + '</span></li>');
    });
    jQuery('.drop-down .button').html('<span style=background-image:' + jQuery('.drop-down select').find(':selected').css('background-image') + '>' + jQuery('.drop-down select').find(':selected').text() + '</span>' + '<a href="javascript:void(0);" class="select-list-link">Arrow</a>');
    jQuery('.drop-down ul li').each(function () {
        if (jQuery(this).find('span').text() == jQuery('.drop-down select').find(':selected').text()) {
            jQuery(this).addClass('active');
        }
    });
    jQuery('.drop-down .select-list span').on('click', function () {
        var dd_text = jQuery(this).text();
        var dd_img = jQuery(this).css('background-image');
        var dd_val = jQuery(this).attr('value');
        jQuery('.drop-down .button').html('<span style=background-image:' + dd_img + '>' + dd_text + '</span>' + '<a href="javascript:void(0);" class="select-list-link">Arrow</a>');
        jQuery('.drop-down .select-list span').parent().removeClass('active');
        jQuery(this).parent().addClass('active');
        $('.drop-down select[name=sprak]').val(dd_val);
        $('.drop-down .select-list li').slideUp();
    });
    jQuery('.drop-down .button').on('click', 'a.select-list-link', function () {
        jQuery('.drop-down ul li').slideToggle();
    });

});*/
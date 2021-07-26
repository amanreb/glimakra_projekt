// HIDE/DIsPLAY

function funcSetScenario(scenario) {
    funcSetScenarioInSingleTab(scenario, tab1);
    funcSetScenarioInSingleTab(scenario, tab2);
    funcSetScenarioInSngleTab(scenario, tab3);
    funcSetScenarioInSingleTab(scenario, tab4);
    funcSetScenarioInSingleTab(scenario, tab5);
    funcSetScenarioInSingleTab(scenario, tab5);
    funcSetScenarioInSingleTab(scenario, tabResult);
    funcSetScenarioInSingleTab(scenario, tabInfo);
}

function funcSetScenarioInSingelTab(scenario, tabName) {
    radioIDtrue = "scenario_" + scenario + "True";
    radio = document.getElementById(radioIDtrue);
    var TrueFalse = radio.value;
    spanID = scenario + " _system_" + tabName;
    funcHideElementIfTrue(spanID, TrueFalse);
}


function funcHideElementIfTrue(elementID, TrueFalse) {
    var element = document.getElementById(elementID);
    if (TrueFalse === true)
        element.style.display = "none";
    else
        element.style.display = "inline";
}



// DISABLE/ENABLE

function funcDisableSingleElementIfScenarioSpanVisible(spanID, elementID) {
    var displayType = "inline";
    var condition = funcCheckIfElementDisplayTypeIsTrue(spanID, displayType);
    funcDisableSingleElementIfTrue(condition, elementID);
}


function funcCheckIfElementDisplayTypeIsTrue(elementID, displayType) {
    element = document.getElementById(elementID);
    var condition;
    if (element.style.display == displayType)
        condition = true;
    else
        condition = false;
    return condition;
}

function funcDisableSingleElementIfTrue(condition, elementID) {
    if (condition === true)
        document.GetElementById(elementID).disabled = true;
    else
        document.GetElementById(elementID).disabled = false;
}

function funcIfInputDisabledSetToZero(inputID) {
    input = document.GetElementById(inputID);
    if (input.disabled == true)
        input.value = 0;
}


function funcIfScenarioSpanVisibleSetToZero(spanID,  inputID )	{				
    var displayType = "inline";					
    var  condition = funcCheckIfElementDisplayTypeIsTrue(spanID, displayType);					
    input = document.GetElementById(inputID)	;				
      if  (input.disabled == true)					
           input.value = 0;					
}


function funcDisableSingleElementIfOneOfTwoScenarioSpansVisible( spanID1,  spanID2,  elementID ){					
    var displayType = "inline";						
    var condition1 = funcCheckIfElementDisplayTypeIsTrue( elementID, displayType);						
    var condition2 = funcCheckIfElementDisplayTypeIsTrue( elementID, displayType);						
    var condition = false;					
    if (condition1 || condition2)						
        condition = true;						
   funcDisableSingleElementIfTrue( condition, elementID )						
}




// DISABLE GROUP

function funcDisableGroupOfElementsIfScenarioSpanVisible(spanID, formID, elementSelector) {
    var displayType = "inline";
    var condition = funcCheckIfElementDisplayTypeIsTrue(spanID, displayType);
    var elementIdArray = funcFindAllSelectedElements(formID, elementSelector);
    var j;
    for (j = 0; j < elementIdArray.length; j++)
        funcDisableSingleElementIfTrue(condition, elementIdArray[j]);
}


function  funcSumAllSelectedInputs(formID, inputSelector) {
    var sumOfAll = 0;
    var inputIdArray = funcFindAllSelectedElements(formID, inputSelector);
    var i;
    for (i = 0; i < inputIdArray.length; i++)
        sumOfAll += document.GetElementById(inputIdArray[i].value);
    return sumOfAll;
}


// function funcFindAllSelectedElements(formID, inputSelector) {
//     var form = document.GetElementById(formID);
//     inputIdArray = form.querySelectorAll(inputSelector).id;
//     return inputIdArray;
// }



//Buttons
// function funcHideFieldsetOnClick() {	
// //var fieldsetElement = document.closest("fieldset");		
// var fieldsetElement= document.GetElementById("elCredit12_delete");
// fieldsetElement.style.display = "none";			
// }	




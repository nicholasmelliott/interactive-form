
const form = document.getElementsByTagName('form')[0];
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const jobTitle = document.getElementById('title');
const otherTitle = document.getElementById('other-title');
const shirtDesign = document.getElementById('design');
const color = document.getElementById('color');
const colorLabel = document.getElementById('color-label');
const activities = document.getElementsByClassName('activities')[0];
const all = document.getElementsByName('all')[0];
const jsFrameworks = document.getElementsByName('js-frameworks')[0];
const jsLibs = document.getElementsByName('js-libs')[0];
const express = document.getElementsByName('express')[0];
const nodeJS = document.getElementsByName('node')[0];
const buildTools = document.getElementsByName('build-tools')[0];
const npm = document.getElementsByName('npm')[0];
let total = 0;
const h3Total = document.getElementById('total');
const paymentMethod = document.getElementById('payment');
const creditDiv = document.getElementById('credit-card');
const creditNum = document.getElementById('cc-num');
const creditZip = document.getElementById('zip');
const creditCVV = document.getElementById('cvv');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const submitBtn = document.querySelectorAll('[type="submit"]')[0];
const firstField = document.getElementsByTagName('fieldset')[0];
const nameError = document.getElementById('nameError');
const emailError1 = document.getElementById('emailError1');
const emailError2 = document.getElementById('emailError2');
const activitiesError = document.getElementById('activitiesError');
const ccNumError = document.getElementById('ccNumError');
const ccZipError = document.getElementById('ccZipError');
const ccCvvError = document.getElementById('ccCvvError');
let paymentSelected = false;

const removeClass = (elem, className) => {
    elem.classList.remove(className);
};

const addClass = (elem, className) => {
    elem.classList.add(className);
};

const removeAttr = (elem, name) => {
    elem.removeAttribute(name);
};

const setAttr = (elem, name, val) => {
    elem.setAttribute(name, val);
};

//plug into conditional to see if input is a number between lowNum and highNum
const isNumBetween = (inputVal, lowNum, highNum) => {
    return isNaN(inputVal) || parseInt(inputVal.length) < lowNum || parseInt(inputVal.length) > highNum;
};

/***Functions for 'Register for Activities' section****/
const ifCheckedThenDisable = (checked, wkshp) => {
    if(checked){
        setAttr(wkshp, 'disabled', '');
    }else{
        removeAttr(wkshp, 'disabled');  
    }
};

const calcWorkshopTotal = (checked, cost) => {
    if(checked){
        total = total + cost;
        h3Total.textContent = 'Total: $' + total;   
    }else{
        total = total - cost;
        h3Total.textContent = 'Total: $' + total;
    }; 
};

const appendingTotal = (checked) => {
    if(checked){
        removeAttr(h3Total, 'hidden');    
    }else if(!checked){
        const inputChildren = activities.getElementsByTagName('input');
        let inputArray = [];
        for(let i = 0; i < inputChildren.length; i++){
            inputArray.push(inputChildren[i].checked);
        }
        if(inputArray.every(x => x === false)){
            setAttr(h3Total, 'hidden', '');      
        } 
        console.log(inputArray);
    }
};
/****END functions for activities section****/

//Sets intial payment option
const selectPayment = () => {
    paymentMethod[1].setAttribute('selected', '');
    addClass(paypalDiv, 'is-hidden');
    addClass(bitcoinDiv, 'is-hidden');
};

/*****Validation functions****/
//If invalid input, throw error. If valid, remove error.
const nameValid = () => {
    if(nameInput.value === ''){
        addClass(nameInput, 'inputError');
        removeAttr(nameError, 'hidden');
        return true;
    }else if(nameInput.value != ''){
        removeClass(nameInput, 'inputError');
        setAttr(nameError, 'hidden', '');
        return false;
    }
};

const emailValid = () => {
    const emailVal = emailInput.value;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!reg.test(emailInput.value)){
        addClass(emailInput, 'inputError');
        removeAttr(emailError2, 'hidden');
        return true;
    }else{
        removeClass(emailInput, 'inputError');
        setAttr(emailError2, 'hidden', '');
        return false;  
    } 
};

const activitiesValid = () => {
    const inputChildren = activities.getElementsByTagName('input');
    let inputArray = [];
    for(let i = 0; i < inputChildren.length; i++){
            inputArray.push(inputChildren[i].checked);
    }
    if(inputArray.every(x => x === false)){
        for(let i = 0; i < inputChildren.length; i++){
            inputChildren[i].parentElement.style.backgroundColor = 'rgba(255,0,0,0.1)';
        };
        removeAttr(activitiesError, 'hidden');
        return true;
    }else{
        for(let i = 0; i < inputChildren.length; i++){
            inputChildren[i].parentElement.style.backgroundColor = 'rgba(255,0,0,0)';
        };
        setAttr(activitiesError, 'hidden', '');
        return false;
    }    
};

//If nothing is entered in input, throw first error. If an invalid input is entered, throw error 2. Finally, if a valid input is entered, remove all errors
const cardNumValid = () => {
    const cardVal = creditNum.value;
    const cardLength = cardVal.length;
    let cardNumBoo = '';
    if((isNaN(cardVal)) || (parseInt(cardVal.length) < 13 && parseInt(cardVal.length) > 0) || (parseInt(cardVal.length) > 16)){
        addClass(creditNum, 'inputError');
        removeAttr(ccNumError2, 'hidden'); 
        cardNumBoo = true;
    }else{
        setAttr(ccNumError2, 'hidden', ''); 
        removeClass(creditNum, 'inputError');
        cardNumBoo = false;
    }
    if(cardVal === ''){
        addClass(creditNum, 'inputError');
        removeAttr(ccNumError1, 'hidden');
        cardNumBoo = true;
    }else{
        setAttr(ccNumError1, 'hidden', ''); 
    }
    return cardNumBoo;
};

const cardZipValid = () => {
    const zipVal = creditZip.value;
    if(isNumBetween(zipVal, 5, 5)){
        addClass(creditZip, 'inputError');
        removeAttr(ccZipError, 'hidden'); 
        return true;
    }else{
        removeClass(creditZip, 'inputError');
        setAttr(ccZipError, 'hidden', ''); 
        return false;
    }
};

const cardCvvValid = () => {
    const cvvVal = creditCVV.value;
    if(isNumBetween(cvvVal, 3, 3)){
        addClass(creditCVV, 'inputError');
        removeAttr(ccCvvError, 'hidden'); 
        return true;
    }else{
        removeClass(creditCVV, 'inputError');
        setAttr(ccCvvError, 'hidden', ''); 
        return false;
    }
};
/*****End validation functions*****/

//On page load: form resets, first text field is focused on, elements are hidden that are added dynamically with JS
window.onload = () => {
    form.reset();
    nameInput.focus();
    addClass(otherTitle, 'is-hidden');
    addClass(color, 'is-hidden');
    addClass(colorLabel, 'is-hidden');
    selectPayment();
}

//If other is selected, show text field. Afterwards, remove text field if another option is selected
jobTitle.addEventListener('change', () => {
    let title = document.getElementById('title');
    const field = document.getElementsByTagName('fieldset')[0];
    if(title.value === 'other'){
        removeClass(otherTitle, 'is-hidden');
    }else{
        addClass(otherTitle, 'is-hidden');
    }    
});

//Showing color options based on design choice selected
shirtDesign.addEventListener('change', () => { 
    const shirtValue = shirtDesign.value;
    if(shirtValue === 'js puns' || shirtValue === 'heart js'){
        removeClass(color, 'is-hidden');
        removeClass(colorLabel, 'is-hidden');
        //If this design is selected, show relevent colors and hid rest
        if(shirtValue === 'js puns'){
            for(let i = 1; i <= 3; i++){
                addClass(color[0], 'is-hidden');
                removeClass(color[i], 'is-hidden');
                addClass(color[i+3], 'is-hidden');
                
            }
            setAttr(color[1], 'selected', '');
            removeAttr(color[4], 'selected');
            removeAttr(color[0], 'selected');
        }else if(shirtValue === 'heart js'){
            for(let i = 1; i <= 3; i++){
                removeClass(color[i+3], 'is-hidden');
                addClass(color[i], 'is-hidden');
                addClass(color[0], 'is-hidden');
            }
            setAttr(color[4], 'selected', '');
            removeAttr(color[1], 'selected');
            removeAttr(color[0], 'selected');
        }
    }else{
        addClass(color, 'is-hidden');
        addClass(colorLabel, 'is-hidden'); 
        for(let i = 0; i <= 6; i++){
            removeClass(color[0], 'is-hidden');
            addClass(color[i], 'is-hidden');
        }
        setAttr(color[0], 'selected', '');
        removeAttr(color[4], 'selected');
        removeAttr(color[1], 'selected');
    }
    
});

//Determining what activities are checked, then disabling time-conflicting activities and displaying total cost of all activities checked
all.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    calcWorkshopTotal(isChecked, 200);
    appendingTotal(isChecked);
    activitiesValid();
});
jsFrameworks.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    ifCheckedThenDisable(isChecked, express);
    calcWorkshopTotal(isChecked, 100);
    appendingTotal(isChecked);
    activitiesValid();
});
jsLibs.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    ifCheckedThenDisable(isChecked, nodeJS);
    calcWorkshopTotal(isChecked, 100);
    appendingTotal(isChecked);
    activitiesValid();
});
express.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    ifCheckedThenDisable(isChecked, jsFrameworks);
    calcWorkshopTotal(isChecked, 100);
    appendingTotal(isChecked);
    activitiesValid();
});
nodeJS.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    ifCheckedThenDisable(isChecked, jsLibs);
    calcWorkshopTotal(isChecked, 100);
    appendingTotal(isChecked);
    activitiesValid();
});
buildTools.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    calcWorkshopTotal(isChecked, 100);
    appendingTotal(isChecked);
    activitiesValid();
});
npm.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    calcWorkshopTotal(isChecked, 100);
    appendingTotal(isChecked);
    activitiesValid();
});
 
paymentMethod.addEventListener('change', (e) => {
    const isSelected = e.target.value;
    if(isSelected === 'credit card'){
        removeClass(creditDiv, 'is-hidden');
        addClass(paypalDiv, 'is-hidden');
        addClass(bitcoinDiv, 'is-hidden');
        paymentSelected = true;
    }else if(isSelected === 'paypal'){
        addClass(creditDiv, 'is-hidden');
        removeClass(paypalDiv, 'is-hidden');
        addClass(bitcoinDiv, 'is-hidden');
        paymentSelected = true;
    }else if(isSelected === 'bitcoin'){
        addClass(creditDiv, 'is-hidden');
        addClass(paypalDiv, 'is-hidden');
        removeClass(bitcoinDiv, 'is-hidden');
        paymentSelected = true;
    }
});

//real-time validation for name, email, credit card #, zip code # and cvv #
nameInput.addEventListener('keyup', () => {
    nameValid();
});

emailInput.addEventListener('keyup', () => {
    emailValid();
});

creditNum.addEventListener('keyup', () => {
    cardNumValid();
});

creditZip.addEventListener('keyup', () => {
    cardZipValid();
});

creditCVV.addEventListener('keyup', () => {
    cardCvvValid();
});

//When the submit btn is clicked, each required input is checked to see if it contains a valid user input. If not, a validation error is thrown, submission is prevented and the input that is not valid is focused on (starting from furthest top input if more than one input is invalid)
submitBtn.addEventListener('click', (e) => {
    //prevents form submission and focus on given input
    const preventAndScroll = (event, input) => {
        event.preventDefault(); 
        input.focus();
    }; 
    if(!paymentSelected){
        if(cardCvvValid()){
            cardCvvValid();
            preventAndScroll(e, creditCVV);
        }
        if(cardZipValid()){
            cardZipValid();
            preventAndScroll(e, creditZip);
        }
        if(cardNumValid()){
            cardNumValid();
            preventAndScroll(e, creditNum);
        }    
    }
    if(activitiesValid()){
        activitiesValid();
        preventAndScroll(e, all);
    }
    if(emailValid()){
        emailValid();
        preventAndScroll(e, emailInput);
    }
    if(nameValid()){
        nameValid(); 
        preventAndScroll(e, nameInput);
    } 
});

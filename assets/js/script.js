window.onload = function () {
    const themeName = localStorage.getItem('themeName');
    const bodyEl = document.querySelector('body');

    if (themeName === 'theme-light') {
        bodyEl.classList.add('theme-light');
        bodyEl.classList.remove('theme-blue');
        bodyEl.classList.remove('theme-dark')
    }
    else if (themeName === 'theme-dark') {
        bodyEl.classList.add('theme-dark');
        bodyEl.classList.remove('theme-blue');
        bodyEl.classList.remove('theme-light');
    }
}

function changeTheme(e) {
    const arrowPositionX = e.clientX;

    const toggleList = document.getElementsByClassName('theme-toggle');
    let themeToggle = null;

    for (let i = 0; i < toggleList.length; i++) {
        if (toggleList[i].getBoundingClientRect().left > 0) {
            themeToggle = toggleList[i];
            break;
        }
    }

    const themeToggleRect = themeToggle.getBoundingClientRect();
    const range = themeToggleRect.width / 3;
    
    const bodyEl = document.querySelector('body');

    if (arrowPositionX >= themeToggleRect.left && arrowPositionX < themeToggleRect.left + range) {
        bodyEl.classList.add('theme-blue');
        bodyEl.classList.remove('theme-light');
        bodyEl.classList.remove('theme-dark');
        localStorage.setItem('themeName', 'theme-blue')
    }
    else if (arrowPositionX >= themeToggleRect.left + range && arrowPositionX < themeToggleRect.left + 2 * range) {
        bodyEl.classList.add('theme-light');
        bodyEl.classList.remove('theme-blue');
        bodyEl.classList.remove('theme-dark');
        localStorage.setItem('themeName', 'theme-light');
    }
    else {
        bodyEl.classList.add('theme-dark');
        bodyEl.classList.remove('theme-blue');
        bodyEl.classList.remove('theme-light');
        localStorage.setItem('themeName', 'theme-dark');
    }
}

var result = '';
var firstNumber = '';
var operation = '';

function clickNumber(number) {
    if (result === '' && number === 0) {
        return;
    }

    if (result.length >= 9) {
        return;
    }

    result += number;
    formatAndDisplayValue(result); 
}

function reset() {
    result = '';
    firstNumber = '';
    operation = '';
    equalButtonClick = false;
    document.querySelector('.display').classList.remove('font-size-40');
    document.querySelector('.display').classList.remove('font-size-30');
    document.querySelector('.display').innerHTML = 0;
}

function del() {
    if (equalButtonClick) {
        reset();
        return;
    }

    result = result.slice(0, -1);

    if (result.length === 0) {
        document.querySelector('.display').innerHTML = 0;
    }
    else {
        formatAndDisplayValue(result);
    }   
     
}

function formatAndDisplayValue(value) {
    let displayValue = '';
    let counter = 0;
    
    let position = value.indexOf('.');

    if (position === -1) {
        position = value.length;
    }

    for (let i = position - 1; i >= 0; i--) {
        if (counter === 3) {
            displayValue = value[i] + ',' + displayValue;
            counter = 1;
        }
        else {
            displayValue = value[i] + displayValue;
            counter++;
        }
    }

    if (value.includes('.')) {
        displayValue += value.substring(position, value.length);
    }

    if (displayValue.length > 15) {
        document.querySelector('.display').classList.add('font-size-40');
    }

    if (displayValue.length > 18) {
        document.querySelector('.display').classList.remove('font-size-40');
        document.querySelector('.display').classList.add('font-size-30');
    }

    document.querySelector('.display').innerHTML = displayValue;
}

function decimal() {
    if (result.includes('.')) {
        return;
    }

    result += '.';
    document.querySelector('.display').innerHTML += '.';
}

function clickOperation(operator) {
    if (firstNumber !== '' && result !== '' && !equalButtonClick) {
        calculate();
        result = '';
        operation = operator;
        return;
    }

    equalButtonClick = false;

    if (firstNumber !== '') {
        result = '';
        operation = operator;
        return;
    }

    if (result === '') {
        firstNumber = '0';
    }
    else {
        firstNumber = result;
        result = '';
    }

    operation = operator;
}

var equalButtonClick = false;

function clickEqual() {
    if (result === '') {
        return;
    }

    equalButtonClick = true;
    calculate();
}

function calculate() {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(result);
    let resultValue = 0;

    if (operation === '+') {
        resultValue = num1 + num2;
    }

    if (operation === '-') {
        resultValue = num1 - num2;
    }

    if (operation === '*') {
        resultValue = num1 * num2;
    }

    if (operation === '/') {
        resultValue = num1 / num2;
    }

    firstNumber = resultValue.toString();
    formatAndDisplayValue(resultValue.toString());
}

let buffer = '0';
let sumSoFar = 0;
let currentOp; 
const screen = document.querySelector('.result-screen');

// this function decides what to do with the button - is it an operator or is it an input number
function buttonClicked(value) {
    if (isNaN(parseInt(value))) {
        notNumber(value);
    }
    else {
        isNumber(value);
    }
    rerender();
}

// does what needs to be done with the number
function isNumber(value) {
    if (buffer === '0'){
        buffer = value
        rerender();
    }
    else {
        buffer += value
        rerender();
    }
}

function initialize(value) {
    const intBuffer = parseInt(buffer)
    if (sumSoFar === 0) {
        sumSoFar = intBuffer
    }
    else {
        doMaths(intBuffer)
    }

    currentOp = value 
    buffer = '0'
}

// this is where the majority of the logic is now missing 
function doMaths(intBuffer) {
    if (currentOp === '+') {
        sumSoFar += intBuffer
    }
    else if(currentOp === '-') {
        sumSoFar -= intBuffer
    }
    else if (currentOp === 'x') {
        sumSoFar *= intBuffer
    }
    else {
        sumSoFar /= intBuffer 
    }
}


// does what needs to be done with operators and other buttons 
function notNumber(value) {
    if (value === 'C') {
        buffer = '0';
        sumSoFar = 0;
    }
    else if (value === '←') {
        if (buffer.length === 1) {
            buffer = '0';
        }
        else {
            buffer = buffer.substring(0, buffer.length - 1);
        }
    }
    else if (value === '='){
        if (currentOp === null) {
            return;
        }
        else {
            doMaths(parseInt(buffer));
            currentOp = null
            buffer = sumSoFar;
            sumSoFar = 0;
        }
    }
    else {
        initialize(value);
    }
    rerender();
}

// this function listens for a button to be clicked
function thisOne() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClicked(event.target.innerText);
    });
}

function rerender() {
    screen.innerText = buffer;
  }

thisOne();
const calcDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const dltBtn = document.getElementById('del-btn');

let firstValue = 0;
let operatorValue = '';
let nextValue = false;


function sendNumberValue(number){
    if (nextValue){
        calcDisplay.textContent = number;
        nextValue = false;

    }else{
        // If current value is 0 replace and if not add number
        const displayValue = calcDisplay.textContent;
        calcDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }

}
function addDecimal() {
    // dont add decimal if operator pressed
    if (nextValue) return;
    // if no decimal add one
    if (!calcDisplay.textContent.includes('.')){
        calcDisplay.textContent = `${calcDisplay.textContent}.`;
    }
    
}

// calculate  

const calculate ={
    '/':(firtNumber,secondNumber) => firtNumber / secondNumber,
    '*':(firtNumber,secondNumber) => firtNumber * secondNumber,
    '-':(firtNumber,secondNumber) => firtNumber - secondNumber,
    '+':(firtNumber,secondNumber) => firtNumber + secondNumber,
    '=':(firtNumber,secondNumber) => secondNumber,

}
function operation(operator) {
    const currentValue = Number(calcDisplay.textContent);

    // prevent multiple operator
    if (operatorValue && nextValue){
        operatorValue =operator;
        return;
    }
    // assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    }else{
        const result = calculate[operatorValue](firstValue,currentValue);
        calcDisplay.textContent = result;
        firstValue = result;
    }
    // Ready for next value
    nextValue = true;
    
    operatorValue = operator;
            
}

// Add event listeners

inputBtns.forEach((inputBtn) => {
    // target numbers cause they dont have a class
    if (inputBtn.classList.length === 0){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value));
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => operation(inputBtn.value));
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal() );
    }
});

// Reset  values &display
function resetAll() {

    firstValue = 0;
    operatorValue = '';
    nextValue = false;
    calcDisplay.textContent = '0';
    
}

// Event listner
clearBtn.addEventListener('click', resetAll);





// Delete display
function dlt() {

    if (calcDisplay.textContent.length === 1){
        calcDisplay.textContent = '0';
    }else{

     calcDisplay.textContent = calcDisplay.textContent.substring(0,calcDisplay.textContent.length-1);
    }
    
}

// Event listner
dltBtn.addEventListener('click', dlt);


//  function replaceOperator()
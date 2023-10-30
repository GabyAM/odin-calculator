function operate (numA, numB, operator) {
    if(operator === '+') {
        return numA + numB
    } else if(operator === '-') {
        return numA - numB
    } else if(operator === 'x') {
        return numA * numB
    } else if(operator === '%') {
        return numA / numB;
    } else {
        return Math.pow(numA, numB);
    }
}

function display(input) {
    const $display = document.querySelector('.display')
    $display.textContent = input.length > 17 ? `${input.slice(0,17)}...` : input
}

function updateUI(type) {
    if(type === 'error'){
        document.querySelector('header').style.backgroundColor = '#9e2a2b'
        document.querySelector('body').style.backgroundColor = '#540b0e'
        document.querySelector('.calculator').style.backgroundColor = '#fb8500'
        document.querySelectorAll('.calc-button').forEach(button => {
            button.style.backgroundColor = '#d62828';
            button.style.color = 'white';
        })
        document.querySelectorAll('.calc-button.number').forEach(button => {
            button.style.backgroundColor = '#ffb703';
        })
    }
    else if(type === 'default') {
        document.querySelector('header').style.backgroundColor = '#A9DEF9'
        document.querySelector('body').style.backgroundColor = 'aliceblue'
        document.querySelector('.calculator').style.backgroundColor = '#e4c1f9'
        document.querySelectorAll('.calc-button').forEach(button => {
            button.style.backgroundColor = '#d0f4de';
            button.style.color = '#235789';
        })
        document.querySelectorAll('.calc-button.number').forEach(button => {
            button.style.backgroundColor = '#fcf6bd';
        })
    }
}

function init() {
    
    let firstNumber = '';
    let secondNumber = '';
    let operator = '';
    let lastInput = '';

    function setCalculatorError(type) {
        type === 'division' ? display('NOOOOOOOO') : display('Too big!')
        document.querySelectorAll('.calc-button').forEach(button => button.disabled = true)
        $clearButton.disabled = false;
        updateUI('error');
    }
    
    function inputNumber(input) {
        if(operator === '') {
            firstNumber += input;
            display(firstNumber)
        }
        else {
            secondNumber += input;
            display(secondNumber)
        }
        lastInput = input;
    }

    function inputOperator(input) {
        if (!isNaN(lastInput) && lastInput !== '') {
            if ( secondNumber === '') {
                 operator = input;
                 display(operator)
            } else {
                 if(operator === '%' && secondNumber === '0') {
                     setCalculatorError('division')
                 } else {
                     firstNumber = operate(Number(firstNumber), Number(secondNumber), operator).toString()
                     operator = input;
                     secondNumber = '';
                     display(operator)
                 }
            }
            lastInput = input;
         }
    }

    function inputDot() {
        if (!isNaN(lastInput)) {
            if(operator === '' && !firstNumber.includes('.')) {
                firstNumber += '.'
                display(firstNumber)
            } else if(!secondNumber.includes('.')) {
                secondNumber += '.'
                display(secondNumber)
            }
            lastInput = '.'
        }
    }

    function inputBackspace() {
        if(operator === '') {
            firstNumber = firstNumber.slice(0, -1);
            display(firstNumber)
            lastInput = firstNumber[firstNumber.length - 1]
        } else {
            if(secondNumber === '') {
                operator = ''
                display(firstNumber)
                lastInput = firstNumber[firstNumber.length - 1]
            } else {
            secondNumber = secondNumber.slice(0, -1)
            display(secondNumber)
            lastInput = secondNumber[secondNumber.length - 1]
            }
        }
    }

    function inputEqual() {
        if (operator === '%' && secondNumber === '0') setCalculatorError('division')
        else if(!isNaN(lastInput) && operator !== ''){
            const result = operate(Number(firstNumber), Number(secondNumber), operator).toString()
            if(result.toString() === 'Infinity') setCalculatorError('infinity')
            else display(result);
            firstNumber = result;
            secondNumber = '';
            operator = '';
        }
    }

    function inputClear() {
        operator = '';
        firstNumber = '';
        secondNumber = '';
        lastInput = '';
        display('');
        document.querySelectorAll('.calc-button').forEach(button => button.disabled = false)
        
    }

    document.onkeydown = (event) => {
        const key = event.key
        if(!isNaN(key)) {
            inputNumber(key)
        }
        else if(/\+|-|%|x|\^/.test(key.toLowerCase())) {
            inputOperator(key)
        }
        else if(key === '.') {
            inputDot()
        } 
        else if (key === 'Backspace'){
            inputBackspace()
        }  
        else if(key === 'Enter') {
            inputEqual()
        } else if(key === 'Escape') {
            inputClear()
        }
    }

    const $numberButtons = document.querySelectorAll('.calc-button.number');
    $numberButtons.forEach(button => {
        button.onclick = () => inputNumber(button.textContent)
    })

    const $operatorButtons = document.querySelectorAll('.calc-button.operator');
    $operatorButtons.forEach(button => {
        button.onclick = () => inputOperator(button.textContent)
    })

    const $dotButton = document.querySelector('.calc-button.dot');
    $dotButton.onclick = () => inputDot();

    const $equalButton = document.querySelector('.calc-button.equal');
    $equalButton.onclick = () => inputEqual();

    const $clearButton = document.querySelector('.calc-button.clear');
    $clearButton.onclick = () => {
        inputClear();
        if($clearButton.style.color === 'white') {
            updateUI('default')
        }
    }

    const $backspaceButton = document.querySelector('.calc-button.backspace');
    $backspaceButton.onclick = () => inputBackspace();
}

init()

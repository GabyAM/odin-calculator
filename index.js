function operate (numA, numB, operator) {
    if(operator === '+') {
        return numA + numB
    } else if(operator === '-') {
        return numA - numB
    } else if(operator === 'x') {
        return numA * numB
    } else return numA / numB;
}

function display(input) {
    const $display = document.querySelector('.display')
    $display.textContent = input.length > 17 ? `${input.slice(0,17)}...` : input
}

function init() {
    
    let firstNumber = '';
    let secondNumber = '';
    let operator = '';
    let lastInput = '';

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
            } else {
                 if(operator === '%' && secondNumber === '0') {
                     display('NOOOOOOOO');
                     firstNumber = '';
                     secondNumber = '';
                     operator = ''
                 } else {
                     firstNumber = operate(Number(firstNumber), Number(secondNumber), operator).toString()
                     operator = input;
                     secondNumber = '';
                 }
            }
            display(operator)
            lastInput = input;
         }
    }

    document.onkeydown = (event) => {
        const key = event.key
        if(!isNaN(key)) {
            inputNumber(key)
        }
        else if(/\+|-|%|x/.test(key)) {
            inputOperator(key)
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
    $dotButton.onclick = () => {
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
    const $equalButton = document.querySelector('.calc-button.equal');
    $equalButton.onclick = () => {
        if(!isNaN(lastInput) && operator !== ''){
            const result = operate(Number(firstNumber), Number(secondNumber), operator).toString()
            if (result === 'Infinity') {
                display('NOOOOOOO')
            } else {
                display(result);
            }
            firstNumber = result;
            secondNumber = '';
            operator = '';
        }
    }
    const $clearButton = document.querySelector('.calc-button.clear');
    $clearButton.onclick = () => {
        operator = '';
        firstNumber = '';
        secondNumber = '';
        lastInput = '';
        display('');
    }

    const $backspaceButton = document.querySelector('.calc-button.backspace');
    $backspaceButton.onclick = () => {
        if(operator === '') {
            firstNumber = firstNumber.slice(0, -1);
        } else {
            if(secondNumber === '') {
                operator = ''
            } else {
            secondNumber = secondNumber.slice(0, -1)
            }
        }
        display(`${firstNumber} ${operator} ${secondNumber}`)
    }

    const $powerButton = document.querySelector('.calc-button.power');
    $powerButton.onclick = () => {
        if(!isNaN(lastInput) && lastInput !== '') {
            if(operator === '') {
                firstNumber = Math.pow(Number(firstNumber), 2).toString()
                display(firstNumber)
            } else if (secondNumber !== '') {
                secondNumber = Math.pow(Number(secondNumber), 2).toString()
                display(secondNumber)
            }
        }
    }
}

init()

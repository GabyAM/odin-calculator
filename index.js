function operate (numA, numB, operator) {
    if(operator === '+') {
        return numA + numB
    } else if(operator === '-') {
        return numA - numB
    } else if(operator === 'x') {
        return numA * numB
    } else {
        return numA / numB
    }
}

function getResultFromOperation (operation) {
    const values = operation.split(' ')
    if(Number(values[2]) === 0 && values[1] === '%') return 'NOOOOOOO'
    return operate(Number(values[0]), Number(values[2]), values[1]).toString()
}

function display(input) {
    const $display = document.querySelector('.display')
    $display.textContent = input
}

function isFloat () {

}

function init() {
    let operation = '';
    let lastInput = '';
    const $numberButtons = document.querySelectorAll('.calc-button.number');
    $numberButtons.forEach(button => button.onclick = () => {
        operation += button.textContent
        lastInput = button.textContent
        display(operation)
    })
    const $operatorButtons = document.querySelectorAll('.calc-button.operator');
    $operatorButtons.forEach(button => button.onclick = () => {
        if (!isNaN(lastInput) && lastInput !== '') {
            if(operation.includes(' ')) {
                operation = getResultFromOperation(operation)
            }
            operation += button.textContent
            lastInput = button.textContent 
            display(operation)
        }
    })

    const $dotButton = document.querySelector('.calc-button.dot');
    $dotButton.onclick = () => {
        if (!isNaN(lastInput) && !operation.includes('.')) {
            operation += '.'
            lastInput = '.'
            display(operation)
        }
    }
    const $equalButton = document.querySelector('.calc-button.equal');
    $equalButton.onclick = () => {
        if(!isNaN(lastInput) && /\+|-|%|x/.test(operation)){
            const result = getResultFromOperation(operation);
            operation = result
            display(result.toString().slice(0, 7))
            if(result === 'NOOOOOOO') {
                operation = ''
                document.querySelector('body').style.backgroundColor = 'red'
                document.querySelectorAll('.calc-button').forEach(button => button.style.backgroundColor = 'orange')
            }
        }
    }
    const $clearButton = document.querySelector('.calc-button.clear');
    $clearButton.onclick = () => {
        operation = '';
        lastInput = '';
        display('');
    }

    const $backspaceButton = document.querySelector('.calc-button.backspace');
    $backspaceButton.onclick = () => {
        operation = operation.slice(0, -1);
        lastInput = operation[operation.length - 1]
        display(operation)
    }

    const $powerButton = document.querySelector('.calc-button.power');
    $powerButton.onclick = () => {
        if(!isNaN(lastInput) && lastInput !== '') {
            operation = Math.pow(Number(operation), 2) 
            display(operation)
        }
    }
}

init()
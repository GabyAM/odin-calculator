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
        if (!isNaN(lastInput)) {
            if(operation.includes(' ')) {
                operation = getResultFromOperation(operation)
            }
            operation += button.textContent
            lastInput = button.textContent 
            display(operation)
        }
    })
    const $equalButton = document.querySelector('.calc-button.equal');
    $equalButton.onclick = () => {
        if(Number(lastInput) !== NaN){
            const result = getResultFromOperation(operation);
            display(result)
            if(result === 'NOOOOOOO') operation = ''
        }
    }
    const $clearButton = document.querySelector('.calc-button.clear');
    $clearButton.onclick = () => {
        operation = '';
        lastInput = '';
        display('');
    }
}

init()
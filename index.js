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
        console.log(`se actualiza operation a ${operation}`)
        lastInput = button.textContent
        display(operation)
    })
    const $operatorButtons = document.querySelectorAll('.calc-button.operator');
    $operatorButtons.forEach(button => button.onclick = () => {
        if (!isNaN(lastInput)) {
            operation += button.textContent
            console.log(`se actualiza operation a ${operation}`)
            lastInput = button.textContent 
        }
    })
    const $equalButton = document.querySelector('.calc-button.equal');
    $equalButton.onclick = () => {
        if(Number(lastInput) !== NaN){
            console.log(operation)
            const values = operation.split(' ')
            const result = operate(Number(values[0]), Number(values[2]), values[1])
            display(result)
        }
    }
}

init()
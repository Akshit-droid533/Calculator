const display = document.getElementById('display');

function appendNumber(number) {
    if (display.value === '0') {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const value = display.value;
    
    // Prevent multiple operators in a row
    if (value === '' || value.endsWith('+') || value.endsWith('-') || value.endsWith('*') || value.endsWith('/')) {
        return;
    }
    
    if (operator === '.') {
        // Check if decimal point already exists in current number
        const lastNumber = value.split(/[\+\-\*\/]/).pop();
        if (!lastNumber.includes('.')) {
            display.value += '.';
        }
    } else {
        display.value += operator;
    }
}

function calculate() {
    try {
        const result = Function('"use strict"; return (' + display.value + ')')();
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '0';
        }, 1500);
    }
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    const value = display.value;
    if (value.length > 1) {
        display.value = value.substring(0, value.length - 1);
    } else {
        display.value = '0';
    }
}

// Set initial display value
display.value = '0';

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === '.') {
        event.preventDefault();
        appendOperator('.');
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

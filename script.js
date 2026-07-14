document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let previousInput = '';
    let selectedOperator = null;
    let shouldResetDisplay = false;

    // LOOP: Attach single-event listeners to all layout buttons dynamically
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const val = button.getAttribute('data-val');

            if (!action) {
                // If it doesn't have an action attribute, it's a number/decimal point
                handleNumber(val);
            } else if (action === 'operator') {
                handleOperator(val);
            } else if (action === 'clear') {
                clearAll();
            } else if (action === 'backspace') {
                handleBackspace();
            }
            
            updateDisplay();
        });
    });

    // Special click handler for output validation
    document.getElementById('equals').addEventListener('click', () => {
        calculate();
        updateDisplay();
    });

    function handleNumber(num) {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = num === '.' ? '0.' : num;
            shouldResetDisplay = false;
        } else {
            // IF-ELSE checking: Prevent multiple fractional points
            if (num === '.' && currentInput.includes('.')) return;
            currentInput += num;
        }
    }

    function handleOperator(op) {
        if (selectedOperator && !shouldResetDisplay) {
            calculate();
        }
        previousInput = currentInput;
        selectedOperator = op;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (!selectedOperator || shouldResetDisplay) return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        let result = 0;

        // IF-ELSE branching for calculation routing
        if (selectedOperator === '+') {
            result = prev + current;
        } else if (selectedOperator === '-') {
            result = prev - current;
        } else if (selectedOperator === '*') {
            result = prev * current;
        } else if (selectedOperator === '/') {
            if (current === 0) {
                result = 'Error'; // Guard against division by zero
            } else {
                result = prev / current;
            }
        }

        // Clean up display decimals formatting (limit long decimals)
        if (typeof result === 'number' && !Number.isInteger(result)) {
            result = Math.round(result * 100000000) / 100000000;
        }

        currentInput = result.toString();
        selectedOperator = null;
        shouldResetDisplay = true;
    }

    function handleBackspace() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
    }

    function clearAll() {
        currentInput = '0';
        previousInput = '';
        selectedOperator = null;
        shouldResetDisplay = false;
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }
});
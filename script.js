var steps = [];
var value = 0;
var isLastStepNumber = false;
var floatingPoint = 0;
var isFloat = false;
var memory = 0;
// save the current step(digits or operators)
function getSteps(x) {
    if (typeof x === 'number' || x === '.') {
        if (!isLastStepNumber) {
            if (steps.length > 0) {
                steps.push(value);
            }
            value = 0;
            isLastStepNumber = !isLastStepNumber;
        }
        if (x === '.') {
            isFloat = true;
        }
        else {
            if (isFloat) {
                value = value + (x / Math.pow(10, ++floatingPoint));
            }
            else {
                value = value * 10 + x;
            }
        }
    }
    else {
        if (isLastStepNumber) {
            steps.push(value);
            floatingPoint = 0;
            isFloat = false;
            isLastStepNumber = !isLastStepNumber;
        }
        value = x;
    }
    console.log(steps);
}
// solve equation
function solveEquation() {
    steps.push(value);
    if (steps.length % 2 === 0) {
        steps.pop();
    }
    var equation = '';
    steps.forEach(function (i) {
        equation += i;
    });
    var result = eval(equation);
    steps = [];
    clearAll();
}
function solveMathFunction(x, y, z) {
    if (x === 'sin' || x === 'cos' || x === 'tan' || x === 'asinh' || x === 'acosh' || x === 'atanh') {
        if (steps.length % 2 !== 0) {
            var poppedItem = steps.pop();
            steps.push(Math[x]((Math.PI / 180) * poppedItem));
            value = '';
        }
        else {
            steps.push(Math[x]((Math.PI / 180) * value));
            value = 0;
        }
    }
    else if (x === 'pow') {
        if (steps.length % 2 !== 0) {
            var poppedItem = steps.pop();
            steps.push(Math[x](y < 0 ? poppedItem : y, z < 0 ? poppedItem : z));
            value = '';
        }
        else {
            steps.push(Math[x](y < 0 ? value : y, z < 0 ? value : z));
            value = 0;
        }
    }
    else {
        if (steps.length % 2 !== 0) {
            var poppedItem = steps.pop();
            steps.push(Math[x](poppedItem));
            value = '';
        }
        else {
            steps.push(Math[x](value));
            value = 0;
        }
    }
}
function solveMyFunction(fn) {
    function factorial(poppedItem) {
        var result = 1;
        for (var i = poppedItem; i > 0; i--) {
            result *= i;
        }
        return result;
    }
    // find factorial
    if (fn === 'factorial') {
        if (steps.length % 2 !== 0) {
            var poppedItem = steps.pop();
            steps.push(factorial(poppedItem));
            value = '';
        }
        else {
            steps.push(factorial(value));
            value = 0;
        }
    }
    else if (fn === 'inverse') {
        if (steps.length % 2 !== 0) {
            var poppedItem = steps.pop();
            steps.push(1 / poppedItem);
            value = '';
        }
        else {
            steps.push(1 / value);
            value = 0;
        }
    }
    else if (fn === 'negative') {
        if (typeof value === 'number') {
            value = -1 * value;
        }
    }
}
function clearAll() {
    steps = [];
    value = 0;
    isLastStepNumber = false;
    floatingPoint = 0;
    isFloat = false;
}
function backspace() {
    if (typeof value === 'number') {
        value = Math.floor(value / 10);
    }
}
// memory functions
function memoryFn(action) {
    switch (action) {
        case 'mc':
            memory = 0;
            break;
        case 'm+':
            memory += value;
            break;
        case 'm-':
            memory -= value;
            break;
        case 'mr':
            value = memory;
            break;
        case 'ms':
            memory = value;
            break;
    }
}

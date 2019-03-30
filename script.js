
// Nice looking buttons once clicked
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
	button.addEventListener('click', () => {
		button.classList.add('clicked');
	})
	button.addEventListener('transitionend', removeTransition)
})

function removeTransition() {
	this.classList.remove('clicked');
}

const display = document.querySelector('#display');
let warning = "I'm afraid I cannot let you do that Dave..."
let displayValue = "";
let op1;
let op2;
let operator;
let result; 

// Create all the number buttons
const numbers = document.querySelectorAll('.number');
const number = numbers.forEach((number, i) => {
	number.addEventListener('click', () => {
		if (displayValue.length > 14) return;
		display.textContent = displayValue += i;
	});
});
const dot = document.querySelector('.dot');
dot.addEventListener('click', () => {
	if (displayValue.includes(".")) return;
	if (!displayValue) {
		display.textContent = displayValue += "0.";
	} else
	display.textContent = displayValue += ".";
})

const del = document.querySelector('.delete');
del.addEventListener('click' , () => {
		if (result) {
			let lastChar = result.toString().substring(0, result.toString().length-1);
			display.textContent = displayValue = lastChar;
			result =  op1 = Number(lastChar);
		} else {
			display.textContent = displayValue = displayValue.substring(0, displayValue.length-1);
		}
		if (!displayValue) display.textContent = "0"	 
})


// If operation includes more than two steps,  
// operate on the last two operands and return
// them as operand 1 to continue the operation
// otherwise computes two operands
function lastOperation(op) {
	if (op === divide && displayValue == 0) {
		return display.textContent = warning
	}
	result = operate(op, +op1, +displayValue)
	display.textContent = result;
	displayValue = result.toString();
	op1 = result
	op2 = operator = undefined;
}

// 
function operationProcess(op, newOp) {
	if (op) lastOperation(op);
	if (op) op2 = displayValue;
	if (op1 === undefined && !op || op1 !== Number(displayValue)) op1 = displayValue;
	operator = newOp;
	displayValue = "";
}
const btnAdd = document.querySelector('.add');
btnAdd.addEventListener('click', () => {
	operationProcess(operator, add) 
})

const btnSub = document.querySelector('.sub');
btnSub.addEventListener('click', () => {
	operationProcess(operator, substract);	 
})

btnMult = document.querySelector('.mult');
btnMult.addEventListener('click', () => {
	operationProcess(operator, multiply);	
})

btnDivd = document.querySelector('.divd');
btnDivd.addEventListener('click', () => {
	operationProcess(operator, divide);
}) 

const btnEqual = document.querySelector('.equal');
btnEqual.addEventListener('click', () => {
	if (op1 === undefined || !displayValue || !operator) return;
	lastOperation(operator);
	result = undefined;
})

const btnClear = document.querySelector('.clear');
btnClear.addEventListener('click', () => {
	reset()
})

// Modules
function reset() {
	op1 = op2 = result = operator = undefined;
	displayValue = ""
	display.textContent = "0";
}



// Take a operation function and two numbers
function operate(op, a, b) {
 return op(a, b);
}
// Basic operations
function add(a, b) {
	return a + b;
}

function substract(a, b) {
	return a - b;
}

function multiply(a, b) { 
	return a * b; 
}

function divide(a, b) {
	return a / b; 
}



// Nice looking buttons once clicked
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
	button.addEventListener('click', () => {
		button.classList.add('clicked');
	})
	button.addEventListener('transitionend', (removeTransition))
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
		display.textContent = displayValue += i
		if (operator === undefined && op2 === undefined) {
			result = op1 = undefined;
		}
	});
});

// If operation includes more than two steps,  
// operate on the last two operands and return
// them as operand 1 to continue the operation
// otherwise computes two operands
function lastOperation(op) {
	if (op === divide && displayValue == 0) {
		return display.textContent = warning;
	}
	result = operate(op, +op1, +displayValue)
	display.textContent = result;
	op1 = result
	op2 = undefined;
}

// 
function operationProcess(op, newOp) {

	if (op) lastOperation(op);
	if (op) op2 = displayValue;
	if (op1 === undefined && !op) op1 = displayValue;
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
	if (op2 === undefined) op2 = displayValue;
	lastOperation(operator);
	displayValue = "";
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


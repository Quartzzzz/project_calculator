
// Display
const display = document.querySelector('#display');

let displayValue = "";

let op1;
let op2;
let operator;
let result; 

const numbers = document.querySelectorAll('.number');
const number = numbers.forEach((number, i) => {
	number.addEventListener('click', () => {
		display.textContent = displayValue += i
		if (operator === undefined && op2 === undefined) {
			result = op1 = undefined;
		}
	});
});

function lastOperation(op) {
	result = operate(op, +op1, +displayValue)
	display.textContent = result;
	op1 = result
	op2 = operator = undefined;
}

function operationProcess(op, a, b) {

}
const btnAdd = document.querySelector('.add');
btnAdd.addEventListener('click', () => {
	if (operator) lastOperation(operator);
	if (operator) op2 = displayValue;
	if (op1 === undefined && !operator) op1 = displayValue;
	if (!operator) operator = add;
	displayValue = "";	 
})


const btnSub = document.querySelector('.sub');
btnSub.addEventListener('click', () => {
	if (operator) lastOperation(operator);
	if (operator) op2 = displayValue;
	if (op1 === undefined && !operator) op1 = displayValue;
	if (!operator) operator = substract;
	displayValue = "";	 
})

btnMult = document.querySelector('.mult');
btnMult.addEventListener('click', () => {
	if (operator) lastOperation(operator);
	if (operator) op2 = displayValue;
	if (op1 === undefined && !operator) op1 = displayValue;
	if (!operator) operator = multiply;
	displayValue = "";	
})

btnDivd = document.querySelector('.divd');
btnDivd.addEventListener('click', () => {
	if (operator) lastOperation(operator);
	if (operator) op2 = displayValue;
	if (op1 === undefined && !operator) op1 = displayValue;
	if (!operator) operator = divide;
	displayValue = "";	
}) 

const btnEqual = document.querySelector('.equal');
btnEqual.addEventListener('click', () => {
	if (op2 === undefined) op2 = displayValue;
	lastOperation(operator);
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

// CAL 9000. A simple calculator by Quentin Mazet. This calculator was created as part of The Odin project curriculum ()

// *** OPERATION SECTION *** //

const display = document.querySelector('#display');
const warning = document.querySelector('audio')
let displayValue = "";
let firstOperand;
let operator;
let result; 

// Manage firstOperand and the different operators to chain the expression.
function operationProcess(currentOperator, newOperator) {
	if (firstOperand && operator) operation(currentOperator); 
	if (!firstOperand) firstOperand = displayValue;	
	operator = newOperator;
	displayValue = "";
}

// Take the selected operator to compute the firstOperand and the displayValue (i.e the second operand) to give a result. 
// The result is then assigned to firstOperand enabling the user to continue the expression by selecting an operator.
function operation(currentOperator) {
	if (currentOperator === divide && displayValue == 0) {
		warning.play() // CAL 9000 will not let you divide by 0																				
		reset();
		return
	}
	result = operate(currentOperator, +firstOperand, +displayValue);
	display.textContent = firstOperand = +result.toFixed(15); // result is preceded by the unary "+" to trick the program. If the result is "4" we won't  have "4.000000000" as the result.
	displayValue = result.toString();
}

// Take an operation function and two numbers
function operate(currentOperator, a, b) {
 return currentOperator(a, b);
}
// Basic operation functions
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

// *** BUTTON SECTION *** // 

// Create all the number buttons
const numbers = document.querySelectorAll('.number');
const number = numbers.forEach((number, i) => {
	number.addEventListener('click', () => {
		if (!displayValue && !operator && i === 0) return;
		if (displayValue.length > 15) return;
		display.textContent = displayValue += i;
	});
});

const btnAdd = document.querySelector('.add');
btnAdd.addEventListener('click', () => {
	operationProcess(operator, add) 
})

const btnSub = document.querySelector('.sub');
btnSub.addEventListener('click', () => {
	operationProcess(operator, substract);	 
})

const btnMult = document.querySelector('.mult');
btnMult.addEventListener('click', () => {
	operationProcess(operator, multiply);	
})

const btnDivd = document.querySelector('.divd');
btnDivd.addEventListener('click', () => {
	operationProcess(operator, divide);
})

const float = document.querySelector('.float');
float.addEventListener('click', () => {
	floatFunc();
})

function floatFunc() {
	if (displayValue.includes(".")) return; // Prevent the user from entering two floating points.
	if (!displayValue) {
		display.textContent = displayValue += "0.";
	} else
	display.textContent = displayValue += ".";
}

const del = document.querySelector('.delete');
del.addEventListener('click' , () => {
	delFunc();
})

function delFunc() {
	if (result) {
	let lastChar = result.toString().substring(0, result.toString().length-1); // Turn result into a string and return a substring without the last character
	display.textContent = displayValue = lastChar;
	result = Number(lastChar);
	} else {
		display.textContent = displayValue = displayValue.substring(0, displayValue.length-1);
	}
	if (!displayValue) display.textContent = "0"	
}

const btnEqual = document.querySelector('.equal');
btnEqual.addEventListener('click', () => {
	equalFunc();
})

function equalFunc() {
	if (firstOperand === undefined || !displayValue || !operator) return;
	operation(operator);
	operator = firstOperand = undefined;
}

const btnClear = document.querySelector('.clear');
btnClear.addEventListener('click', () => {
	reset()
})

function reset() {
	firstOperand = result = operator = undefined;
	displayValue = ""
	display.textContent = "0";
}

// Clicked-button effect. Change the class of the div that has been selected and then remove the class when the transition ends.
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

// Use the keyboard to manipulate the calculator
window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case ".":
			floatFunc();
			break;
		case "+":
			operationProcess(operator, add);
			break;
		case "-":
			operationProcess(operator, substract);
			break;
		case "*":
			operationProcess(operator, multiply);
			break;
		case "/":
			operationProcess(operator, divide);
			break;
		case "Backspace":
			delFunc();
		case "Enter":
			equalFunc();
			break;
		case "c":
			reset()
			break;				
	}	
	if (displayValue.length > 15) return;
	if (!displayValue && !operator && e.key === "0") return; // "0" can't be added to the initial "0"
	if (Number(e.key) || e.key === "0") display.textContent = displayValue += e.key;
});



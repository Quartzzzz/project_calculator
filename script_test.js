function lastOperation(operator) {
	result = operate(operator, +op1, +displayValue)
	display.textContent = result;
	op1 = result
	op2 = undefined;
	operator = undefined;
}

// Take a operation function and two numbers
function operate(operator, a, b) {
 return operator(a, b);
}
// Basic operations
function add(a, b) {
	return a + b;
}

console.log(lastOperation(add))
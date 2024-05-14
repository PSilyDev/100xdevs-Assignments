/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  // constructor
  constructor() {
    this.result = 0
  }

  // add
  add(number){
    this.result += number
  }

  // subtract
  subtraction(number){
    this.result -= number
  }

  // multiply
  multiplication(number){
    this.result *= number
  }

  // divide
  division(number){
    this.result /= number
  }

  // clear
  clear(){
    this.result = 0
  }

  // getResult
  getResult(){
    return this.result
  }

  // calculate
  calculate(expression){
    expression = expression.replace('/\s+/g', '')

    if(!/^\d+(\.\d+)?([\+\-\*\/]\d+(\.\d+)?)*$/.test(expression)){
      throw new Error("Invalid input expression")
    }

    return eval(expression)
  }

}

module.exports = Calculator;

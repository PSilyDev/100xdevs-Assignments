/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let larg = numbers[0]
    for(let num of numbers){
        console.log(num)
        if(num > larg){
            larg = num
        }
    }
    return larg
}

module.exports = findLargestElement;
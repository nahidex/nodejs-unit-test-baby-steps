var assert = require('assert');

function addTwoNumbers(x, y) {
    return x + x;
}

function addTwoNumbersTest(){
    var x = 5;
    var y = 1;
    var sum1 = x + y;
    var sum2 = addTwoNumbers(x, y);

    console.log('addTwoNumbers() should return the sum of its two parameters.');
    console.log('Expect '+ sum1 + ' to eqal ' + sum2);

    try {
        assert.equal(sum1, sum2);
    } catch (error) {
        console.error('Failed '+ error.message);
    }
}

addTwoNumbersTest();
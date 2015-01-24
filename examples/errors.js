var Virgilio = require('../');
var virgilio = new Virgilio();

//Defining a simple error.
virgilio.registerError$('FooError');
var fooError = new virgilio.FooError('foo!');
console.log(fooError.name);     //=> 'FooError'
console.log(fooError.message);  //=> 'foo!'

//Defining an error with a custom constructor.
virgilio.registerError$(function DivideByZeroError(number) {
    this.message = 'Can`t divide ' + number + ' by zero.';
    this.failingNumber = number;
});
var divideByZeroError = new virgilio.DivideByZeroError(5);
console.log(divideByZeroError.message);         //=> 'Can`t divide 5 by zero.'
console.log(divideByZeroError.failingNumber);   //=> 5

//Testing chain errors definition
virgilio
    .registerError$('BananaError')
    .registerError$('BananaBananaError');
var bananaError = new virgilio.BananaError('banana!');
var bananaBananaError = new virgilio.BananaBananaError('banana!banana!');
console.log(bananaError.name);      //=> 'BananaError'
console.log(bananaError.message);   //=> 'banana!'
console.log(bananaBananaError.name);      //=> 'BananaBananaError'
console.log(bananaBananaError.message);   //=> 'banana!banana!'

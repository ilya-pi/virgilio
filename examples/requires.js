var Virgilio = require('../');
var virgilio = new Virgilio();

// Testing the require with explicit name
virgilio.shareRequire$('foo', module.exports.foo = function foo() {
    return 'foo';
});
var test1 = virgilio.require$.foo();
console.log(test1); //=> 'foo'

// Testing the require with implicit name
virgilio.shareRequire$(module.exports.asd = function asd() {
    return 'asd';
});
var test2 = virgilio.require$.asd();
console.log(test2); //=> 'asd'

// Testing the require override
virgilio.shareRequire$(module.exports.asd = function asd() {
    return 'asd2';
});
var test3 = virgilio.require$.asd();
console.log(test3); //=> 'asd'

// Testing chaining shareRequire$
virgilio
    .shareRequire$(function firstRequire() {
        return 'firstRequire';
    })
    .shareRequire$(function secondRequire() {
        return 'secondRequire';
    });
console.log(virgilio.require$.firstRequire()); //=> 'firstRequire'
console.log(virgilio.require$.secondRequire()); //=> 'secondRequire'

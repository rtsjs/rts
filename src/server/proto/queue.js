module.exports = Queue;

function Queue(name) {
    this.name = name;
}


Queue.prototype.mapper = function () {


    var myMap = new Map();

    var keyObj = {},
        keyFunc = function () {
        },
        keyString = "a string";

    // setting the values
    myMap.set(keyString, "value associated with 'a string'");
    myMap.set(keyObj, "value associated with keyObj");
    myMap.set(keyFunc, "value associated with keyFunc");

    console.log(myMap.size); // 3

    // getting the values
    myMap.get(keyString);    // "value associated with 'a string'"
    myMap.get(keyObj);       // "value associated with keyObj"
    myMap.get(keyFunc);      // "value associated with keyFunc"

    myMap.get("a string");   // "value associated with 'a string'"
    // because keyString === 'a string'
    myMap.get({});           // undefined, because keyObj !== {}
    myMap.get(function () {
    }); // undefined, because keyFunc !== function () {}

    console.log(myMap.get(keyString));    // "value associated with 'a string'"
    console.log(myMap.get(keyObj));       // "value associated with keyObj"
    console.log(myMap.get(keyFunc));      // "value associated with keyFunc"

    console.log(myMap.get("a string"));   // "value associated with 'a string'"
    // because keyString === 'a string'
    console.log(myMap.get({}));           // undefined, because keyObj !== {}
    console.log(myMap.get(function () {
    })); // undefined, because keyFunc !== function () {}
    console.log(this.name);
}


/*
 export class Queue {
 constructor(name) {
 this._name = name;
 }

 mapper = function () {

 var myMap = new Map();

 var keyObj = {},
 keyFunc = function () {},
 keyString = "a string";

 // setting the values
 myMap.set(keyString, "value associated with 'a string'");
 myMap.set(keyObj, "value associated with keyObj");
 myMap.set(keyFunc, "value associated with keyFunc");

 console.log(myMap.size); // 3

 // getting the values
 myMap.get(keyString);    // "value associated with 'a string'"
 myMap.get(keyObj);       // "value associated with keyObj"
 myMap.get(keyFunc);      // "value associated with keyFunc"

 myMap.get("a string");   // "value associated with 'a string'"
 // because keyString === 'a string'
 myMap.get({});           // undefined, because keyObj !== {}
 myMap.get(function() {}); // undefined, because keyFunc !== function () {}

 console.log(myMap.get(keyString));    // "value associated with 'a string'"
 console.log(myMap.get(keyObj));       // "value associated with keyObj"
 console.log(myMap.get(keyFunc));      // "value associated with keyFunc"

 console.log(myMap.get("a string"));   // "value associated with 'a string'"
 // because keyString === 'a string'
 console.log(myMap.get({}));           // undefined, because keyObj !== {}
 console.log(myMap.get(function() {})); // undefined, because keyFunc !== function () {}
 console.log(this.name);
 }
 }
 */


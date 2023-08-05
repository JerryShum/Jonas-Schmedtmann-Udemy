'use strict';

//? Constructor Functions and the new Operator

const Person = function (firstName, birthYear) {
    // Instance Properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    //! NEVER DO THIS (if we had 1000 objects, they would all have this function copied)
    // this.calcAge = function () {
    //     console.log(2037 - this.birthYear);
    // };
};

const jonas = new Person('Jonas', 1991);
// new keyword is special: 
// 1. New{} (empty object) is created
// 2. Function is called, this. keyword IS THE new object (points to this new object) -> we are setting the properties of said new object to the values within our parameters (this is what happens when the function is called)
// 3. Newly created object is linked to the prototype (creates.__proto__ property and sets it to the .prototype property of the constructor)
// 4. Object that was created in the beginning is automaticaly returned
console.log(jonas);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

//! Checking if something is an instance of Person
console.log(jonas instanceof Person); //true

/////////////////////////////////////////////////////

//? Prototypes
// each and every function in JS has a property "prototype"
// all objects created using said function (constructor function) will inherit the protype methods

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
    // remember that this. points to the object calling the function
};

jonas.calcAge();
//* This is called prototypal inheritance/delegation -> jonas object doesn't actually have a calcAge() function (JS can't find it in the object) -> searches it's protoype instead and finds it there -> jonas object has inherited the function OR has delegated the calcAge functionality to the prototype

//! Checking the prototype
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// we can check a specific object's protype -> jonas is a Person object, therefore jonas can inherit all methods from Person.prototype
// .prototype property DOES NOT MEAN Person's protoype -> means that all objects that are derived from person use person.protype methods
// Person's protoype is not person.prototype and instead is something entirely different

//! Proto property comes from the New function (step 3)

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

//! Setting properties on the protoype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);
// means that jonas and matilda have access to these properties (HOWEVER it is not the same as it's OWN property b/c it wasn't declared on the object itself on creation)

console.log(jonas.hasOwnProperty('firstName'));//true
console.log(jonas.hasOwnProperty('species'));//false


/////////////////////////////////////////////////////


//? Prototypal Inheritance on Built-in Objects

console.log(jonas.__proto__);//Person.prototype
console.log(jonas.__proto__.__proto__);//Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__.__proto__);//Null
// Example of the prototype chain
// this is the prototype property of object (object.property)
// If something cannot be found within the chain, the returned value will be null

//! Prototypes of other objects
const arr = [1, 23, 45, 1, 6, 7, 1, 2, 4, 5, 2, 1, 2]; //new Array = [];
console.log(arr.__proto__ === Array.prototype); //arr's prototype -> Array is the constructor -> Array.prototype
console.log(arr.__proto__.__proto__);//Object.prototype

//* Creating a new function that can be accessed by all Array objects since we're creating it inside the prototype
Array.prototype.unique = function () {
    return [...new Set(this)];
    // returns an array of the set (all unique values)
}

console.log(arr.unique());
// Probably not a good idea to do tho.

//! DOM
const h1 = document.querySelector('.h1');
console.dir(h1);
// huge prototype chain, htmlheadingelement -> html element -> node -> object

console.dir(x => x + 1); //FUNCTIONS are also a prototype


/////////////////////////////////////////////////////


//? ES6 Classes

//! Class Expression
// const PersonCL = class{};

//! Class Declaration
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    };

    //Methods will be added to .prototype property
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    set fullName(name) {
        console.log(name);
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} does not include space`)
    }

    get fullName() {
        return this._fullName;
    }
}

const jerma = new PersonCl('jerma', 1996);
console.log(jerma);
jerma.calcAge(); //Remember this is acquired from the object prototype as jerma does not OWN calcAge

console.log(jerma.__proto__ === PersonCl.prototype);

//* adding method through declaration
/*
PersonCl.prototype.greet = function () {
    console.log(`Hey ${this.firstName}!`);
};
jerma.greet();
*/


//! Important
// 1. Classes are NOT hoisted (cannot be used before declared)
// 2. Class are first-class citizens (we can pass them into functions and return them from functions)
// 3. Classes are executed in strict mode


/////////////////////////////////////////////////////


//? Setters and Getters
// basically functions that get and set a value
// acts as properties aswell

const account = {
    owner: 'Jonas',
    movements: [200, 53, 120, 300],

    //method to get the latest movements
    get latest() {
        return this.movements.slice(-1).pop();
        //returning the last movement (slice return array , pop)
    },

    //set method
    set latest(movement) {
        //must contain one parameter
        this.movements.push(movement);
    },
};

//* Getter
console.log(account.latest);
//We called it just like a NORMAL PROPERTY -> useful if we need to do some simple calculation before

//* Setter
account.latest = 50;
console.log(account.movements);
// "setting" the last movement in the array to 50

//! Fullname example:
//* getters and setters can be useful for verifying input properties like so:

// in the class above, we set a setter property fullName
// fullName is also the inputted property of the constructor
// that means when the fullName is entered into the constructor, it also calls the setter method/property
// we get an error if we set have this.fullname (we replace it with _fullname) (basically a loop since we keep going into the fullname method)
// to fix the issue of not having a fullName property (since it's _fullname now ) -> we use a GETTER method/property

const walter = new PersonCl('Walter White', 1950);
console.log(walter.fullName);


/////////////////////////////////////////////////////


//? Object.create
// Another way of implementing prototypal inheritance/delegation
//* manually set the prototype of an object to any other object that we want

// creating an object to be the prototype of all the person objects

const PersonProto = {
    calcAge() {
        console.log(2037 - birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthyear = birthYear;
    },

};

const steven = Object.create(PersonProto);
// this will return a brand new object linked to the object inserted (PersonProto) (-> acts as prototype for steven)
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__); //Equal to PersonProto

const sara = Object.create(PersonProto);
sara.init('Sara', 1979);
sara.calcAge();



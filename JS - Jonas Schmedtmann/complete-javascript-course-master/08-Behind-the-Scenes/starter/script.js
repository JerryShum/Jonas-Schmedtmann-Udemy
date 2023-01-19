'use strict';

//?Scoping in Practice
/*
const firstName = 'Jerry';

function calcAge(birthYear) {
    // //*This can be logged since firstName is a global variable and scoping allows variables to be used INWARDS nwards but not OUTWARDS
    // //! It does something called a VARIBALE LOOKUP -> if a varibale doesn't exist in its scope, it will look it up inside of the PARENT SCOPE and use that value instead
    // console.log(firstName);

    const age = 2022 - birthYear;

    function printAge() {
        const output = ` ${firstName}, you are ${age}, born in ${birthYear}`;
        console.log(output);

        if (birthYear >= 1981 && birthYear <= 1996) {
            //!This is a block scope and so variables (str) defined within this scope can only be USED by this scope and its children
            //* Unless you use VAR to define a variable

            const str = `Oh, and you're a millenial, ${firstName}`;
            console.log(str);
        }
    }

    printAge

    return age;
}

calcAge(1991);

//NOTE In the global scope we dont have access to variables/functions defined in INNER scopes, ex:
// console.log(age);
// printAge();

//NOTE If two scopes contain the same variable name and it is used, the one closest to where it is called will be used (current scope has priority -> direct parent -> grandparent -> etc.)

//NOTE If a variable is REDEFINED (not let or const statement) from within a child scope, it will be redefined to the value from the childscope
*/

//? Hoisting and TDZ in practice
/*

//! Variables
//NOTE Practicing hoisting the 3 diff ways to declare a variable

//var results in an undefined value as it is HOISTED to a value of undefined until declared
console.log(me);
//let and const results in an error as it is still in the TDZ and cannot be accessed
console.log(job);
console.log(year);

var me = 'Jerry';
let job = 'Student';
const year = '2003';

//! Functions

//Normal function declaration is hoisted and therefore can be used before declaration
console.log(addDeclar(2,3));
//Function EXPRESSIONS use the value of const to be declared and therefore have a TDZ restricting usage between start of scope and declaration of the function expression
console.log(addExpr(2,3));
//Arrow function is the same as expression as they were declared using const
console.log(addArrow(2,3));

//*IF the type const was changed to var below -> it would result in the value of undefined being hoisted -> means that instead of the functions, console.log would be like console.log(undefined(2,3))

function addDeclar(a,b){
    return a+b;
}

const addExpr = function(a,b){
    return a+b;
}

const addArrow = (a,b) => a+b;

//! Example
//An example of hoisting where it may be detrimental (also b/c of the use of var)

//WE write some logic to delete all items in shopping cart (when numProducts = 0)
//NOTE 0 is a falsy value and therefore will return false when inside of boolean
if(!numProducts){
    deleteShoppingCart();
}

var numProducts = 10;

function deleteShoppingCart(){
    console.log('All products deleted');
}

//* This example will result in all products being deleted as the value of UNDEFINED is actually hoisted and not 10 because of var. -> undefined is falsy -> means if statement is fulfilled -> deleteShoppingCart is called

*/

//? 'This' keyword

/*
//> The 'this' keyword will point to the object that it is within
//Inside of a function (normal declaration and expression) -> points to nothing(undefined) (MUST BE IN STRICT MODE)
//Inside of arrow function -> points to window object (BROWSER WINDOW OBJECT -> kinda like the global object)
//Inside of a method (function inside of an object) it will point to the object itself (object.propertyName)

//____________________________________________________________________________________________________________

//> This will log the window object to the console (the global object)
console.log(this);

//____________________________________________________________________________________________________________

//* IN STRICT MODE (Function declaration / expression)
//> This will log as undefined in STRICT MODE but in normal mode it will log as the window object
const calcAge = function (birthYear) {
    console.log(2022 - birthYear);
    console.log(this);
};
calcAge(1991);

//____________________________________________________________________________________________________________

//? Arrow Functions
//> Will log as the window object
//This is because the arrow function does not get its own this keyword and instead gets the 'lexical' this keyword meaning that it will have the same this keyword value as its parent scope (in this case it will be the global scope) -> this keyword points to the window object because the parent scope of this particular arrow function is the global scope
const calcAgeArrow = birthYear => {
    console.log(2022 - birthYear);
    console.log(this);
};
calcAgeArrow(1991);

//____________________________________________________________________________________________________________

//? Objects and methods
//> When used within a method, it should point to the object the method is within

const jerry = {
    year: 2003,
    calcAge: function () {
        console.log(this);
        console.log('Jerry is currently: ' + (2022 - this.year));
    },
};
jerry.calcAge();

//! However it should be stated that it is ONLY calling jerry's year because jerry was the OBJECT calling the calcAge function that has the this keyword within it

//> What if we made another object and 'borrowed' the same method?

const jerry2 = {
    year: 2005,
};

//! This is called METHOD BORROWING and is simply copying the value from jerry.calcAge to jerry2.calcAge and assigning it as the same property
jerry2.calcAge = jerry.calcAge;

//> This means we can do this and it should return 17 as the this keyword POINTS TO the OBJECT CALLING the method.
jerry2.calcAge();

//> What if we do this instead:
//We are assigning the value of jerry.calcAge to rando
const rando = jerry.calcAge;
console.log(rando);

//What happends when we call this function (since its basically just copying the body and format of the calcAge function and assigning it to rando)
rando();

//> This will point to undefined as rando is a function expression
//! It will also return an error because undefined.year does not exist
*/

//____________________________________________________________________________________________________________

//? Regular Functions vs. Arrow Functions
/*
const jerry = {
    year: 2003,
    firstName: 'Jerry',
    calcAge: function () {
        console.log(this);
        console.log('Jerry is currently: ' + (2022 - this.year));

        //> Another problem that can arise is using a function from within a method
        // const isMillenial = function() {
        //     if(this.year >= 1981 && this.year <= 1996){
        //         console.log('Millenial');
        //     }
        // }

        //Will result in an error because this inside of the isMillenial function will return undefined (since it is within a function)\
        //> To circumvent this:
        const preserveThis = this;
        //This will preserve the this keyword value to be the object (jerry) and save it into preserveThis
        //And then we can do:
        const isMillenial = function () {
            if (preserveThis.year >= 1981 && preserveThis.year <= 1996) {
                console.log('Millenial');
            }
        }

        //! This works because we store the this keyword value from the METHOD (jerry) into a variable and use this variable instead of the this keyword inside of the function

        //> We can also just use an ARROW FUNCTION (instead of normal function declaration) to circumvent this b/c arrow functions use the lexical this keyword and therefore will use the method this keyword instead


    },

    greet: () => console.log(`Hey ${this.firstName}`),
};
jerry.greet();

//> jerry.greet() returns "Hey undefined" because an arrow function's this keyword will use the lexical this keyword (parent scope), and an OBJECT IS NOT CONSIDERED ITS OWN BLOCK/SCOPE as it is only an object literal (kinda like defining a variable)

//! still in global scope -> uses this keyword from global scope -> uses this keyword from window object -> undefined b/c in the window object there is not firstName property -> undefined

//! This is why we do not use VAR b/c it creates properties inside of the window object and can cause errors
//This will create the firstName property inside of the window object allowing for the greet method to work properly
//var firstName = 'Joe';

//?Arguments keyword

const addExpr = function (a, b) {
    console.log(arguments);
    return a + b;
};

addExpr(2, 5);

//The arguments keyword will return an array of all of the arguments ([2,5])
//This is useful if we need to loop over all of the arguments

//! Arrow functions do NOT have the arguments keyword
//! ONLY EXISTS IN REGULAR FUNCTIONS
*/

//____________________________________________________________________________________________________________

//? Primitives vs. Objects (Primitve vs. Reference Types
/*
//Primitives are numbers, booleans, strings, etc.
let age = 30;
let oldAge = age;
age = 31;
console.log(age);//31
console.log(oldAge);//30

//Creating an object
const me = {
    name: 'Jerry',
    age: 30,
}

const friend = me;
friend.age = 27;

console.log("me:" + me);
console.log("Friend:" + friend);
//> They end up being the same object (source of confusion between these two types)

//The reason behind them being the same is that they both POINT TO THE SAME REFERENCE inside the callstack this REFERENCE then points to the object. -> Since they both point to the same reference, and friend.age changed the object, both of them would change(they're essentially the same thing but theyre just 2 references to the same object)

//!ALSO the reason why we can "change" the value of friend even though it is constant -> value in call stack isn't actually changed (it is only the address of the object inside the heap memory), what is actually being changed is the value inside the HEAP MEMORY not the Call stack 
*/
//? Primitives and Objects In Practice

//> Primitive Types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

//> Reference Types
const cat = {
    firstName: 'Cat',
    lastName: 'Williams',
    age: 27
};

const marriedCat = cat;
marriedCat.lastName = 'Davis';
console.log('Before Marriage:', cat);
console.log('After Marriage:', marriedCat);

//! Remember const marriedCat is "changable" b/c CALL STACK VALUE isn't being changed -> HEAP value is being changed
//! HOWEVER you cannot assign marriedCat to another NEW OBJECT (this is changing the ADDRESS within the CALL STACK VALUE which you CANNOT DO b/c of CONST)

//> Copying Objects
// If we wanted to copy this object, we can use a function called Object.assign -> merge 2 objects and return a new one

const cat2 = {
    firstName: 'Cat',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob']//An array is essentially an object -> object within object
};

//Will merge an EMPTY OBJECT and cat2 , CREATE A NEW OBJECT, -> and assign it to another variable (catCopy)
const catCopy = Object.assign({}, cat2);
catCopy.lastName = 'Davis';

console.log('Before Marriage:', cat2);
console.log('After Marriage', catCopy);
//! Object.assign only creates a "SHALLOW" copy -> meaning it only copies stuff on the shallow level -> if there is an object inside of an object, this object will still point to the same variable

//We are manipulating the object within the COPIED object 
catCopy.family.push('Mary');
catCopy.family.push('John');

console.log('Before Marriage:', cat2);
console.log('After Marriage', catCopy);

//> We can see that the family property/object is the same for both cat2 and catCopy (catCopy is a shallow copy not a DEEP CLONE)
// Both cat2 and catCopy have the same value within family: that POINTS to the SAME object inside the HEAP MEMORY meaning that when we change the array, we change both



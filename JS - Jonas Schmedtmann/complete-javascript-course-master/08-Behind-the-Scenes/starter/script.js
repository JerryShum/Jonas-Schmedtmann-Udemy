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

//*This example will result in all products being deleted as the value of UNDEFINED is actually hoisted and not 10 because of var. -> undefined is falsy -> means if statement is fulfilled -> deleteShoppingCart is called

*/

//? 'This' keyword
'use strict';

//? Default Parameters
//Using the airline theme from the previous section

//________________________________________________________________________________

/*
const bookings = [];

//! ES6 method of making default values:
//Inside the arguments for the function, add an = sign and their associated default value
//We can set them equal to almost anything (expressions, etc.)
//We can also use the values of the arguments inserted before it
// -> price is dependent on numPassengers


const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {

    //! OLD WAY (ES5) of creating default values:
    //If they don't come wiht a value in the argument, it will be undefined (see below) -> falsy value -> short circuit automatically to a value of 1
    // numPassengers = numPassengers || 1;
    // price = price || 199;



    //! Will create an object for the inserted arguments (and their associated value)
    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123'); //flightNum: 'LH123', numPassengers: undefined, price: undefined
createBooking('LH123', 2, 800); // flightNum: 'LH123', numPassengers: 2, price: 800
createBooking('LH123', 5); //flightNum: 'LH123', numPassengers: 5, price: 995 -> price was calculated based on number of passengers (5*199)

//! What if we wanted a price not dependent on number of passengers (without setting a value for passengers):
//SET IT TO UNDEFINED  -> we will have our defined price but also the default value for passengers
//THIS IS HOW WE SKIP A "DEFAULT PARAMETER" AND LEAVE IT AS IT'S DEFAULT VALUE

createBooking('LH123', undefined, 1000); //flightNum: 'LH123', numPassengers: 1, price: 1000
*/

//________________________________________________________________________________

//? Pass ARGUMENTS by Value vs. Pass by Reference
//Primitives vs objects (call stack & heap memory)

/*

//> Example:
const flight = 'LH234';
const jonas = {
    name: 'Jonas Schmedtmann',
    passport: 234423423
}

const checkIn = function (flightNum, passenger) {
    //Let's say that for some reason the flightNum has chaned:
    flightNum = 'LH999';
    //We will change the name of the passenger (add Mr. to the front)
    passenger.name = 'Mr.' + passenger.name;

    if (passenger.passport === 234423423) {
        alert('Checked In!')
    } else {
        alert('WRONG!');
    }

}

checkIn(flight, jonas);

//________________________________________________________________________________

//! Let's see how these values have changed once our function was called:
console.log(flight); //LH234
console.log(jonas); //Mr.Jonas Schmedtmann

//* We see that the flight number HASN'T changed but the passenger object -> name itself HAS
//This is because since the flightNumber is a PRIMITIVE value (string), when passed into an argument, it acts as a COPY (it is not the original value)
//This is called PASS BY VALUE (only passing in the value of the primitive type)

//When passing in a REFERENCE type (object) into a function, we are passing in a REFERENCE to that object (not the value)
// And so, if we pass in a reference and change anything to that reference -> we are changing the object itself
const passenger = jonas;
//We are essentially copying the reference that the 'jonas' variable has and copying it to passenger
//Hence, they refer to the same object and any changes will change the OBJECT itself and therefore, change the value for both the passenger and jonas variable

//________________________________________________________________________________

//> Another scenario:

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random()) * 1000000000
}

newPassport(jonas);
checkIn(flight, jonas)

//* The problem is that now there are 2 functions affecting and editing the same object (jonas) -> At first, jonas will be able to check in because his passport number matches the one above BUT now that this one changes that object too, his passport number will no longer match.
//The problem is that we have to be careful when passing in objects by reference as we might unknowingly change some value

//! JS does NOT have pass by reference, we are PASSING IN A REFERENCE (through an 'associated value')

*/

//________________________________________________________________________________

//? First-Class and Higher-Order Functions

//> First-Class Functions
/*

    *- JS treats functions as FIRST-CLASS-CITIZENS
    *- This means that functions are simply VALUES
    *- They are just another "type" of object

    We are able to store them in variables or even object properties
    const add = (a,b) => a + b; (variable add)

    const counter  = { (object property inc)
        value:23;
        inc: function(){
            this.value++;
        }
    }

    ! The content of the function -> function(){...} is the VALUE of that function and we are able to store this value WHEREVER

    *- We can also pass functions as arguments to OTHER functions
    - Think of a DOM event listener -> the event listener itself is a function -> we pass in a REFERENCE to the function we'd like to pass in
    const greet = function(){
        console.log('Hey Jonas');
    }

    ! Here we are passing in the reference as a value to the greet function
    buttonClose.addEventListener('click', greet);

    *- We can also return function FROM other functions
    *- Since functions are basically objects, and objects have methods, -> there are methods that we can call on functions

    ! Such as the bind() method:
    counter.inc.bind(someOtherObject);
*/

//________________________________________________________________________________

//> Higher-Order Functions
//Since JS has the capability to write first-class functions, we can use JS to write HIGHER-ORDER FUNCTIONS

/*
    !- What is a higher order function?
    *- A function that RECEIVES another function as an argument,
    *- OR a function that RETURNS a new function
    *- OR BOTH

    *- Only possible because of first-class functions

    ! 1 - Function that Receives another function as an argument:
    const greet = function(){
        console.log('Hey Jonas');
    }

    buttonClose.addEventListener('click', greet);

    *- In this case, the addEventListener function is the HIGHER-ORDER function since it's receiving the greet function as an argument
        -We call greet the CALLBACK function b/c it will be CALLED later by the HIGHER-ORDER function
        -In this case, it will be called when the 'click' of the button happens
        -Basically saying it will be on standby until the addEventListener function is ready

    ! 2 - Return a new function:
    function count() {
        let counter = 0;
        return function(){
            counter++;
        }
    }

    *- In this case, count is the HIGHER-ORDER function and function() is the RETURNED FUNCTION
*/

//> Just some clarification:

/*
 *First Class functions are a FEATURE that JS has
 * -> meaning that all functions are simply just a value -> IT IS JUST A CONCEPT


 *However, there are HIGHER ORDER functions in practice, this is because JS has First class functions as a feature
*/

//________________________________________________________________________________

//? Functions Accepting Callback Functions
//Creating functions that accept other functions as an input
/*


//Creating 2 generic functions that do string transformations
const oneWord = function (str) {
    //Creating a function that basically converts a string into one entire word by removing all spaces
    //This is done with a 'g flag' which selects all the characters within (/is/g -> will select all the "is" that's present in a string)
    //And then replaces it with an empty char -> makes entire string into lowercase
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
    //Creating a function that will convert the first word of a string to all uppercase:
    //We can use both destructuring and the split method to make this work
    //This is saying that once we split the string by the ' ' (space) the values will be stored in an array
    //We are then destructuring the first value of that array to the 'first' variable -> all the other values will be spread operatored into a new array with the name other

    const [first, ...other] = str.split(' ');
    return [first.toUpperCase(), ...other].join(' ');
};


//* This is a higher order function: (It is RECEIVING a function as an argument)
const transformer = function (str, func) {
    console.log(`Original String: ${str}`);
    console.log(`Transformed string: ${func(str)}`);

    //! Remember that first-order functions have access to methods(they are just considered to be objects/values)
    //We use the .name method for this function
    console.log(`Transformed by: ${func.name}`);
}

//! We are only passing in the REFERENCE to the function as transformer() will call it
transformer('JavaScript is the best!', upperFirstWord);

transformer('JavaScript is the best!', oneWord);

//* Remember that upperFirstWord and oneWord are considered CALL-BACK FUNCTIONS

//________________________________________________________________________________

//! This is the same concept used in DOM:
//Consider this very simple log function:

const high5 = function () {
    console.log('HIGH 5!');
}

//DOM:
document.body.addEventListener('click', high5);

//This uses the same concept of higher-order functions and call-back functions.
//In this case, the addEventListener function is the higher-order b/c it is receiving the high5 function as an argument (call-back function)

//________________________________________________________________________________

//! Take the forEach function (used on arrays) for example:
//Making a dummy array:
const dumArray = ['Jonas', 'Martha', 'Adam'].forEach(high5);

//This is saying that for each element in the array, we want to call the high5 function
//forEach function -> higher-order, high5 function -> call-back

//________________________________________________________________________________

//> Why are call-back functions widely used and why are they so helpful?

*/

/*

    *- Makes it easy to split up code into more reusable and interconnected parts
        *- All of our functions are separated into their own little block but is used in many other functions

    *- Abstraction
        *- Hiding the detail of some code implementation -> sometimes we don't need to care about some things
        *- Transformer function -> doesn't really care about how to transform a string -> it only transforms
            *- We could have directly written how to transform a string RIGHT INTO the transformer function but instead we wrote it in a separate call-back function and so, we ABSTRACTED some detail
            *- WE CREATED A NEW LEVEL OF ABSTRACTION

            *- Delegated how to transform a string to the lower-level functions (oneWord, upperFirstWord)

    ! It is called a HIGHER-ORDER function b/c it has a HIGHER LEVEL OF ABSTRACTION -> leaves the lower levels to the lower functions

*/

//________________________________________________________________________________

//? Functions Returning Functions

/*
//Creating a simple greet function:
//Takes an argument (greeting)
const greet = function (greeting) {

    //greet returns a function:
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}

//If we do this:
//We assign that returned function to a new variable (greeterHey) -> which we can call over and over again
const greeterHey = greet('Hey!');

greeterHey(`Jonas`);
greeterHey(`Steven`);

//! We can also chain because they return values immediately:
//greet(Hello!) -> returns a function that takes a name as an input ('Jonas') -> console.log(`${greeting} ${name}`)
greet('Hello!')('Jonas');

//! Using arrow functions to remake greet:

const greetArr = greeting => name => console.log(`${greeting} ${name}`);
//What this is saying is that greetArr takes in an argument greeting and then RETURNS ANOTHER ARROW FUNCTION (=>) which takes name as an input which then returns console.log ...

*/

//________________________________________________________________________________

//? The call and apply methods
//This keyword and how to set it manually

/*
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    //OR this syntax: book: function(){}
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name })
    },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

//! Creating a new function book to reuse in all airlines:
// We are able to do this: because of first-class functions
const book = lufthansa.book;

//Now what if we call this function?
//book(23, 'Sarah Williams');
//It returns undefined because the this. keywords within the function point to undefined in strict mode

//! To solve this, we need to tell JS the exact parameters of the this keyword (eurowings or lufthansa) -> APPLY AND BIND

//________________________________________________________________________________

//> Call Method:

//! Remember that since functions are bascially just objects, they will have methods too: (call method)
//The first argument in the call method will tell JS what the this.keyword will refer to
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

//________________________________________________________________________________

//> Apply Method:
//Basically the same as the call method but will take an array of arguments after the this keyword
const flightData = [583, 'George Cooper'];
book.apply(lufthansa, flightData);
console.log(lufthansa);

//! We don't really use the apply method b/c we can just use the call method with the spread operator:
book.call(lufthansa, ...[flightData]);


//_______________________________________________________________________________


//? The bind Method (continuing from the call and apply method)
// book.call(eurowings, 23, 'Sarah Williams');

//! Instead of calling a function, bind, will instead create a new function where eurowings replaces the this keyword
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);

bookEW(23, 'Steven Williams');

//! It will also create a new function for any argument entered after the 'this' keyword
//Meaning you can create a specific function for a specific airline or a specific person, etc.

const bookEW23 = book.bind(eurowings, 23); //New function where this keyword = eurowings, flightNum = 23. -> we still need to set the passenger name
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

//* This is called partial application where parts of the argument are already set

//_______________________________________________________________________________

//> The bind method is very useful when using objects along with EVENT LISTERNERS
//! Example:

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    this.planes++;
    console.log(this.planes);
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//This.planes returns NaN (not a number) b/c the this. keyword actually refers to the button element, not lufthansa
//This is because in an event handler, the this keyword inside of the HANDLER FUNCTION (lufthansa.buyplane) ALWAYS points to the element of which the handler is attached to ('.buy')

//! This means we need to manually define the this keyword for the function -> we use the bind function since we don't want to call it.

//_______________________________________________________________________________

//> Partial Application
//Remember that partial application just means you are adding preset arguments for a function

//Example using tax rates
//This is a simple function where we calculate the tax with a given rate and value
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//What if we have a preset tax rate (HST = 13%) -> use bind method on addTax and simply use partial application
//* Null is there b/c we don't have a this. keyword to replace, so we input null
const addHST = addTax.bind(null, 0.13);

console.log(addHST(100)); //113

//! While we could have done this using default parameters, we wouldn't be creating a NEW function (which the bind method does)

//_______________________________________________________________________________

//> What if we wanted to do this using higher-order functions (function returning a function)

const addHST2 = function (rate) {
    return function (value) {
        return value + value + rate;
    }
}

//! This is basically saying that we are making a function that takes a specific rate as an input -> which then takes a value and calculates the total amount needed to be paid using the rate specified.

//Returns function with set rate -> uses this rate to calc money
//Can do this with many diff rates
*/


//_______________________________________________________________________________



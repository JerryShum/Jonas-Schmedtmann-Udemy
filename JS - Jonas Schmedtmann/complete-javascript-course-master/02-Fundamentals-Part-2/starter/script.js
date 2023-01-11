//?Enabling strict mode for the entire script
//Helps write better code, less mistakes, visible errors, reserves certain keywords like (class, interface, private, etc.) for future implementations
'use strict';

//? Functions
/*
//Functions are basically just reusable snippets of code

//Creating function
function logger(){
    console.log(`My name is Jerry`);
}

//Calling/running/invoking function
logger();

//Creating a function called fruitProcessor with parameters apples and oranges (should be numbers)
function fruitProcessor(apples, oranges){
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

//Calling the function and passing in arguments into the parameters
fruitProcessor(5, 0);
//Capturing the function into another variable is basically just capturing the returned value (juice) into the variable
const appleJuice = fruitProcessor(5,0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2,4);
*/

//? Function Declaration vs. Expressions

/*
//Function Declaration
function calcAge1(birthYear){
    const age1 = 2022 - birthYear;
    return age1;
}

const age1 = calcAge1(1991);

//Function Expressions
const calcAge2 = function (birthYear){
    return 2022 - birthYear;
}
const age2 = calcAge2(1991);

console.log(age1, age2);

//*The main difference between function declarations and expressions is that you are able to call function declarations before they are defined in the code (Hoisting)

//Using expressions allows for code to be more organized and maintained as you must define an expression before using it (define at top so more organized)
*/

//? Arrow Functions
/*
// Basically a shorter form of the function expression

//Function Expressions
const calcAge2 = function (birthYear){
    return 2022 - birthYear;
}

//Arrow Functions

const calcAge3 = birthYear => 2022 - birthYear;
//function name = Parameter => function body

const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear,firstName) => {
    const age = 2022 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years.`;
}
//When function body has more than one line of code, use curly braces

console.log(yearsUntilRetirement(1991, 'Jerry'));
*/

//? Functions calling other functions
/*
//Reusing food processor function
//*Think that the food processor now needs another machine(function) to cut the fruit into smaller pieces before working 

function cutFruitPieces(fruit){
    const pieces = fruit * 4;
    //Cuts fruit into 4 pieces
    return pieces;
}

function fruitProcessor(apples, oranges){
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    console.log(apples, oranges);
    console.log(applePieces, orangePieces);
    const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces.`;
    return juice;
}
//We are calling the cutFruitPieces function from within the fruitProcessor function

console.log(fruitProcessor(2,3));
*/

//? Reviewing functions

/*
const calcAge = function (birthYear){
    const age = 2022 - birthYear;
    return age;
}

const yearsUntilRetirement = function(birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if(retirement > 0){
        return `${firstName} retires in ${retirement} years.`;
    }else{
        return -1;
    }
}

console.log(yearsUntilRetirement(2003, 'Jerry'));
console.log(yearsUntilRetirement(1900, 'Meow'));
*/

//? Introduction to Arrays
/*
//Instead of storing 3 similar values into separate variables, we can use an array
const friend1 = 'Jerry';
const friend2 = 'Vel';
const friend3 = 'April';

const friends = ['Jerry', 'Vel', 'April'];
console.log(friends);

//Can also define an array like this:
const years = new Array(2022, 2021, 2020, 2019);

//* Arrays are mutable and can be changed
friends[2] = 'April2';
console.log(friends);

//To find the length of the array, use .length

console.log(years.length);
*/

//? Array Operations
/*
const friends = ['Jerry', 'Vel', 'April'];

//Push adds an element to the end of the array, Push also returns the length of the 'NEW' Array
friends.push('Jay');
console.log(friends);

//unshift adds an element to the beginning of the array
friends.unshift('John');
console.log(friends);

//Remove elements at the end of the array, RETURNS the REMOVED element
const popped = friends.pop();
console.log(popped);
console.log(friends);

//Remove elements at front of array
friends.shift();
console.log(friends);

//.indexOf()
console.log(friends.indexOf('Vel'));

//More modern method of indexOf (.includes) returns boolean value
//Uses strict equality (must be same type and value)
console.log(friends.includes('Vel'));
*/

//? Introduction to Objects
/*
//Instead of defining an array with multiple aspects:
const jerryPerson = [
    'Jerry',
    19,
    ['April', 'Vel', 'Iona', 'James'],
    'Student',
    'etc.',
]
//You can only access these values through index

//We can use an OBJECT to define our aspects using key value pairs

//! OBJECTS USE CURLY BRACES
const jerry = {
    firstName: 'Jerry',
    lastName: 'Shum',
    age: 2022 - 2003,
    job: 'Student',
    friends: ['April', 'Vel', 'Iona', 'James']
}
//The keys are called properties - the jerry object has 5 properties
//The firstName propert has a value of 'Jerry'

//*Use objects for more unordered data and date we want named - Use arrays for more ordered data
*/

//? Accessing and retrieving data from objects
/*
const jerry = {
    firstName: 'Jerry',
    lastName: 'Shum',
    age: 2022 - 2003,
    job: 'Student',
    friends: ['April', 'Vel', 'Iona', 'James']
}

//To access a property and their associated value, use DOT NOTATION
console.log(jerry.lastName);

//Can also use Bracket Notation
console.log(jerry['lastName']);''

//Bracket notation can also do this:
const nameKey = 'Name';
console.log(jerry['last' + nameKey]);
console.log(jerry['first' + nameKey]);
//This is because the overall value inside the squarebrackets matches a property inside the object

//This cannot be done with DOT NOTATION because it depends strictly on the name

//Stores inputted value into the interestedIn variable
const interestedIn = prompt('What do you want to know about Jerry? Choose between firstName, lastName, age, job, and friends.');

//You cannot do this because there is no property named 'interestedIn' inside of the jerry object (dot notation only uses property names and not value)
console.log(jerry.interestedIn);

//Bracket notation works because of the value
console.log(jerry[interestedIn]);

//Will return undefined as a value if it doesn't work -> undefined is a falsy value -> print a string using this
//* Since undefined is a falsy value, when converted into boolean, it will be false
if(jerry[interestedIn]){
    console.log(jerry[interestedIn]);
}else{
    console.log('This value does not exist, please try again!')
}

//? How to use dot and bracket notation to ADD to an object

jerry.location = 'Canada';
jerry['game'] = 'Maplestory';
console.log(jerry.location);

//Challenge -> recreate string using object properties
//'Jerry has 3 friends, and his best friend is called April'

console.log(`${jerry.firstName} has ${jerry.friends.length} friends, and his best friend is ${jerry.friends[0]}`);
*/

//? Object methods
/*
//Functions are just another value and can therefore be added to an array
const jerry = {
    firstName: 'Jerry',
    lastName: 'Shum',
    birthYear: 2003,
    job: 'Student',
    friends: ['April', 'Vel', 'Iona', 'James'],
    hasDriversLicense: true,

    //Adding function as a key/property
    //! Any function attached to an object is called a method
    // calcAge: function(birthYear){
    //     return 2022 - birthYear;
    // }

    calcAge: function(){
        console.log(this)
        //This referes to the object that is calling 'this'(jerry)

        //this.age is creating a property from within the object
        this.age = 2022 - this.birthYear;//-> accessing jerry.birthYear from within the jerry object using 'this' keyword
        return this.age;//returns the age created from the line above
        //! can definitely use jerry.birthyear BUT if the object name changes (jerry -> jerry2) you must also change jerry.birthyear (room for error)
    }
}


    
    //^^^ similar to a function expression:
    const calcAge = function(birthYear){
        return 2022 - birthYear;
    }
    

//Dot notation
console.log(jerry.calcAge());
//Bracket notation
    //console.log(jerry['calcAge']());

console.log(jerry.age);

//Challenge -> write a method getSummary to create a string:
// "Jerry is a 19 year old student, and he has a or no drivers license"

jerry.getSummary = function(this){
    return `${this.firstName} is a ${this.calcAge} year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license`;
    //! Remember ternary operator
}

console.log(jerry.getSummary());
*/

//? For Loops
/*
//Think of being at the gym (reps)
//For loops keeps repeating and running while condition is true
for(let rep = 1 ; rep <=10 ; rep++){
    console.log(`Lifting weights, repition:${rep}.`);
}
*/


//? Looping arrays, breaking, and continuing
/*
const jerryPerson = [
    'Jerry',
    19,
    ['April', 'Vel', 'Iona', 'James'],
    'Student',
    'etc.',
]

//* the continue line exits out of the CURRENT iteration of a loop and CONTINUES with the next one
for(let i=0; i<jerryPerson.length;i++){
    if(typeof jerryPerson[i] !== 'string') continue;

    console.log(jerryPerson[i], typeof jerryPerson[i]);
}

//This for loop will only log the value of types string from the array, all the others will be skipped b/c of the continue statement

//* Break will terminate the entire loop 
for(let i=0; i<jerryPerson.length;i++){
    if(typeof jerryPerson[i] === 'number') break;

    console.log(jerryPerson[i], typeof jerryPerson[i]);
}
//This loop will BREAK once a value with type number is found from the array

//*Looping backwards
for(let i=jerryPerson.length-1; i>= 0;i--){
    console.log(jerryPerson[i]);
}

//*Nested Loops
//Using the exercise example -> 3 sets of 5 reps

for(let exercise = 1; exercise < 4; exercise++){
    console.log(`---------------Starting exercise${exercise}`);

    for(let rep=1; rep <=5 ; rep++){
        console.log(`Lifting weight repetition ${rep}`);
    }
}
*/

//? While Loops
for (let rep = 1; rep <= 5; rep++) {
    console.log(`Lifting weight repetition ${rep}`);
}

let rep = 1;

while (rep <= 10) {
    console.log(`Lifting weight repetition ${rep}`);
    rep++;
}

//All the while loop needs is a condition (not a counter)
//-> more versatile than for loops

//* Example -> keep rolling a die until we land on 6

let dice = Math.trunc(Math.random() * 6) + 1; //Math.trunc = only whole numbers, Math.random = 0 to <1, *6 , +1

while (dice !== 6) {//Tests the condition based on the initial dice value
    console.log(`You rolled a ${dice}`);//Logs that number if it was NOT a 6
    dice = Math.trunc(Math.random() * 6) + 1;//Re assigns dice to a different random value -> repeats until 6

    if (dice === 6) {
        console.log(`Loop is about to end as 6 was rolled.`);
    }
}


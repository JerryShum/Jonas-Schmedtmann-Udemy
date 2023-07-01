'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


/*

let arr = ['a', 'b', 'c', 'd', 'e'];

//? Slice
//Slice doesnt mutate original array and returns a new one instead

console.log(arr.slice(2));
console.log(arr.slice(2, 4));

//! You can start slicing and returning elements from the back of an array using neg. values
console.log(arr.slice(-2));
console.log(arr.slice(-1));

//! Starts at pos.1 and extracts everything but the last 2
console.log(arr.slice(1, -2));

//! Creating "shallow" copies (basic copies of an array)
console.log(arr.slice());
console.log([...arr]);

//? Splice
// Splice DOES mutate the original array and physically changes it -> returns the part that was spliced

// Usually used to remove certain elements from an array (last one)

// console.log(arr.splice(2))
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

//? Reverse
arr = ['a', 'b', 'c', 'd', 'e'];

const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//? Concat
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//? Join
//Joins values of an array together with a specifed character -> converts into a string
console.log(letters.join('-'));

*/

/*

//? At Method
const arr = [23, 11, 64];
console.log(arr[0]);
//Does the same thing as bracket notation but might be useful if we dont know the length of the array
console.log(arr.at(0));

//!Getting the last element
console.log(arr[arr.length - 1]);

//This returns the last element of arr as an array -> we take out that value using bracket notation
console.log(arr.slice(-1)[0]);

//Using at method we can use neg. indexes to easily find last elements
console.log(arr.at(-1));


//! Also works with strings

console.log('joans'.at(0));
console.log('joans'.at(-1));

*/

/////////////////////////////////////////////////////
/*
//? Working with "Bank Account Data" (FOR EACH LOOP)
// Positives are deposits, neg. are withdrawals

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {

// This is how you get a "counter (i)" with a for of loop
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('----FOREACH----');
// For each method requires a callback function -> will loop over all array elements (input for the function ) and will call said function for each iteration

//REMEMBER -> you use callback function to tell higher order functions what to do ---- OR higher order functions USE callback functions

//Callback function inputs -> current element, current index, array we are looping over
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
})
*/

/*
//? ForEach with maps and sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
})

//! Set (only unique values)
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
})

//For sets, the key is the same as the value b/c THEY DO NOT HAVE KEYS and NO INDEXES (keys dont make sense)

*/


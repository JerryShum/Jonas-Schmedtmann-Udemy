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


//? Creating DOM elements 
const displayMovements = function (movements) {

  containerMovements.innerHTML = ' ';
  //Basically seting the inner HTML to an empty string(the thing that was already there before)

  movements.forEach(function (move, i) {

    const type = move > 0 ? 'deposit' : 'withdrawal';
    //Ternary operator: if move is > 0 then its value is deposit, if else, withdrawal

    //! Making an html template
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${move}£</div>
    </div>
    `;

    //! insertAdjacentHTML
    containerMovements.insertAdjacentHTML('afterbegin', html);
    //Basically manually inserting NEW HTML into our document -> function takes in the POSITION of WHERE to insert, and then the string of the html (template string literal)
    //We use afterbegin b/c each new element will be inserted BEFORE the other one -> we can use beforeEND to insert the elements AFTER the other ones if we wanted to (bottom to top vs top to bottom)

  })
}

// displayMovements(account1.movements);

//? Computing Usernames from objects

const user = `Steven Thomas Williams`; //stw

const createUsernames = function (accounts) {

  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word[0];
      })
      .join('');

  })

}
createUsernames(accounts)
console.log(accounts);

// Function will take in an array of accounts (objects) -> forEach account inside of this array -> new value username created inside each account -> makes username out of the owner values

//map method will return only the first letter of each string and all the other methods will help

// we used forEach b/c we didnt need to return any new object/value

const updateUI = function (acc) {
  //Display Movements
  displayMovements(acc.movements);

  //Display Balance
  calcDisplayBalance(acc);

  //Display Summary
  calcDisplaySummary(acc);
}

//? Calculating and displaying summary

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(movements => movements > 0)
    .reduce((acc, mov) => acc + mov, 0)
    ;

  labelSumIn.textContent = `${incomes}£`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}£`

  //Interest is paid 1.2% on each DEPOSIT
  const interest = account.movements
    .filter(mov => mov > 0)//Filtering in ONLY DEPOSITS
    .map(deposit => deposit * 0.012)
    .filter((int, i, array) => {
      console.log(array);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}£`
};

// calcDisplaySummary(account1.movements);

//? Printing Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (accum, movement) {
    return accum + movement;
  }, 0);

  labelBalance.textContent = `${acc.balance} EUR`;
}

calcDisplayBalance(account1);

//? Implementing Login

//! Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting -> since this is a button for a FORM, when we submit it we RELOAD THE PAGE (this prevents this)
  e.preventDefault();

  //Finding the correct account with the associated username
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //! Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //! Clearing input fields
    inputLoginPin.value = inputLoginUsername.value = ``;
    inputLoginPin.blur();




    updateUI(currentAccount);
    console.log(`LOGIN`);
  }
  // the ?. means that it will only execute if and ONLY IF the currenct account AND pin exist (if account doesnt exist, it does not work, same as doing currentAccount && currentAccount.pin)
})

//? Implementing Transfers

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(function (account) {
    return account.username === inputTransferTo.value;
  });
  //Finding the matching username to the one we inputted in the transfer to field
  //Find method will return the first element that matches the condition inside the callback function 

  inputTransferAmount.value = inputTransferTo.value = ``;
  //Clearing and cleaning the input fields

  if (amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username) {
    console.log("Transfer Valid");

    //! Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  //Transfer should only happen if amount is > 0 and the user has enough balance to transfer AND make sure that receiverAcc exists (true) (?. to actually check if the receiver acc even exists and then checks if matches the own acc)
})

//? Loans using some and every

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements, push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
})

//? Close account (using findIndex method and splice method)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //Check credentials  
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {

    // Finding Index of current account
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    console.log(index);

    // Deleting Account
    accounts.splice(index, 1);
    // Deleting account at the index and only once

    // Hide UI / Logging out
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';

});

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
/*
//? The map method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
})

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescription = movements.map(function (mov, index, array) {

  return `Movement ${index + 1}: You deposited ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(mov)}`

})

console.log(movementsDescription);
*/


//? The filter method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const deposits = movements.filter(function (mov) {
  return mov > 0;
})

console.log(deposits);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
})

console.log(withdrawals);
//! Using a forOf loop instead of methods

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}

console.log(depositsFor);
*/

//? The reduce method
/*
// Remember: reduce -> boil down all elements of an array into one single value
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const balance = movements.reduce(function (accumulator, current, index, array) {
  console.log(`Iteration ${index}: ${accumulator}`);
  return accumulator + current;
}, 0)

// accumulator is like a snowball
// The as the 2nd parameter of the reduce function is the initial value of the accumulator (0 -> start counting from 0)
console.log(balance);

//? Maximum Value

const max = movements.reduce(function (accum, movement) {
  if (accum > movement) {
    return accum;
  } else {
    return mov;
  }
}, movements[0])
*/

//? Magic of chaining methods
/*
const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0)

console.log(totalDepositsUSD);
*/

//? The Find Method
// We use this to find one element of an array based on a condition
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const firstWithdrawl = movements.find(function (mov) {
  return mov < 0;
});

//Will only return the FIRST element that fulfills the condition
//Also does NOT RETURN a new ARRAY and instead the element itself

console.log(firstWithdrawl);
*/


//? some and every methods

// some will check every value in an array to see if ANY "some" values meet certain criteria
// every will check if every value in an array meets certain criteria

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

//! Some
// EQUALITY
console.log(movements.includes(-130));

// CONDITION
console.log(movements.some(mov => mov === -130));
// will return true if there are atleast one elements that = -130

const anyDeposits = movements.some(mov => mov > 0);
// Basically checks if there is atleast one deposit in the array

//! Every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));
*/
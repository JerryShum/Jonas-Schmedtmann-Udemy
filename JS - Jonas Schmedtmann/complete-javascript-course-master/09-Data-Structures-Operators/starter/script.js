'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient);
    console.log(otherIngredient);
  },

  openingHours,
};

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//? Destructuring Arrays
/*

//! An example of destructuring
//We are trying to take the elements within the arr array and convert them into a standalone variable
//* This is the basic way of taking elements and converting them into variables
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

//* This is how you destructure an array:
//> JS knows we are destructuring an array because square brackets to the left of the equal sign is the DESTRUCTURING ASSIGNMENT
//x,y,z are our varibales equal to the array elements
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

//________________________________________________________________________________________________________________

//Taking the first and second elements from the categories array
//! To take the third (skipping an element), just leave a section blank
let [main, , secondary] = restaurant.categories;
console.log(main, secondary); //Italian Vegetarian

//* What if the owner of the restaurant wanted to switch the main and secondary categories of the menu?
//>Without destructuring:
// let temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

//>With destructuring:
[main, secondary] = [secondary, main];
console.log(main, secondary);

//________________________________________________________________________________________________________________

//* Create an order function within the restaurant
//And then destructuring the returned array

console.log(restaurant.order(2, 0)); //Garlic bread and pizza
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);//Should have the values of garlic bread and pizza
//>This is useful because you are immediately creating 2 variables out of a function call

//* What happens with a nested array (2D) (NESTED DESTRUCTURING)
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
//! To access the nested array, we must do destructuring within destructuring
const [i, , [j, k]] = nested;
console.log(i, j, k);

//* Default values
//> Setting a variable = 1 inside of the destructuing argument is how you set their default value if they aren't assigned one after destructuring
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); //r is 1
*/

//? Destructuring Objects
/*
//________________________________________________________________________________________________________________

//> In order to dsestructure objects, we use {}, Example using the restaurant object:
//! Define the properties that you want to take -> this will store them into a variable with the same name
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//! If we want variable names to be different than property:
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//> Default Values
//! It might be useful to set DEFAULT values incase we dont get a value from the object (value instead of undefined)
//We set default values using an EQUAL SIGN, in this case, since menu doesn't exist as a property inside of restaurant, it will return an empty array instead of undefined. since starterMenu exists, its name will be starters and NOT return an empty array
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//> Mutating variables from objects
//We want to change the OG a and b variables to the ones inside of the object (111, 999) -> (23, 7)
let a = 111;
let b = 999;
const randObj = { a: 23, b: 7, c: 14 };

//! Must wrap this thing inside of parantheses b/c "{}" means that JS engine expects a code block
({ a, b } = randObj);
console.log(a, b);

//> Nested Objects (restaurant -> opening hours -> days)
//Inside opening hours -> friday object -> inside friday object -> open and close properties -> turn open and close into variables
const { fri: { open, close } } = openingHours;
console.log(open, close);

//> Practical Application Example:
//Define orderDelivery function inside of the restaurant object
// REMEMBER WE ARE ONLY PASSING IN AN OBJECT INTO THE FUNCTION (NOT 4 ARGUMENTS)
// Basically we are defining the object that is THE ARGUMENT of this function -> and then we can destructure that object right inside of the argument -> accessing and using the properties within said object

//! Since we destructured the object directly, the function can now access the variables of said object
//It will now output delivery details
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
})

//!We can also set default values if some arguments/variables/properties cannot be destructured
//Since this object inputted into the function doesn't have mainIndex and starterIndex -> default values will be used
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
})
*/

//? The Spread Operator (...)
//> Used to unpack all the contents of an array -> unpack array into individual elements
//> Usually used to build new arrays using contents of old ones and to input multiple values into a function as arguments
//> ON THE RIGHT SIDE OF = -> const meow = [...meowArray];

/*
//> ***USUALLY USED WHERE VALUES ARE SEPARATED BY COMMAS
//> WORKS ON ALL ITERABLES -> STRINGS, MAPS, ARRAYS, SETS, etc. (NO OBJECTS)

//________________________________________________________________________________________________________________

//! Example:
const arr = [7, 8, 9];
//If we wanted to use the contents of this array in another array -> loop over this array OR -> manually input
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];

//*Using the spread operator (...)
//It's like taking out all the elements out of arr and writing them inside of newArray manually
const newArr = [1, 2, ...arr];
console.log(newArr);

//! What if we were to use the spread operator while logging?
console.log(...newArr); //1 2 7 8 9
//It returns individual values instead of the array itself

//________________________________________________________________________________________________________________

//! More Practical Example
//Using our restaurant object

//> We are making an entirely new menu using the items from the old one
//Using items from restaurant.mainMenu but also adding a new item 'Gnocci'
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//________________________________________________________________________________________________________________

//! Copying Arrays
const mainMenuCopy = [...restaurant.mainMenu];

//! Joining two arrays or more
const overallMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(overallMenu);

//! Using it on a string
const str = 'Jerry';
const letters = [...str, ' ', 'S,'];
console.log(letters);
console.log(...str);

//________________________________________________________________________________________________________________

//> Creating a function (orderPasta)
//Using the spread operator we can efficiently input arguments into a function

const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
console.log(ingredients);

//! Using the old way:
//This is both tedious and inefficient
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

//! Using the spread operator:
//This works because the spread operator spreads out the elements with commas -> meaning they are treated as valid arguments
restaurant.orderPasta(...ingredients);

//________________________________________________________________________________________________________________

//> Spread operator can also work on objects
//Creating a NEW restaurant object using the data from the original one and adding to it

const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guissepe' };
console.log(newRestaurant);

//! Can make shallow copies of both arrays and objects
//This creates a brand new COPY which is completely separate from the original
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
//The restaurants have diff names b/c they are separate from eachother
*/

//________________________________________________________________________________________________________________

//? Rest Pattern and Rest Parameters
//> Looks exactly like the spread operator but does the complete opposite
//> Collects multiple elements and condenses it into an array
//> ON THE LEFT SIDE OF THE =

/*

//________________________________________________________________________________________________________________

//! OVERALL DESTRUCTURING & REST

//! Example using destructuring (left hand side)
//a and b will take become VARIABLES for 1 and 2
//others will become an array of 3,4,5
//called REST b/c it will take the REST of the variables/elements when destructuring
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

//! Another example:
//Creating an array of the ENTIRE menu
//Lets say that we want the 1st and third element from the main menu (pizza, risotto)
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(pizza, risotto, otherFood);

//> Note that it doesn't include any skipped elements and only includes elements after the last variable (should be the last in the destructuring assignment)

//! Destructuring Objects
//Working with our opening hours -> creating an object with only our weekdays (thu, fri)
//> REMEMBER in destructuring ORDER DOES NOT MATTER
//THEREFORE, put the saturday object into its own variable (sat using destructuring) -> use REST operator to group up the REST of the objects (thu,fri) into their own object
const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat, weekDays);

//________________________________________________________________________________________________________________

//! FUNCTIONS & REST
//What if we wanted an arbritrary amount of arguments to use within the function? Example:
//add(1,2,3,54,5,6);
//add(1,2,4)

//> We can use the rest operator (REST ARGUMENTS)
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(numbers);
  console.log(sum);
}

add(1, 2, 2, 3, 4, 5,);
add(1, 2, 3, 34, 5);
add(1, 3,);

//> We can also do this using the SPREAD operator:
const x = [23, 5, 7];
add(...x);
//Argument for add is going to be SPREAD (removes array and spreads elements apart) but IMMEDIATELY COLLECTED using rest operator (collects elements and forms an array)
//UNPACKING USING SPREAD -> PACKING UP USING REST

//>This means that this function can take both arrays and normal element inputs as arguments

//________________________________________________________________________________________________________________

//! Restaurant Example:
//Writing the orderPizza function inside of the restaurant object

//>The first argument contains the main ingredient variable
//The REST of the arguments will be packed up into a variable/array called otherIngredients
restaurant.orderPizza('Pepperoni (mainIngredient)', 'Onion', 'Fish', 'Sausig');

//> If there is only one argument
restaurant.orderPizza('Pepperoni (mainIngredient)');
//The mainIngredient variable will contain pepperoni
//The otherIngredients array will be empty (there is nothing to collect but it will still return an empty array)
*/

//________________________________________________________________________________________________________________

//? Short Circuiting (&& and ||)

/*
//> 3 Properties of Logical operators:
//! They don't have to use boolean types (true or false)
//Use ANY data type
//Return ANY data type
//SHORT CIRCUITING

//________________________________________________________________________________________________________________


//> OR OPERATOR (||)
//! Short circuiting means that if the used values are NOT BOOLEAN -> if first evaluated value is TRUTHY -> Immediately return that value
//3 and 'Jonas' are NOT BOOLEAN types -> 3 is evaluated first -> 3 is truthy -> 3 is returned

console.log(3 || 'Jonas'); //3
console.log('' || 'Jonas');//Jonas -> '' is falsy value and so Jonas was evaluated instead which is not a false value
console.log(true || 0); //True -> evaluated first and it was true so it skips 0
console.log(undefined || null); //null -> undefined is falsy -> skips undefined -> null is evaluated and returned (happens eitherway, even if null is a falsy value)

console.log(0 || undefined || null || 'Hello' || 23 || '');//Will return 'Hello' b/c it is the first truthy value encountered
//! It will shortcircuit the entire evaluation after finding its first truthy value and then return said value

//> Using the restaurant object
//There might be a property inside of the object of the number of guests -> we want do define a variable based on the number of guests and assign a default variable if it doesnt exist

restaurant.numGuests = 12;
//guests 1 = restaurant.numGuests if restaurant.numGuests exists, else guests1 = 10.
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

//! We can take advantage of shortcircuiting here
//If restaurant.numGuests is a falsy value (0 or undefined) -> it will automatically move on to the next value (10) and since its the only other value and is TRUTHY 10 is automatically assigned
//If it is NOT a falsy value -> the expression short circuits and will choose that value

//!Useful for assigning default values (much easier than if/else and ternary)
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//________________________________________________________________________________________________________________

//> Short Circuiting with the AND operator

console.log(0 && 'Jonas'); // Will return the 0 -> 0 is falsy -> entire expression is ignored and deemed FALSE
console.log(7 && 'Jonas'); // Will return 'Jonas' -> 7 is truthy -> moves on in the expression

console.log('Hello' && 23 && null && 'Jonas'); //Hello is truthy -> 23 is truthy-> null is falsy -> evalutation stops and returns null and SHORTCIRCUITS the rest of the evaluation

//> Using restaurant object
if (restaurant.orderPizza) {
  restaurant.orderPizza('Mushrooms', 'Spinach')
};

//! Using the && operator
restaurant.orderPizza && restaurant.orderPizza('Mushrooms', 'Spinach');

//________________________________________________________________________________________________________________

//* Summary for Short Circuiting ($$ and ||)
// The OR operator will return the first TRUTHY value of all the operands or the last value if all of them are falsy
// The AND operator will returh the first FALSY value of all the operands or the last value if all of them are truthy

//! Practical Applications
//We can use the OR operator to set default values
//We can use the AND operator to execute code in the 2nd operand if the first value is true
*/

//________________________________________________________________________________________________________________

//? The Nullish Coalescing Operator (??)

/*
//> This is an example using the OR operator
restaurant.numGuests = 0
const guests2 = restaurant.numGuests || 10;
console.log(guests2); //Returns 10

//! The problem is that perhaps we want it to return 0 as we want to know if the restaurant has NO guests
// The solution is to use ??

//> using the ?? operator
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); //Returns 0

//! ?? works with NULLISH values -> null and undefined
//Only nullish values will shortcircuit the expression
*/
//________________________________________________________________________________________________________________

//? Logical Assignment Operators
/*
//Creating 2 new restaurant objects
//! Let's pretend that we got these objects from an API and want to set a default number of guests for restaurants that dont have that property
// BAsically adding that property to restaurants that dont have them
const rest1 = {
  name: 'Capri',
  numGuests: 0,
}

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi'
}

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

console.log(rest1);
console.log(rest2);

//> Using the logical assignment operator (OR)
//! Basically assigns that number/value to the variable if it is currently falsy
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

console.log(rest1);
console.log(rest2);

//! What if the current numGuests is 0 (and we like that)
//> We can use the NULLISH ASSIGNMENT OPERATOR -> false if null or undefined

rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

console.log(rest1);
console.log(rest2);

//! What if we want the owners name to be anonymous (if there is an owner)
rest1.owner = rest1.owner && '<ANONYMOUS>'; //Undefined b/c rest1.owner doesn't exist and therefore undefined -> shortcircuited -> return undefined
rest2.owner = rest2.owner && '<ANONYMOUS>';
//This works because of the AND operator shortcircuiting (if rest2.owner exists (true) -> and operator -> anonymous)

//> We can replace that with the AND ASSIGNMENT OPERATOR
//Basically replaces the value if the element is currently truthy
rest1.owner &&= '<ANONYMOUS>'
rest2.owner &&= '<ANONYMOUS>'
*/

//________________________________________________________________________________________________________________

//? Looping Arrays: The for-of Loop

//Creating a large array consisting of restaurant menus:
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//> Instead of the for loop -> we can use a for-of loop (kinda like for-each)
//For every item of menu -> log that item -> move onto next item
for (const item of menu) {
  console.log(item);
}

//! What if we wanted the index of the items?
for (const item of menu.entries()) {
  console.log(item);
}

console.log([...menu.entries()]);
//! .entries() basically creates arrays for each item along with their associated index ex: [0, 'foccacia']
//We can make the code above alot simpler now because we know that .entries() returns an array of the item's index and value
//We can use DESTRUCTURING to destructure both the index and the value

for (const [index, value] of menu.entries()) {
  console.log(`${index + 1}: ${value}`);
}

// 1: Focaccia
// 2: Bruschetta
// 3: Garlic Bread
// 4: Caprese Salad
// 5: Pizza
// 6: Pasta
// 7: Risotto

//________________________________________________________________________________________________________________

//? Enchanced Object Literals
//The restaurant object is an OBJECT LITERAL -> It was written using the object literal syntax

/*

//>Let's say that we want an object 'openingHours' to be within the restaurant 2 object
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant2 = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient);
    console.log(otherIngredient);
  },

  //! Normally we would have to do this:
  // openingHours: openingHours,

  //! Using ENHANCED OBJECT LITERALS:
  //ES6 will create an object based on the name automatically
  openingHours,

  //! Creating methods using enhanced object literals:
  //Instead of:
  // method: function(){
  //   console.log('blahalvbahhaf');
  // },

  //We can just do this:
  enhancedMethod() {
    console.log('Both ways work');
  },

};
*/

//________________________________________________________________________________________________________________

//? Optional Chaining(?.)
//If a certain property doesn't exist, UNDEFINED will be returned
//Combine this with the nullish operator to set "default values"

/*
//>Let's say that we want opening hours from monday:
//mon doesn't actually exist at the moment -> We should check if it exists:
//If it does exist -> log the opening hour from monday

//! This is very messy and will only check 1 property -> we need a better solution
//What if we aren't sure openingHours existed? -> && statement
if (restaurant.openingHorus && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
};

//> Using optional chaining:
//(?.) if the .mon property exists then ONLY THEN will the .open property be read -> if NOT -> undefined
console.log(restaurant.openingHours.mon?.open);
//Both openinghours and .mon must exist for .open to be read
console.log(restaurant.openingHours?.mon?.open);

//> Example:
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  console.log(day);

  //! Remember the nullish operator -> sat open on 0 -> 0 falsy -> false -> nullish is then used
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we are open on ${open}`);
}

//> Methods using the optioanl chaining
//This method exists -> called using (0,1)
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
//This method does not exist -> returned as undefined -> nullish acknowledges undefined -> returns other set value
console.log(restaurant.orderFood?.('meow') ?? 'Method does not exist');

//> Chaining on Arrays (checking if empty)
const users = [{ name: 'Jerry', email: 'Jerry@bouncymail.com' }];

//If users[0] exists -> go to its name property -> IF IT DOESN'T -> returns undefined -> nullish short circuits -> auto return message
console.log(users[0]?.name ?? 'User array empty');
*/

//________________________________________________________________________________________________________________

//? Looping Objects: Object Keys, Values, and Entries
// Using the for of loop we can loop over objects in an indirect way

/*
//> Looping over property names (Keys)

//! Object.keys() returns an array of all the keys within the object put in as an argument
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days:`;

for (const day of properties) {
  openStr += `${day},`
}

console.log(openStr);

//________________________________________________________________________________________________________________

//> Looping over property values:
const values = Object.values(openingHours);
console.log(values);

//________________________________________________________________________________________________________________

//> Looping over entire object

//! To loop over the entire object, we use ENTRIES
//Entries = Name + value (Key,value) pair

const entries = Object.entries(openingHours);
console.log(entries);

//! Destructuring "x" into variables from the entries
//Key comes from the key (property name) -> value is actually an object -> Destructure immediately -> open and close are the variables for said values
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

*/

//________________________________________________________________________________________________________________

//? Sets
//Basically just a collection of UNIQUE values
//Sets are also iterable
//Unique values
//Non-Ordered (it doesn't matter)

/*
//> Creating a set

//! Must pass in an iterable (Array, string, etc.) into new Set()
const ordersSet = new Set(['Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza'
]);

//! All duplicates are gone when logged to the console
console.log(ordersSet);

//! Set with a string input:
console.log(new Set('String'));

//________________________________________________________________________________________________________________

//> Working with Sets

//! Size of a set:
console.log(ordersSet.size);

//! Checking if something is in a set:
console.log(ordersSet.has('Pizza'));//True -> Has pizza
console.log(ordersSet.has('Bread'));//False -> Does not have bread

//! Adding an item to a set:
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');

//! Deleting an item from a set:
ordersSet.delete('Risotto');

console.log(ordersSet);

//! Clearing all elements from a set:
//ordersSet.clear();

//! How do we retrieve a value from a set?
//There is no reason to -> It is both unique and unordered -> no real reason to retrieve -> Just use an array if need to retrieve values

//! Looping over a set (Iterable):
for (const order of ordersSet) {
  console.log(order);
}

//________________________________________________________________________________________________________________

//* The main use case of a set is to remove duplicate values from an ARRAY

//> Example:
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
//What if for some reason we just wanted to know the unique positions of our restaurant -> we want a UNIQUE array

//! Creating a new set/array:
//The spread operator works on ALL ITERABLES -> works on sets -> spreads all values into a new array
//This is creating a new Set based on the UNIQUE values from the STAFF array -> Spread operator spreads these values into an array separated by commas

const staffUnique = [...new Set(staff)];
console.log(staffUnique);

//! We can just use the size -> we know how many unique positions there are
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size);//3

//! We can do the same for a string -> Counting how many unique letters there are:
console.log(new Set('Jerry Shum').size);//9 Unique letters
*/

//________________________________________________________________________________________________________________

//? Maps: Fundamentals
//Map is a data structure used to map values to keys (Similar to an object) -> Stored in key-value pairs -> can be ANY type

/*
//> Creating a map

//! The best way to make a map is to make an EMPTY map
const restMap = new Map();

//! Adding to a map:
//Using the .set method
//The first value is the key, second is the value

restMap.set('name', 'Classico Italiano');
restMap.set(1, 'Firenze, Italy');

//! The set method also RETURNS the map:
console.log(restMap.set(2, 'Lisbon, Portugal'));

//! This allows us to CHAIN set methods:

restMap
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open! :D')
  .set(false, 'We are closed! ):');


//! Retrieving something from a set:
//use a key as the argument
//.get() method

console.log(restMap.get('name')); //Classico Italiano
console.log(restMap.get(true)); //We are open! :D

//________________________________________________________________________________________________________________

//! Example:
//Let's say that we have some current time:
const time = 21;

//* These will return either a true or false value -> maps a value in the set ('We are open' or 'We are closed')
console.log(restMap.get(time > restMap.get('open') && time < restMap.get('close'))); //'We are open! :D' (b/c time is between 11 and 23)

//________________________________________________________________________________________________________________

//! Checking if a set contains a certain key:
restMap.has('categories'); //true

//! Deleting elements from a map (keys)
restMap.delete(2);

//! Size property
console.log(restMap.size);

//! Clearing
//restMap.clear()

//________________________________________________________________________________________________________________

//> Using an array as a key

restMap.set([1, 2], 'Test');
console.log(restMap.get([1, 2]));
//! Returns undefined because the arrays aren't actually the same object in the HEAP (different objects)

//Workaround:
const arr = [1, 2];
//Use arr as the key instead of manually making an array
//This works because they both refer to the same place in memory

//________________________________________________________________________________________________________________

//> DOM elements as a key
//The array just proves that we can use ANY object as a key -> even DOM elements

restMap.set(document.querySelector('h1'), 'Heading');
console.log(restMap);

*/


//________________________________________________________________________________________________________________


//? Maps: Iteration
//There is another way to input elements into a map (no set method) -> useful when there are many elements

/*
//! Creating a map
//Creating a map -> passing in an array -> contains multiple arrays (keys, value)
//Think of it as creating a quiz
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [false, 'Try again'],
  [true, 'Correct :DD'],
]);

console.log(question);

console.log(Object.entries(openingHours));

//! Creating a map in this fashion is somewhat better than using the set method
//! It also creates somehting very similar to what we see using the Object.entries() method (an array of arrays containing keys and values)

//> Converting an object into a map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//________________________________________________________________________________________________________________

//> Iterating over a map (quiz app)
//Using the same method of iterating over an object
//Destructuring our 'x' arrays into variables key and value from our question map
//If key is a number (1,2,3) -> log

console.log(question.get('question'));

for (const [key, value] of question) {

  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }

}

//Prompting the user to give an answer (correct answer = 3)
const answer = Number(prompt('Your answer?'));
console.log(answer);

//Checking if the answer is right and outputting the correct message
//! Instead of doing this method:
if (question.get('correct') === answer) {
  console.log(question.get(true));
}

//! We can just do this:
//We can do this because of the power of boolean values as question.get('correct') === answer will return either true or false depending on answer
console.log(question.get(question.get('correct') === answer));

//________________________________________________________________________________________________________________

//> Converting map back to an array
//Basically using the spread operator to spread each value (arrays) back into an array of arrays (key,value)
console.log([...question]);

//! Maps also contain the .entries(), .keys(), and .values() methods

//________________________________________________________________________________________________________________
*/

//? Working with Strings - Part 1

const airline = `TAP Air Portugal`;
const plane = `A320`;

//Getting the character with their "index"
console.log(plane[0]);//A
console.log('B737'[0]);//B

console.log(airline.length);
console.log(`B737`.length);

console.log(airline.indexOf('r'));//FIRST index of 'r' //6
console.log(airline.lastIndexOf('r')); //LAST INDEX = 10
console.log(airline.indexOf('Portugal'));//Searching for an entire word

//> Slice method to extract parts of a string (SUB STRINGS)
//Returns a new string
//(begin, end) parameters
console.log(airline.slice(4)); //Air Portugal
console.log(airline.slice(4, 7)); //Air

//! Extracting without hardcoding indices
console.log(airline.slice(0, airline.indexOf(' '))); //TAP
//Beginning = 0, extract until you encounter a space
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Portugal
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Portugal
//Start at the last space found and extract until the end of the string

//! Negative parameter input
//* Negative begin parameter
console.log(airline.slice(-2));//al
//Starting at the end and extracting the last two characters
//* Negative end parameter
console.log(airline.slice(1, -1));//AP Air Portuga
//Starts at 1 (A) and then -2 cuts off the last character of the string

//________________________________________________________________________________________________________________

//> Writing a function 
const checkMiddleSeat = function (seat) {
  //B and E are the middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat.');
  } else {
    console.log('You did not get a middle seat.');
  }
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

//! The reason why strings have methods even though they are primitives is because JS converts them into a STRING OBJECT which contains all of these methods for us to use inorder to manipulate said string and object
console.log(typeof new String('Meow')); //object

//________________________________________________________________________________________________________________

//> String Methods

//Uppercase and Lowercase methods
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//! Fix capitalization in name
//You can also make a function that does this to fix the capitalization of a string
const passenger = 'JoNaS';

//Make it all into lower case:
const passengerLower = passenger.toLowerCase();

//Use the all lowercase string, convert first letter to uppercase, slice passengerLower after first letter
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passengerCorrect); //Jonas

//! Check/Comparing emails

const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.IO \n';

// //Convert everything to lowercase
// const lowerEmail = loginEmail.toLowerCase();

// //Removing all empty spaces and enter
// const trimmedEmail = lowerEmail.trim();

// console.log(trimmedEmail);
//* Trimstart and trimend will trim stuff from only the start and end of the string

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);
//Since string methods IMMEDIATELY return a string, we are allowed to CHAIN methods

//________________________________________________________________________________________________________________

//! Replacing parts of strings

//Replacing characters
const priceEU = `288,97£`;
const priceUS = priceEU.replace('£', '$').replace(',', '.');
console.log(priceUS);

//Replacing words
const announcement = 'All passengers come to boarding door23, Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
//Will only replace the FIRST OCCURENCE of the words
//! WE USE REPLACEALL

//________________________________________________________________________________________________________________

//! Booleans

//* Includes method
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320')); //true
console.log(plane2.includes('Boeing')); //false

//* startswith method
console.log(plane2.startsWith('Air')); //true since Air is Adjacent to eachother but if it was Aib it would not work since they are not adjacent

//> Example:
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the new airbus family');
}

//> Practice:
//Chekcing if baggage is allowed to be checked in
const checkBaggage = function (items) {

  //! Put string into lowercase (ESSENTIAL)
  const baggage = items.toLowerCase();


  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed onboard');
  } else {
    console.log('You are ok!');
  }
}

checkBaggage('I have some food, a knife, and a laptop.'); //NO
checkBaggage('I have some socks and a camera'); //YES
checkBaggage('I have some food and a gun.'); //NO

//________________________________________________________________________________________________________________

//> The SPLIT method
// Allows us to split a string into multiple parts based on a divider string

console.log('a+very+nice+string'.split('+'));
//We have defined a string with multiple plus signs, the .split method will split the string based on where the + are
//Results are stored in an array

console.log('Jerry Shum'.split(' '));

//! We can use destructuring to assign these values to variables
const [firstName, lastName] = 'Jerry Shum'.split(' ');
console.log(firstName, lastName);


//> The JOIN method
//The opposite of split

//! What if we wanted to add 'Mr.' to the first name, and make the lastname uppercase?
//Joining all our values using an array and the .join method

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');

console.log(newName);

//________________________________________________________________________________________________________________

//> Example:

//! What if we want to capitalize names:

const capitalizeName = function (name) {
  //Will split each string into an array with individual values
  const names = name.split(' ');
  //Defining a new array to PUSH fixed words into
  const namesUpper = [];

  for (const word of names) {
    //Takes the first character of the word in the array and makes it capitalized 
    //And then rejoins that capitalized character with the other characters (slice)
    // namesUpper.push(word[0].toUpperCase() + word.slice(1));

    //OR:
    //In each iteration of the loop, it loops through the names array, -> for the current value, it takes the first character of the word/name and replaces it with the capitalized version
    namesUpper.push(word.replace(word[0], word[0].toUpperCase()));
  }
  //Reverses the split function and joins the values of the array together with ' ' in between each value
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith');
capitalizeName('jerry shum')

//________________________________________________________________________________________________________________

//> Padding a String
//Adding a number of characters to a string until the DESIRED LENGTH

//Creating a message
const message = 'Go to gate 23!';
//At the start of message, we want to PAD until 25 characters have been reached, we use the '+' character until 25 has been reached
console.log(message.padStart(25, '+'));
//Same as padStart but padding at the end until 25 characters
console.log('Jerry'.padEnd(25, '+'));

//! Real World Example:
//Credit card -> we never see the first characters and only see the last 4
const maskCreditCard = function (number) {
  //Instead of doing = String(number) we can do this: because the concatenation symbol automatically converts it into a string
  const string = number + '';

  //We want the last 4 characters of the number and then pad out the start
  //Slice will create a separate string of the LAST 4 digits
  const last4 = string.slice(-4);
  return last4.padStart(string.length, '*');


}
console.log(maskCreditCard(123445678910123));
console.log(maskCreditCard('123424324323424'));

//________________________________________________________________________________________________________________

//> Repeat Method
//Allows us to repeat the same string multiple times

const message2 = 'Bad Weather... All Departures Delayed...';

//Will repeat message2 will repeat 5 times
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
}

planesInLine(5);
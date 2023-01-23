'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
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
  },
};

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


//? Destructuring Arrays
/*
//> A way of unpacking values from an array or an object into separate variables
//Breaking a larger data structure into a smaller one like a variable

//________________________________________________________________________________________________________________

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

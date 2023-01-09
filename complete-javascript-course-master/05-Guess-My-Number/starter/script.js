'use strict';

//? Intro

//THIS IS CALLED DOM -> Document Object Model, document refers to the html file
//document refers to the document object
//querySelector is a method avaialble on the document object that takes in an element name (.class or #id)
//textcontent

//console.log(document.querySelector('.message').textContent);

//? Selecting and Manipulating Elements
/*
//Selecting the textContent of the .message class to 'Correct Number!'
document.querySelector('.message').textContent = 'Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

//? Handling Click Events
//Selecting the button using query selector
//Adding event listener so that when button is 'clicked', a function will run
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    //Returns 0 if guess field if left empty (falsy value) -> returns false when in boolean value
    if (!guess) {
        document.querySelector('.message').textContent =
            'There is no number in the field!';
    }
    //Happens when the guess is correct
    else if (guess === secretNumber) {

        document.querySelector('.message').textContent =
            'Congrats! Your guess was correct!';
        document.querySelector('.number').textContent = secretNumber;

        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        //*Implementing Highscore
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = String(highScore);
        }
    }
    // //When guess is higher
    // else if (guess > secretNumber) {
    //     if (score > 1) {
    //         document.querySelector('.message').textContent = 'Too high!';
    //         score--;
    //         document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = 'You lost the game.';
    //         document.querySelector('.score').textContent = 0;
    //     }
    // }
    // //When guess is lower
    // else if (guess < secretNumber) {
    //     if (score > 1) {
    //         document.querySelector('.message').textContent = 'Too low!';
    //         score--;
    //         document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = 'You lost the game.';
    //         document.querySelector('.score').textContent = 0;
    //     }
    // }

    //When guess is different
    else if (guess != secretNumber) {
        if (score > 1) {
            if (guess < secretNumber) {
                document.querySelector('.message').textContent = 'Too low!';
            } else if (guess > secretNumber) {
                document.querySelector('.message').textContent = 'Too High!';
            }

            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'You lost the game.';
            document.querySelector('.score').textContent = 0;
        }
    }
});

//?Implementing Game Logic
//We have to define a secret number (which should be outside of the event handler)
//Math.trunc removes all decimal spaces -> Math.random() returns a value between 0 and 1 (including decimals)
//This generates a number between 0 and 19 (because it generates a number LESS THAN 1)
//0.999999 * 20 = 19.999999 (not 20) and so the decimal points are removed meaning 0 and 19
//+1 -> 1 - 20
let secretNumber = Math.trunc(Math.random() * 20) + 1;

//Defining a highscore variable and updating it whenever their guess was wrong -> update the html element by replacing the value with score
let score = 20;

//? Manipulating CSS Styles
//When player wins, we want to manip. the css styles to green, etc.

//When selecting element by name, just input the name of the element
//document.querySelector('body').style.backgroundColor = '#60b347';

//? Coding Challenge -> Implementing replayablility (Again! button)

//When again! button is clicked:
document.querySelector('.again').addEventListener('click', function () {
    //We want to reset all values to original and implement a new secret number

    //Generates new secret number
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    //Resetting score
    score = 20;
    document.querySelector('.score').textContent = score;

    //Resetting css
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';

    //Resetting message
    document.querySelector('.message').textContent = 'Start guessing...'

    //Resetting ?
    document.querySelector('.number').textContent = '?'

    //Resetting form to make it empty
    document.querySelector('.guess').value = '';
});

//? Implementing Highscore
let highScore = 0;
document.querySelector('.highscore').textContent = String(highScore);

//? Refactoring
//Means to improve the code once functionality has been achieved
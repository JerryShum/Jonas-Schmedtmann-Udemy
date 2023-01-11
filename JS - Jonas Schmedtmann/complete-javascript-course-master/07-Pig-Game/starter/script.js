'use strict';

//? Project #3: Pig Game

//*Selecting Elements
//Can select an element by ID using querySelector and #
const score0El = document.querySelector('#score--0');
//Also use getElementByID (slightly faster than querySelector)
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//NOTE Create a hidden class in CSS to hide whatever elements we dont currently need

//*Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//*Switching Player Functions
const switchPlayer = function () {
    //If we are switching to the next player, that means they rolled a 1 and their score must be reset
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    //If the active player RIGHT NOW is player 0, then it switches to 1, if not then it will be 0 (IF THE ACTIVEPLAYER IS 1)
    activeplayer = activeplayer === 0 ? 1 : 0;
    //Resetting current score to 0 so that when player switches, 2nd player will start from 0
    currentScore = 0;

}


//! We want to store our scores inside of an array to keep track better
const Scores = [0, 0];
//Setting this value so we can keep track of scores
let currentScore = 0;
//Using this value as an index for each player ( 0 = Player 1, 1 = Player 2)
let activeplayer = 0;

//?Rolling the Dice

//On click:
btnRoll.addEventListener('click', function () {
    //1. Generate a random dice roll (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display value
    //This is removing the hidden class to SHOW the dice image
    //Change dice image -> change src of img element
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check if rolled was 1, if true switch to next player
    if (dice !== 1) {
        //Add dice value to current score
        currentScore += dice;
        document.getElementById(`current--${activeplayer}`).textContent = currentScore;
    } else {
        //NOTE Switch to next player
        switchPlayer();

        //! Toggle will REMOVE if it is there, and will ADD if it ins't there
        //If we toggle both at the same time, it ensures that only 1 will have the active class
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

    }
})

//* Implementing hold button functionality

btnHold.addEventListener('click', function () {
    //1. Add current score to active player's score
    scores[activeplayer] += currentScore;
    document.getElementById(`current--${activeplayer}`).textContent = scores[activeplayer];
    //2. Check if player's score is >= 100

    //Finish game

    //Switch to next player
    switchPlayer();
})
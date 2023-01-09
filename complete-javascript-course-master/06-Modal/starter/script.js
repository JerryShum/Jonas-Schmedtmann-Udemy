'use strict';

//? Project #2 Modal Window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

//We use querySelectorAll as there are multiple elements within the show-modal class, so querySelector would only select 1
//It kinda turns btnsOpenModal into an array of the elements
const btnsOpenModal = document.querySelectorAll('.show-modal');

//Treating btnsOpenModal like an array and iterating through it to log the content of each modal
// for (let i = 0; i < btnsOpenModal.length; i++) {
//     console.log(btnsOpenModal[i].textContent);
// }

//? Working with Classes
//*Changing elements and aspects of a website is usually done with classes like below

//* The hidden class in the HTML/CSS is what's making the modal window actually hidden -> remove hidden = show modal

//!Creating a function to put into the eventListener
const closeModal = function () {
    //Re-adds hidden to the modal text
    modal.classList.add('hidden');
    //Re-adds hidden to the background overlay
    overlay.classList.add('hidden');
}

const openModal = function () {
    console.log('Button Clicked');

    //When modal button is clicked -> remove hidden class from modal
    //! Do not use '.hidden' because . is only used for selector
    modal.classList.remove('hidden');
    //Removes hidden class from the overlay when clicked
    overlay.classList.remove('hidden');
}

for (let i = 0; i < btnsOpenModal.length; i++) {
    //We attach and eventHandler to each of the 3 modal buttons to do something when it is clicked
    btnsOpenModal[i].addEventListener('click', openModal);
}

//Adding functionality to the x button (to close modal window)
btnCloseModal.addEventListener('click', closeModal);
//When clicking on the outside of the modal box, it also usually closes the window
overlay.addEventListener('click', closeModal);

//* We don't do closemodal() because this tells JS to execute the line as it is reading through the file -> no paranthesis means calling function when click event happens

//? Handling an 'esc' keypress event

//If we add an event listener to the document object -> listens to an event everywhere
//Will be executed once ANY key is pressed
//How do we know what key is pressed?
//The parameter of the event handler function represents the object JS will generate and pass into the function
document.addEventListener('keydown', function (event) {
    console.log(event);

    //When escape is pressed, we want to hide modal window and overlay
    if (event.key === 'Escape') {
        //If the modal element DOES NOT contain the hidden class (means it is NOT hidden)
        if (!modal.classList.contains('hidden')) {
            closeModal();
        }
    }
})
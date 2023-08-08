'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//! Defining Variables
let map, mapEvent;

//! Creating classes for architecture

class App {
    constructor() {
        //When we create our object, we immediately get the position
        this._getPosition();
    }

    _getPosition() {

        //? Geolocation API & Leaflet Map
        if (navigator.geolocation) {

            // getCurrentPosition takes in 2 callback functions, one on success (whenever browser gets coordinates), and other one on error (unable to get coordinates)
            navigator.geolocation.getCurrentPosition(
                //* Success
                this._loadMap

                , function () {
                    //* Failure

                    alert('Could not get your position.')
                });
        };

    }

    _loadMap(position) {
        //Using destructuring to get variables from position.coords
        //Takes in the value with the same name from position.coords and assigns them to their asosicated variable
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`google.com/maps/@${latitude},${longitude}`);


        //! Leaflet Map
        const coords = [latitude, longitude];

        // L is an object that is included in leaflet.js (script file) -> we can access b/c it is a global variable accessible by all scripts
        // .map is a function that takes in an associated HTML element
        map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coords).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

        //* .on() is basically an event listener for the map variable/object -> we use this instead of a normal event listener b/c of the associated map info (coordinates) we get from clicking on it
        map.on('click', function (mapE) {

            mapEvent = mapE;

            //! Form
            // basically whenever we click on the map, we reveal the input form
            form.classList.remove('hidden');
            inputDistance.focus();
            // this will focus on an element within the form (distance input field)

        });
    }

    _showForm() {

    }

    _toggleElevationField() {

    }

    _newWorkout() {

    }
}

//! Insantiating our 'App'

const app = new App();

//Instead of directly calling this when we create the object, we can just put it in the constructor method
//app._getPosition();

//! Adding an event listener for the form
form.addEventListener('submit', function (event) {
    event.preventDefault();

    //! Clearing input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    const { lat, lng } = mapEvent.latlng;

    //! Displaying marker on map
    L.marker([lat, lng])
        .addTo(map)
        //! Instead of specifying a string in .bindPopup, we can create a brand new popup object which will contain different options
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
        }))
        .setPopupContent('Workout')
        .openPopup();
})

//! Event Listener for 'Change' event for input type
// This will change the placeholder values within the form depending on type of exercise

inputType.addEventListener('change', function () {
    // changing to either the elevation/cadence form depending on exercise
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})

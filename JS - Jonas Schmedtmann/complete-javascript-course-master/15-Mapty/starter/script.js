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

//? Geolocation API & Leaflet Map
if (navigator.geolocation) {

    // getCurrentPosition takes in 2 callback functions, one on success (whenever browser gets coordinates), and other one on error (unable to get coordinates)
    navigator.geolocation.getCurrentPosition(function (position) {
        //Using destructuring to get variables from position.coords
        //Takes in the value with the same name from position.coords and assigns them to their asosicated variable
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`google.com/maps/@${latitude},${longitude}`);


        //! Leaflet Map
        const coords = [latitude, longitude];

        // L is an object that is included in leaflet.js (script file) -> we can access b/c it is a global variable accessible by all scripts
        // .map is a function that takes in an associated HTML element
        const map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coords).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

        //* .on() is basically an event listener for the map variable/object -> we use this instead of a normal event listener b/c of the associated map info (coordinates) we get from clicking on it
        map.on('click', function (mapEvent) {
            console.log('click on map');

            const { lat, lng } = mapEvent.latlng;

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

        });


    }, function () {
        alert('Could not get your position.')
    });
};

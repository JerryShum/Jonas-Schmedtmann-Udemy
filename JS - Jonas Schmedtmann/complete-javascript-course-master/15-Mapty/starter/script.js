'use strict';

//! Defining Variables
let map, mapEvent;

//! Creating classes for architecture

//? Class Architecture

//* Workout class -> child -> Cycling & Running
class Workout {
    date = new Date();

    //* Unique Identifier for our object (ID)
    // for our id, we create a new date (current date) and take the last 10 numbers
    id = (Date.now() + '').slice(-10);

    //*Adding this count to make the app more "complete"
    clicks = 0;

    constructor(coords, distance, duration) {
        this.coords = coords; //[lat,lng]
        this.distance = distance; //km
        this.duration = duration; //min
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
        // creating a description for the workout, -> Takes the type of workout, makes first letter uppercase -> slicing rest of type (everything but first letter) -> getting the actual month from our array -> this.date.getMonth() returns a number from 0-11 -> index in our array
    }

    click() {
        this.clicks++;
    }
}

class Running extends Workout {
    type = 'running';

    constructor(coords, distance, duration, cadence) {
        //* super calls the parent constructor to initialize these properties properly
        super(coords, distance, duration);
        this.cadence = cadence;

        this.calcPace();

        //We put this in the child constructors b/c the Workout class doesn't have a type variable (its fine since we wont create workout objects)
        this._setDescription();
    }

    calcPace() {
        //min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;

        this.calcSpeed();

        this._setDescription();
    }

    calcSpeed() {
        //km/h

        this.speed = this.distance / (this.duration / 60);
        return this.speed;

    }

}

// const run1 = new Running([39, -12], 5.3, 23, 178);
// const cycling1 = new Running([39, -12], 31, 234, 17812);
// console.log(run1, cycling1);


//////////////////////////////////////////////
//? Application Architechture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class App {
    //! Defining private properties for our object
    #map;
    #mapEvent;
    #workouts = [];
    #mapZoomLevel = 13;

    constructor() {
        //? Getting user's position
        //*When we create our object, we immediately GET THE USERS POSITION
        this._getPosition();


        //? Get data from local storage
        this._getLocalStorage();

        //?Attaching Event Listeners:
        //*We also want these event listeners to be created once the object is created
        //! Adding an event listener for the form (new workout)
        // this. for an event handler function REFERS TO THE DOM ELEMENT TO WHICH IT IS ATTACHED
        // must change using .bind -> changes the .this keyword to the object
        form.addEventListener('submit', this._newWorkout.bind(this))

        //! Event Listener for 'Change' event for input type
        // This will change the placeholder values within the form depending on type of exercise

        inputType.addEventListener('change', function () {
            this._toggleElevationField;
        })

        //! Event listener for workout -> move to marker on map
        // What if the element isn't there? (we have no workouts yet) -> event delegation on parent element -> workoutContainer
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
    }

    _getPosition() {

        //? Geolocation API & Leaflet Map
        if (navigator.geolocation) {

            // getCurrentPosition takes in 2 callback functions, one on success (whenever browser gets coordinates), and other one on error (unable to get coordinates)
            navigator.geolocation.getCurrentPosition(
                //* On success call loadMap


                //Bind creates an entirely new function with the same functionality, changing the this. keyword to reference the object within the bind parameter (this = App object)
                // -> the this. keyword within _loadMap is now the app object instead of undefined
                this._loadMap.bind(this)

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
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // L.marker(coords).addTo(this.#map)
        //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //     .openPopup();

        //* .on() is basically an event listener for the map variable/object -> we use this instead of a normal event listener b/c of the associated map info (coordinates) we get from clicking on it
        this.#map.on('click', this._showForm.bind(this));

        //? Part of Local Storage:
        // we do this here b/c if we did it using the constructor functions, the MAP MIGHT NOT HAVE LOADED FIRST -> doesn't work properly -> if we move the functionality here -> ensures that the map loads first and THEN this works
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        })

    }

    _showForm(mapE) {
        this.#mapEvent = mapE;

        //! Form
        // basically whenever we click on the map, we reveal the input form
        form.classList.remove('hidden');
        inputDistance.focus();
        // this will focus on an element within the form (distance input field)
    }

    _hideForm() {
        //* Empty input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        //* Hiding the form
        // Original display = 'grid' -> revert it back to none and then add the hidden class list -> this will prevent the animation of everything sliding back up -> after 1 second RE ADD the grid property to the display

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }

    _toggleElevationField() {
        // changing to either the elevation/cadence form depending on exercise
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(event) {

        //* Helper functions for validating inputs
        // ... is the REST OPERATOR -> gather inputs and put them into inputs array
        // .every checks if every element isnide the array satisfies the condition (Number.isFinite) (true if number is not a string or NaN)
        const validinputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));

        // if all inputs are > 0 return true
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);


        event.preventDefault();

        //*Creating a new workout
        //! Get data from form
        const type = inputType.value;

        // plus sign converts them into numbers
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;

        // Getting lat and lng from the #mapevent object using destructuring
        const { lat, lng } = this.#mapEvent.latlng;

        let workout;


        //! If workout = running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;

            //* Check if data is valid
            // Using a guard clause (checking if the opposite is true), return immediately (don't do anything)

            // If any of our functions are FALSE (! false cancels out = true)
            //Checking if the values inputted is 'not a number' -> return immediately -> alert
            if (
                !validinputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            ) {
                return alert('Inputs have to be positive numbers');
            }


            //* Redefine our workout variable for RUNNING
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        //! If workout = cycling, create cycling object   
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            //* Check if data is valid
            // Guard Clause:
            if (
                !validinputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            ) {
                return alert('Inputs have to be positive numbers');
            }

            //* Redefine our workout variable for CYCLING
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        console.log(workout.type);

        //! Add new object to workout array
        this.#workouts.push(workout);

        //! Render workout on map as marker
        this._renderWorkoutMarker(workout);

        //! Render workout on list
        this._renderWorkout(workout);

        //! Clearing input fields + Hiding form
        this._hideForm();

        //! Set local storagae to all workouts
        this._setLocalStorage();



    }

    //* renderWorkoutMarker function:
    _renderWorkoutMarker(workout) {

        L.marker(workout.coords)
            .addTo(this.#map)
            //! Instead of specifying a string in .bindPopup, we can create a brand new popup object which will contain different options
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'} ${workout.description}`)
            .openPopup();
    };

    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          `;

        if (workout.type === 'running') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence.toFixed(1)}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>`
        }
        if (workout.type === 'cycling') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>`
        }


        //! Where do we insert the html -> sibling to the form element
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(event) {
        const workoutEl = event.target.closest('.workout');
        console.log(workoutEl);

        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        // workout -> inside the #workouts array -> work is is the elements inside the array -> find the element where work.id === to the id in html (workoutEl.dataset.id)
        console.log(workout);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        })

        // //! Using the public interface (click) (public interface -> general Workout constructor to interact with its child classes/objects (we only used the Workout constructor for properties etc. and weren't really using it))
        // workout.click();

        //* This doesn't work anymore b/c of local storage
    }

    _setLocalStorage() {

        //? Local Storage API:
        // JSON.stringify -> converts an object to a string
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }


    _getLocalStorage() {
        // Get item BACK from local storage -> convert BACK from string INTO object
        // We get an array of objects
        const data = JSON.parse(localStorage.getItem('workouts'));
        console.log(data);

        if (!data) return;

        this.#workouts = data;

        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        });
    }

    //? LOCAL STORAGE ISSUE:
    // local storage basically removes the entire prototype chain -> our objects aren't considered workout/cycling/running workouts after we put and retrieve them from localstorage

    reset() {
        localStorage.removeItem('workouts');
        // programatically reloads the page
        location.reload();
    }

}

//! Insantiating our 'App'
const app = new App();
//Instead of directly calling this when we create the object, we can just put it in the constructor method
//app._getPosition();



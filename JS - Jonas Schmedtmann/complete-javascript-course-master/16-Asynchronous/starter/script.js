'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//? FIRST AJAX CALL:

//! Old school method:
// using XMLHttpRequest
/*
const getCountryData = function (country) {

    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

    //* Sends the request for info
    // send request -> gets info in the BACKGROUND -> when done it will emit the load event
    request.send();

    // This happens asynchronously (in the background) -> data = reqeust.send() doesn't work b/c it might not have gotten the data from the API yet -> we use event listener for the load event
    request.addEventListener('load', function () {
        // we get JSON
        console.log(this.responseText);

        //* Converting our JSON (string) to an actual OBJECT
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        //* Making language keys/values to display object value
        let firstLanguageKey = Object.keys(data.languages)[0]; //'eng'
        let firstLanguageValue = data.languages[firstLanguageKey]; //data.languages['eng'] ->  value = 'english'

        let firstCurrencyKey = Object.keys(data.currencies)[0];
        let firstCurrencyValue = data.currencies[firstCurrencyKey].name;

        const html = `
        <article class="country">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
        <h3 class="country__name">${data.name.official}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${firstLanguageValue}</p>
        <p class="country__row"><span>💰</span>${firstCurrencyValue}</p>
        </div>
        </article>`

        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
};

//! Try reloading
// they appear in diff orders b/c of different load times of the AJAX CALLS -> whichever arrives first will have their associated html generated and inserted first
getCountryData('portugal');
getCountryData('canada');
*/

//? Welcome to callback hell
// Once we get our first country, we also want to try and get neighbouring countries as well -> must make multiple calls after the first initial one
// "Callback hell" is trying to do multiple async calls inside of one another and it keeps going on and on and on


const renderCountry = function (data, className = "") {

    //* Making language keys/values to display object value
    let firstLanguageKey = Object.keys(data.languages)[0]; //'eng'
    let firstLanguageValue = data.languages[firstLanguageKey]; //data.languages['eng'] ->  value = 'english'

    let firstCurrencyKey = Object.keys(data.currencies)[0];
    let firstCurrencyValue = data.currencies[firstCurrencyKey].name;

    const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${firstLanguageValue}</p>
    <p class="country__row"><span>💰</span>${firstCurrencyValue}</p>
    </div>
    </article>`

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;

}
/*
const getCountryAndNeighbour = function (country) {

    //! AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

    //* Sends the request for info
    // send request -> gets info in the BACKGROUND -> when done it will emit the load event
    request.send();

    // This happens asynchronously (in the background) -> data = reqeust.send() doesn't work b/c it might not have gotten the data from the API yet -> we use event listener for the load event
    request.addEventListener('load', function () {
        // we get JSON
        console.log(this.responseText);

        //* Converting our JSON (string) to an actual OBJECT
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        //! Rendering country 1
        renderCountry(data);

        //! Get Neighbour country (2)
        //Optional Chaining was used -> returns undefined if the 0 property doesn't exist
        const neighbour = data.borders?.[0];

        if (!neighbour) return;

        //! AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function () {
            console.log(this.responseText);

            const [data2] = JSON.parse(this.responseText);
            console.log(data2);

            renderCountry(data2, "neighbour");
        })
    });
};

getCountryAndNeighbour('usa');
*/

//? Promises and Fetch API
// Newer way of using/getting info from an API

//* We 'fetch' info from our url
const request = fetch('https://restcountries.com/v3.1/name/portugal');
console.log(request);

//* Returns a promise
// -> an object that is used as a placeholder for future async operations -> like a container for a future value (the response from an AJAX call)
//! Lifecycle: Pending(before the future value is available) -> Settled (async task has finished) -> FULFILLED(success) OR REJECTED(error)

//? Consuming Promises

/*
const getCountryData = function (country) {
    // Fetch returns a promise -> .then is used on promises when they are FULFILLED -> allows a callback function
    fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (response) {
        console.log(response);

        // response isn't something that we can use yet -> .json method -> .json RETURNS ANOTHER PROMISE -> must use .then again
        return response.json()
    }).then(function (data) {
        console.log(data);
        renderCountry(data[0]);
    });
};
*/

//? Chaining Promises
// Combination of consuming and chaining promises
// Doing the same thing we did before (nested ajax calls)

//? Handling Rejected Promises / Catching errors
// What we do when the promise is REJECTED/NOT FULFILLED (fetch request is disconnected or somehting) -> UNCAUGHT PROMISE
// .catch()

//? Handling/Throwing errors manually
// Manually throwing specific error codes when .catch isn't catching the errors
// throw new error

const renderError = function (message) {
    countriesContainer.insertAdjacentText('beforeend', message);
    countriesContainer.style.opacity = 1;
};
/*


//* Making a helper function
const getJSON = function (url, errorMsg = 'Something went wrong.') {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`${errorMsg} (${response.status})`)
        }

        return response.json();
    })
}
*/

//! Simplified code:
// without helper:
/*
const getCountryData = function (country) {
    // Fetch returns a promise -> .then is used on promises when they are FULFILLED -> allows a callback function
    //! Country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        // First callback function -> fullfilled || Second -> error/rejected
        .then(response => {
            console.log(response + 'yes');

            // If the ok property of the response object is false (not false = true) -> throw an error message -> rejects the entire promise for the entire chain -> propagates down to the .catch method -> err = the error we throw -> changes the error message 
            if (!response.ok) {
                throw new Error(`Country not found (${response.status})`)
            }

            //Manually return since it's not the only line in the arrow function
            return response.json()
            //,err => alert(err)
        })
        .then(data => {
            console.log(data);

            renderCountry(data[0]);

            // Once again, using optional chaining -> data[0] exists (api) -> .borders (accessing borders property) -> ?. (optional chaining checks whether the .borders property exists) -> returns undefined if not, and accesses borders[0] if it does exist
            const neighbour = data[0].borders?.[0];

            console.log(neighbour);

            if (!neighbour) return;


            //! Country 2
            // remember that fetch gives us a promise -> we MUST return a promise 
            // .then() method automatically returns a promise but if we MANUALLY return one, it will override it.
            // we RETURN a promise so that we can consume it with another .then function
            // This is called the FULFILLED VALUE (result of the operation)
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);

        })
        // called it response b/c we are now dealing with the fulfilled value of a fetch function
        // take the returned promise -> convert it into a .json using .json() 
        .then(response => response.json())
        // take in the .json (data) -> read it and render country
        .then(data => renderCountry(data[0], 'neighbour'))
        //! using a .catch method to handle all errors in one place
        // will catch an error anywhere in the chain
        .catch(err => {
            console.error(`${err} ERROR DETECTED`);
            renderError(`Something went wrong ${err}`);
        })

        //! .finally method
        // will always trigger no matter what happends (no matter if the promise is fulfilled or rejected)
        .finally(() => countriesContainer.style.opacity = 1)
        ;
};
*/

/*
// With helper function
const getCountryData = function (country) {
    // Fetch returns a promise -> .then is used on promises when they are FULFILLED -> allows a callback function
    //! Country 1
    getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
        .then(data => {
            console.log(data);

            renderCountry(data[0]);

            // Once again, using optional chaining -> data[0] exists (api) -> .borders (accessing borders property) -> ?. (optional chaining checks whether the .borders property exists) -> returns undefined if not, and accesses borders[0] if it does exist
            const neighbour = data[0].borders?.[0];

            console.log(neighbour);

            //! IF THERE IS NO NEIGHBOUR
            if (!neighbour) throw new Error('No neighbour found');

            return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'country not found');

        })
        .then(data => renderCountry(data[0], 'neighbour'))
        //! using a .catch method to handle all errors in one place
        .catch(err => {
            console.error(`${err} ERROR DETECTED`);
            renderError(`Something went wrong ${err}`);
        })
        .finally(() => countriesContainer.style.opacity = 1)
        ;
};

btn.addEventListener('click', function () {
    getCountryData('australia');
});
*/

//? Consuming Promises with Async/Await
// async functions will run in the background while performing the code inside of it, RETURNS A PROMISE afterwards
// inside the function, you have AWAIT -> needs a promise (can use the promise returned from the fetch function) -> stops the code execution until it is fulfilled 

//? Error Handling with try...catch
// if an error were to  occur in the code inside of the try block, the catch block will be able to catch it
// IMPLEMENT THIS IN THE CODE INSIDE ASYNC FUNCTIONS
// -> also manually catching errors after each fetch just in case

// try {
//     let y = 1;
//     const x = 2;
//     y = 3;
// } catch(error){
//     alert(error.message)
// }

//! Geolocation with promises
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            err => reject(err)
        );
    });
};

//* Essentially the same as fetch.then -> just a cleaner shroud

const whereAmI = async function (country) {
    try {
        //! geolocation: 
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        //  Reverse geocoding
        const responseGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        const dataGeo = await responseGeo.json();
        console.log(dataGeo);
        if (!responseGeo.ok) throw new Error('Problem getting location data')


        //! Countries:
        const response = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
        if (!response.ok) throw new Error('Problem getting country')

        //* Get json out of the response
        // response.json() returns ANOTHER RESPONSE -> we use another await keyword to retrieve it
        const data = await response.json();
        console.log(data);
        renderCountry(data[0]);
    } catch (error) {
        console.log(error);
        renderError(`something went wrong ${error.message}`)
    }
}

whereAmI('canada')



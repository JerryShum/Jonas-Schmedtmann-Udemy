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

//! Simplified code:
const getCountryData = function (country) {
    // Fetch returns a promise -> .then is used on promises when they are FULFILLED -> allows a callback function
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => renderCountry(data[0]));
};

getCountryData('canada')
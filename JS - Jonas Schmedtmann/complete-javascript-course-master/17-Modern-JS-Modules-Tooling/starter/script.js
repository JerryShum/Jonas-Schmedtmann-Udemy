//? Introduction to NPM
// install node.js
// Check install -> npm -v (in console)

//! Must initialize the project if we want to use npm
// npm init
// we end up with a package.json file (all the info of our project)
// we can install many different packages/dependencies -> we install the leaflet package
// we can see all dependencies in the package.json

//! Importing/using a method from one of the packages
// we installed lodash (very useful methods)
import cloneDeep from './node_modules/lodash-es/cloneDeep';

const state = {
    cart: [
        { product: 'bread', quantity: 3 },
        { prodcut: 'Pizza', quantity: 5 }
    ],
    user: { loggedIn: true },
}

const stateClone = Object.assign({}, state);
state.user.loggedIn = false;

//* stateClone is a SHALLOW copy -> nested objects aren't TRUE copies -> they're instead references to the original object (whatever changes in one object will happen in the other aswell.)
console.log(stateClone);//False, should be true if it was AN ACTUAL COPY


//! DeepClone
const stateDeepClone = cloneDeep(state);
stateDeepClone.user.loggedIn = true;
console.log(state);
console.log(stateDeepClone);

//? Bundling with Parcel and NPM scripts
// npm install parcel --save-dev
// This is called a DEV DEPENDENCY (not actually code we include)
// Instead it is a tool to help build our app/project

// we use npx to run parcel commands in the terminal
// npx parcel index.html
// this bundles everything that is linked to index.html (script.js) and optimizes it

//! Hot module reloading
// This is code that only parcel understands when bundling
// when we change something, it WONT reload the page and actually updates live
// helpful when states/values matter (example: when you reload an app, you might have to re-login each time something changes)
if (module.hot) {
    module.hot.accept
}

//! NPM SCRIPTS
// Can create a script in the package.json to help automate things
// we can use this to run parcel ("start": "parcel index.html")
// Final build when our project is done:
// "build" : "parcel build index.html"



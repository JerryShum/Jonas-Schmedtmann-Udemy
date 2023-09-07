//! This is the exporting module
// This is parsed and executed BEFORE the importing module (all imports are executed first)
console.log('Exporting Module');

//* All variables are private within the module, UNLIKE scripts (public and accessible by other files)
// in order to be used by other modules/scripts we must EXPORT THEM
const shippingCost = 10;
export const cart = [];

//! This is called a NAMED EXPORT: -> must use the exact same name when importing
// we can export any top level code using the export key word -> WE MUST USE THE SAME NAME WHEN IMPORTING IT THO
// if we use the 'as' keyword, we can change the name to anything both in exports and imports
export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} has been added to the cart.`);
}

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

//! DEFAULT EXPORTS:
// Export defaults are usually used to export one thing per module
// instead of providing a name, we only export the CONTENT/VALUE

export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} has been added to the cart.`);
}
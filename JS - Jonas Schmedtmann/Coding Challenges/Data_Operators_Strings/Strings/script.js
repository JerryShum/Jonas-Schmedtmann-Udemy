'use strict';
/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to insert the elements), and conversion will happen when the button is pressed.

Test data (pasted to textarea, including spaces):
    underscore_case
    first_name
    Some_Variable
    calculate_AGE
    delayed_departure

Should produce this output (5 separate console.log outputs):
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅
*/

//! Defining our function before using it in the button
const convertCamel = function () {
    const text = document.querySelector('textarea').value;
    console.log(text);

    //! text.split will return an array with all the values separated by a \n -> enter key
    const rows = text.split('\n');
    console.log(rows);

    for (const word of rows) { //meow_cat

        let goodstring = '';

        if (word.includes('_')) {//true
            const index = word.indexOf('_'); //index = 4

            //newStr = replacing character after '_' with capitalize -> remove '_'
            let newStr = word.replace(word[index + 1], word[index + 1].toUpperCase()).replace('_', '');
            console.log(newStr);

            goodstring = goodstring + '';

        }

        let count = 1;
        count += 1;

        while (count <= rows.length) {
            goodstring = goodstring + '✅'.repeat(count);
        }

        console.log(goodstring);
    }


};

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', convertCamel);

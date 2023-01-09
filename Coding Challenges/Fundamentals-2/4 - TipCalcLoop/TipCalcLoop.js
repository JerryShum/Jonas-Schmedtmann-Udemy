// 1. Create an array 'bills' containing all 10 test bill values
// 2. Create empty arrays for the tips and the totals ('tips' and 'totals')
// 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate
// tips and total values (bill + tip) for every bill value in the bills array. Use a for
// loop to perform the 10 calculations!

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tip = [];
const totals = [];

const calcTip = function (billValue) {
    const input = billValue;

    if (input <= 300 && input >= 50) {
        return 0.15 * input;
    } else {
        return 0.20 * input;
    }
}

const calcAverage = function (arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }

    const arrAverage = sum / arr.length;
    return arrAverage;
}


for (let i = 0; i < bills.length; i++) {

    const tippy = calcTip(bills[i]);
    const total = tippy + bills[i];

    tip.push(tippy);
    totals.push(total);

}

console.log(bills, tip, totals);

console.log(calcAverage(totals));
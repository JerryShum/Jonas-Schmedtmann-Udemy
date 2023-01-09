const calcTip = function(billValue){
    const input = billValue;

    if(input <= 300 && input >= 50){
        return 0.15 * input;
    }else{
        return 0.20 * input;
    }
}

const bills = new Array(125, 555, 44);
const tip = new Array(calcTip(bills[0]),calcTip(bills[1]), calcTip(bills[2]));
console.log(bills,tip)

const total = new Array(bills[0] + tip[0],bills[1] + tip[1],bills[2] + tip[2]);
console.log(total);


const BMI = mass / (height ** 2);

const markWeight = 78;
const markHeight = 1.69;

const johnWeight = 92;
const johnHeight = 1.95;

const markBMI = markWeight / (markHeight ** 2);
const johnBMI = johnWeight / (johnHeight ** 2);

console.log(markBMI , johnBMI);

markHigherBMI = markBMI > johnBMI;

console.log(markHigherBMI);

if(markBMI > johnBMI){
    console.log(`Mark's BMI is higher than John's!`);
    console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI}).`)
}else{
    console.log(`John's BMI is higher than Mark's!`);
    console.log(`John's BMI (${johnBMI}) is higher than Mark's BMI (${markBMI}).`)
}


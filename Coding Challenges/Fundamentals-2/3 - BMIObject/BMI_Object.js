const mark = {
    fullName: 'Mark Miller',
    mass:78,
    height: 1.69,
    calcBMI: function(){
        this.bmi = this.mass / (this.height ** 2);
    },
}
const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function(){
        this.bmi = this.mass / (this.height ** 2);
    },
}

mark.calcBMI();
john.calcBMI();

if(mark.bmi < john.bmi){
    console.log(`John's BMI (${john.bmi}) is higher than Mark's (${mark.bmi}).`)
}else{
    console.log(`Mark's BMI (${mark.bmi}) is higher than John's (${john.bmi}).`)
}

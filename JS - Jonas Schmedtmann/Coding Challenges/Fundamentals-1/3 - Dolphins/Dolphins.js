const dolphinsAverage = (96 + 108 + 110)/3;
const koalasAverage = (88 + 91 + 110)/3;

if(dolphinsAverage > koalasAverage && dolphinsAverage >= 100){
    console.log(`Dolphins have won with an average score of ${dolphinsAverage} compared to Panda's with a score of ${koalasAverage}.`);
}else if(dolphinsAverage === koalasAverage && dolphinsAverage >= 100){
    console.log(`The dolphins and koalas have drawn with an average score of ${dolphinsAverage}.`);
}else if(koalasAverage > dolphinsAverage && koalasAverage >= 100){
    console.log(`The koalas have won with an average score of ${koalasAverage}.`);
}else{
    console.log(`No one wins the trophy.`);
}
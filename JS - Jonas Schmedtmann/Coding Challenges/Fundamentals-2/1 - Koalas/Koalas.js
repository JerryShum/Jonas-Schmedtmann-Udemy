const calcAverage = (score1, score2, score3) =>{
    const average = (score1 + score2 + score3)/3;
    return average;
}

const koalaAverage = calcAverage(65, 54, 49);
const dolphinAverage = calcAverage(44, 23, 71);

const checkWinner = function(avgDolphins, avgKoalas){
    if(avgDolphins >= avgKoalas*2){
        console.log(`Dolphins win! (${avgDolphins} vs. ${avgKoalas})`);
    }else if(avgKoalas >= avgDolphins * 2){
        console.log(`Koalas win! (${avgKoalas} vs. ${avgDolphins})`);
    }
    else{
        console.log(`No one wins. Dolphins: ${avgDolphins} Koalas${avgKoalas}`)
    }
}

checkWinner(dolphinAverage, koalaAverage);
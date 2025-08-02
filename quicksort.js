const { createRandomArray } = require('./generalFunctions.js');

function quicksort(myArray, offset){

    if (myArray.length <= 1){
        return myArray;
    }

    const pivot = myArray[0];

    let visualArrayR = Array.from(myArray);
    visualArrayR.shift();
    let visualArrayL = [];

    let arr1 = [], arr2 = [];

    let counter = 1;

    for (let i = 1; i < myArray.length; i++){
        if (myArray[i] < pivot){
            arr1.push(myArray[i]);
            visualArrayL.push(visualArrayR.splice(i - counter, 1)[0]);
            counter++;
            visibleArray(visualArrayL.concat([pivot]).concat(visualArrayR), offset);
        }
        else{
            arr2.push(myArray[i]);
        }
    }
    return quicksort(arr1, offset).concat([pivot]).concat(quicksort(arr2, 1 + arr1.length + offset));
}

function visibleArray(currentArray, offset){
    globalArray.splice(offset, currentArray.length, ...currentArray);
    console.log(globalArray);
}

function displayQuicksort(){

}

let myArray = createRandomArray(100, 200);

let globalArray = Array.from(myArray);


let sorted = quicksort(myArray, 0);
console.log("break");
console.log(myArray);
console.log(sorted);
console.log(globalArray);
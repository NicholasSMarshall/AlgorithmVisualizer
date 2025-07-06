const { createRandomArray } = require('./generalFunctions.js');

function mergesort(myArray){
    console.log(myArray);
    sortedArray = divide(myArray);

    return sortedArray;
}

function divide(myArray){
    const arrLength = myArray.length;
    if (arrLength === 1){
        return myArray;
    }
    const midPoint = Math.floor(arrLength/2);
    return conquer(divide(myArray.slice(0, midPoint)), divide(myArray.slice(midPoint, arrLength))); 
}

function conquer(arr1, arr2){
    let newArr = new Array(0);
    const newLength = arr1.length + arr2.length;
    while (newArr.length < newLength){
        if(arr1[0]<arr2[0] || arr2.length === 0){
            newArr.push(arr1.shift());
        }
        else{
            newArr.push(arr2.shift());
        }
    }
    return newArr;
}

console.log(mergesort(createRandomArray(30,30)));
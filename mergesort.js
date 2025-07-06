const { createRandomArray } = require('./generalFunctions.js');

function mergesort(myArray){
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
    let i = 0, j = 0;
    while (arr1.length > i && arr2.length > j){
        if(arr1[i]<arr2[j]){
            newArr.push(arr1[i++]);
        }
        else{
            newArr.push(arr2[j++]);
        }
    }
    while(i < arr1.length){
        newArr.push(arr1[i++])
    }
    while(j < arr2.length){
        newArr.push(arr2[j++])
    }
    return newArr;
}
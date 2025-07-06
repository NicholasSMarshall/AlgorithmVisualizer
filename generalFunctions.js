function createRandomArray(length, max_num){
    let myArray = new Array(length);
    for(let i = 0; i < length; i++){
        myArray[i] = Math.floor(Math.random() * (max_num));
    }
    return myArray;
}

module.exports = { createRandomArray };
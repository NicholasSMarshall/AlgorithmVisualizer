import { createRandomArray } from './generalFunctions.js';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function quicksort(myArray, offset) {
  if (myArray.length <= 1) {
    return myArray;
  }

  const pivot = myArray[0];

  let visualArrayR = Array.from(myArray);
  visualArrayR.shift();
  let visualArrayL = [];

  let arr1 = [], arr2 = [];

  let counter = 1;

  for (let i = 1; i < myArray.length; i++) {
    if (myArray[i] < pivot) {
      arr1.push(myArray[i]);
      visualArrayL.push(visualArrayR.splice(i - counter, 1)[0]);
      counter++;

      await visibleArray(visualArrayL.concat([pivot]).concat(visualArrayR), offset);
      await sleep(5000/maxnum);
    } else {
      arr2.push(myArray[i]);
    }
  }

  const leftSorted = await quicksort(arr1, offset);
  const rightSorted = await quicksort(arr2, 1 + arr1.length + offset);
  return leftSorted.concat([pivot]).concat(rightSorted);
}

async function visibleArray(currentArray, offset) {
  const container = document.querySelector(".bar-box");

  container.innerHTML = "";

  globalArray.splice(offset, currentArray.length, ...currentArray);

  globalArray.forEach(num => {
    const div = document.createElement("div");
    div.classList.add("bar");
    div.style.height = `${(num/maxnum)*100}%`;
    div.style.width = `${(maxnum)}%`;
    container.appendChild(div);
  });
}

let globalArray = [];

const maxnum = 500;

document.getElementById("startDemoButton").addEventListener("click", async function() {
  globalArray = [];
  let myArray = createRandomArray(maxnum, maxnum);
  globalArray = Array.from(myArray);

  await quicksort(myArray, 0);
});

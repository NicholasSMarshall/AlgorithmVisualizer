import { createRandomArray } from './generalFunctions.js';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function quicksort(myArray, offset) {
  if (stop){
    return 0;
  }

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

      await visibleArray(visualArrayL.concat([pivot]).concat(visualArrayR), offset, counter);
      await sleep(3000/maxnum);
    } else {
      arr2.push(myArray[i]);
    }
    if(stop){
      break;
    }
  }

  const leftSorted = await quicksort(arr1, offset);
  const rightSorted = await quicksort(arr2, 1 + arr1.length + offset);
  return leftSorted.concat([pivot]).concat(rightSorted);
}

async function visibleArray(currentArray, offset, counter) {
  if(!stop){
    const container = document.querySelector(".bar-box");

    container.innerHTML = "";

    globalArray.splice(offset, currentArray.length, ...currentArray);

    globalArray.forEach((num, i) => {
      const div = document.createElement("div");
      div.classList.add("bar");
      div.style.height = `${(num / maxnum) * 100}%`;
      div.style.width = `${(100 / globalArray.length)}%`;

      if (i === offset + counter - 1) {
          div.style.backgroundColor = "red";
      }

      container.appendChild(div);
      });
  }
  else{
    return 0;
  }
}

async function completeArray() {
    const beforeLength = maxnum / 10;

    for (let i = maxnum / 10; i < maxnum; i++) {
        const container = document.querySelector(".bar-box");
        container.innerHTML = "";

        globalArray.forEach((num, index) => {
            const div = document.createElement("div");
            div.classList.add("bar");
            div.style.height = `${(num / maxnum) * 100}%`;
            div.style.width = `${(100 / globalArray.length)}%`;

            if (index <= i && index >= i - beforeLength) {
                div.style.backgroundColor = "green";
            } else {
                div.style.backgroundColor = "white";
            }

            container.appendChild(div);
        });
        await sleep(1000 / maxnum);
      if(stop){
        break
      }
    }
    await sleep(2000 / maxnum);
    const container = document.querySelector(".bar-box");
    container.innerHTML = "";

    globalArray.forEach((num) => {
    const div = document.createElement("div");
    div.classList.add("bar");
    div.style.height = `${(num / maxnum) * 100}%`;
    div.style.width = `${(100 / globalArray.length)}%`;

    container.appendChild(div);
    });
    stop = false;
    running = false;
}

let globalArray = [];
let stop = false;
let running = false;
let maxnum = 10;


const slider = document.getElementById("countSlider");
const output = document.getElementById("sliderNumber");

slider.addEventListener("input", function () {
  output.textContent = slider.value;
  maxnum = slider.value;
});


document.getElementById("startDemoButton").addEventListener("click", async function () {
  const button = document.getElementById("startDemoButton");
  slider.disabled = true;
  button.disabled = true;

  running = true;
  stop = false;
  globalArray = [];
  let myArray = createRandomArray(maxnum, maxnum);
  globalArray = Array.from(myArray);

  await quicksort(myArray, 0);
  await completeArray();

  slider.disabled = false;
  button.disabled = false;
});

document.getElementById("endDemoButton").addEventListener("click", async function(){
  const button = document.getElementById("startDemoButton");
  stop = true;
  //await sleep(1000);
  button.disabled = false;
});


import { createRandomArray } from './generalFunctions.js';


let globalArray = [];
let stop = false;
let running = false;
let maxnum = 10;


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

      await visibleQuickArray(visualArrayL.concat([pivot]).concat(visualArrayR), offset, counter);
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

async function visibleQuickArray(currentArray, offset, counter) {
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






async function mergesort(myArray){
    globalArray = myArray;
    let sortedArray = await divide(myArray, 0);
    return sortedArray;
}

async function divide(myArray, position){
    const arrLength = myArray.length;
    if (arrLength === 1){
        return myArray;
    }
    const midPoint = Math.floor(arrLength/2);
    return await conquer(
    await divide(myArray.slice(0, midPoint), position),
    await divide(myArray.slice(midPoint, arrLength), position + midPoint),
    position
);

}

async function conquer(arr1, arr2, position){
    let newArr = new Array(0);
    let i = 0, j = 0;
    const startPosition = position;
    
    while (arr1.length > i && arr2.length > j){
        if(arr1[i]<arr2[j]){
            newArr.push(arr1[i++]); 
            const tempArray = newArr.concat(arr1.slice(i)).concat(arr2.slice(j));
            globalArray.splice(startPosition, tempArray.length, ...tempArray);
        }
        else{
            newArr.push(arr2[j++]);
            const tempArray = newArr.concat(arr1.slice(i)).concat(arr2.slice(j));
            globalArray.splice(startPosition, tempArray.length, ...tempArray);   
        }
        await visibleMergeArray(newArr, position);
        await sleep(3000/maxnum);
        position += 1;
    }
    while(i < arr1.length){
        globalArray[position] = arr1[i]
        newArr.push(arr1[i++]);
        await visibleMergeArray(newArr, position);
        await sleep(3000/maxnum);
        position += 1;
    }
    while(j < arr2.length){
        globalArray[position] = arr2[j]
        newArr.push(arr2[j++]);
        await visibleMergeArray(newArr, position);
        await sleep(3000/maxnum);
        position += 1;
    }
    return newArr;
}

async function visibleMergeArray(currentArray, offset) {
  if(!stop){
    const container = document.querySelector(".bar-box");

    container.innerHTML = "";

    globalArray.forEach((num, i) => {
      const div = document.createElement("div");
      div.classList.add("bar");
      div.style.height = `${(num / maxnum) * 100}%`;
      div.style.width = `${(100 / globalArray.length)}%`;

      if (i === offset) {
          div.style.backgroundColor = "red";
      }

      container.appendChild(div);
      });
  }
  else{
    return 0;
  }
}


document.getElementById("startDemoButton").addEventListener("click", async function () {
  const button = document.getElementById("startDemoButton");
  slider.disabled = true;
  button.disabled = true;

  running = true;
  stop = false;
  globalArray = [];

  let myArray = createRandomArray(maxnum, maxnum);

  globalArray = Array.from(myArray);

  console.log(myArray);

  await mergesort(myArray);

  console.log(globalArray);

  //await quicksort(myArray, 0);
  await completeArray();

  slider.disabled = false;
  button.disabled = false;
});

document.getElementById("endDemoButton").addEventListener("click", async function(){
  const button = document.getElementById("startDemoButton");
  stop = true;
  button.disabled = false;
  slider.disabled = false;
});




const slider = document.getElementById("countSlider");
const output = document.getElementById("sliderNumber");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

slider.addEventListener("input", function () {
  output.textContent = slider.value;
  maxnum = slider.value;
});


const smoke = document.querySelector(".smoke");
const factory = document.querySelector(".factory");
const bgFactory = document.querySelector(".bg-factory");
const gearsLeft = document.querySelectorAll(".gear-left");
const gearsRight = document.querySelectorAll(".gear-right");
const gearWrap = document.querySelector(".gear-wrap");



document.addEventListener('scroll', function(){
  let value = window.scrollY;

  smoke.style.marginTop = (value / 1.25) + 'px';
  factory.style.marginTop = (value / 5) + 'px';
  bgFactory.style.marginTop = (value / 2.5) + 'px';

  gearsLeft.forEach((gear) => {
    gear.style.transform = `rotate(${value/5}deg)`;
  });
  gearsRight.forEach((gear) => {
    gear.style.transform = `rotate(${-value/5}deg)`;
  });
  gearWrap.style.marginLeft = ((value/70)-10)+'vw';
});
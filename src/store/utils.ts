import * as uuid from "uuid";

/**
 * Parse and convert numbers in string to array
 */
export function strToArr(str: string): number[] {
  return str
    .replace(/[^1-9,]/g, "")
    .trim()
    .split(",")
    .filter((v) => !isNaN(parseInt(v)))
    .map((v) => parseInt(v));
}

/**
 * Convert Array of numbers to DATA_SET type
 */
export function prepareDataSet(arr: number[]): DATA_SET {
  return arr.map((v, i) => ({
    value: v,
    id: uuid.v4(),
    active: false,
    done: false,
  }));
}

/**
 * Generate random number within given range ] min, max [
 */
export function randomNum(max: number, min = -1) {
  return Math.round(Math.random() * max + min + 1);
}

/**
 * Generate Random Array of numbers
 */
export function randomSet(len?: number, maxValue?: number): number[] {
  return Array.from({ length: len || randomNum(50, 2) }).map(() =>
    randomNum(maxValue || 500)
  );
}

/**
 * Sort given array asc / desc
 */
export function sortArr(arr: number[], desc = false): number[] {
  if (desc) {
    return arr.sort((a, b) => b - a);
  } else {
    return arr.sort((a, b) => a - b);
  }
}

/**
 * Nearly Sort an array
 */
export function nearlySortArr(
  arr: number[],
  desc = false,
  percent = 0.8
): number[] {
  const max = Math.max(...arr);
  const min = Math.min(...arr);

  if (desc) {
    return arr.sort((a, b) => b - a);
  } else {
    return arr.sort((a, b) => {
      return Math.random() < percent ? a - b : b - a;
    });
  }
}

export function bubbleSort(arr: DATA_SET): SORTING_STEPS {
  const steps = [arr];

  let swapped: boolean;
  let n = arr.length - 1;
  let currentArr = arr;

  do {
    swapped = false;

    for (let i = 0; i < n; i++) {
      let newArr = [...currentArr];

      // highlight nodes that will be compared
      let first: DATA_POINT = { ...newArr[i], active: true };
      let second: DATA_POINT = { ...newArr[i + 1], active: true };

      newArr[i] = first;
      newArr[i + 1] = second;
      steps.push(newArr);

      newArr = [...currentArr];

      if (currentArr[i]["value"] > currentArr[i + 1]["value"]) {
        // make a new copy of the current array

        // swap the values of the new copy
        [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];

        swapped = true;
      }

      // push the new copy as a step
      steps.push(newArr);

      // make the currentArr variable = newArr
      currentArr = newArr;
    }

    let newArr = [...currentArr];
    newArr[n] = { ...newArr[n], done: true };
    steps.push(newArr);
    currentArr = newArr;

    n--;
  } while (swapped);

  steps.push(currentArr.map((v) => ({ ...v, done: true })));

  return steps;
}

export function selection(arr: DATA_SET): SORTING_STEPS {
  const steps = [arr];

  let currentArr = [...arr];

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < arr.length; j++) {
      let newArr = [...currentArr];
      newArr[lowest] = { ...newArr[lowest], active: true };
      newArr[j] = { ...newArr[j], active: true };
      steps.push(newArr);

      if (currentArr[lowest]["value"] > currentArr[j]["value"]) {
        let newArr2 = [...newArr];
        newArr2[lowest] = { ...newArr2[lowest], active: false };
        steps.push(newArr2);

        lowest = j;
      }
    }
    if (i !== lowest) {
      let newArr = [...currentArr];
      newArr[lowest] = { ...newArr[lowest], done: true };

      [newArr[i], newArr[lowest]] = [newArr[lowest], newArr[i]];
      steps.push(newArr);

      currentArr = newArr;
    }

    let newArr = [...currentArr];
    newArr[i] = { ...newArr[i], done: true };
    steps.push(newArr);
    currentArr = newArr;
  }

  return steps;
}

export function insertion(arr: DATA_SET): SORTING_STEPS {
  const steps = [arr];

  let currentArr = arr;

  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;

    // copying to new array
    let newArr = [...currentArr];

    // modifying value and setting current
    newArr[i] = { ...newArr[i], active: true };
    let current = newArr[i];

    // pushing a step
    steps.push(newArr);

    // setting workable array
    currentArr = newArr;

    if (currentArr[j]["value"] > current["value"]) {
      let newArr = [...currentArr];
      newArr[j + 1] = { ...newArr[j + 1], active: true };
      newArr[j] = { ...newArr[j], active: true };
      steps.push(newArr);
      currentArr = newArr;

      while (j >= 0 && currentArr[j]["value"] > current["value"]) {
        let newArr = [...currentArr];

        [newArr[j + 1], newArr[j]] = [newArr[j], newArr[j + 1]];
        newArr[j + 1] = { ...newArr[j + 1], active: false, done: true };

        steps.push(newArr);

        currentArr = newArr;

        j--;
        if (j < 0 || currentArr[j]["value"] <= current["value"]) {
          newArr = [...currentArr];
          newArr[j + 1] = { ...newArr[j + 1], active: false, done: true };
          steps.push(newArr);
          currentArr = newArr;
        }
      }
    }

    if (currentArr[i]["active"] === true) {
      // making a copy
      newArr = [...currentArr];

      // modifying value of current to be false
      newArr[i] = { ...newArr[i], active: false };
      steps.push(newArr);
      currentArr = newArr;
    }

    current = currentArr[j + 1];
  }

  steps.push(currentArr.map((v, i) => (v.done ? v : { ...v, done: true })));

  return steps;
}

/**
 * Merge Sort
 *
 *
 * MUST BE SOLVED WITH BOTTOM UP
 */
function mergeSort(arr: DATA_SET): SORTING_STEPS {
  const steps = [arr];
  let sorted = arr.slice();
  let n = sorted.length;
  let buffer = [...arr];

  for (var size = 1; size < n; size *= 2) {
    for (var leftStart = 0; leftStart < n; leftStart += 2 * size) {
      let left = leftStart;
      let right = Math.min(left + size, n);
      let leftLimit = right;
      let rightLimit = Math.min(right + size, n);

      let i = left;
      while (left < leftLimit && right < rightLimit) {
        let currentArr = [...sorted];
        currentArr[left] = { ...currentArr[left], active: true };
        currentArr[right] = { ...currentArr[right], active: true };
        steps.push(currentArr);

        if (sorted[left]["value"] <= sorted[right]["value"]) {
          let currentArr = [...sorted];
          currentArr[left] = { ...currentArr[left], active: true };
          currentArr[right] = { ...currentArr[right], active: false };

          steps.push(currentArr);

          currentArr = [...sorted];

          buffer[i++] = currentArr[left++];
        } else {
          let currentArr = [...sorted];
          currentArr[right] = { ...currentArr[right], active: true };
          currentArr[left] = { ...currentArr[left], active: false };
          steps.push(currentArr);

          currentArr = [...sorted];

          buffer[i++] = currentArr[right++];
        }
      }
      while (left < leftLimit) {
        let currentArr = [...sorted];
        currentArr[left] = { ...currentArr[left], active: true };
        steps.push(currentArr);
        // currentArr = [...sorted];
        // steps.push(currentArr);

        buffer[i++] = sorted[left++];
      }
      while (right < rightLimit) {
        let currentArr = [...sorted];
        currentArr[right] = { ...currentArr[right], active: true };
        steps.push(currentArr);

        buffer[i++] = sorted[right++];
      }
    }

    [sorted, buffer] = [buffer, sorted];
  }

  // return sorted;
  let currentArr = sorted;
  for (let i = 0; i < arr.length; i++) {
    currentArr[i] = { ...currentArr[i], done: true };
    steps.push([...currentArr]);
  }
  return steps;
}

function quickSort(a: DATA_SET) {
  const steps: SORTING_STEPS = [a];

  function quick_Sort(arr: DATA_SET): DATA_SET {
    // handle edge case
    if (arr.length <= 1) return arr;

    // take copy of the input array
    const origArray = [...arr];

    // assemble original array
    console.log(arr.length);

    const left: DATA_SET = [];
    const right: DATA_SET = [];

    const pivot: DATA_POINT = { ...arr[arr.length - 1], active: false };
    origArray[arr.length - 1] = pivot;
    origArray.pop();

    const length = origArray.length;

    for (var i = 0; i < length; i++) {
      if (origArray[i]["value"] <= pivot["value"]) {
        left.push(origArray[i]);
      } else {
        right.push(origArray[i]);
      }
    }

    const sortLeft = quick_Sort(left);
    const sortRight = quick_Sort(right);
    const sorted = [...sortLeft, pivot, ...sortRight];

    return sorted;
  }

  const lastStep = quick_Sort(a);
  steps.push(lastStep);
  return steps;
}

/**
 *  Gnerate steps function
 */
export function generateSteps(method: SORTING_METHOD) {
  switch (method) {
    case "BUBBLE SORT":
      return bubbleSort;

    case "SELECTION SORT":
      return selection;

    case "INSERTION SORT":
      return insertion;

    case "MERGE SORT":
      return mergeSort;

    case "QUICK SORT":
      return quickSort;

    default:
      return bubbleSort;
  }
}

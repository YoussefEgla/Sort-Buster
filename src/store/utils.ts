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

        steps.push(newArr);

        currentArr = newArr;

        j--;
        if (j < 0 || currentArr[j]["value"] <= current["value"]) {
          newArr = [...currentArr];
          newArr[j + 1] = { ...newArr[j + 1], active: false };
          steps.push(newArr);
          currentArr = newArr;
        }
      }
    }

    // making a copy
    newArr = [...currentArr];

    // modifying value of current to be false
    newArr[i] = { ...newArr[i], active: false };
    steps.push(newArr);
    currentArr = newArr;
    current = currentArr[j + 1];
  }

  for (let i = 0; i < currentArr.length; i++) {
    let newArr = [...currentArr];
    newArr[i] = { ...newArr[i], done: true };
    steps.push(newArr);
    currentArr = newArr;
  }

  return steps;
}

export function generateSteps(method: SORTING_METHOD) {
  switch (method) {
    case "BUBBLE SORT":
      return bubbleSort;

    case "SELECTION SORT":
      return selection;

    case "INSERTION SORT":
      return insertion;

    default:
      return bubbleSort;
  }
}

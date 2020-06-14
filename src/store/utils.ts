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
  return Array.from({ length: len || randomNum(35, 2) }).map(() =>
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
      if (currentArr[i].value > currentArr[i + 1].value) {
        // make a new copy of the current array
        let newArr = [...currentArr];

        // swap the values of the new copy
        [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];

        // push the new copy as a step
        steps.push(newArr);

        // make the currentArr variable = newArr
        currentArr = newArr;

        swapped = true;
      }
    }
    n--;
  } while (swapped);

  return steps;
}

export default function heapSort(a: DATA_SET) {
  const steps: SORTING_STEPS = [a];

  let arr = [...a];

  let length = arr.length;
  let i = Math.floor(length / 2 - 1);
  let k = length - 1;

  while (i >= 0) {
    heapify(arr, length, i);
    i--;
  }

  while (k >= 0) {
    swap(arr, k, 0);
    heapify(arr, k, 0);
    k--;
  }

  steps.push(arr);
  return steps;
}

function heapify(arr: DATA_SET, length: number, i: number): void {
  let largest = i;
  let left = i * 2 + 1;
  let right = left + 1;

  if (left < length && arr[left]["value"] > arr[largest]["value"]) {
    largest = left;
  }

  if (right < length && arr[right]["value"] > arr[largest]["value"]) {
    largest = right;
  }

  if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, length, largest);
  }
}

function swap(arr: DATA_SET, i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

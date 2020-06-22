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
    steps.push([...arr]);
    swap(arr, k, 0);
    heapify(arr, k, 0);

    arr[k] = { ...arr[k], done: true };
    steps.push([...arr]);
    k--;
  }

  function heapify(arr: DATA_SET, length: number, i: number): void {
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    steps.push([...arr]);
    if (left < length && arr[left]["value"] > arr[largest]["value"]) {
      steps.push([...arr]);
      largest = left;
    }

    steps.push([...arr]);

    if (right < length && arr[right]["value"] > arr[largest]["value"]) {
      steps.push([...arr]);
      largest = right;
    }
    steps.push([...arr]);

    if (largest !== i) {
      steps.push([...arr]);
      swap(arr, i, largest);
      steps.push([...arr]);
      heapify(arr, length, largest);
      steps.push([...arr]);
    }
  }

  steps.push([...arr]);
  return steps;
}

function swap(arr: DATA_SET, i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

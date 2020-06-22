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
    arr[k] = { ...arr[k], active: true };
    arr[0] = { ...arr[0], active: true };
    steps.push([...arr]);

    swap(arr, k, 0);
    steps.push([...arr]);

    arr[k] = { ...arr[k], active: false };
    arr[0] = { ...arr[0], active: false };

    heapify(arr, k, 0);

    arr[k] = { ...arr[k], done: true };
    steps.push([...arr]);

    k--;
  }

  function heapify(arr: DATA_SET, length: number, i: number): void {
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    // arr[largest] = { ...arr[largest], active: true };
    // steps.push([...arr]);

    if (left < length && arr[left]["value"] > arr[largest]["value"]) {
      largest = left;
    }

    if (right < length && arr[right]["value"] > arr[largest]["value"]) {
      largest = right;
    }

    if (largest !== i) {
      arr[i] = { ...arr[i], active: true };
      arr[largest] = { ...arr[largest], active: true };
      steps.push([...arr]);

      swap(arr, i, largest);
      steps.push([...arr]);

      arr[i] = { ...arr[i], active: false };
      arr[largest] = { ...arr[largest], active: false };

      heapify(arr, length, largest);
    }
  }

  steps.push([...arr]);
  return steps;
}

function swap(arr: DATA_SET, i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

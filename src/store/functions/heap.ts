export default function heapSort(a: DATA_SET) {
  const steps: SORTING_STEPS = [[...a]];

  let arr = [...a];
  console.log(arr.map((v) => v.value));

  let length = arr.length;
  let i = Math.floor(length / 2 - 1);
  let k = length - 1;

  function heapify(arr: DATA_SET, length: number, i: number) {
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
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      heapify(arr, length, largest);
    }

    return arr;
  }

  while (i >= 0) {
    arr = heapify(arr, length, i);
    i--;
  }

  while (k >= 0) {
    [arr[0], arr[k]] = [arr[k], arr[0]];
    arr = heapify(arr, k, 0);
    k--;
  }

  const final = arr.map((v) => v);
  console.log(final);
  steps.push(final);

  return steps;
}

export default function (arr: DATA_SET) {
  const steps: SORTING_STEPS = [arr];

  function quickSort(arr: DATA_SET, low = 0, high = arr.length - 1) {
    if (low < high) {
      const position = partition(arr, low, high);
      if (low < position - 1) quickSort(arr, low, position - 1);
      if (position < high) quickSort(arr, position, high);
    }
    arr[low] = { ...arr[low], done: true };
    arr[high] = { ...arr[high], done: true };
  }

  function partition(arr: DATA_SET, left: number, right: number) {
    const p = Math.floor(Math.random() * (right - left + 1) + left);

    // highlight pivot
    arr[p] = { ...arr[p], active: true };

    steps.push([...arr]);

    const pivot = arr[p];

    while (left <= right) {
      while (arr[left]["value"] < pivot["value"]) {
        left++;
      }
      while (arr[right]["value"] > pivot["value"]) {
        right--;
      }
      if (left <= right) {
        swap(arr, left, right);

        left++;
        right--;
      }
    }

    arr[p] = { ...arr[p], active: false };
    // steps.push([...arr]);

    return left;
  }

  function swap(arr: DATA_SET, left: number, right: number) {
    steps.push([...arr]);

    arr[left] = { ...arr[left], active: true };
    arr[right] = { ...arr[right], active: true };

    steps.push([...arr]);

    [arr[left], arr[right]] = [arr[right], arr[left]];

    steps.push([...arr]);

    arr[left] = { ...arr[left], active: false };

    arr[right] = { ...arr[right], active: false };

    steps.push([...arr]);
  }

  const final = [...arr];
  quickSort(final);
  steps.push(final);
  return steps;
}

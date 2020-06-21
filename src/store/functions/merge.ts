/**
 * Merge Sort
 *
 *
 * MUST BE SOLVED WITH BOTTOM UP In place
 */
export default function (arr: DATA_SET): SORTING_STEPS {
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

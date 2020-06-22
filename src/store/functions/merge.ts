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
        if (sorted[left]["value"] <= sorted[right]["value"]) {
          buffer[i++] = sorted[left++];
        } else {
          buffer[i++] = sorted[right++];
        }
      }
      while (left < leftLimit) {
        buffer[i++] = sorted[left++];
      }
      while (right < rightLimit) {
        buffer[i++] = sorted[right++];
      }
    }

    [sorted, buffer] = [buffer, sorted];
  }

  // return sorted;
  steps.push([...sorted]);
  return steps;
}

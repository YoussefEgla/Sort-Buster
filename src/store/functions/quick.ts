export default function (arr: DATA_SET) {
  const steps: SORTING_STEPS = [arr];

  function quick_Sort(a: DATA_SET, low: number, high: number) {
    if (low < high) {
      const p = partition(a, low, high);
      quick_Sort(a, low, p - 1);
      quick_Sort(a, p + 1, high);
    } else {
      a[low] = { ...a[low], done: true };
      a[high] = { ...a[high], done: true };
    }
  }

  function partition(a: DATA_SET, low: number, high: number) {
    let pivot = a[high];
    let i = low;

    // highlight pivot
    a[high] = { ...a[high], active: true };
    steps.push([...a]);

    for (let j = low; j <= high; j++) {
      // highlight compared value
      a[j] = { ...a[j], active: true };
      steps.push([...a]);

      if (a[j]["value"] < pivot["value"]) {
        a[i] = { ...a[i], active: true };
        steps.push([...a]);

        [a[i], a[j]] = [a[j], a[i]];

        a[j] = { ...a[j], active: false };
        a[i] = { ...a[i], active: false };
        steps.push([...a]);

        i++;
      } else {
        // remove compared value highlight
        a[j] = { ...a[j], active: false };
        steps.push([...a]);
      }
    }

    // remove pivot highlight
    // a[high] = { ...a[high], active: false };
    a[i] = { ...a[i], active: true };
    steps.push([...a]);

    a[high] = { ...a[high], done: true };

    steps.push([...a]);

    [a[i], a[high]] = [a[high], a[i]];

    steps.push([...a]);

    a[high] = { ...a[high], active: false };
    a[i] = { ...a[i], active: false };

    steps.push([...a]);

    return i;
  }

  const final = [...arr];
  quick_Sort(final, 0, final.length - 1);
  steps.push(final.map((v) => (!v.done ? { ...v, done: true } : v)));
  return steps;
}

export default function (arr: DATA_SET): SORTING_STEPS {
  const steps = [arr];

  const a = [...arr];
  sort(a);

  function sort(arr: DATA_SET) {
    let size = arr.length;
    let h = 1;

    while (h < size / 3) {
      h = h * 3 + 1;
    }

    while (h >= 1) {
      for (let i = h; i < size; i++) {
        for (let j = i; j >= h && less(arr, j, j - h); j = j - h) {
          swap(arr, j, j - h);

          if (h == 1 && (!less(arr, j - h, j) || j < h)) {
            arr[j] = { ...arr[j], done: true };
            arr[j - h] = { ...arr[j - h], done: true };
          }
        }
        if (h === 1) {
          arr[i - 1] = { ...arr[i - 1], done: true };
          arr[i] = { ...arr[i], done: true };
        }
      }
      h = Math.floor(h / 3);
    }
  }

  function less(arr: DATA_SET, i: number, min: number) {
    return arr[i]["value"] < arr[min]["value"];
  }

  function swap(arr: DATA_SET, i: number, min: number) {
    arr[min] = { ...arr[min], active: true };
    arr[i] = { ...arr[i], active: true };
    steps.push([...arr]);
    [arr[min], arr[i]] = [arr[i], arr[min]];
    steps.push([...arr]);

    arr[min] = { ...arr[min], active: false };
    arr[i] = { ...arr[i], active: false };
  }

  steps.push(a);
  steps.push(a.map((v) => (v.done ? v : { ...v, done: true })));
  return steps;
}

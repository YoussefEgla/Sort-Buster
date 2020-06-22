export default function (input: DATA_SET): SORTING_STEPS {
  const steps = [input];

  const arr = [...input];

  let swapped = false;
  let beginIdx = 0;
  let endIdx = arr.length - 2;
  do {
    swapped = false;

    let newBeginIdx = endIdx;
    let newEndIdx = beginIdx;

    for (let i = beginIdx; i <= endIdx; i++) {
      arr[i] = { ...arr[i], active: true };
      arr[i + 1] = { ...arr[i + 1], active: true };
      steps.push([...arr]);

      if (arr[i]["value"] > arr[i + 1]["value"]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

        steps.push([...arr]);
        swapped = true;
        newEndIdx = i;
      }

      if (i === endIdx) {
        arr[i + 1] = { ...arr[i + 1], done: true };
        steps.push([...arr]);
      }

      arr[i] = { ...arr[i], active: false };
      arr[i + 1] = { ...arr[i + 1], active: false };
      steps.push([...arr]);
    }

    // all elements after newEndIdx are in correct order
    for (let j = newEndIdx + 1; j < endIdx + 1; j++) {
      arr[j] = { ...arr[j], done: true };
    }
    steps.push([...arr]);
    endIdx = newEndIdx - 1;

    if (!swapped) {
      break;
    }
    for (let i = endIdx; i >= beginIdx; i--) {
      arr[i] = { ...arr[i], active: true };
      arr[i + 1] = { ...arr[i + 1], active: true };
      steps.push([...arr]);

      if (arr[i]["value"] > arr[i + 1]["value"]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        steps.push([...arr]);
        swapped = true;
        newBeginIdx = i;
      }

      arr[i] = { ...arr[i], active: false };
      arr[i + 1] = { ...arr[i + 1], active: false };
      steps.push([...arr]);
    }
    // all elements before new begin index are in correct order
    for (let j = beginIdx - 1; j < newBeginIdx; j++) {
      arr[j] = { ...arr[j], done: true };
    }

    steps.push([...arr]);
    beginIdx = newBeginIdx + 1;
  } while (swapped);

  steps.push([...arr]);
  const last = arr.map((v) => (v.done ? v : { ...v, done: true }));
  steps.push(last);

  return steps;
}

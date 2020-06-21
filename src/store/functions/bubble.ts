export default function (arr: DATA_SET): SORTING_STEPS {
  const steps = [arr];

  let swapped: boolean;
  let n = arr.length - 1;
  let currentArr = arr;

  do {
    swapped = false;

    for (let i = 0; i < n; i++) {
      let newArr = [...currentArr];

      // highlight nodes that will be compared
      let first: DATA_POINT = { ...newArr[i], active: true };
      let second: DATA_POINT = { ...newArr[i + 1], active: true };

      newArr[i] = first;
      newArr[i + 1] = second;
      steps.push(newArr);

      newArr = [...currentArr];

      if (currentArr[i]["value"] > currentArr[i + 1]["value"]) {
        // make a new copy of the current array

        // swap the values of the new copy
        [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];

        swapped = true;
      }

      // push the new copy as a step
      steps.push(newArr);

      // make the currentArr variable = newArr
      currentArr = newArr;
    }

    let newArr = [...currentArr];
    newArr[n] = { ...newArr[n], done: true };
    steps.push(newArr);
    currentArr = newArr;

    n--;
  } while (swapped);

  steps.push(currentArr.map((v) => ({ ...v, done: true })));

  return steps;
}

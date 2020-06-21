export default function (arr: DATA_SET): SORTING_STEPS {
  const steps = [arr];

  let currentArr = arr;

  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;

    // copying to new array
    let newArr = [...currentArr];

    // modifying value and setting current
    newArr[i] = { ...newArr[i], active: true };
    let current = newArr[i];

    // pushing a step
    steps.push(newArr);

    // setting workable array
    currentArr = newArr;

    if (currentArr[j]["value"] > current["value"]) {
      let newArr = [...currentArr];
      newArr[j + 1] = { ...newArr[j + 1], active: true };
      newArr[j] = { ...newArr[j], active: true };
      steps.push(newArr);
      currentArr = newArr;

      while (j >= 0 && currentArr[j]["value"] > current["value"]) {
        let newArr = [...currentArr];

        [newArr[j + 1], newArr[j]] = [newArr[j], newArr[j + 1]];
        newArr[j + 1] = { ...newArr[j + 1], active: false, done: true };

        steps.push(newArr);

        currentArr = newArr;

        j--;
        if (j < 0 || currentArr[j]["value"] <= current["value"]) {
          newArr = [...currentArr];
          newArr[j + 1] = { ...newArr[j + 1], active: false, done: true };
          steps.push(newArr);
          currentArr = newArr;
        }
      }
    }

    if (currentArr[i]["active"] === true) {
      // making a copy
      newArr = [...currentArr];

      // modifying value of current to be false
      newArr[i] = { ...newArr[i], active: false };
      steps.push(newArr);
      currentArr = newArr;
    }

    current = currentArr[j + 1];
  }

  steps.push(currentArr.map((v, i) => (v.done ? v : { ...v, done: true })));

  return steps;
}

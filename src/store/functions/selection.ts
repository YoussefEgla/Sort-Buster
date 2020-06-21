export default function (arr: DATA_SET): SORTING_STEPS {
  const steps = [arr];

  let currentArr = [...arr];

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < arr.length; j++) {
      let newArr = [...currentArr];
      newArr[lowest] = { ...newArr[lowest], active: true };
      newArr[j] = { ...newArr[j], active: true };
      steps.push(newArr);

      if (currentArr[lowest]["value"] > currentArr[j]["value"]) {
        let newArr2 = [...newArr];
        newArr2[lowest] = { ...newArr2[lowest], active: false };
        steps.push(newArr2);

        lowest = j;
      }
    }
    if (i !== lowest) {
      let newArr = [...currentArr];
      newArr[lowest] = { ...newArr[lowest], done: true };

      [newArr[i], newArr[lowest]] = [newArr[lowest], newArr[i]];
      steps.push(newArr);

      currentArr = newArr;
    }

    let newArr = [...currentArr];
    newArr[i] = { ...newArr[i], done: true };
    steps.push(newArr);
    currentArr = newArr;
  }

  return steps;
}

export function randomNum(max: number, min = 0) {
  return Math.round(Math.random() * max + min);
}

export function randomSet(sorted = false) {
  const set = Array.from({ length: randomNum(45, 3) }).map((v, i) => ({
    value: randomNum(200, 0),
    id: String(i),
  }));

  if (sorted) {
    set.sort((a, b) => a.value - b.value);
  }

  return set;
}

//
// SORTING FUNCTIONS STEPS GENERATORS
//
import bubble from "./bubble";
import cocktail from "./cocktail";
import randomQuick from "./random-quick";
import quick from "./quick";
import heap from "./heap";
import insertion from "./insertion";
import selection from "./selection";
import shell from "./shell";

export * from "./utils";
/**
 *  Return Step generator function
 */
export function generateSteps(method: SORTING_METHOD) {
  switch (method) {
    case "BUBBLE SORT":
      return bubble;

    case "SELECTION SORT":
      return selection;

    case "INSERTION SORT":
      return insertion;

    case "QUICK SORT":
      return quick;

    case "RANDOM QUICK SORT":
      return randomQuick;

    case "COCKTAIL SORT":
      return cocktail;

    case "HEAP SORT":
      return heap;

    case "SHELL SORT":
      return shell;

    default:
      return bubble;
  }
}

# Sort Buster

## Sorting Algorithms Interactive Visualizer

[Click here to view project in production](https://sortbuster.netlify.app/)

Built with

- React
- Redux
- TypeScript
- D3.js
- Material UI

## Application Design Approach

This project is small but yet considered complex enough. It needs a lot of \
design and decision making ahead of time before jumping to write any code.

I realized this kind of problem when I was deciding on \
the features that this kind of application should have.

### Project Features

- Ability to choose from different algorithms
- Represent Values as bars with different heights
- Represent sorting steps by coloring bars
- Bars represent real order of values at any given moment
- Creating values
  - Totally Random
  - Nearly Sorted
  - Sorted
  - Reversed
  - Few unique values (working on it)
- Sorting values
  - Continue / Pause sorting
  - Rewind / Fast forward steps
  - Step forward / backward steps
  - Use same values on different algorithms
  - define sorting speed
- Highlight suedo code blocks as sorting progresses (working on it)

### Pre-development challenge and trade-offs

The biggest challenge I faced was solving the play / pause and rewind problem. \
There was a lot of different ideas that came to my mind on how to tackle \
this, I managed to squeeze them to those 3

- Write algorithms as generator functions

  - The idea is to yield return at desired step and pause code execution.

  - **Trade-off :** It will add more complexity to the state as we need to store \
    already yielded results and rewind without invoking the functions.

- Utilize browser devTools behind the scene

  - Debugger has the ability to pause execution, step through code. \
    and output result at any given moment during code execution lifecycle. \
    If accessing debugger through code is an option this might work. \

  - **Trade-off :** We will need to handle browser compatibility.

- Generate future states ahead of time

  - This idea is about making a higher order function that takes an array \
    of values and make copies of the array that will be represented as steps.\
    This approach will make it easier to implement the whole playback \
    feature while avoiding unnecessary increase in development complexity. \
    [selection sort example](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/functions/selection.ts)

  - **Trade-off :** It will increase runtime memory consumption because we are \
    making new array for each step. \
    However this won't have a substantial performance issue because array length \
    will be always limited to 50 values.

### [State Design](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/Slice.ts)

```
interface GeneralState {
  method: SORTING_METHOD;
  dataSet: DATA_SET;
  sortingSteps: SORTING_STEPS;
  currentStep: number;
  areStepsDone: boolean;
  interval: NodeJS.Timeout | 0;
  playback: "PLAYING" | "PAUSED" | "FINISHED";
  speed: number;
}
```

- `method: SORTING_METHOD`

  - The state of the currently selected sorting algorithm
  - It has a type of `SORTING_METHOD`

  ```
  type SORTING_METHOD =
  | BUBBLE_SORT
  | SELECTION_SORT
  | INSERTION_SORT
  | QUICK_SORT
  | RANDOM_QUICK_SORT
  | COCKTAIL_SORT
  | HEAP_SORT
  | SHELL_SORT;

  // each represent a string type.
  type BUBBLE_SORT = "BUBBLE SORT"
  ```

- `dataSet: DATA_SET`

  - The state of initial values the application is using
  - It has a type of `DATA_SET` which has type of `DATA_POINT[]`

  ```
  // Data point represent a single value in the array
  // and it has other properties that are manipulated
  // while sorting for representational purpose.

  type DATA_POINT = {
  value: number;
  id: string;
  active: boolean;
  done: boolean;
  };

  type DATA_SET = DATA_POINT[];
  ```

- `sortingSteps: SORTING_STEPS`

  - The steps generated from the sorting algorithm, which are \
    represented to the user.
  - `type SORTING_STEPS = DATA_SET[]`

- `currentStep: number`

  - The index value of the currently selected array on the sorting steps;

- `areStepsDone: boolean`

  - Legacy. will be replaced by `playback === "FINISHED"` in components

- `interval: NODEJS.Timeout | 0`

  - Stores the id of the interval that's used for incrementing currentStep continuously.
  - defaults to 0 when sorting is paused or finished.

- `playback: "PLAYING" | "PAUSED" | "FINISHED";`

  - Mainly used to prevent incrementing steps if all steps are finished and prevent \
    multiple `setInterval` invocations.
  - also used for making some components more reactive.

- `speed: number;`
  - holds value passed to `setInterval` in ms

### [Actions](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/Slice.ts)

- [`setMethod`](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/Slice.ts#L36)

  - change the currently selected sorting algorithm
  - reset `currentStep` to 0
  - generate `sortingSteps`

- [`create`](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/Slice.ts#L48)

  - clears interval and sets `interval` to 0
  - sets `playback` to paused
  - creates set based on action type

  ```
  // extra options can be specified as array length,
  // maximum value and generating sorted in descending.

  type CREATE =
    | CREATE_RANDOM
    | CREATE_SORTED
    | CREATE_NEARLY_SORTED
    | CREATE_USER_DEFINED;

  type CREATE_RANDOM = { type: "RANDOM"; len?: number; maxValue?: number };

  type CREATE_SORTED = {
    type: "SORTED";
    len?: number;
    maxValue?: number;
    desc?: boolean;
  };

  type CREATE_NEARLY_SORTED = {
    type: "NEARLY SORTED";
    len?: number;
    maxValue?: number;
    desc?: boolean;
  };

  type CREATE_USER_DEFINED = {
    type: "USER DEFINED";
    data: string;
  };

  ```

- [`step`](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/Slice.ts#L93)

  - manages `currentStep` state

  ```
  type STEP_FORWARD = { type: "STEP FORWARD" };
  type STEP_BACKWARD = { type: "STEP BACKWARD" };
  type STEP = STEP_FORWARD | STEP_BACKWARD | STEP_TO;
  type STEP_TO = { type: "STEP TO"; index: number };
  ```

- [`playAsync`](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/Slice.ts#L149) & [`play`](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/Slice.ts#L127)

  - both actions are used together. `playAsync` is dispatched from UI logic and \
    `play` is dispatched internally by playAsync with a number payload of the \
    interval id because state is read-only in Redux thunk.

- [`pause`](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/Slice.ts#L131)

  - clears the interval and set `interval` state to 0
  - change `playback` state to paused

- [`changeSpeed`](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/store/Slice.ts#L143)

  - change the `speed` state. It doesn't dispatch `playAsync` internally as this will
    have reducer side effects and it is counter intuitive.
  - In case if `playback === "PLAYING"` multiple actions are dispatched in order so
    speed changes and code continue execution. This happens in [`SpeedSlider`](https://github.com/YoussefEgla/Sort-Buster/blob/master/src/containers/Sort.tsx#L64) component

  ```
  <Material.Slider
      onChange={(e, v) => {
        const speed = Math.round(typeof v === "number" ? v : v[0]);
        if (playback !== "PLAYING") {
          dispatch(Slice.actions.changeSpeed(speed));
        } else {
          dispatch(Slice.actions.changeSpeed(speed));
          dispatch(Slice.actions.pause());
          dispatch(Slice.actions.playAsync());
        }
      }}
  />
  ```

### Codebase Structure

- **components** directory contains reusable components
- **containers** are usually non reusable components and use minimal state
- **store** contains non UI logic and Redux logic
- **functions** contain sorting algorithms and helper functions

```
.
+--src
|  +--components
|  |  |--index.ts
|  |  |--ProgressSlider.tsx
|  |  |--...
|  +--containers
|  |  |--index.ts
|  |  |--Viz.tsx
|  |  |--Create.tsx
|  |  |--...
|  +--store
|  |  |--index.ts
|  |  |--Slice.ts
|  |  |--actions.d.ts
|  |  |--constants.d.ts
|  |  +--functions
|  |     |--index.ts
|  |     |--utils.ts
|  |     |--bubble.ts
|  |     |--quick.ts
|  |     |--...
|  |--App.tsx
|  |--index.tsx
|  |--...
+--public
|--package.json
|--...
.
```

### Room for improvement

- Smoothing bars transition on re-render

  - Need to pass previous index during steps generation \
    so we can calculate the previous position of the bar.

- Mobile responsiveness

- Represent multi-part steps
  - currently the application only works with in-place sorting algorithms \
    this means that it will either breaks down or developers won't be able to \
    represent out of place algorithms as counting sort and merge sort
  - the solution is to extend `Viz.tsx` functionality in order to represent \
    multi-part step

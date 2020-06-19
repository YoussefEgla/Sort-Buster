//
// CREATE ACTIONS
//
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
type CREATE =
  | CREATE_RANDOM
  | CREATE_SORTED
  | CREATE_NEARLY_SORTED
  | CREATE_USER_DEFINED;

//
// STEP ACTIONS
//
type STEP_FORWARD = { type: "STEP FORWARD" };
type STEP_BACKWARD = { type: "STEP BACKWARD" };
type STEP_TO = { type: "STEP TO"; index: number };
type STEP = STEP_FORWARD | STEP_BACKWARD | STEP_TO;

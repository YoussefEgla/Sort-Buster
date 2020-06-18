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

type CREATE_RANDOM = { len?: number; maxValue?: number };
type CREATE_SORTED = { len?: number; maxValue?: number; desc?: boolean };
type CREATE_NEARLY_SORTED = "CREATE NEARLY SORTED";

type CREATE = CREATE_RANDOM | CREATE_SORTED | CREATE_NEARLY_SORTED;

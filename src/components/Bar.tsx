import React from "react";

interface BarProps {
  /**
   * Between 0 & 100
   */
  height: number;
  /**
   * Position in svg
   */
  x: number;
  value: number;
  active: boolean;
  done: boolean;
}

export function Bar(props: BarProps) {
  const { height, x, value } = props;
  return (
    <rect
      height={`${height}%`}
      x={`${x}px`}
      width="24px"
      transform="scale(1, -1) translate(0, -200)"
      fill={props.done ? "#3f51b5" : props.active ? "#f50057" : "black"}
    />
  );
}

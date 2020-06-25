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
    <g>
      <rect
        height={`${height}%`}
        x={`${x}px`}
        width="24px"
        transform="scale(1, -1) translate(0, -200)"
        fill={
          props.done
            ? "#3f51b5"
            : props.active
            ? "#f50057"
            : "rgba(0, 0, 0, 0.12)"
        }
      />
      <text
        fill={
          (props.done || props.active) && height > 9
            ? "white"
            : "rgba(0, 0, 0, 0.5)"
        }
        fontSize="11"
        x={`${x + 5}px`}
        y={`189`}
        fontFamily="serif"
      >
        {value}
      </text>
    </g>
  );
}

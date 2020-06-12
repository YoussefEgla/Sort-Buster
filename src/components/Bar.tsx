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
}

export function Bar(props: BarProps) {
  const { height, x, value } = props;
  return <rect height={`${height}%`} x={`${x}px`} width="24px" />;
}

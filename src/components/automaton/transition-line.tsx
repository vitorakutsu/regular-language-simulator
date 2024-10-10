import React from 'react';

interface TransitionLineProps {
  sourcePosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  label: string;
}

const TransitionLine = ({ sourcePosition, targetPosition, label }: TransitionLineProps) => {
  return (
    <svg style={{ position: 'absolute', left: 0, top: 0 }}>
      <line
        x1={sourcePosition.x + 100}
        y1={sourcePosition.y + 100}
        x2={targetPosition.x + 100}
        y2={targetPosition.y + 100}
        stroke="black"
        strokeWidth="2"
      />
      <text
        x={(sourcePosition.x + targetPosition.x) / 2 + 100}
        y={(sourcePosition.y + targetPosition.y) / 2 + 100}
        textAnchor="middle"
        stroke="black"
        strokeWidth="1px"
      >
        {label}
      </text>
    </svg>
  );
};

export default TransitionLine;

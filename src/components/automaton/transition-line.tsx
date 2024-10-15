import { StateInterface } from "../../interface/state-interface";
import { TransitionLabel } from "../../simulator/regular-automaton/regular-automaton.styles";

interface ITransitionLine {
  states: StateInterface[];
  transitions: {
    id: string;
    source: string;
    target: string;
    label: string;
  }[];
  removeTransition: (id: string) => void;
}

export const TransitionLine = ({
  states,
  transitions,
  removeTransition,
}: ITransitionLine) => {
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      {transitions.map((transition, index) => {
        const sourceState = states.find((s) => s.id === transition.source);
        const targetState = states.find((s) => s.id === transition.target);

        const transitionsBetweenStates = transitions.filter(
          (t) =>
            (t.source === transition.source &&
              t.target === transition.target) ||
            (t.source === transition.target && t.target === transition.source)
        );

        const numTransitions = transitionsBetweenStates.length;
        const transitionIndex = transitionsBetweenStates.indexOf(transition);

        const curvature = 60 * (transitionIndex - (numTransitions - 1) / 2);

        if (sourceState && targetState) {
          const sourceX = sourceState.position.x + 50;
          const sourceY = sourceState.position.y + 50;
          const targetX = targetState.position.x + 50;
          const targetY = targetState.position.y + 50;

          let d;

          if (sourceState.id === targetState.id) {
            const loopRadius = 40;
            const loopX = sourceX + loopRadius;
            const loopY = sourceY - loopRadius;

            d = `M${sourceX},${sourceY} 
                 C${loopX},${loopY} 
                 ${sourceX - loopRadius},${loopY} 
                 ${sourceX},${sourceY}`;

            return (
              <g key={transition.id}>
                <path
                  d={`M${loopX},${loopY} 
        C ${loopX + 60}, ${loopY - 80}, 
          ${loopX + 80}, ${loopY + 80}, 
          ${loopX},${loopY}`}
                  stroke="black"
                  fill="transparent"
                  strokeWidth="2"
                />

                {/* Ponta da seta */}
                <path
                  d={`M${loopX - 8},${loopY + 8} 
        L${loopX},${loopY} 
        L${loopX + 8},${loopY + 8}`}
                  stroke="black"
                  fill="transparent"
                  strokeWidth="2"
                />
                <TransitionLabel x={loopX - 20} y={loopY - 10}>
                  {transition.label}
                </TransitionLabel>
                <text
                  x={sourceX}
                  y={sourceY - loopRadius - 20}
                  style={{ cursor: "pointer", fill: "red" }}
                  onClick={() => removeTransition(transition.id)}
                >
                  Remover
                </text>
              </g>
            );
          } else {
            d =
              numTransitions === 1
                ? `M${sourceX},${sourceY} L${targetX},${targetY}`
                : `M${sourceX},${sourceY} 
                   C${sourceX},${sourceY + curvature} 
                   ${targetX},${targetY + curvature} 
                   ${targetX},${targetY}`;

            return (
              <g key={transition.id}>
                <path d={d} stroke="black" fill="transparent" />
                <TransitionLabel
                  x={(sourceX + targetX) / 2}
                  y={(sourceY + targetY) / 2 + curvature / 2}
                >
                  {transition.label}
                </TransitionLabel>
                <text
                  x={(sourceX + targetX) / 2}
                  y={
                    numTransitions > 1 && transitionIndex % 2 === 0
                      ? (sourceY + targetY) / 2 - 20 + curvature / 2
                      : (sourceY + targetY) / 2 + 20 + curvature / 2
                  }
                  style={{ cursor: "pointer", fill: "red" }}
                  onClick={() => removeTransition(transition.id)}
                >
                  Remover
                </text>
              </g>
            );
          }
        }
        return null;
      })}
    </svg>
  );
};

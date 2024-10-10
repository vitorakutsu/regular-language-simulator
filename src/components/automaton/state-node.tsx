import React from 'react';
import { StateContainer, StateLabel, TransitionButton } from '../automaton/automaton.styles';

interface StateNodeProps {
  id: string;
  label: string;
  onMouseDown: (e: React.MouseEvent) => void;
  onAddTransition: () => void;
}

const StateNode = ({ id, label, onMouseDown, onAddTransition }: StateNodeProps) => {
  return (
    <StateContainer onMouseDown={onMouseDown}>
      <StateLabel>{label}</StateLabel>
      <TransitionButton onClick={onAddTransition}>Adicionar Transição</TransitionButton>
    </StateContainer>
  );
};

export default StateNode;

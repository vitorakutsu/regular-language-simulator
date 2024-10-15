import styled from 'styled-components';

export const GridContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: transparent;
`;

export const StateButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: move;
  z-index: 5;
`;

export const StateNodeStyled = styled.div<{highlighted: string}>`
  border-radius: 50%;
  background-color: #e0e0e0;
  padding: 20px;
  text-align: center;
  background-color: ${(props) => props.highlighted ? props.highlighted : '#e0e0e0'};
  transition: background-color 0.3s ease;
`;


export const TransitionLine = styled.line`
  stroke: black;
  stroke-width: 2;
`;

export const TransitionLabel = styled.text`
  text-anchor: middle;
  stroke: black;
  stroke-width: 1px;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
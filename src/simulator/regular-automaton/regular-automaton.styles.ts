import styled from 'styled-components';

export const GridContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
`;

export const StateButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: move;
`;

export const StateNodeStyled = styled.div`
  border-radius: 50%;
  background-color: #e0e0e0;
  padding: 20px;
  text-align: center;
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
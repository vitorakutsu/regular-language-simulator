import styled from 'styled-components';

// Estilos do container do estado
export const StateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
  background-color: #e0e0e0;
  padding: 20px;
  text-align: center;
  cursor: move;
`;

export const StateLabel = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const TransitionButton = styled.button`
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

export const PanelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;
`;

export const Input = styled.input`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

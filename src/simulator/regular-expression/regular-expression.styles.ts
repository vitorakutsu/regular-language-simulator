import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  padding: 20px;
  font-family: Arial;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label``;

export const ResultContainer = styled.div`
  margin-top: 20px;
`;

export const ResultTitle = styled.h3``;

export const ResultList = styled.ul``;

export const ResultItem = styled.li<{ valid: boolean }>`
  color: ${({ valid }) => (valid ? 'green' : 'red')};
`;

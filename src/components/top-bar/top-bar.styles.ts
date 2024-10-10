import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-height: 100px;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: row;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
  width: 48px;
`;

export const Text = styled.h1`
  font-size: 24px;
  margin-left: 16px;
`;

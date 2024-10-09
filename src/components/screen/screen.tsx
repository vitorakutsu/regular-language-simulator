import { ReactNode } from 'react';
import { Children, Container } from './screen.styles';
import { TopBar } from '../top-bar/top-bar';

interface IScreen {
  children: ReactNode;
}

export const Screen = ({ children }: IScreen) => {
  return (
    <Container>
      <TopBar />
      <Children>{children}</Children>
    </Container>
  );
};

import { ChakraProvider } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface IWithContext {
  children: ReactNode;
}

export const WithContextProvider = ({ children }: IWithContext) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

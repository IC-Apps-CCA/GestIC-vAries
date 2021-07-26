import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../styles/theme';

interface TemplateProviderI {
  children: React.ReactNode;
}

export const TemplateContext = React.createContext({});

function TemplateProvider({ children }: TemplateProviderI) {
  return (
    <TemplateContext.Provider value={{}}>
      <ChakraProvider theme={theme}>
        <div>{children}</div>
      </ChakraProvider>
    </TemplateContext.Provider>
  );
}
export default TemplateProvider;

export const useTemplate = () => React.useContext(TemplateContext);

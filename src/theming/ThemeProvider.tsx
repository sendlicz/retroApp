import React, { useContext, createContext, ReactNode } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Theme as ThemeType } from 'react-native-paper/lib/typescript/src/types';

import { Theme } from './Theme';

interface ThemeProvider {
  theme: ThemeType;
}

const initialState: ThemeProvider = {
  theme: Theme,
};

const Context = createContext<ThemeProvider>(initialState);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <Context.Provider value={{ theme: Theme }}>
      <StatusBar style="light" />
      <PaperProvider theme={Theme}>{children}</PaperProvider>
    </Context.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(Context);

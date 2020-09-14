import { DarkTheme as PaperDarkTheme, Colors } from 'react-native-paper';
import { Theme as ThemeType, DarkTheme } from '@react-navigation/native';

import { Theme as PaperThemeType } from 'react-native-paper/lib/typescript/src/types';

const NavigationTheme: ThemeType = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.blue500,
  },
};

const Theme: PaperThemeType = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationTheme.colors,
    surface: NavigationTheme.colors.card,
    accent: NavigationTheme.dark ? 'rgb(255, 55, 95)' : 'rgb(255, 45, 85)',
  },
  roundness: 20,
};

export { Theme, NavigationTheme };

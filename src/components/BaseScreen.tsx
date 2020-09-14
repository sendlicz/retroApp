import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../theming';

interface BaseScreenProps {
  children: React.ReactNode;
}

const BaseScreen: React.FunctionComponent<BaseScreenProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default BaseScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Subheading, Paragraph } from 'react-native-paper';

interface SubSlideProps {
  description: string;
  subtitle: string;
  onAddPress: () => void;
}

export default ({ description, subtitle, onAddPress }: SubSlideProps) => {
  return (
    <View style={styles.container}>
      <Subheading style={styles.subtitle}>{subtitle}</Subheading>
      <Paragraph style={styles.description}>{description}</Paragraph>
      <Button style={styles.button} mode="contained" onPress={onAddPress}>
        {'Add'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
  },
  subtitle: {
    fontSize: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    width: 245,
    marginTop: 40,
  },
});

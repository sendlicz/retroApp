import { useWindowDimensions } from 'react-native';

export default () => {
  const { width, height } = useWindowDimensions();
  return { width, height };
};

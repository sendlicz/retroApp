import React from 'react';
import { ActivityIndicator as Base } from 'react-native-paper';

const ActivityIndicator: React.FunctionComponent = (props) => {
  return <Base size="large" {...props} />;
};

export default ActivityIndicator;

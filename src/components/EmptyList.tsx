import React from 'react';
import { List } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
interface EmptyListProps {}

const EmptyList: React.FunctionComponent<EmptyListProps> = () => {
  return (
    <List.Item
      title="Nothing to display."
      description="List is empty."
      left={(props) => (
        <List.Icon
          {...props}
          icon={(iconProps) => <FontAwesome5 {...iconProps} name="creative-commons-zero" />}
        />
      )}
    />
  );
};

export default EmptyList;

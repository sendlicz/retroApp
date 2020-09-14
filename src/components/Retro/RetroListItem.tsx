import React from 'react';
import { List } from 'react-native-paper';
import { RetroEntry } from '../../models';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface RetroListItemProps {
  item: RetroEntry;
  icon: IconSource;
}

const RetroListItem: React.FunctionComponent<RetroListItemProps> = ({ item, icon }) => {
  return (
    // <Surface>
    <List.Item left={(props) => <List.Icon {...props} icon={icon} />} title={item.content} />
    // </Surface>
  );
};

export default RetroListItem;

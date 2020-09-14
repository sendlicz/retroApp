import React from 'react';
import { Sprint } from '../../models';
import { List, Surface, IconButton } from 'react-native-paper';
import dayjs from 'dayjs';
import { Share } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export const ITEM_HEIGHT = 80;

interface SprintsListItemProps {
  item: Sprint;
  onPress: () => void;
}

const SprintsListItem: React.FunctionComponent<SprintsListItemProps> = ({ item, onPress }) => {
  const onSharePress = () => {
    Share.share({ url: `retro://me/${item.id}` });
  };
  return (
    <Surface>
      <List.Item
        onPress={onPress}
        title={item.name}
        description={`${dayjs(item.start).format('DD.MM')} - ${dayjs(item.end).format('DD.MM')}`}
        left={(props) => <List.Icon {...props} icon="bulletin-board" />}
        right={(props) => (
          <IconButton
            {...props}
            icon={(props) => <Entypo {...props} name="share" />}
            onPress={onSharePress}
          />
        )}
      />
    </Surface>
  );
};

export default SprintsListItem;

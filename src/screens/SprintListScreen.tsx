import React, { useState, useEffect, useRef } from 'react';

import { BaseScreen, ActivityIndicator, EmptyList } from '../components';
import { RootStack } from '../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSprints, ITEM_HEIGHT, Item } from '../components/Sprints';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import useDimensions from '../useDimensions';
import { Sprint } from '../models';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface MainScreenProps {
  navigation: StackNavigationProp<RootStack>;
}

const MainScreen: React.FunctionComponent<MainScreenProps> = ({ navigation }) => {
  const { sprints, loading, purge } = useSprints();
  const { width } = useDimensions();

  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    })
  );

  useEffect(() => {
    setDataProvider((old) => old.cloneWithRows(sprints));
  }, [sprints]);

  const layoutProvider = useRef(
    new LayoutProvider(
      () => 'full',
      (type, dim) => {
        dim.width = width;
        dim.height = ITEM_HEIGHT;
      }
    )
  ).current;

  const onItemPress = (sprint: Sprint) => {
    navigation.navigate('Sprint', { sprint });
  };

  const rowRenderer = (_: any, data: Sprint) => (
    <Item item={data} onPress={() => onItemPress(data)} />
  );

  const onAddPress = () => {
    navigation.navigate('AddSprint');
  };

  return (
    <BaseScreen>
      {loading ? (
        <ActivityIndicator />
      ) : sprints.length < 1 ? (
        <EmptyList />
      ) : (
        <RecyclerListView
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={rowRenderer}
        />
      )}
      <FAB style={styles.fab} icon="plus" onPress={onAddPress} />
      <FAB style={[styles.trashFab]} icon="trash-can" onPress={purge} />
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  trashFab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 70,
  },
});

export default MainScreen;

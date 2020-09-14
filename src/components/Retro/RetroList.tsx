import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import useDimensions from '../../useDimensions';
import RetroListItem from './RetroListItem';
import { RetroEntry, TableKey } from '../../models';
import EmptyList from '../EmptyList';

export const ITEM_HEIGHT = 56;

interface RetroListProps {
  entries: RetroEntry[];
  tableKey: TableKey;
}

const RetroList: React.FunctionComponent<RetroListProps> = ({ entries, tableKey }) => {
  const { width } = useDimensions();
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    })
  );

  useEffect(() => {
    setDataProvider((old) => old.cloneWithRows(entries));
  }, [entries]);

  const layoutProvider = useRef(
    new LayoutProvider(
      () => 'full',
      (type, dim) => {
        dim.width = width;
        dim.height = ITEM_HEIGHT;
      }
    )
  ).current;

  const icon = useMemo(() => {
    return tableKey === TableKey.Good
      ? 'thumb-up'
      : tableKey === TableKey.Bad
      ? 'thumb-down'
      : 'lightbulb-on';
  }, [tableKey]);

  const rowRenderer = (_: any, data: RetroEntry) => <RetroListItem item={data} icon={icon} />;

  if (entries.length < 1) {
    return <EmptyList />;
  }

  return (
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={dataProvider}
      rowRenderer={rowRenderer}
    />
  );
};

export default RetroList;

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Sprint, TableKey } from '../../models';
import { parse, stringify } from '../../JsonHelper';

const SPRINTS_KEY = 'sprints';

const id = '42A8A87A-F71C-446B-B81D-0CD16A709625';

interface Push {
  name: string;
  start: Date;
  end: Date;
}

interface SprintsProvider {
  sprints: Sprint[];
  push: ({ name, start, end }: Push) => void;
  addRetroEntry: (id: string, type: TableKey, description: string) => void;
  purge: () => void;
  loading: boolean;
}

const initialState: SprintsProvider = {
  sprints: [],
  push: () => null,
  addRetroEntry: () => null,
  purge: () => null,
  loading: true,
};

const Context = React.createContext<SprintsProvider>(initialState);

type SprintsProviderProps = {
  children: React.ReactNode;
};

export default ({ children }: SprintsProviderProps) => {
  const [sprints, setSprints] = useState(initialState.sprints);
  const [loading, setLoading] = useState(initialState.loading);

  useEffect(() => {
    resolveState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      await AsyncStorage.setItem(SPRINTS_KEY, stringify(sprints));
    };
    saveState();
  }, [sprints]);

  const resolveState = async () => {
    const resolved = await AsyncStorage.getItem(SPRINTS_KEY);
    if (resolved) {
      setSprints(parse<Sprint[]>(resolved));
    }
    setLoading(false);
  };

  const push = ({ name, start, end }: Push) => {
    setSprints([{ name, start, end, id, good: [], bad: [], todo: [] }, ...sprints]);
  };

  const addRetroEntry = (sprintId: string, type: TableKey, content: string) => {
    const arr = [...sprints];
    const item = arr.find((x) => x.id === sprintId);
    if (item) {
      const index = arr.indexOf(item);
      if (type === TableKey.Good) {
        item.good = [{ content, id: id }, ...item.good];
      } else if (type === TableKey.Bad) {
        item.bad = [{ content, id: id }, ...item.bad];
      } else if (type === TableKey.Todo) {
        item.todo = [{ content, id: id }, ...item.todo];
      }
      arr.splice(index, 1, { ...item });
    }
    setSprints(arr);
  };

  const purge = () => {
    setSprints([]);
  };

  return (
    <Context.Provider value={{ loading, sprints, push, addRetroEntry, purge }}>
      {children}
    </Context.Provider>
  );
};

export const useSprints = () => React.useContext(Context);

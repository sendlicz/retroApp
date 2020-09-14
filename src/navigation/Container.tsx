import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SprintListScreen, SprintScreen, AddSprintScreen, AddRetroEntryScreen } from '../screens';
import { NavigationTheme } from '../theming';
import { RootStack } from './RootStack';
import { TableKey } from '../models';

const Stack = createStackNavigator<RootStack>();

const resolveTitle = (tableKey: TableKey) => {
  switch (tableKey) {
    case TableKey.Bad:
      return 'To Improve';
    case TableKey.Good:
      return 'Went Well';
    case TableKey.Todo:
      return 'Action Item';
  }
};

const Container: React.FunctionComponent = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="SprintList"
          options={{ title: 'Sprints' }}
          component={SprintListScreen}
        />
        <Stack.Screen
          name="Sprint"
          options={({ route }) => ({ title: route.params?.sprint.name })}
          component={SprintScreen}
        />
        <Stack.Screen
          name="AddSprint"
          options={{ title: 'Add a new Sprint' }}
          component={AddSprintScreen}
        />
        <Stack.Screen
          name="AddRetroEntry"
          options={({ route }) => ({
            title: route.params?.tableKey ? `Add ${resolveTitle(route.params?.tableKey)}` : 'Add',
          })}
          component={AddRetroEntryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;

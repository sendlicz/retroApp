import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStack } from '../navigation';
import { BaseScreen } from '../components';
import { useSprints } from '../components/Sprints';
import { RouteProp } from '@react-navigation/native';
import { Card, TextInput, Button } from 'react-native-paper';

interface AddRetroEntryScreenProps {
  navigation: StackNavigationProp<RootStack>;
  route: RouteProp<RootStack, 'AddRetroEntry'>;
}

const AddRetroEntryScreen: React.FunctionComponent<AddRetroEntryScreenProps> = ({
  navigation,
  route,
}) => {
  const [textInput, setTextInput] = useState('');
  const { tableKey, sprintId } = route.params;
  const { addRetroEntry } = useSprints();

  const onOkPress = () => {
    addRetroEntry(sprintId, tableKey, textInput);
    navigation.goBack();
  };

  const onCancelPress = () => {
    navigation.goBack();
  };

  return (
    <BaseScreen>
      <Card>
        <Card.Content>
          <TextInput
            autoFocus
            mode="outlined"
            label="Message"
            value={textInput}
            onChangeText={setTextInput}
          />
        </Card.Content>
        <Card.Actions>
          <Button onPress={onCancelPress}>Cancel</Button>
          <Button onPress={onOkPress}>Ok</Button>
        </Card.Actions>
      </Card>
    </BaseScreen>
  );
};

export default AddRetroEntryScreen;

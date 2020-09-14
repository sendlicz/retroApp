import React, { useState, useEffect } from 'react';
import { BaseScreen, DatePicker } from '../components';
import { useSprints } from '../components/Sprints';
import { Card, Button, TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStack } from '../navigation';
import { StyleSheet } from 'react-native';
import dayjs from 'dayjs';

interface AddSprintScreenProps {
  navigation: StackNavigationProp<RootStack>;
}

const AddSprintScreen: React.FunctionComponent<AddSprintScreenProps> = ({ navigation }) => {
  const [inputName, setInputName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(dayjs().add(2, 'week').toDate());

  const { push } = useSprints();

  useEffect(() => {
    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  const onOkPress = () => {
    push({ name: inputName, start: startDate, end: endDate });
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
            label="Name"
            value={inputName}
            onChangeText={setInputName}
          />
          <DatePicker
            style={styles.button}
            label="Start"
            date={startDate}
            onDateChange={setStartDate}
          />

          <DatePicker style={styles.button} label="End" date={endDate} onDateChange={setEndDate} />
        </Card.Content>
        <Card.Actions>
          <Button onPress={onCancelPress}>Cancel</Button>
          <Button onPress={onOkPress}>Ok</Button>
        </Card.Actions>
      </Card>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});

export default AddSprintScreen;

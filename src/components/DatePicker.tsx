import React, { useState } from 'react';
import { View, StyleProp, ViewStyle, Platform } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';

import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../theming';

interface DatePickerProps {
  style?: StyleProp<ViewStyle>;
  label: string;
  date: Date;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  label,
  style,
  date,
  onDateChange,
}) => {
  const [show, setShow] = useState(false);

  const { theme } = useTheme();

  const onChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    onDateChange(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const Picker = () => (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="date"
      is24Hour={true}
      display="default"
      onChange={onChange}
      textColor={theme.colors.text}
    />
  );

  return (
    <View style={style}>
      <Button icon="calendar" mode="contained" onPress={showDatePicker}>
        {`${label} - ${dayjs(date).format('DD.MM')}`}
      </Button>
      {Platform.OS === 'ios' ? (
        <Portal>
          <Modal visible={show} onDismiss={() => setShow(false)}>
            <Picker />
          </Modal>
        </Portal>
      ) : (
        <View>{show && <Picker />}</View>
      )}
    </View>
  );
};

export default DatePicker;

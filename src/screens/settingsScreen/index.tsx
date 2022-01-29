import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getChangeTime} from '../../store/settings/selector';
import {NavigationProp} from '@react-navigation/native';
import {IRouteParamList} from '../../navigation/types';
import {changeTimeAction} from '../../store/settings/action';

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const timesUpload = [1000, 1500, 2000];

interface IPickerValue {
  pickerValue: number | string | null;
}

const {ToastKotlin, Pop} = NativeModules;

const SettingsScreen = ({navigation}: IProps) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const getUpdateTime = useSelector(getChangeTime);
  const [pickerValue, setPickerValue] = useState<number | string>(
    getUpdateTime ? getUpdateTime : 1000,
  );
  const dispatch = useDispatch();

  const updateTimeHandler = (value: number) => {
    dispatch(changeTimeAction(value));
  };

  return (
    <>
      <View style={styles.container}>
        <Text>SETTINGS SCREEN</Text>
        <View style={styles.showPicker}>
          <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
            <View style={styles.pickerHeader}>
              <Text>PICKER HANDLER</Text>
              <Text>{pickerValue && pickerValue}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {showPicker && (
          <View style={styles.picker}>
            {timesUpload.map((value, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setShowPicker(!showPicker);
                    setPickerValue(value);
                    updateTimeHandler(value);
                    ToastKotlin.show(`update time ${value}`, 5);
                    Pop.trigger('Параметр изменен', `${value}`);
                  }}>
                  <View style={styles.pickerItem}>
                    <Text> {value}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <Button title="Назад" onPress={() => navigation.goBack()} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  showPicker: {
    width: '50%',
  },

  picker: {
    borderColor: 'BLACK',
    width: '50%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    marginBottom: 5,
  },
  pickerItem: {
    borderWidth: 1,
    marginBottom: 3,
    alignItems: 'center',
  },
});
export default SettingsScreen;

import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, NativeModules} from 'react-native';
import {useDispatch} from 'react-redux';
import {setDeviceIdAction} from '../../../store/settings/action';
import CustomButton from '../Buttons/CustomButton';

const {ToastKotlin} = NativeModules;

interface LocationProps {}

const Location = (props: LocationProps) => {
  const [title, setTitle] = useState('Включить трэкинг');
  const [check, setCheck] = useState(false);
  const [deviceId, setDeviceId] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    ToastKotlin.getDeviceID((devId: string) => {
      setDeviceId(devId);
    });
  }, []);

  useEffect(() => {
    dispatch(setDeviceIdAction(deviceId));
  }, [deviceId]);

  const handleTracking = () => {
    if (!deviceId) {
      ToastKotlin.show('Нет данных об устройстве', 5000);
      return;
    }
    if (!check) {
      setTitle('Выключить трэкинг');
      ToastKotlin.startServiceLocation(deviceId);
      setCheck(!check);
    } else {
      setTitle('Включить трэкинг');
      ToastKotlin.stopServiceLocation();
      setCheck(!check);
    }
  };

  console.log(deviceId);

  return (
    <View style={styles.container}>
      <CustomButton title={title} onPress={handleTracking} />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {},
});

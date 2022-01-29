import React, {FC, useEffect, useState} from 'react';
import {Text, View, StyleSheet, NativeModules} from 'react-native';
import {useDispatch} from 'react-redux';
import {serviceName} from '../../../helpers/serviceName';
import {setDeviceIdAction} from '../../../store/settings/action';
import CustomButton from '../Buttons/CustomButton';

const {ToastKotlin} = NativeModules;

interface ILocationProps {}

const Location: FC<ILocationProps> = ({}) => {
  const [checkService, setCheckService] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [deviceId, setDeviceId] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    ToastKotlin.isServiceRunning(
      serviceName.locationServiceName,
      (checkService: boolean) => {
        setCheckService(checkService);
        checkService
          ? setTitle('Выключить трэкинг')
          : setTitle('Включить трэкинг');
      },
    );
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
    if (!checkService) {
      setTitle('Выключить трэкинг');
      ToastKotlin.startServiceLocation(deviceId);
      setCheckService(!checkService);
    } else {
      setTitle('Включить трэкинг');
      ToastKotlin.stopServiceLocation();
      setCheckService(!checkService);
    }
  };

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

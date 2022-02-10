import React, {FC, useEffect, useState} from 'react';
import {Text, View, StyleSheet, NativeModules} from 'react-native';
import {useSelector} from 'react-redux';
import {serviceName} from '../../../helpers/serviceName';
import {getAccuracy, getRemoteDeviceId} from '../../../store/settings/selector';
import CustomButton from '../Buttons/CustomButton';

const {ToastKotlin} = NativeModules;
interface IObservationProps {
  dataForTrack: {latitude: string; longitude: string};
  disabled?: boolean;
}

const Observation: FC<IObservationProps> = ({dataForTrack, disabled}) => {
  const [title, setTitle] = useState('');
  const [checkService, setCheckService] = useState<boolean>(false);
  const getAccuracyValue = useSelector(getAccuracy);
  const remoteDeviceId = useSelector(getRemoteDeviceId);

  useEffect(() => {
    console.log(getAccuracyValue);
    console.log()
    ToastKotlin.isServiceRunning(
      serviceName.observationServiceName,
      (checkService: boolean) => {
        setCheckService(checkService);
        checkService
          ? setTitle('Выключить наблюдение')
          : setTitle('Включить наблюдение');
      },
    );
  }, []);

  

  const handleObservation = () => {
    console.log(getAccuracyValue);
    if (!checkService && remoteDeviceId && getAccuracyValue) {
      setTitle('Выключить наблюдение');
      ToastKotlin.startForeGroundService(
        remoteDeviceId,
        dataForTrack.latitude,
        dataForTrack.longitude,
        getAccuracyValue
      );
      setCheckService(!checkService);
    } else {
      setTitle('Включить наблюдение');
      ToastKotlin.stopForeGroundService();
      setCheckService(!checkService);
    }
  };
  return (
    <View style={styles.container}>
      <CustomButton
        title={title}
        onPress={handleObservation}
        disabled={!disabled}
      />
    </View>
  );
};

export default Observation;

const styles = StyleSheet.create({
  container: {},
});

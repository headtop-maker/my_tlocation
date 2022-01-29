import React, {FC, useEffect, useState} from 'react';
import {Text, View, StyleSheet, NativeModules} from 'react-native';
import {useSelector} from 'react-redux';
import {getRemoteDeviceId} from '../../../store/settings/selector';
import CustomButton from '../Buttons/CustomButton';

const {ToastKotlin} = NativeModules;
interface IObservationProps {
  dataForTrack: {latitude: string; longitude: string};
  checkService: boolean;
}

const Observation: FC<IObservationProps> = ({dataForTrack, checkService}) => {
  const [title, setTitle] = useState(
    !checkService ? 'Включить наблюдение' : 'Выключить наблюдение',
  );
  const [check, setCheck] = useState<boolean>(checkService);
  const remoteDeviceId = useSelector(getRemoteDeviceId);

  const handleObservation = () => {
    console.log(dataForTrack);
    if (!check && remoteDeviceId) {
      setTitle('Выключить наблюдение');
      ToastKotlin.startForeGroundService(
        remoteDeviceId,
        dataForTrack.latitude,
        dataForTrack.longitude,
      );
      setCheck(!check);
    } else {
      setTitle('Включить наблюдение');
      ToastKotlin.stopForeGroundService();
      setCheck(!check);
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton title={title} onPress={handleObservation} />
    </View>
  );
};

export default Observation;

const styles = StyleSheet.create({
  container: {},
});

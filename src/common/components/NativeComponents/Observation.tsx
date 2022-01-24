import React, {FC, useState} from 'react';
import {Text, View, StyleSheet, NativeModules} from 'react-native';
import CustomButton from '../Buttons/CustomButton';

const {ToastKotlin} = NativeModules;
interface IObservationProps {
  dataForTrack: {latitude: string; longitude: string};
}

const Observation: FC<IObservationProps> = ({dataForTrack}) => {
  const [title, setTitle] = useState('Включить наблюдение');
  const [check, setCheck] = useState(false);

  const handleObservation = () => {
    console.log(dataForTrack);
    // if (!check) {
    //   setTitle('Выключить наблюдение');
    //   ToastKotlin.startForeGroundService();
    //   setCheck(!check);
    // } else {
    //   setTitle('Включить наблюдение');
    //   ToastKotlin.stopForeGroundService();
    //   setCheck(!check);
    // }
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

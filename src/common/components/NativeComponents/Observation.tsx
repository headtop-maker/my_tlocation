import React, {useState} from 'react';
import {Text, View, StyleSheet, NativeModules} from 'react-native';
import CustomButton from '../Buttons/CustomButton';

const {ToastKotlin} = NativeModules;
interface ObservationProps {}

const Observation = (props: ObservationProps) => {
  const [title, setTitle] = useState('Включить наблюдение');
  const [check, setCheck] = useState(false);

  const handleObservation = () => {
    if (!check) {
      setTitle('Включить наблюдение');
      ToastKotlin.startForeGroundService();
      setCheck(!check);
    } else {
      setTitle('Выключить наблюдение');
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

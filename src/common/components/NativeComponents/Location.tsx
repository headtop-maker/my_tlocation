import React, {useState} from 'react';
import {Text, View, StyleSheet, NativeModules} from 'react-native';
import CustomButton from '../Buttons/CustomButton';

const {ToastKotlin} = NativeModules;

interface LocationProps {}

const Location = (props: LocationProps) => {
  const [title, setTitle] = useState('Включить трэкинг');
  const [check, setCheck] = useState(false);

  const handleTracking = () => {
    if (!check) {
      setTitle('Включить трэкинг');
      ToastKotlin.startServiceLocation();
      setCheck(!check);
    } else {
      setTitle('Выключить трэкинг');
      ToastKotlin.stopServiceLocation();
      setCheck(!check);
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

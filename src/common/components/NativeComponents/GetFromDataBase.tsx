import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import Start from '../../icons/svg/start.svg';
const {ToastKotlin} = NativeModules;

interface IGetFromDataBaseProps {
  latitude: string;
  longitude: string;
}

const GetFromDataBase = (props: IGetFromDataBaseProps) => {
  const [seconds, setSeconds] = useState(0);
  const [startService, setStartService] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<String>('');
  const [rNdata, setRnData] = useState<IGetFromDataBaseProps>();

  useEffect(() => {
    return setStartService(false);
  }, []);

  useEffect(() => {
    if (startService) {
      setTimeout(setSeconds, 1000, seconds + 1);
      ToastKotlin.getFromDataBaseOnce(
        (data: {latitude: string; longitude: string}) => {
          setRnData(data);
        },
      );
      console.log(seconds);
    }
  }, [startService, seconds]);

  console.log(rNdata);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setStartService(!startService)}>
        <Start width={40} height={40} strokeWidth={3} stroke={'#000000'} />
      </TouchableOpacity>
    </View>
  );
};

export default GetFromDataBase;

const styles = StyleSheet.create({
  container: {},
});

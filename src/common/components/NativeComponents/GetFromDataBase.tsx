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
import Pause from '../../icons/svg/pause.svg';
const {ToastKotlin} = NativeModules;

interface IGetFromDataBaseProps {
  setRnData: (data: {latitude: string; longitude: string}) => void;
}

const GetFromDataBase = (props: IGetFromDataBaseProps) => {
  const [seconds, setSeconds] = useState(0);
  const [startService, setStartService] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<String>('');

  useEffect(() => {
    return setStartService(false);
  }, []);

  useEffect(() => {
    if (startService) {
      setTimeout(setSeconds, 1000, seconds + 1);
      ToastKotlin.getFromDataBaseOnce((data: any) => {
        props.setRnData(data);
      });
    }
  }, [startService, seconds]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setStartService(!startService)}>
        {startService ? (
          <Pause width={40} height={40} strokeWidth={3} stroke={'#000000'} />
        ) : (
          <Start width={40} height={40} strokeWidth={3} stroke={'#000000'} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GetFromDataBase;

const styles = StyleSheet.create({
  container: {},
});

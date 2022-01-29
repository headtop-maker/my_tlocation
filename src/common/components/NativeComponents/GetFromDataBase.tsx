import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import Start from '../../icons/svg/start.svg';
import Pause from '../../icons/svg/pause.svg';
import Delete from '../../icons/svg/delete.svg';
import {useSelector} from 'react-redux';
import {getRemoteDeviceId} from '../../../store/settings/selector';
const {ToastKotlin} = NativeModules;

interface IGetFromDataBaseProps {
  setGetData: (data: boolean) => void;
  setRnData: (data: {latitude: string; longitude: string}) => void;
}

const GetFromDataBase: FC<IGetFromDataBaseProps> = ({
  setGetData,
  setRnData,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [startService, setStartService] = useState<boolean>(false);
  const remoteDeviceId = useSelector(getRemoteDeviceId);

  useEffect(() => {
    return setStartService(false);
  }, []);

  useEffect(() => {
    if (startService && remoteDeviceId) {
      setTimeout(setSeconds, 1000, seconds + 1);

      ToastKotlin.getFromDataBaseOnce(
        remoteDeviceId,
        (data: {latitude: string; longitude: string}) => {
          setRnData(data);
        },
      );
    }
  }, [startService, seconds, remoteDeviceId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setStartService(!startService);
          setGetData(!startService);
        }}>
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
  container: {
    flexDirection: 'row',
  },
});

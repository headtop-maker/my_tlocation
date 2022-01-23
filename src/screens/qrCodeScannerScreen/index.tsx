import {NavigationProp} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AppRegistry,
  TouchableOpacity,
  Linking,
  NativeModules,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {useDispatch, useSelector} from 'react-redux';
import {IRouteParamList} from '../../navigation/types';
import {setRemoteDeviceIdAction} from '../../store/settings/action';
import {getRemoteDeviceId} from '../../store/settings/selector';

const {ToastKotlin} = NativeModules;

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const QrCodeScannerScreen = ({navigation}: IProps) => {
  const [reactivate, setReactivate] = useState(false);
  const [headerText, setHeaderText] = useState('');

  const dispatch = useDispatch();
  let scanner = useRef(null);

  const onSuccess = e => {
    setReactivate(false);
    ToastKotlin.getFromDataBaseOnce(e.data, (data: any) => {
      console.log(data);
      if (!data.latitude && !data.longitude) {
        setHeaderText('Данных по этому устройству нет');
      } else {
        dispatch(setRemoteDeviceIdAction(e.data));
        navigation.goBack();
      }
    });

    console.log(e.data);
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      ref={scanner}
      showMarker={true}
      vibrate={true}
      reactivate={reactivate}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>{headerText}</Text>{' '}
        </Text>
      }
      bottomContent={
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={() => setReactivate(true)}>
          <Text style={styles.buttonText}>Сканировать</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => QrCodeScannerScreen);
export default QrCodeScannerScreen;

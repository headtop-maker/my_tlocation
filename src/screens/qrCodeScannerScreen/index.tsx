import {NavigationProp} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  Text,
  StyleSheet,
  AppRegistry,
  TouchableOpacity,
  NativeModules,
  Alert,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {useDispatch} from 'react-redux';

import {rnDataType} from '../../common/components/types';
import {IRouteParamList} from '../../navigation/types';
import {setRemoteDeviceIdAction} from '../../store/settings/action';

const {ToastKotlin} = NativeModules;

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const QrCodeScannerScreen = ({navigation}: IProps) => {
  const dispatch = useDispatch();
  const scanner = useRef<any>();

  const onSuccess = e => {
    try {
      ToastKotlin.getFromDataBaseOnce(e.data, (data: rnDataType) => {
        if (
          (!data.latitude && !data.longitude)
        ) {
          Alert.alert('Предупреждение', 'Данных по этому устройству нет', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else {
          dispatch(setRemoteDeviceIdAction(e.data));
          navigation.goBack();
        }
      });
    } catch (e) {
      Alert.alert('Предупреждение', `${e}`, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <QRCodeScanner
      ref={node => {
        scanner.current = node;
      }}
      onRead={onSuccess}
      showMarker={true}
      vibrate={true}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>Отсканируйте QR устройства</Text>{' '}
        </Text>
      }
      bottomContent={
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={() => scanner.current.reactivate()}>
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

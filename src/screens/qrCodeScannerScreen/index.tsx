import {NavigationProp} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AppRegistry,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {IRouteParamList} from '../../navigation/types';

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const QrCodeScannerScreen = ({navigation}: IProps) => {
  let scanner = useRef(null);
  const onSuccess = e => {
    console.log(e.data);
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      ref={scanner}
      showMarker={true}
      vibrate={true}
      reactivate={true}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
          on your computer and scan the QR code.
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
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

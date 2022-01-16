import React, {FC} from 'react';
import {Text, StyleSheet, AppRegistry, TouchableOpacity} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';

import QRCodeScanner from 'react-native-qrcode-scanner';

interface IQrScannerScreen {
  onSuccess: (e: BarCodeReadEvent) => void;
}

const QrScannerScreen: FC<IQrScannerScreen> = ({onSuccess}) => {
  return (
    <QRCodeScanner
      onRead={onSuccess}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      // topContent={
      //   <Text style={styles.centerText}>
      //     Отсканируйте QR код вашего телефона.
      //   </Text>
      // }
      // bottomContent={
      //   <TouchableOpacity style={styles.buttonTouchable}>
      //     <Text style={styles.buttonText}>Сканировать</Text>
      //   </TouchableOpacity>
      // }
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

AppRegistry.registerComponent('default', () => QrScannerScreen);
export default QrScannerScreen;

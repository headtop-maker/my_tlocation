import * as React from 'react';
import {useEffect, useState} from 'react';

import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import Location from '../../../common/components/NativeComponents/Location';
import {getGetDeviceId} from '../../../store/settings/selector';
import Clipboard from '@react-native-clipboard/clipboard';

const {ToastKotlin} = NativeModules;

const TabServiceLocationScreen = () => {
  const deviceId = useSelector(getGetDeviceId);

  const copyToClipboard = () => {
    if (deviceId) {
      Clipboard.setString(deviceId);
      ToastKotlin.show('Текст скопирован', 500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Идентификатор устройства</Text>

      {deviceId ? (
        <View style={styles.qrData}>
          <Text>{deviceId}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text style={styles.text}>Скопировать ID</Text>
          </TouchableOpacity>
          <QRCode value={deviceId} size={200} />
        </View>
      ) : null}

      <View style={styles.body}>
        <Location />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
  },
  qrData: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#3000ff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default TabServiceLocationScreen;

// useEffect(() => () => setStartService(false), []);

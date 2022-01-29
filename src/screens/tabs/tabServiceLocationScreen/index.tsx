import * as React from 'react';
import {useEffect, useState} from 'react';

import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import Location from '../../../common/components/NativeComponents/Location';
import {getGetDeviceId} from '../../../store/settings/selector';

const TabServiceLocationScreen = () => {
  const deviceId = useSelector(getGetDeviceId);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Идентификатор устройства</Text>
      {deviceId ? (
        <View style={styles.qrData}>
          <Text>{deviceId}</Text>
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
});

export default TabServiceLocationScreen;

// useEffect(() => () => setStartService(false), []);

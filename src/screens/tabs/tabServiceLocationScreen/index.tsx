import * as React from 'react';

import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';
import Location from '../../../common/components/NativeComponents/Location';

const {ToastKotlin} = NativeModules;

const TabServiceLocationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tab Service Location Screen</Text>
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

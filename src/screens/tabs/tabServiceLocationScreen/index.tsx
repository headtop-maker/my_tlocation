import * as React from 'react';

import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';

const {ToastKotlin} = NativeModules;

const TabServiceLocationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tab Service Location Screen</Text>
      <View style={styles.body}>
        <Text>start location</Text>
        <Button
          title="Start location service"
          onPress={() => {
            ToastKotlin.startServiceLocation();
          }}
        />
        <Button
          title="Stop location service"
          onPress={() => {
            ToastKotlin.stopServiceLocation();
          }}
        />
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

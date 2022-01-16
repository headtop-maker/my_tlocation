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

const TabMapScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>MAP</Text>
        <Button
          title="Start foreground service"
          onPress={() => {
            ToastKotlin.startForeGroundService();
          }}
        />
        <Button
          title="Stop foreground service"
          onPress={() => {
            ToastKotlin.stopForeGroundService();
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
  map: {
    width: '100%',
    height: '95%',
  },
});

export default TabMapScreen;

// const reference = database().ref('/location');

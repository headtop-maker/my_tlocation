import React from 'react';

import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  NativeModules,
} from 'react-native';
const {ToastKotlin} = NativeModules;

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="kotlin start Location"
          onPress={() => {
            ToastKotlin.startServiceLocation();
          }}
        />
      </View>

      <View>
        <Button
          title="kotlin stop Location"
          onPress={() => {
            ToastKotlin.stopServiceLocation();
          }}
        />
      </View>

      <View>
        <Button
          title="kotlin start foreground"
          onPress={() => {
            ToastKotlin.startForeGroundService();
          }}
        />
      </View>

      <View>
        <Button
          title="kotlin stop foreground"
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
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

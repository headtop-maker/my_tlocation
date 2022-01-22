import * as React from 'react';

import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';
import Gmaps from '../../../common/components/Gmaps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Observation from '../../../common/components/NativeComponents/Observation';
import GetFromDataBase from '../../../common/components/NativeComponents/GetFromDataBase';

const TabMapScreen = () => {
  const initialRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.controlItems}>
          <GetFromDataBase />
          <Observation />
        </View>
        <Gmaps />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  controlItems: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default TabMapScreen;

// const reference = database().ref('/location');

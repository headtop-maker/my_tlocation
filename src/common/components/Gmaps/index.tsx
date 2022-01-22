import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

interface GmapsProps {}

const Gmaps = (props: GmapsProps) => {
  const initialRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={initialRegion}>
        <Marker coordinate={initialRegion} description="tokio region" />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  map: {
    width: '100%',
    height: '90%',
  },
});

export default Gmaps;

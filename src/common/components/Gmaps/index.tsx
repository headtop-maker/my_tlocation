import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

interface GmapsProps {
  latitude: string;
  longitude: string;
}

const Gmaps: FC<GmapsProps> = ({latitude, longitude}) => {
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    setCurrentRegion(prevState => {
      return {
        ...prevState,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
    });
  }, [latitude, longitude]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={currentRegion}>
        <Marker coordinate={currentRegion} description="current region" />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Gmaps;

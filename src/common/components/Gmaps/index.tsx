import React, {FC, useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomButton from '../Buttons/CustomButton';

interface GmapsProps {
  latitude: number;
  longitude: number;
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
        latitude: latitude,
        longitude: longitude,
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
      <View
        style={styles.leftButtons}>
        <CustomButton
          title={'+'}
          onPress={() => {
            if (currentRegion.latitudeDelta > 0.002) {
              setCurrentRegion(prevState => {
                return {
                  ...prevState,
                  latitudeDelta: prevState.latitudeDelta - 0.002,
                  longitudeDelta: prevState.longitudeDelta - 0.002,
                };
              });
            }
          }}
        />
        <CustomButton
          title={'-'}
          onPress={() => {
            if (currentRegion.latitudeDelta < 0.1) {
              setCurrentRegion(prevState => {
                return {
                  ...prevState,
                  latitudeDelta: prevState.latitudeDelta + 0.002,
                  longitudeDelta: prevState.longitudeDelta + 0.002,
                };
              });
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  map: {
    width: '100%',
    height: '100%',
  },
  leftButtons:{
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: '50%',
  }
});

export default Gmaps;

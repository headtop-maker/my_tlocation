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
import {useState} from 'react';

const TabMapScreen = () => {
  const [rNdata, setRnData] = useState<{latitude: string; longitude: string}>({
    latitude: '0.000',
    longitude: '0.000',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.controlItems}>
          <GetFromDataBase setRnData={setRnData} />
          <Observation />
        </View>
        <View>
          <Gmaps latitude={rNdata.latitude} longitude={rNdata.longitude} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlItems: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default TabMapScreen;

// const reference = database().ref('/location');

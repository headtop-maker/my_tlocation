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
import {NavigationProp} from '@react-navigation/native';
import {IRouteParamList} from '../../../navigation/types';
import SCREENS from '../../../constants/screen';
import CustomButton from '../../../common/components/Buttons/CustomButton';
import {useSelector} from 'react-redux';
import {getRemoteDeviceId} from '../../../store/settings/selector';

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const TabMapScreen = ({navigation}: IProps) => {
  const [getData, setGetData] = useState(false);
  const [rNdata, setRnData] = useState<{latitude: string; longitude: string}>({
    latitude: '0.000',
    longitude: '0.000',
  });
  const remoteDeviceId = useSelector(getRemoteDeviceId);

  return (
    <SafeAreaView style={styles.container}>
      {!remoteDeviceId ? (
        <CustomButton
          title={'сканировать qr'}
          onPress={() => navigation.navigate(SCREENS.QrCodeScanner)}
        />
      ) : (
        <>
          <View style={styles.controlItems}>
            <GetFromDataBase setRnData={setRnData} setGetData={setGetData} />
            {getData && <Observation dataForTrack={rNdata} />}
          </View>
          <View>
            <Gmaps latitude={rNdata.latitude} longitude={rNdata.longitude} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlItems: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default TabMapScreen;

// const reference = database().ref('/location');

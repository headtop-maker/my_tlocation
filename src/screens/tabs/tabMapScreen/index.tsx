import * as React from 'react';

import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Gmaps from '../../../common/components/Gmaps';
import Observation from '../../../common/components/NativeComponents/Observation';
import GetFromDataBase from '../../../common/components/NativeComponents/GetFromDataBase';
import {useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {IRouteParamList} from '../../../navigation/types';
import SCREENS from '../../../constants/screen';
import CustomButton from '../../../common/components/Buttons/CustomButton';
import {useSelector} from 'react-redux';
import {getRemoteDeviceId} from '../../../store/settings/selector';

import CurrentLocationInfo from '../../../common/components/CurrentLocationInfo';
import DeleteCurrentDevice from '../../../common/components/DeleteCurrentDevice';
import {rnDataType} from '../../../common/components/types';

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const TabMapScreen = ({navigation}: IProps) => {
  const [getData, setGetData] = useState(false);
  const [rNdata, setRnData] = useState<rnDataType>({
    latitude: '',
    longitude: '',
    battery: '',
    date: '',
  });
  const remoteDeviceId = useSelector(getRemoteDeviceId);

  return (
    <SafeAreaView style={styles.container}>
      {!remoteDeviceId ? (
        <View style={styles.qrButton}>
          <Image
            style={{width: 220, height: 300}}
            source={require('../../../common/icons/png/hanldeQR.png')}
          />
          <View>
            <CustomButton
              title={'сканировать qr'}
              onPress={() => navigation.navigate(SCREENS.QrCodeScanner)}
            />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.mapItem}>
            {rNdata.latitude && rNdata.longitude ? (
              <Gmaps latitude={rNdata.latitude} longitude={rNdata.longitude} />
            ) : null}
          </View>
          {getData && (
            <CurrentLocationInfo
              latitude={rNdata.latitude}
              longitude={rNdata.longitude}
              date={rNdata.date}
              battery={rNdata.battery}
            />
          )}
          <View style={styles.controlItems}>
            <GetFromDataBase setRnData={setRnData} setGetData={setGetData} />
            <Observation dataForTrack={rNdata} disabled={getData} />
            <DeleteCurrentDevice getData={getData} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc1c',
  },
  controlItems: {
    width: '97%',
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#3a3a3ab0',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapItem: {
    width: '97%',
    height: '70%',
    marginTop: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#d0d0d01c',
    elevation: 4,
  },
  qrButton: {
    flex: 1,
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
  },
});

export default TabMapScreen;

// const reference = database().ref('/location');

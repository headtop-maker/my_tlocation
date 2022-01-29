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
import Observation from '../../../common/components/NativeComponents/Observation';
import GetFromDataBase from '../../../common/components/NativeComponents/GetFromDataBase';
import {useEffect, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {IRouteParamList} from '../../../navigation/types';
import SCREENS from '../../../constants/screen';
import CustomButton from '../../../common/components/Buttons/CustomButton';
import {useSelector} from 'react-redux';
import {getRemoteDeviceId} from '../../../store/settings/selector';
import {serviceName} from '../../../helpers/serviceName';

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}
const {ToastKotlin} = NativeModules;

const TabMapScreen = ({navigation}: IProps) => {
  const [getData, setGetData] = useState(false);
  const [checkService, setCheckService] = useState<boolean>(false);
  const [rNdata, setRnData] = useState<{latitude: string; longitude: string}>({
    latitude: '',
    longitude: '',
  });
  const remoteDeviceId = useSelector(getRemoteDeviceId);

  useEffect(() => {
    ToastKotlin.isServiceRunning(
      serviceName.observationServiceName,
      (checkService: boolean) => {
        setCheckService(checkService);
      },
    );
  }, [checkService]);

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
            {getData && (
              <Observation dataForTrack={rNdata} checkService={checkService} />
            )}
          </View>
          <View>
            {rNdata.latitude && rNdata.longitude ? (
              <Gmaps latitude={rNdata.latitude} longitude={rNdata.longitude} />
            ) : null}
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

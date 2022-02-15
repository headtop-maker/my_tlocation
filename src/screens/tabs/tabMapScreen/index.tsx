import * as React from 'react';

import {
  SafeAreaView,
  StyleSheet,
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
import {useDispatch, useSelector} from 'react-redux';
import {
  getRemoteDeviceId,
  getShowInputModal,
} from '../../../store/settings/selector';

import CurrentLocationInfo from '../../../common/components/CurrentLocationInfo';
import DeleteCurrentDevice from '../../../common/components/DeleteCurrentDevice';
import ModalWrapper from '../../../common/components/ModalWrapper';
import {rnDataType} from '../../../common/components/types';
import {setShowInputModalAction} from '../../../store/settings/action';

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const TabMapScreen = ({navigation}: IProps) => {
  const [getData, setGetData] = useState(false);
  const [RNdata, setRnData] = useState<rnDataType>({
    latitude: 0,
    longitude: 0,
    battery: '',
    date: '',
  });
  const remoteDeviceId = useSelector(getRemoteDeviceId);
  const isShowModal = useSelector(getShowInputModal);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      {!remoteDeviceId ? (
        <View style={styles.qrButton}>
          

          <View style={styles.getIdButtons}>
            <View>
            <Image
            style={{width: 220, height: 300}}
            source={require('../../../common/icons/png/hanldeQR.png')}
          /> 
            </View>
          <View>
            <CustomButton
              title={'сканировать qr'}
              onPress={() => navigation.navigate(SCREENS.QrCodeScanner)}
            />
          </View>
         <View>
              <CustomButton
              title={'Ввести вручную'}
              onPress={() => dispatch(setShowInputModalAction(true))}
            />
             <ModalWrapper isShow={isShowModal} />
        </View>

           
          </View>

        </View>
      ) : (
        <>
          <View style={styles.mapItem}>
            {RNdata.latitude && RNdata.longitude ? (
              <Gmaps latitude={RNdata.latitude} longitude={RNdata.longitude} />
            ) : null}
          </View>
          {getData && (
            <CurrentLocationInfo
              latitude={RNdata.latitude}
              longitude={RNdata.longitude}
              date={RNdata.date}
              battery={RNdata.battery}
            />
          )}
          <View style={styles.controlItems}>
            <GetFromDataBase setRnData={setRnData} setGetData={setGetData} />
            <Observation dataForTrack={RNdata} disabled={getData} />
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
  getIdButtons:{flex:0.6, height:'50%', flexDirection:'column',justifyContent:'space-around'}
});

export default TabMapScreen;

// const reference = database().ref('/location');

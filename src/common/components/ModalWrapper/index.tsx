import React, {FC, useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  setRemoteDeviceIdAction,
  setShowInputModalAction,
} from '../../../store/settings/action';
import {rnDataType} from '../types';

interface IModalWrapperProps {
  isShow: boolean;
}

const {ToastKotlin} = NativeModules;

const ModalWrapper: FC<IModalWrapperProps> = ({isShow}) => {
  const dispatch = useDispatch();
  const [devId, setDevId] = useState('');
  useEffect(() => {
    return () => {
      setDevId('');
      dispatch(setShowInputModalAction(false));
    };
  }, []);

  const handleCode = () => {
    ToastKotlin.getFromDataBaseOnce(devId, (data: rnDataType) => {
      console.log(data);
      if (
        (!data.latitude && !data.longitude) ||
        (data.latitude === 'null' && data.longitude === 'null')
      ) {
        Alert.alert('Предупреждение', 'Данных по этому устройству нет', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        dispatch(setRemoteDeviceIdAction(devId));
        dispatch(setShowInputModalAction(false));
      }
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={isShow}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Введите ID:</Text>
            <TextInput
              placeholder="device id"
              style={styles.input}
              onChangeText={setDevId}
              value={devId}
            />
            <View style={styles.bottonBlock}>
              <TouchableOpacity
                disabled={!devId}
                style={[styles.button, styles.buttonOpen]}
                onPress={handleCode}>
                <Text style={styles.textStyle}>ОК</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => dispatch(setShowInputModalAction(false))}>
                <Text style={styles.textStyle}>ОТМЕНА</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  container: {},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottonBlock: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '45%',
  },
  buttonOpen: {
    backgroundColor: '#30a14e',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 5,
    borderColor: '#5c6773bd',
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
  },
});

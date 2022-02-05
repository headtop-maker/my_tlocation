import React, {FC} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Delete from '../../../common/icons/svg/delete.svg';
import {setRemoteDeviceIdAction} from '../../../store/settings/action';

interface IDeleteCurrentDeviceProps {
  getData: boolean;
}

const {ToastKotlin} = NativeModules;
const DeleteCurrentDevice: FC<IDeleteCurrentDeviceProps> = ({getData}) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    Alert.alert('Предупреждение', 'Вы действиетельно хотите удалить ?', [
      {
        text: 'Отмена',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          ToastKotlin.stopForeGroundService();
          dispatch(setRemoteDeviceIdAction(''));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={getData} onPress={deleteHandler}>
        <Delete
          width={40}
          height={40}
          strokeWidth={2}
          stroke={getData ? '#C0C0C0' : '#000000'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteCurrentDevice;

const styles = StyleSheet.create({
  container: {},
});

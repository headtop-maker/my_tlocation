import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  NativeModules,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Gmaps from '../../common/components/Gmaps';
import SCREENS from '../../constants/screen';
import {IRouteParamList} from '../../navigation/types';
import {
  setDeviceIdAction,
  setRemoteDeviceIdAction,
} from '../../store/settings/action';

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const MainScreen = ({navigation}: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text>Main Container</Text>

        <Button
          title="Navigate TabScreen"
          onPress={() => navigation.navigate(SCREENS.TabScreen)}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '50%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginBottom: 10,
  },
});

export default MainScreen;

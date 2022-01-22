import {NavigationProp} from '@react-navigation/native';
import * as React from 'react';

import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  NativeModules,
} from 'react-native';
import Gmaps from '../../common/components/Gmaps';
import SCREENS from '../../constants/screen';
import {IRouteParamList} from '../../navigation/types';

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const {ShortMethods} = NativeModules;
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

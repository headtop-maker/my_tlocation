import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';


import {
  Button, ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomButton from '../../common/components/Buttons/CustomButton';
import SCREENS from '../../constants/screen';
import {IRouteParamList} from '../../navigation/types';

interface IProps {
  navigation: NavigationProp<IRouteParamList>;
}

const MainScreen = ({navigation}: IProps) => {

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground source= {require('../../common/images/travel.jpg')} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>

        <Text>Main Container</Text>
    
      <CustomButton
        title={'Войти '}
        onPress={() => navigation.navigate(SCREENS.TabScreen)}

      />

      </SafeAreaView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center"
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

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from '../../screens/mainScreen';
import TabScreen from '../../screens/tabScreen';
import SCREENS from '../../constants/screen';
import SettingsScreen from '../../screens/settingsScreen';
import QrCodeScannerScreen from '../../screens/qrCodeScannerScreen';
import {View} from 'react-native';
import {Text} from 'react-native-svg';

const Stack = createNativeStackNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREENS.MainScreen} component={MainScreen} />
        <Stack.Screen name={SCREENS.TabScreen} component={TabScreen} />
        <Stack.Screen
          name={SCREENS.SettingsScreen}
          component={SettingsScreen}
        />
        <Stack.Group screenOptions={{headerShown: true}}>
          <Stack.Screen
            name={SCREENS.QrCodeScanner}
            component={QrCodeScannerScreen}
            options={{title: 'Сканер'}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;

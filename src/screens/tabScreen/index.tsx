import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabMapScreen from '../tabs/tabMapScreen';
import TabServiceLocationScreen from '../tabs/tabServiceLocationScreen';
import TAB_SCREENS from '../../constants/tabscreens';
import {TouchableOpacity, View} from 'react-native';

import SCREENS from '../../constants/screen';
import {NavigationProp} from '@react-navigation/native';
import {IRouteParamList} from '../../navigation/types';

interface ITabProps {
  navigation: NavigationProp<IRouteParamList>;
}

const Tab = createBottomTabNavigator();
const TabScreen = ({navigation}: ITabProps) => {
  const SettingsHandler = () => {
    return (
      <View style={{marginRight: 20}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(SCREENS.SettingsScreen)
          }></TouchableOpacity>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          borderRadius: 50,
          elevation: 4,
          position: 'absolute',
          margin: 10,
        },
        tabBarItemStyle: {
          margin: 5,
          borderRadius: 50,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={TAB_SCREENS.TabMapScreen}
        component={TabMapScreen}
        options={{
          title: 'Карта',
          headerRight: () => {
            return <SettingsHandler />;
          },
        }}
      />
      <Tab.Screen
        name={TAB_SCREENS.TabServiceLocationScreen}
        component={TabServiceLocationScreen}
        options={{
          title: 'Включить наблюдение',
          headerRight: () => {
            return <SettingsHandler />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;

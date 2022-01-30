import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface ICurrentLocationInfoProps {
  latitude: string;
  longitude: string;
}

const CurrentLocationInfo: FC<ICurrentLocationInfoProps> = ({
  latitude,
  longitude,
}) => {
  return (
    <View
      style={{
        width: '97%',
        padding: 5,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: '#3a3a3ab0',
        marginTop: 10,
        borderRadius: 5,
        elevation: 4,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={{fontWeight: 'bold'}}>Широта: {latitude}</Text>
        <Text style={{fontWeight: 'bold'}}>Долгота:{longitude}</Text>
      </View>
      <View>
        <Text style={{fontWeight: 'bold'}}>Скорость:</Text>
        <Text style={{fontWeight: 'bold'}}>Заряд батареи:</Text>
      </View>
    </View>
  );
};

export default CurrentLocationInfo;

const styles = StyleSheet.create({
  container: {},
});

import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {rnDataType} from "../types";

interface ICurrentLocationInfoProps extends rnDataType{}

const CurrentLocationInfo: FC<ICurrentLocationInfoProps> = ({
  latitude,
  longitude,
  date,
  battery,
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
        <Text style={{fontWeight: 'bold'}}>Заряд:{battery}%</Text>
        <Text style={{fontWeight: 'bold'}}>Дата:{date}</Text>
      </View>
    </View>
  );
};

export default CurrentLocationInfo;

const styles = StyleSheet.create({
  container: {},
});

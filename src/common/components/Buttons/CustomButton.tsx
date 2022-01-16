import React, {FC} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
}

const CustomButton: FC<CustomButtonProps> = ({onPress, title}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#6f0490',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default CustomButton;

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AppColors} from '../utilities/Globals';

export default function CheckBox({checked,onPress}) {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: checked ? AppColors.primary : AppColors.white,borderWidth: checked ? 0 : 1,},
      ]}>
      {checked ? (
        <MaterialIcons name="check" size={12} color={'white'} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 18,
    width: 18,
    borderColor: AppColors.blackLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight:10
  },
});

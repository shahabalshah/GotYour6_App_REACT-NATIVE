import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  AppColors,
  AppFonts,
  FontSize,
  MAIN_CARDWIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../utilities/Globals';
import PrimaryText from './PrimaryText';
import {AppStrings} from '../utilities/AppStrings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BoldText from './BoldText';

export default function PhoneNumTextInput({
  onChangeText,
  phoneCode,
  customStyles,
  customLabelStyle,
  countryFlag,
  onPressCode
}) {
  return (
    <View style={[styles.container, customStyles]}>
      <PrimaryText
        text={AppStrings.phoneNumber}
        customStyles={[
          {
            fontSize: FontSize.small,
            marginTop: 5,
            color: AppColors.primary,
            marginLeft: 5,
            marginBottom: 0,
          },
          customLabelStyle,
        ]}
      />
      <TouchableOpacity
      onPress={onPressCode}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRightWidth: 0.5,
          height: WINDOW_HEIGHT * 0.045,
          borderRightColor: AppColors.blackLight,
          width: WINDOW_WIDTH * 0.25,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize:FontSize.big,paddingLeft:3}}></Text>
        <BoldText text={`${countryFlag}${phoneCode}`} />
        <Icon name="keyboard-arrow-down" size={16} color={AppColors.black} />
      </TouchableOpacity>
      <TextInput
        onChangeText={onChangeText}
        style={{
          marginLeft: 5,
          width: MAIN_CARDWIDTH * 0.65,
          marginBottom: 0,
          backgroundColor: 'transparent',
          fontFamily: AppFonts.bold,
          height: WINDOW_HEIGHT * 0.081,
          position: 'absolute',
          transform: [
            {translateY: WINDOW_HEIGHT * 0.02},
            {translateX: WINDOW_WIDTH * 0.25},
          ],
        }}
        keyboardType="phone-pad"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: MAIN_CARDWIDTH,
    height: WINDOW_HEIGHT * 0.09,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.primary,
    alignItems: 'flex-start',
    marginBottom: WINDOW_HEIGHT * 0.03,
  },
});

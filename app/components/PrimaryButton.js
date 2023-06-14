import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryText from './PrimaryText';
import {
  AppColors,
  AppFonts,
  FontSize,
  MAIN_CARDWIDTH,
  WINDOW_HEIGHT,
} from '../utilities/Globals';
import {AppStrings} from '../utilities/AppStrings';

export default function PrimaryButton({
  text,
  onPress,
  customStyles,
  topGradientColor,
  bottomGradientColor,
  customTextStyle,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[
          topGradientColor ? topGradientColor : '#0EE1F4',
          bottomGradientColor ? bottomGradientColor : '#27AAE1',
        ]}
        style={[styles.linearGradient, customStyles]}>
        <PrimaryText
          text={text}
          customStyles={[
            {
              color: AppColors.white,
              fontSize: FontSize.normal,
              fontFamily: AppFonts.medium,
            },
            customTextStyle,
          ]}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: MAIN_CARDWIDTH,
    height: WINDOW_HEIGHT * 0.07,
    borderRadius: 10,
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: WINDOW_HEIGHT*0.02,
  },
});

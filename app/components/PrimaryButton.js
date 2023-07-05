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
import Lottie from 'lottie-react-native';
import { LOADING } from '../assets/LottieAnimations';

export default function PrimaryButton({
  text,
  onPress,
  customStyles,
  topGradientColor,
  bottomGradientColor,
  customTextStyle,
  loading
}) {
  return (
    <>
    {!loading?
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[
          topGradientColor ? topGradientColor : '#0EE1F4',
          bottomGradientColor ? bottomGradientColor : '#00004D',
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
    </TouchableOpacity>:
    <View style={[styles.linearGradient,customStyles,{backgroundColor:AppColors.blackLight}]}>
      <Lottie
          source={LOADING}
          autoPlay
          loop
          style={{width: 100, height: 100}}
        />
    </View>
    }
    </>
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

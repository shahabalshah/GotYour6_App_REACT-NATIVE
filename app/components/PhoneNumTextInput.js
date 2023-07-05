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
  onPressCode,
}) {
  const [isFocused, setisFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {borderColor: isFocused ? AppColors.primary : AppColors.darkBlue},
        customStyles,
      ]}>
      <PrimaryText
        text={AppStrings.phoneNumber}
        customStyles={[
          {
            fontSize: FontSize.small,
            marginTop: 5,
            color: isFocused ? AppColors.primary : AppColors.darkBlue,
            marginLeft: 5,
            marginBottom: 0,
            position:'absolute',
            backgroundColor:'white',
            paddingHorizontal:10,
            transform: [
              {translateY: -WINDOW_HEIGHT * 0.016},
              {translateX: WINDOW_WIDTH*0.02}
            ],
          },
          customLabelStyle,
        ]}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: WINDOW_WIDTH * 0.2,
          justifyContent: 'center',
          height:WINDOW_HEIGHT*0.07,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
         }}
          onPress={onPressCode}>
          <BoldText text={`${countryFlag}${phoneCode}`} />
          <Icon name="keyboard-arrow-down" size={16} color={AppColors.black} />
        </TouchableOpacity>
        <View
        style={{borderRightWidth: 0.5,
          borderRightColor: AppColors.blackLight,height:WINDOW_HEIGHT*0.035,marginLeft:5}}
        />
      </View>
      <TextInput
        onChangeText={onChangeText}
        onFocus={() => {
          setisFocused(true);
        }}
        onBlur={() => {
          setisFocused(false);
        }}
        style={{
          marginLeft: 5,
          width: MAIN_CARDWIDTH * 0.65,
          marginBottom: 0,
          backgroundColor: 'transparent',
          fontFamily: AppFonts.bold,
          height: WINDOW_HEIGHT * 0.081,
          position: 'absolute',
          color: AppColors.black,
          transform: [
            // {translateY: WINDOW_HEIGHT * 0.0075},
            {translateX: WINDOW_WIDTH * 0.18},
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
    height: WINDOW_HEIGHT * 0.07,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'flex-start',
    marginVertical: 12,
  },
});

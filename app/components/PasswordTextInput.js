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
} from '../utilities/Globals';
import PrimaryText from './PrimaryText';
import {AppStrings} from '../utilities/AppStrings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PasswordTextInput({onChangeText}) {
  const [hidden, sethidden] = useState(true);
  return (
    <View style={styles.container}>
      <PrimaryText
        text={AppStrings.password}
        customStyles={{
          fontSize: FontSize.small,
          marginTop: 5,
          color: AppColors.primary,
          marginLeft: 5,
          marginBottom: 0,
        }}
      />

      <TextInput
        onChangeText={onChangeText}
        style={{
          marginLeft: 5,
          width: MAIN_CARDWIDTH * 0.9,
          marginBottom: 0,
          backgroundColor: 'transparent',
          height: WINDOW_HEIGHT * 0.075,
          position: 'absolute',
          fontFamily: AppFonts.bold,
          transform: [{translateY: WINDOW_HEIGHT * 0.02}],
        }}
        keyboardType="default"
        secureTextEntry={hidden}
      />
        <View style={{height:WINDOW_HEIGHT * 0.09,alignItems:'center',justifyContent:'center',marginRight:15}}>
        <TouchableOpacity onPress={() => sethidden(!hidden)}>
          {!hidden ? (
            <Icon name="eye" color={AppColors.blackLight} size={24} />
          ) : <Icon name="eye-off" color={AppColors.blackLight} size={24} />}
        </TouchableOpacity>
        </View>
      
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
    justifyContent:'space-between',
    flexDirection:'row'
  },
});

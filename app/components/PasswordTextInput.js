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
  WINDOW_WIDTH
} from '../utilities/Globals';
import PrimaryText from './PrimaryText';
import {AppStrings} from '../utilities/AppStrings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PasswordTextInput({onChangeText}) {
  const [hidden, sethidden] = useState(true);
  const [isFocused, setisFocused] = useState(false)
  return (
    <View style={[styles.container,{borderColor:isFocused?AppColors.primary :AppColors.darkBlue}]}>
      <PrimaryText
        text={'Crypto Key'}
        customStyles={{
          fontSize: FontSize.small,
          marginTop: 5,
          color: isFocused?AppColors.primary :AppColors.darkBlue,
          marginLeft: 5,
          marginBottom: 0,
          position:'absolute',
          backgroundColor:'white',
          paddingHorizontal:10,
          transform: [
            {translateY: -WINDOW_HEIGHT * 0.016},
            {translateX: WINDOW_WIDTH*0.02}
          ],
        }}
      />

      <TextInput
        onChangeText={onChangeText}
        onFocus={()=>setisFocused(true)}
        onBlur={()=>setisFocused(false)}
        style={{
          marginLeft: 5,
          width: MAIN_CARDWIDTH * 0.9,
          marginBottom: 0,
          backgroundColor: 'transparent',
          height: WINDOW_HEIGHT * 0.075,
          // position: 'absolute',
          fontFamily: AppFonts.bold,
          // transform: [{translateY: WINDOW_HEIGHT * 0.01},],
          color:AppColors.black
        }}
        keyboardType="default"
        secureTextEntry={hidden}
      />
        <View style={{height:WINDOW_HEIGHT * 0.07,alignItems:'center',justifyContent:'center',paddingRight:30}}>
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
    height: WINDOW_HEIGHT * 0.07,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.darkBlue,
    alignItems: 'flex-start',
    justifyContent:'space-between',
    flexDirection:'row',
    marginVertical:12
  },
});

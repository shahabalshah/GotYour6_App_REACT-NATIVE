import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React,{useState} from 'react';
import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  MAIN_CARDWIDTH,
  AppColors,
  FontSize,
  AppFonts,
} from '../utilities/Globals';
import PrimaryText from './PrimaryText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SecondaryInput({
  text,
  keyboardType,
  onChangeText,
  editable,
  value,
  placeholderTextColor,
  textInputColor,
  onPressCopy,
  maxLength,
  customLabelStyle
}) {
  const [isFocused, setisFocused] = useState(false)
  console.log('WINDOW_HEIGHT', WINDOW_HEIGHT*0.01)
  return (
    <View style={[styles.container,{borderColor: isFocused ? AppColors.primary : AppColors.darkBlue}]}>
      <PrimaryText
        text={text}
        customStyles={[{
          fontSize: FontSize.small,
          marginTop: 5,
          color: isFocused ? AppColors.primary : AppColors.darkBlue,
          marginLeft: 5,
          marginBottom: 0,
          position:'absolute',
          paddingHorizontal:10,
          backgroundColor:'white',
          transform: [
            {translateY: -WINDOW_HEIGHT * 0.016},
            {translateX: WINDOW_WIDTH*0.02}
          ],
        },customLabelStyle]}
      />
      <TextInput
        onChangeText={onChangeText}
        editable={editable}
        onFocus={()=>setisFocused(true)}
        onBlur={()=>setisFocused(false)}
        style={{
          marginLeft: 5,
          width: MAIN_CARDWIDTH * 0.9,
          marginBottom: 0,
          backgroundColor: 'transparent',
          height: WINDOW_HEIGHT * 0.075,
          // position: 'absolute',
          // transform: [{translateY: WINDOW_HEIGHT * 0.01}],
          color: textInputColor ? textInputColor : '#000',
          fontFamily: AppFonts.medium,
        }}
        keyboardType={keyboardType}
        value={value}
        placeholderTextColor={placeholderTextColor}
        maxLength={maxLength}
      />
      {onPressCopy ? (
        <View
          style={{
            marginLeft: WINDOW_WIDTH * 0.73,
            height: WINDOW_HEIGHT * 0.07,
            position:'absolute',
            alignItems:'center',
            justifyContent:'center',
            marginHorizontal:12
          }}>
          <TouchableOpacity
            onPress={onPressCopy}
            style={{
              padding: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="content-copy" size={24} color={AppColors.blackLight} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: MAIN_CARDWIDTH,
    height: WINDOW_HEIGHT * 0.07,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.blackExtraLight,
    alignItems: 'flex-start',
    marginVertical:12
  },
});

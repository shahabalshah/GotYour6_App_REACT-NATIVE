import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
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
}) {
  return (
    <View style={styles.container}>
      <PrimaryText
        text={text}
        customStyles={{
          fontSize: FontSize.small,
          marginTop: 5,
          color: AppColors.blackLight,
          marginLeft: 5,
          marginBottom: 0,
        }}
      />
      <TextInput
        onChangeText={onChangeText}
        editable={editable}
        style={{
          marginLeft: 5,
          width: MAIN_CARDWIDTH * 0.9,
          marginBottom: 0,
          backgroundColor: 'transparent',
          height: WINDOW_HEIGHT * 0.075,
          position: 'absolute',
          transform: [{translateY: WINDOW_HEIGHT * 0.02}],
          color: textInputColor ? textInputColor : '#000',
          fontFamily: AppFonts.medium,
        }}
        keyboardType={keyboardType}
        value={value}
        placeholderTextColor={placeholderTextColor}
      />
      {onPressCopy ? (
        <View
          style={{
            marginLeft: WINDOW_WIDTH * 0.73,
            height: WINDOW_HEIGHT * 0.09,
            position:'absolute',
            alignItems:'center',
            justifyContent:'center'
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
    height: WINDOW_HEIGHT * 0.09,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.blackExtraLight,
    alignItems: 'flex-start',
    marginBottom: WINDOW_HEIGHT * 0.01,
  },
});

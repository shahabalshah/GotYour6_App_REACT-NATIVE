import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors, WINDOW_HEIGHT, WINDOW_WIDTH} from '../utilities/Globals';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MediumText from './MediumText';

export default function Header({title, onBackPress,customTextStyles,iconColor,customStyles}) {
  return (
    <View style={[styles.container,customStyles]}>
      <TouchableOpacity style={styles.icon} onPress={onBackPress}>
        <MaterialIcons
        color={iconColor ? iconColor : AppColors.black}
        name='arrow-back-ios'
        size={18}
        />
      </TouchableOpacity>
      <MediumText text={title} customStyles={[{color:AppColors.black},customTextStyles]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    alignItems: 'center',
    justifyContent:'center',
    height:WINDOW_HEIGHT*0.065,
    borderBottomColor:AppColors.blackExtraLight,
    borderBottomWidth:1,
    backgroundColor:'white'
  },
  icon:{
    position:'absolute',
    transform:[
        {translateX: -WINDOW_WIDTH*0.38},
    ]
  }
});

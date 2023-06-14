import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FACEBOOK_ICON, GOOGLE_ICON } from '../assets'
import { AppColors, WINDOW_WIDTH } from '../utilities/Globals'

export default function SocialButtons({onPress,type,customStyle}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container,customStyle]}>
      <Image
      source={type == 'facebook' ? FACEBOOK_ICON : GOOGLE_ICON} 
      style={{width:30,height:30,resizeMode:'contain'}}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.secondary,
        height:WINDOW_WIDTH*0.15,
        width:WINDOW_WIDTH*0.15,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    }
})
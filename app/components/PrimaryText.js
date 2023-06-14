import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors, AppFonts, FontSize } from '../utilities/Globals'

export default function PrimaryText({text,customStyles}) {
  return (
    <View>
      <Text style={[{fontFamily:AppFonts.regular,color:AppColors.black,fontSize:FontSize.normal},customStyles]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
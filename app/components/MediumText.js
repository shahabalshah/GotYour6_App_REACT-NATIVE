import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors, AppFonts } from '../utilities/Globals'

export default function MediumText({text,customStyles,numberOfLines}) {
  return (
    <View>
      <Text style={[{fontFamily:AppFonts.medium,color:AppColors.black},customStyles]}
      numberOfLines={numberOfLines}
      >{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
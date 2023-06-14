import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors, AppFonts } from '../utilities/Globals'

export default function MediumText({text,customStyles}) {
  return (
    <View>
      <Text style={[{fontFamily:AppFonts.medium,color:AppColors.black},customStyles]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
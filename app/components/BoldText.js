import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors, AppFonts } from '../utilities/Globals'

export default function BoldText({text,customStyles}) {
  return (
    <View>
      <Text style={[{fontFamily:AppFonts.bold,color:AppColors.black},customStyles]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { AppColors, FontSize, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utilities/Globals'
import PrimaryText from './PrimaryText'

export default function HomeFloatingIcon({source,text,onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
      style={styles.image}
      source={source}
      />
      <PrimaryText
      text={text}
      customStyles={styles.textStyle}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    height:WINDOW_WIDTH*0.165,
    width:WINDOW_WIDTH*0.165,
    borderRadius:WINDOW_WIDTH*0.165/2,
    backgroundColor:AppColors.white,
    alignItems:'center',
    justifyContent:'center',
    elevation:8,
    marginBottom:WINDOW_HEIGHT*0.01
  },
  image:{
    resizeMode:'contain',
    height:WINDOW_WIDTH*0.05,
    width:WINDOW_WIDTH*0.05,
  },
  textStyle:{
    color:AppColors.black,
    fontSize:FontSize.small,
    textAlign:'center'
  }
})
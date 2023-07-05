import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import SafeView from '../components/SafeView'
import { AppColors, FontSize, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utilities/Globals'
import { WATCH } from '../assets'
import MediumText from '../components/MediumText'
import { AppStrings } from '../utilities/AppStrings'
import PrimaryButton from '../components/PrimaryButton'

export default function ConnectWatch(props) {
  return (
   <SafeView>
    <View style={styles.container}>
        <MediumText
        text={AppStrings.almostThere}
        customStyles={styles.text}
        />
        <Image
        source={WATCH}
        style={styles.watchContainer}
        />
        <PrimaryButton
        text={'Continue'}
        onPress={()=>props.navigation.navigate('ScanWatch')}
        />
    </View>
   </SafeView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:AppColors.white,
    },
    watchContainer:{
        width:WINDOW_WIDTH*0.6,
        height:WINDOW_WIDTH*0.6,
        resizeMode:'contain',
        marginBottom:WINDOW_HEIGHT*0.05
    },
    text:{
        textAlign:'center',
        fontSize:FontSize.big,
        color:AppColors.black,
        marginVertical:WINDOW_HEIGHT*0.1
    }
})
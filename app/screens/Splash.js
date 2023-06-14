import { StyleSheet, Text, View,Image,StatusBar } from 'react-native'
import React,{useEffect} from 'react'
import { LOGO } from '../assets'




export default function Splash(props) {
    const navHandler = ()=>{
        setTimeout(()=>{
            props.navigation.navigate('AuthNavigationHandler')
        },3000)
    }
    useEffect(() => {
      navHandler()
    }, [])
    
  return (
    <View style={styles.container}>
        <StatusBar
        barStyle = "dark-content"
        backgroundColor={'#FFF'}
        />
      <Image
      source={LOGO}
      style={styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    logo:{
        width:200,
        height:200,
        resizeMode:'contain'
    }
})
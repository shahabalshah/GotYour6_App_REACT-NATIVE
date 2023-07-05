import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Router from './app/router/Router';
import Mapbox from '@rnmapbox/maps';
import AppContext from './app/utilities/AppContext';
import Toast from 'react-native-toast-message';
import MediumText from './app/components/MediumText';
import PrimaryText from './app/components/PrimaryText';
import BoldText from './app/components/BoldText';
import {AppColors, MAIN_CARDWIDTH} from './app/utilities/Globals';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Mapbox.setWellKnownTileServer('Mapbox')
Mapbox.setAccessToken(
  'pk.eyJ1IjoibXVqdGFiYXhhaWRpIiwiYSI6ImNsamM0dmRpNTB1YzczcXFoejk4bzBqNHgifQ.Q5yGuuwq0Q6ebq5-ljNRrA',
);

const toastConfig = {
  tomatoToast: ({text1, text2}) => (
    <View
      style={{
        height: 60,
        width: MAIN_CARDWIDTH,
        backgroundColor: AppColors.primary,
        borderRadius: 10,
        padding: 10,
      }}>
        
      <BoldText text={text1} customStyles={{color:AppColors.black}}/>
   
      <PrimaryText text={text2} customStyles={{color:AppColors.white}}/>
    </View>
  ),
  errorToast: ({text1, text2}) => (
    <View
      style={{
        height: 60,
        width: MAIN_CARDWIDTH,
        backgroundColor: '#FF9494',
        borderRadius: 10,
        padding: 10,
      }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <View style={{borderWidth:1.5,borderRadius:20,padding:2,marginRight:5,borderColor:'red'}}>
          <Icon
          name="window-close"
          size={14}
          color={'red'}
          />
          </View>
      <BoldText text={text1} customStyles={{color:'red'}}/>
      </View>
      <PrimaryText text={text2} customStyles={{color:AppColors.white}}/>
    </View>
  ),
};

export default function App() {
  const [Language, setLanguage] = useState('en');
  const [DeviceId, setDeviceId] = useState(null);
  const [UserData, setUserData] = useState(null);
  return (
    <AppContext.Provider
      value={{
        Language,
        setLanguage,
        DeviceId,
        setDeviceId,
        UserData,
        setUserData,
      }}>
      <Router />
      <Toast config={toastConfig} position="bottom" visibilityTime={5000}/>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({});

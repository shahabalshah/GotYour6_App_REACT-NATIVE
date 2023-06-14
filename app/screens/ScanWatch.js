import {Alert, StyleSheet, Dimensions, View} from 'react-native';
import React, {useState,useContext,useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {AppColors, WINDOW_HEIGHT, WINDOW_WIDTH} from '../utilities/Globals';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryText from '../components/PrimaryText';
import MediumText from '../components/MediumText';
import {AppStrings} from '../utilities/AppStrings';
import SafeView from '../components/SafeView';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import AppContext from '../utilities/AppContext';
import TCPClient from '../model/TcpClient';
import { formatConnectionResponse } from '../utilities/DataFormater';

export default function ScanWatch(props) {
  const{DeviceId,setDeviceId}=useContext(AppContext)
  const [qrCode, setqrCode] = useState(null);
  console.log('respo', responsiveHeight(100))
  console.log('WINDOW_HEIGHT', WINDOW_HEIGHT)
  
  // const currentClient = new TCPClient()

  // useEffect(() => {
    
  //   currentClient.connect();

  //   return () => {
  //     currentClient.close();
  //   };
  // }, []);

  function extractDeviceIDFromIMEI(imeiNumber) {
  const yIndexes = [1, 2, 4, 5, 7, 8, 9, 11, 12, 13];
  let deviceId = "";

  for (let i = 0; i < yIndexes.length; i++) {
    deviceId += imeiNumber[yIndexes[i]];
  }
  console.log('deviceId', deviceId)
  return deviceId;
}


  const onScan = data => {
    if (!data) {
        Alert.alert('No QR Code Detected!');
        return;
      }
    const deviceId = extractDeviceIDFromIMEI(data.data)
    setDeviceId(deviceId)
    props.navigation.navigate("Loading")
    // if (!data) {
    //   Alert.alert('No QR Code Detected!');
    //   return;
    // } else {
    //   const deviceId = extractDeviceIDFromIMEI(data.data)
    //   setDeviceId(deviceId)
    //   currentClient.sendData(`[3g*${deviceId}*0002*LK]`)
    //   const batteryLevel=formatConnectionResponse(currentClient.connect())
    //   console.log('batteryLevel', batteryLevel)
    //   setTimeout(() => {
    //     props.navigation.navigate("BottomTabsHandler",{batteryLevel})
    //   }, 15000);   
    // }
    // props.navigation.navigate("Packages")
  };

  const bottomContainer = () => {
    return (
      <>
        <View
          style={{
            width: WINDOW_WIDTH * 0.15,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: AppColors.blackLight,
            marginTop:WINDOW_HEIGHT*0.02
          }}
        />
        <MediumText
          text={AppStrings.connectGadgets}
          customStyles={{color: 'black', marginVertical: WINDOW_HEIGHT*0.01}}
        />
        <PrimaryButton
          text={AppStrings.scanQRCode}
          customStyles={{marginTop: 0, marginBottom: WINDOW_HEIGHT*0.01}}
          onPress={() => onScan(qrCode)}
        />
        <PrimaryButton
          text={AppStrings.enterIMEI}
          customStyles={{marginTop: 0, marginBottom: 10}}
          topGradientColor={'#00004d'}
          bottomGradientColor={'#00004d'}
        />
      </>
    );
  };

  return (
    <SafeView>
      <QRCodeScanner
        onRead={data => {
          setqrCode(data);
          console.log('data', data);
          onScan(data)
        }}
        reactivate={true}
        reactivateTimeout={6000}
        showMarker
        markerStyle={{
          height: WINDOW_WIDTH*0.7,
          width: WINDOW_WIDTH*0.7,
          borderWidth: 1,
          borderColor: '#FFF',
          backgroundColor: 'transparent',
          borderStyle: 'dashed',
          borderRadius: 10,
        }}
        fadeIn
        bottomContent={bottomContainer()}
        bottomViewStyle={{
          justifyContent:'flex-start',
          backgroundColor: '#FFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: WINDOW_HEIGHT * 0.4,
          position: 'absolute',
          transform: [
            {
              translateY: responsiveHeight(70.5),
            },
          ],
        }}
        topViewStyle={{
          flex: 0,
        }}
        cameraStyle={{
          height:WINDOW_HEIGHT,
          backgroundColor: 'red',
        }}
        containerStyle={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT, flex: 0}}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({});

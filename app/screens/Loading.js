import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import Lottie from 'lottie-react-native';
import {PULSE} from '../assets/LottieAnimations';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BoldText from '../components/BoldText';
import {FontSize} from '../utilities/Globals';
import AppContext from '../utilities/AppContext';
import TcpSocket from 'react-native-tcp-socket';
import Toast from 'react-native-toast-message';

export default function Loading(props) {
  const {DeviceId} = useContext(AppContext);
  

  const sendLKCommand = (client, command) => {
    if (!client) {
      return;
    }
    if (client) {
      console.log('Sending command LK:', command);
      client.write(command);
    } else {
      return;
    }
  };
  useEffect(() => {
    let client = TcpSocket.createConnection({
      host: 'gotyour693.com',
      port: 3000,
    });

    const connectToSocket = () => {
      return new Promise((resolve, reject) => {
        client.on('connect', () => {
          console.log('Connected to TCP Server!');
          resolve();
        });
        // client.write(`3G*${DeviceId}*0002*LK`);
        client.on('data', data => {
          console.log('Data from TCP socket', data.toString());
          if (data.toString().includes('CONFIG')) {
            Toast.show({
              type: 'tomatoToast',
              text1: 'Watch Connected!',
              text2: 'Your Watch has connected Successfully!',
            });
          }
          props.navigation.navigate('BottomTabsHandler');
        });
        client.on('close', () => {
          console.log('TCP socket connection closed');
        });
      });  
    };

    connectToSocket().then(res=>{
      sendLKCommand(client,`[3G*${DeviceId}*0002*LK]`)
    }).catch(err=>console.log('err', err))
    return () => {
      client.destroy();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <BoldText
        text={'Establishing Connection!'}
        customStyles={{
          fontSize: FontSize.big,
          color: 'black',
          marginBottom: 50,
        }}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Lottie
          source={PULSE}
          autoPlay
          loop
          style={{width: 200, height: 200}}
        />
        <View style={{position: 'absolute'}}>
          <Icon name="watch" color="black" size={24} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

import React, { useEffect} from 'react';
import { View ,StyleSheet} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import TCPClient from '../model/TcpClient';




export default function Packages(props) {
  useEffect(() => {
    const tcpClient = new TCPClient();
    tcpClient.connect();

    return () => {
      tcpClient.close();
    };
  }, []);
  return (

    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <PrimaryButton
      text={'Send Command'}
      onPress={()=>{props.navigation.replace("Login")}}
      // onPress={()=>handleSendCommand(`[3G*7703762021*0002*TS]`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

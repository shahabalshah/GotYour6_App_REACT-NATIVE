import {
  Alert,
  StyleSheet,
  Dimensions,
  View,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState, useContext} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  AppColors,
  AppFonts,
  FontSize,
  MAIN_CARDWIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../utilities/Globals';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryText from '../components/PrimaryText';
import MediumText from '../components/MediumText';
import {AppStrings} from '../utilities/AppStrings';
import SafeView from '../components/SafeView';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import AppContext from '../utilities/AppContext';
import Header from '../components/Header';
import SecondaryInput from '../components/SecondaryInput';


export default function ScanWatch(props) {
  const {DeviceId, setDeviceId} = useContext(AppContext);
  const [showModal, setshowModal] = useState(false);
  const [qrCode, setqrCode] = useState(null);
  const [IMEI, setIMEI] = useState('');
  const [error, seterror] = useState('')


  function extractDeviceIDFromIMEI(imeiNumber) {
    const yIndexes = [1, 2, 4, 5, 7, 8, 9, 11, 12, 13];
    let deviceId = '';

    for (let i = 0; i < yIndexes.length; i++) {
      deviceId += imeiNumber[yIndexes[i]];
    }
    console.log('deviceId', deviceId);
    return deviceId;
  }

  const onScan = data => {
    if (!data) {
      Alert.alert('No QR Code Detected!');
      return;
    }
    const deviceId = extractDeviceIDFromIMEI(data.data);
    setDeviceId(deviceId);
    props.navigation.navigate('AddGadgetDetails',{imei:data.data});
  };

  const HandlerManualConnect = () => {
    seterror('')
    if (!IMEI) {
      seterror('Please Enter IMEI!');
      return;
    }
    if(IMEI.length<15){
      seterror('Please Enter a valid IMEI')
      return
    }
    let id = IMEI;
    id = id.slice(0,-1)
    id = id.slice(4)
    setDeviceId(id)
    setshowModal(false)
    props.navigation.navigate('AddGadgetDetails',{imei:IMEI});
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
            marginTop: WINDOW_HEIGHT * 0.02,
          }}
        />
        <MediumText
          text={AppStrings.connectGadgets}
          customStyles={{color: 'black', marginVertical: WINDOW_HEIGHT * 0.01}}
        />
        <PrimaryButton
          text={AppStrings.scanQRCode}
          customStyles={{marginTop: 0, marginBottom: WINDOW_HEIGHT * 0.01}}
          onPress={() => onScan(qrCode)}
        />
        <PrimaryButton
          text={AppStrings.enterIMEI}
          customStyles={{marginTop: 0, marginBottom: 10}}
          topGradientColor={'#00004d'}
          bottomGradientColor={'#00004d'}
          onPress={() => setshowModal(true)}
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
          onScan(data);
        }}
        reactivate={true}
        reactivateTimeout={6000}
        showMarker
        markerStyle={styles.markerStyle}
        fadeIn
        bottomContent={bottomContainer()}
        bottomViewStyle={{
          justifyContent: 'flex-start',
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
          height: WINDOW_HEIGHT,
          backgroundColor: 'red',
        }}
        containerStyle={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT, flex: 0}}
      />
      <Modal
        style={styles.modalStyles}
        visible={showModal}
        animationType="slide"
        transparent={true}>
        <View
          style={styles.modal}>
          <Header
            onBackPress={() => setshowModal(false)}
            title={'Connect'}
            customTextStyles={{color: AppColors.white}}
            iconColor={AppColors.white}
            customStyles={{backgroundColor: 'transparent'}}
          />
          <View style={styles.modalItems}>
            <View style={styles.modalLine} />
            <PrimaryText
              text={'Enter Gadget IMEI'}
              customStyles={{fontSize: FontSize.normal, marginBottom: 12}}
            />
            
            <SecondaryInput
            text={'Enter Gadget IMEI'}
            onChangeText={val => setIMEI(val)}
            maxLength={15}
            keyboardType={'numeric'}
            />
            <PrimaryButton text={'Connect'} 
            onPress={()=>HandlerManualConnect()}
            customStyles={{marginTop:12}}
            />
            {error?<PrimaryText
            text={error}
            customStyles={{color:'tomato'}}
            />:null}
          </View>
          <View style={{height: 2}} />
        </View>
      </Modal>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  modalStyles: {
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelInput: {
    width: MAIN_CARDWIDTH,
    height: WINDOW_HEIGHT * 0.07,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: AppColors.blackLight,
    fontFamily: AppFonts.medium,
    fontSize: FontSize.normal,
    marginBottom:12,
    color:AppColors.black,
  },
  modalLine: {
    width: WINDOW_WIDTH * 0.15,
    height: 6,
    backgroundColor: AppColors.blackLight,
    borderRadius: 3,
    marginBottom: 12,
  },
  modalItems: {
    height: WINDOW_HEIGHT * 0.4,
    backgroundColor: AppColors.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: WINDOW_WIDTH,
  },
  markerStyle: {
    height: WINDOW_WIDTH * 0.7,
    width: WINDOW_WIDTH * 0.7,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  modal:{
    flex: 1,
    backgroundColor: AppColors.modalBG,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

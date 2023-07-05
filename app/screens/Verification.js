import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState, useContext, useEffect} from 'react';
import SafeView from '../components/SafeView';
import {
  AppColors,
  AppFonts,
  FontSize,
  MAIN_CARDWIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../utilities/Globals';
import Header from '../components/Header';
import {MOBILE_ICON} from '../assets';
import PrimaryText from '../components/PrimaryText';
import {AppStrings} from '../utilities/AppStrings';
import PrimaryButton from '../components/PrimaryButton';
import MediumText from '../components/MediumText';
import OTPTextInput from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';
import {postData} from '../utilities/ApiCalls';
import AppContext from '../utilities/AppContext';
import { APP_URL } from '../utilities/AppUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Verification(props) {
  const {setUserData,DeviceId} = useContext(AppContext);
  const [loading, setloading] = useState(false);
  const [otp, setOtp] = useState('');
  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    // return () => {
    //   clearText()
    // };
  }, []);

  const onVerify = async () => {
    console.log('verifying');
    if (otp.length < 6) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Invalid OTP!',
      });
      return;
    }
    setloading(true);
    postData(APP_URL.verifyOtp, {otp: otp})
      .then(res => {
        console.log('response after otp', res);
        if (res.error) {
          Toast.show({
            type: 'errorToast',
            text1: 'Error!',
            text2: res.error,
          });
          setloading(false);
          return;
        } else if (res.user.success) {
          setUserData(res.user.data);
          Toast.show({
            type: 'tomatoToast',
            text1: 'Success!',
            text2: res.message,
          });
          setloading(false);
          if (props?.route?.params?.screen == 'forgot') {
            props.navigation.replace('ResetKey', {otp: otp});
          }
          else if(props?.route?.params?.screen == 'login'){
            if(DeviceId==null){
            props.navigation.navigate('ConnectWatch')
          }else{
            props.navigation.navigate('BottomTabsHandler')
          }
          }
          else {
            props.navigation.navigate('ConnectWatch');
          }
        }
      })
      .catch(err => {
        Toast.show({
          type: 'errorToast',
          text1: 'Error!',
          text2: 'Something Went Wrong!',
        });
        setloading(false);
        return;
      });
  };

  return (
    <SafeView>
      <View style={styles.container}>
        <Header
          title={"Verification"}
          onBackPress={() => props.navigation.goBack()}
        />
        <View style={styles.iconContainer}>
          <Image
            source={MOBILE_ICON}
            style={{height: 40, width: 40, resizeMode: 'contain'}}
          />
        </View>
        <View style={{width: WINDOW_WIDTH, flexDirection: 'column'}}>
          <Text style={styles.text}>
            Verification code sent to{'\n'}
            <Text style={styles.textMobileNum}>
              {' '}
              {props?.route?.params?.phoneCode}
              {props?.route?.params?.PhoneNumber}
            </Text>
          </Text>
        </View>
        <TouchableOpacity>
          <PrimaryText text={AppStrings.notYou} customStyles={styles.notYou} />
        </TouchableOpacity>
        <View style={{width: WINDOW_WIDTH, alignItems: 'center'}}>
          <OTPTextInput
            ref={e => (otpInput = e)}
            tintColor={AppColors.blackExtraLight}
            offTintColor={AppColors.blackExtraLight}
            inputCount={6}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            handleTextChange={val => setOtp(val)}
          />
        </View>
        
        <PrimaryText text={AppStrings.didntGotCode} customStyles={{marginTop:24}}/>
        <MediumText
          text={AppStrings.resendAgain.toLocaleUpperCase()}
          customStyles={styles.resend}
        />
        <PrimaryButton
          text={'Continue'}
          onPress={() => onVerify()}
          loading={loading}
          customStyles={{marginTop:WINDOW_HEIGHT*0.15}}
        />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  iconContainer: {
    height: WINDOW_WIDTH * 0.25,
    width: WINDOW_WIDTH * 0.25,
    borderRadius:  WINDOW_WIDTH * 0.25/2,
    backgroundColor: AppColors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: WINDOW_HEIGHT * 0.05,
  },
  text: {
    fontFamily: AppFonts.regular,
    color: AppColors.black,
    fontSize: FontSize.normal,
    textAlign: 'center',
  },
  textMobileNum: {
    fontFamily: AppFonts.bold,
    color: AppColors.black,
    fontSize: FontSize.normal,
  },
  notYou: {
    color: AppColors.primary,
    fontFamily: AppFonts.medium,
    marginBottom: WINDOW_HEIGHT * 0.05,
    marginTop:WINDOW_HEIGHT * 0.02
  },
  resend: {
    color: AppColors.primary,
    textDecorationLine: 'underline',
    marginVertical: 15,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 1,
    width: WINDOW_WIDTH * 0.12,
    height: WINDOW_WIDTH * 0.12,
    fontSize: FontSize.big,
  },
  textInputContainer: {
    // width:MAIN_CARDWIDTH
  },
});

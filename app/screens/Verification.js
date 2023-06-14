import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState, useContext} from 'react';
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

export default function Verification(props) {
  console.log('props', props);
  const {setUserData} = useContext(AppContext);
  const [otp, setOtp] = useState('');
  let otpInput = useRef(null);
  const clearText = () => {
    otpInput.current.clear();
  };
  const setText = () => {
    otpInput.current.setValue('1234');
  };
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
    postData('/otpVerify', {otp: otp})
      .then(res => {
        console.log('response after otp', res);
        if (res.error) {
          Toast.show({
            type: 'errorToast',
            text1: 'Error!',
            text2: res.error,
          });
          return;
        } else if (res.user.success) {
          setUserData(res.user.data);
          Toast.show({
            type: 'tomatoToast',
            text1: 'Success!',
            text2: res.message,
          });
          if (props?.route?.params?.screen == 'forgot') {
            props.navigation.navigate('ResetKey',{otp:otp})
          } else {
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
        return;
      });
  };

  return (
    <SafeView>
      <View style={styles.container}>
        <Header
          title={"Verify It's You"}
          onBackPress={() => props.navigation.goBack()}
        />
        <View style={styles.iconContainer}>
          <Image
            source={MOBILE_ICON}
            style={{height: 40, width: 40, resizeMode: 'contain'}}
          />
        </View>
        <View style={{width: MAIN_CARDWIDTH, flexDirection: 'row'}}>
          <Text style={styles.text}>
            We have sent the verification code to your phone number
            <Text style={styles.textMobileNum}>
              {' '}
              +{props?.route?.params?.phoneCode}
              {props?.route?.params?.PhoneNumber}
            </Text>
          </Text>
        </View>
        <TouchableOpacity>
          <PrimaryText text={AppStrings.notYou} customStyles={styles.notYou} />
        </TouchableOpacity>
        <View style={{width: WINDOW_WIDTH, alignItems: 'center'}}>
          <OTPTextInput
            tintColor={AppColors.blackExtraLight}
            offTintColor={AppColors.blackExtraLight}
            inputCount={6}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            handleTextChange={val => setOtp(val)}
          />
        </View>
        <PrimaryButton
          text={AppStrings.verify.toLocaleUpperCase()}
          onPress={() => onVerify()}
        />
        <PrimaryText text={AppStrings.didntGotCode} />
        <MediumText
          text={AppStrings.resendAgain.toLocaleUpperCase()}
          customStyles={styles.resend}
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
    borderRadius: 10,
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
    marginVertical: WINDOW_HEIGHT * 0.05,
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

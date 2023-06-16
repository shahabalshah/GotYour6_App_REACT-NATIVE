import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../components/SafeView';
import {
  AppColors,
  AppFonts,
  MAIN_CARDWIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../utilities/Globals';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryText from '../components/PrimaryText';
import PhoneNumTextInput from '../components/PhoneNumTextInput';
import PrimaryButton from '../components/PrimaryButton';
import Toast from 'react-native-toast-message';
import {postData} from '../utilities/ApiCalls';
import {CountryPicker} from 'react-native-country-codes-picker';

export default function ForgotPassword(props) {
  const [PhoneCode, setphoneCode] = useState('+44');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [showPicker, setshowPicker] = useState(false);
  const [flag, setflag] = useState('🇬🇧');
  const [loading, setloading] = useState(false);

  const ToasterSuccess = (text1, text2) => {
    Toast.show({
      type: 'tomatoToast',
      text1: text1,
      text2: text2,
    });
  };

  const ToasterError = (text1, text2) => {
    Toast.show({
      type: 'errorToast',
      text1: text1,
      text2: text2,
    });
  };

  const requestOTP = () => {
    setloading(true);
    if (!PhoneNumber) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Enter your phone number!',
      });
      setloading(false);
      return;
    }

    postData('/forgotPassword/otp', {phonenumber: PhoneNumber})
      .then(res => {
        console.log('res', res);
        if (res.message && res.success == false) {
          ToasterError('Error', res.message);
          setloading(false);
        }
        if (res.error) {
          if (res.error.includes('is not a valid phone number')) {
            ToasterError('Error', 'Invalid Phone Number!');
            setloading(false);
            return;
          } else {
            ToasterError('Error', 'Something Went Wrong!');
            setloading(false);
            return;
          }
        } else if (res.success) {
          ToasterSuccess('Success', res.message);
          setloading(false);
          props.navigation.navigate('Verification', {
            PhoneNumber: PhoneNumber,
            phoneCode: PhoneCode,
            screen: 'forgot',
          });
        }
      })
      .catch(error => {
        console.log('error in forgot password', error);
        setloading(false);
      });
  };
  return (
    <SafeView>
      <View style={styles.container}>
        <Header
          onBackPress={() => props.navigation.goBack()}
          title={'Forgot Safekey'}
        />
        <View style={styles.lockcontainer}>
          <Icon name="lock-alert-outline" size={30} color={AppColors.primary} />
        </View>
        <PrimaryText
          text={
            'Enter your Phone Number to receive OTP\ncode to reset your SafeKey.'
          }
          customStyles={styles.text}
        />
        <PhoneNumTextInput
          onPressCode={() => setshowPicker(true)}
          countryFlag={flag}
          onChangeText={val => setPhoneNumber(val)}
          phoneCode={PhoneCode}
          customStyles={{marginBottom: 0}}
        />
        <PrimaryButton
          loading={loading}
          text={'Send OTP'}
          onPress={() => {
            requestOTP();
          }}
        />
        <CountryPicker
          show={showPicker}
          pickerButtonOnPress={item => {
            setphoneCode(item.dial_code);
            setshowPicker(false);
            setflag(item.flag);
          }}
          style={{
            modal: {height: WINDOW_HEIGHT * 0.45},
            countryName: {color: AppColors.black, fontFamily: AppFonts.regular},
            dialCode: {color: AppColors.black, fontFamily: AppFonts.regular},
            searchMessageText: {
              color: AppColors.black,
              fontFamily: AppFonts.regular,
            },
            textInput: {color: AppColors.black, fontFamily: AppFonts.regular},
          }}
        />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  lockcontainer: {
    width: WINDOW_WIDTH * 0.22,
    height: WINDOW_WIDTH * 0.22,
    borderRadius: (WINDOW_WIDTH * 0.22) / 2,
    backgroundColor: AppColors.secondary,
    marginVertical: WINDOW_HEIGHT * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: AppColors.darkgray,
    textAlign: 'center',
    marginBottom: 15,
  },
});

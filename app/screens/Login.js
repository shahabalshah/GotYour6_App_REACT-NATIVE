import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import SafeView from '../components/SafeView';
import {LOGO} from '../assets';
import MediumText from '../components/MediumText';
import {AppStrings} from '../utilities/AppStrings';
import {
  AppColors,
  FontSize,
  MAIN_CARDWIDTH,
  WINDOW_HEIGHT,
} from '../utilities/Globals';
import PrimaryText from '../components/PrimaryText';
import PhoneNumTextInput from '../components/PhoneNumTextInput';
import PasswordTextInput from '../components/PasswordTextInput';
import PrimaryButton from '../components/PrimaryButton';
import SocialButtons from '../components/SocialButtons';
import AppContext from '../utilities/AppContext';
import {postData} from '../utilities/ApiCalls';
import Toast from 'react-native-toast-message';
import {APP_URL} from '../utilities/AppUrls';
import {CountryPicker} from 'react-native-country-codes-picker';

export default function Login(props) {
  const {UserData} = useContext(AppContext);
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState('');
  const [countryCode, setcountryCode] = useState('PK');
  const [phoneCode, setphoneCode] = useState('+44');
  const [isCountryCode, setisCountryCode] = useState(false);
  const [showPicker, setshowPicker] = useState(false);
  const [flag, setflag] = useState('🇬🇧');

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

  const handleLogin = () => {
    if (!phoneNumber) {
      ToasterError('Error', 'Please enter your Phone Number!');
      return;
    }
    if (!password) {
      ToasterError('Error', 'Please enter your SecretKey!');
      return;
    }
    let payload = {
      countrycode: phoneCode,
      phonenumber: phoneNumber,
      safeKey: password,
    };
    postData(APP_URL.login, payload).then(res => {
      if (res.error) {
        if (res.error.includes('is not a valid phone number')) {
          ToasterError('Error', 'Invalid Phone Number!');
          return;
        } else {
          ToasterError('Error', 'Something Went Wrong!');
          return;
        }
      } else if (res.success) {
        ToasterSuccess('Success', res.message);
        props.navigation.navigate('Verification', {
          PhoneNumber: phoneNumber,
          phoneCode: phoneCode,
        });
      }
    });
  };

  return (
    <SafeView customStyle={{backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={LOGO}
            style={{
              width: WINDOW_HEIGHT * 0.12,
              height: WINDOW_HEIGHT * 0.12,
              marginTop: WINDOW_HEIGHT * 0.03,
            }}
          />
        </View>
        <MediumText
          text={AppStrings.welcome}
          customStyles={styles.welcomeText}
        />
        <PrimaryText
          text={AppStrings.makeChildSecure}
          customStyles={styles.text}
        />
        <PhoneNumTextInput
          onPressCode={() => setshowPicker(true)}
          onChangeText={val => setPhoneNumber(val)}
          countryCode={countryCode}
          phoneCode={phoneCode}
          countryFlag={flag}
        />
        <PasswordTextInput onChangeText={val => setPassword(val)} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ForgotPassword')}
          style={{width: MAIN_CARDWIDTH, alignItems: 'flex-end'}}>
          <PrimaryText
            text={AppStrings.forgotPassword}
            customStyles={styles.forgotPassword}
          />
        </TouchableOpacity>
        <PrimaryButton
          text={AppStrings.login.toUpperCase()}
          onPress={() => handleLogin()}
        />
        <PrimaryText
          customStyles={styles.text}
          text={AppStrings.loginOptions}
        />
        <View style={{flexDirection: 'row'}}>
          <SocialButtons
            type={'facebook'}
            customStyle={{marginRight: WINDOW_HEIGHT * 0.03}}
          />
          <SocialButtons />
        </View>
        <View style={{flexDirection: 'row', marginTop: WINDOW_HEIGHT * 0.03}}>
          <PrimaryText
            text={AppStrings.noAccout}
            customStyles={{color: AppColors.black, marginRight: 5}}
          />
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <PrimaryText
              text={AppStrings.signUp}
              customStyles={{color: AppColors.primary}}
            />
          </TouchableOpacity>
        </View>
        <CountryPicker
          show={showPicker}
          pickerButtonOnPress={item => {
            console.log('item', item);
            setphoneCode(item.dial_code);
            setshowPicker(false);
            setflag(item.flag);
          }}
          style={{modal:{height:WINDOW_HEIGHT*0.4}}}
        />
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  imageContainer: {
    height: WINDOW_HEIGHT * 0.15,
    width: WINDOW_HEIGHT * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D0F5FC',
    borderRadius: (WINDOW_HEIGHT * 0.15) / 2,
    marginTop: WINDOW_HEIGHT * 0.02,
  },
  welcomeText: {
    fontSize: FontSize.big,
    color: AppColors.black,
    marginTop: WINDOW_HEIGHT * 0.02,
  },
  text: {
    fontSize: FontSize.normal,
    color: AppColors.black,
    textAlign: 'center',
    marginBottom: WINDOW_HEIGHT * 0.01,
  },
  forgotPassword: {
    marginTop: 5,
    color: AppColors.primary,
    fontSize: FontSize.small,
  },
});

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../components/SafeView';
import {LOGO, REVEAL_LOGO} from '../assets';
import MediumText from '../components/MediumText';
import {AppStrings} from '../utilities/AppStrings';
import {
  AppColors,
  FontSize,
  MAIN_CARDWIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../utilities/Globals';
import PrimaryText from '../components/PrimaryText';
import PhoneNumTextInput from '../components/PhoneNumTextInput';
import PrimaryButton from '../components/PrimaryButton';
import SocialButtons from '../components/SocialButtons';
import SecondaryInput from '../components/SecondaryInput';
import CheckBox from '../components/CheckBox';
import Clipboard from '@react-native-clipboard/clipboard';
import {APP_URL, BASE_URL} from '../utilities/AppUrls';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {postData} from '../utilities/ApiCalls';
import {CountryPicker} from 'react-native-country-codes-picker';
import {AppFonts} from '../utilities/Globals';
import LinearGradient from 'react-native-linear-gradient';

export default function SignUp(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [secretKey, setsecretKey] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [crptoName, setcrptoName] = useState('');
  const [countryCode, setcountryCode] = useState('US');
  const [phoneCode, setphoneCode] = useState('+44');
  const [isCountryCode, setisCountryCode] = useState(false);
  const [showPicker, setshowPicker] = useState(false);
  const [flag, setflag] = useState('🇬🇧');
  const [loading, setloading] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'tomatoToast',
      text1: 'SecretKey Copied!',
      text2: 'Please save your secret key!',
    });
  };

  function generateSafekey(length) {
    var safekey = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var specialCharacters = '!@#$%^&*()_+-=[]{}|:;"\'<>,.?/~`';
    var allCharacters = characters + specialCharacters;

    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * allCharacters.length);
      safekey += allCharacters.charAt(randomIndex);
    }

    setsecretKey(safekey);
  }

  const copyToClipboard = () => {
    console.log('first');
    Clipboard.setString(secretKey);
    console.log('secretKey', secretKey);
    if (secretKey !== '') {
      setIsCopied(true);
      console.log('isCopied', isCopied);
      showToast();
    }
  };

  const handleLogin = () => {
    setloading(true);
    if (!crptoName) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please Enter your Crypto Name!',
      });
      setloading(false);
      return;
    }
    if (!PhoneNumber) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please Enter your Phone Number!',
      });
      setloading(false);
      return;
    }
    if (!secretKey) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please Generate Your SecretKey!',
      });
      setloading(false);
      return;
    }
    if (!isCopied) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please Copy & Save your Secret Key!',
      });
      setloading(false);
      return;
    }
    if (!isChecked) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please Check the Box to Proceed!',
      });
      setloading(false);
      return;
    }

    let payload = {
      name: crptoName,
      lastname: '',
      countrycode: phoneCode,
      phonenumber: PhoneNumber,
      safeKey: secretKey,
    };
    console.log('payload', payload);
    postData(APP_URL.login, payload)
      .then(res => {
        console.log('res', res);
        if (res.error) {
          if (res.error.includes('is not a valid phone number')) {
            Toast.show({
              type: 'errorToast',
              text1: 'Error!',
              text2: 'Invalid Phone Number!',
            });
            setloading(false);
            return;
          } else if (res.error.includes('Invalid password')) {
            Toast.show({
              type: 'errorToast',
              text1: 'Error!',
              text2: 'User Already Signed Up!',
            });
            setloading(false);
            return;
          } else {
            Toast.show({
              type: 'errorToast',
              text1: 'Error!',
              text2: 'Something Went Wrong!',
            });
            setloading(false);
            return;
          }
        } else if (res.success) {
          setloading(false);
          Toast.show({
            type: 'tomatoToast',
            text1: 'Success!',
            text2: res.message,
          });
          props.navigation.navigate('Verification', {
            PhoneNumber: PhoneNumber,
            phoneCode: phoneCode,
          });
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
    <SafeView customStyle={{backgroundColor: 'white'}}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={REVEAL_LOGO}
            style={{
              width: WINDOW_HEIGHT * 0.12,
              height: WINDOW_HEIGHT * 0.12,
              marginTop: WINDOW_HEIGHT * 0.03,
              resizeMode:'contain'
            }}
          />
        </View>
        <MediumText
          text={AppStrings.signUp}
          customStyles={styles.welcomeText}
        />
        <SecondaryInput
          text={AppStrings.cryptoName}
          keyboardType={'default'}
          onChangeText={val => setcrptoName(val)}
        />
        <PhoneNumTextInput
          countryFlag={flag}
          onChangeText={val => setPhoneNumber(val)}
          phoneCode={phoneCode}
          onPressCode={() => setshowPicker(true)}
        />
        <TouchableOpacity onPress={() => generateSafekey(27)}>
          <LinearGradient
            style={styles.safekeybutton}
            colors={['#0EE1F4', '#00004D']}>
            <Icon name="key-variant" size={12} color={AppColors.white} />
            <PrimaryText
              customStyles={{color: AppColors.white}}
              text={'Generate CryptoKey'}
            />
          </LinearGradient>
        </TouchableOpacity>
        <SecondaryInput
          text={'CryptoKey'}
          editable={false}
          value={secretKey}
          textInputColor={AppColors.black}
          onPressCopy={() => {
            copyToClipboard();
          }}
          onChangeText={val => {
            setsecretKey(val);
          }}
        />
        
        {/* <SecondaryInput text={AppStrings.reEnterSafety} /> */}
        <View
          style={{
            width: MAIN_CARDWIDTH,
            marginVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CheckBox
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
          />
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <PrimaryText
                text={'By registering you accept our '}
                customStyles={{fontSize: FontSize.small}}
              />
              <TouchableOpacity>
                <PrimaryText
                  text={'Terms of Use'}
                  customStyles={{
                    fontSize: FontSize.small,
                    color: AppColors.primary,
                    textDecorationLine: 'underline',
                  }}
                />
              </TouchableOpacity>
              <PrimaryText
                text={' and '}
                customStyles={{fontSize: FontSize.small}}
              />
            </View>
            <TouchableOpacity>
              <PrimaryText
                text={'Privacy Policy'}
                customStyles={{
                  fontSize: FontSize.small,
                  color: AppColors.primary,
                  textDecorationLine: 'underline',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <PrimaryButton
          loading={loading}
          text={AppStrings.signUp.toUpperCase()}
          customStyles={{marginTop: 0}}
          onPress={() => handleLogin()}
        />
        {/* <PrimaryText
          customStyles={styles.text}
          text={AppStrings.loginOptions}
        /> */}
        {/* <View style={{flexDirection: 'row'}}>
          <SocialButtons
            type={'facebook'}
            customStyle={{marginRight: WINDOW_HEIGHT * 0.03}}
          />
          <SocialButtons />
        </View> */}
        <View style={{flexDirection: 'row', marginTop: WINDOW_HEIGHT * 0.02}}>
          <PrimaryText
            text={AppStrings.alreadyHaveAccount}
            customStyles={{color: AppColors.black, marginRight: 5}}
          />
          <TouchableOpacity onPress={() => props.navigation.replace('Login')}>
            <PrimaryText
              text={AppStrings.login}
              customStyles={{color: AppColors.primary}}
            />
          </TouchableOpacity>
        </View>
        <CountryPicker
          show={showPicker}
          onBackdropPress={()=>setshowPicker(false)}
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
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // height: WINDOW_HEIGHT,
    backgroundColor: AppColors.white,
  },
  imageContainer: {
    height: WINDOW_HEIGHT * 0.1,
    width: WINDOW_HEIGHT * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#D0F5FC',
    borderRadius: (WINDOW_HEIGHT * 0.1) / 2,
    marginTop: WINDOW_HEIGHT * 0.1,
    marginBottom:24
  },
  welcomeText: {
    fontSize: FontSize.big,
    color: AppColors.black,
    marginVertical: WINDOW_HEIGHT * 0.01,
  },
  text: {
    fontSize: FontSize.normal,
    color: AppColors.black,
    textAlign: 'center',
    marginBottom: WINDOW_HEIGHT * 0.012,
  },
  forgotPassword: {
    marginTop: 5,
    color: AppColors.primary,
    fontSize: FontSize.small,
  },
  safekeybutton: {
    marginVertical: 12,
    backgroundColor: AppColors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: WINDOW_WIDTH * 0.5,
    justifyContent: 'center',
  },
});

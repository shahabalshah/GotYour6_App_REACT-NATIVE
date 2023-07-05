import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../components/SafeView';
import Header from '../components/Header';
import {AppColors, WINDOW_HEIGHT, WINDOW_WIDTH} from '../utilities/Globals';
import PrimaryText from '../components/PrimaryText';
import SecondaryInput from '../components/SecondaryInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from '../components/PrimaryButton';
import Toast from 'react-native-toast-message';
import {postData} from '../utilities/ApiCalls';
import Clipboard from '@react-native-clipboard/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import { LOCK } from '../assets';

export default function ResetKey(props) {
  const [secretKey, setsecretKey] = useState('');
  const [isCopied, setIsCopied] = useState(false);
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

  const handleChangeKey = () => {
    if (!secretKey) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please gengeate secret key!',
      });
      return;
    }
    if (!isCopied) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please copy secret key!',
      });
      return;
    }
    let payload = {
      // otp:props?.route?.params?.otp,
      password: secretKey,
      confirmpassword: secretKey,
    };
    setloading(true);
    console.log('payload', payload);
    postData('mobile/resetPassword/otp', payload)
      .then(res => {
        if (res.success) {
          Toast.show({
            type: 'tomatoToast',
            text1: 'Success!',
            text2: 'Secret Key Changed Successfully!',
          });
          props.navigation.replace('Login');
          setloading(false);
          return;
        } else if (!res.success) {
          Toast.show({
            type: 'errorToast',
            text1: 'Error!',
            text2: res.message,
          });
          setloading(false);
          return;
        }
      })
      .catch(() => {
        Toast.show({
          type: 'errorToast',
          text1: 'Error!',
          text2: 'Something went wrong!',
        });
        setloading(false);
        return;
      });
  };

  return (
    <SafeView>
      <View style={styles.container}>
        <Header
          onBackPress={() => props.navigation.goBack()}
          title={'New CryptoKey'}
        />
        <View style={styles.lockcontainer}>
          {/* <Icon name="lock-alert-outline" size={30} color={AppColors.primary} /> */}
          <Image
          source={LOCK}
          style={{
            width: WINDOW_HEIGHT * 0.07,
            height: WINDOW_HEIGHT * 0.07,
            resizeMode:'contain'
          }}
          />
        </View>
        <PrimaryText
          text={
            'Generate a new CrytoKey'
          }
          customStyles={styles.text}
        />
        <TouchableOpacity
          onPress={() => generateSafekey(27)}
          >
            <LinearGradient style={styles.safekeybutton} colors={['#0EE1F4', '#00004D']}>
          <Icon name="key-variant" size={12} color={AppColors.white} />
          <PrimaryText
            customStyles={{color: AppColors.white}}
            text={'Generate CryptoKey'}
          />
          </LinearGradient>
        </TouchableOpacity>
        <SecondaryInput
          text={'Generate CryptoKey'}
          editable={false}
          onPressCopy={() => {
            copyToClipboard();
          }}
          value={secretKey}
        />
        <View style={{marginTop:WINDOW_HEIGHT*0.275}}>
        <PrimaryButton
          text={'Continue'}
          onPress={() => handleChangeKey()}
          loading={loading}
        />
        </View>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  text: {
    color: AppColors.black,
    textAlign: 'center',
    marginBottom: 15,
  },
  lockcontainer: {
    width: WINDOW_WIDTH * 0.275,
    height: WINDOW_WIDTH * 0.275,
    borderRadius: (WINDOW_WIDTH * 0.275) / 2,
    backgroundColor: AppColors.secondary,
    marginVertical: WINDOW_HEIGHT * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
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

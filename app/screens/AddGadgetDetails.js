import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import SafeView from '../components/SafeView';
import Header from '../components/Header';
import {
  AppFonts,
  AppColors,
  FontSize,
  WINDOW_WIDTH,
  MAIN_CARDWIDTH,
  WINDOW_HEIGHT,
} from '../utilities/Globals';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BoldText from '../components/BoldText';
import PrimaryText from '../components/PrimaryText';
import {
  AVATAR_ONE,
  AVATAR_TWO,
  AVATAR_THREE,
  AVATAR_FOUR,
  AVATAR_FIVE,
  AVATAR_SIX,
} from '../assets/index';
import PrimaryButton from '../components/PrimaryButton';
import {postData} from '../utilities/ApiCalls';
import AppContext from '../utilities/AppContext';
import Toast from 'react-native-toast-message';
import {APP_URL} from '../utilities/AppUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SecondaryInput from '../components/SecondaryInput';
import PhoneNumTextInput from '../components/PhoneNumTextInput';

const data = [
  {
    id: 'A',
    avatar: AVATAR_ONE,
  },
  {
    id: 'B',
    avatar: AVATAR_TWO,
  },
  {
    id: 'C',
    avatar: AVATAR_THREE,
  },
  {
    id: 'D',
    avatar: AVATAR_FOUR,
  },
  {
    id: 'E',
    avatar: AVATAR_FIVE,
  },
  {
    id: 'F',
    avatar: AVATAR_SIX,
  },
];

export default function AddGadgetDetails(props) {
  const {UserData, DeviceId} = useContext(AppContext);
  const [selectIndex, setselectIndex] = useState('');
  const [gadgetName, setgadgetName] = useState('');
  const [loading, setloading] = useState(false);
  const [devicePhoneNumber, setdevicePhoneNumber] = useState('');
  const [phoneCode, setphoneCode] = useState('+44')
  const [countryFlag, setcountryFlag] = useState('🇬🇧')
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@deviceID', DeviceId);
    } catch (e) {}
  };

  const handleAddDevice = () => {
    setloading(true);
    if (!gadgetName) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please Enter Gadget Name!',
      });
      setloading(false);
      return;
    }
    if (!selectIndex) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please Select Avatar!',
      });
      setloading(false);
      return;
    }
    if (!devicePhoneNumber) {
      Toast.show({
        type: 'errorToast',
        text1: 'Error!',
        text2: 'Please Enter Device Phone No.!',
      });
      setloading(false);
      return;
    }
    // if (!devicePhoneNumber.includes('+')) {
    //   Toast.show({
    //     type: 'errorToast',
    //     text1: 'Error!',
    //     text2: 'Enter Valid Device Phone No. with Country Code!',
    //   });
    //   setloading(false);
    //   return;
    // }
    storeData();
    let payload = {
      userid: UserData._id,
      deviceID: DeviceId,
      IEMI: props.route?.params?.imei,
      avatar: selectIndex,
      phonenumber: phoneCode+devicePhoneNumber,
      name: gadgetName,
    };

    postData(APP_URL.addgadget, payload)
      .then(res => {
        console.log('res', res);
        if (res.error == 'This device is alredy registered') {
          Toast.show({
            type: 'tomatoToast',
            text1: 'Success!',
            text2: res.error,
          });
        }
        if (res.success) {
          Toast.show({
            type: 'tomatoToast',
            text1: 'Success!',
            text2: res.message,
          });
          props.navigation.navigate('BottomTabsHandler');
        }
        if (res.error) {
          Toast.show({
            type: 'errorToast',
            text1: 'Error!',
            text2: res.error,
          });
        }
      })
      .catch(err => {
        Toast.show({
          type: 'errorToast',
          text1: 'Error!',
          text2: 'Something went wrong!',
        });
      })
      .finally(() => {
        setloading(false);
      });
  };
  return (
    <SafeView>
      <View style={{flex: 1, backgroundColor: AppColors.white}}>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Header
            title={'Add Details'}
            onBackPress={() => props.navigation.goBack()}
          />
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon
              name="qr-code-2"
              size={WINDOW_WIDTH * 0.3}
              color={AppColors.black}
            />
            <BoldText
              text={props.route?.params?.imei}
              customStyles={{fontSize: FontSize.big}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: AppColors.lightGray,
            alignItems: 'center',
          }}>
          <SecondaryInput
          text={'Enter Gadget CryptoName'}
          customLabelStyle={{backgroundColor:AppColors.lightGray}}
          onChangeText={val => setgadgetName(val)}
          />
          <PhoneNumTextInput
          onChangeText={val => setdevicePhoneNumber(val)}
          countryFlag={countryFlag}
          phoneCode={phoneCode}
          customLabelStyle={{backgroundColor:AppColors.lightGray}}
          />
          <View
            style={{
              width: MAIN_CARDWIDTH,
              backgroundColor: AppColors.white,
              alignItems: 'center',
              marginTop: 12,
              borderRadius: 10,
            }}>
            <PrimaryText
              text={'Choose an Avatar'}
              customStyles={{marginVertical: 12}}
            />
            <FlatList
              style={{marginBottom: 10}}
              data={data}
              horizontal
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => setselectIndex(item.id)}
                    style={
                      item.id == selectIndex
                        ? styles.imgSelect
                        : styles.imgUnSelect
                    }>
                    <Image
                      source={item.avatar}
                      style={{height: 40, width: 40, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <PrimaryButton
            text={'Add Device'}
            customStyles={{marginTop: 24}}
            loading={loading}
            onPress={() => handleAddDevice()}
          />
        </View>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  modelInput: {
    width: MAIN_CARDWIDTH,
    height: WINDOW_HEIGHT * 0.07,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: AppColors.blackLight,
    fontFamily: AppFonts.medium,
    fontSize: FontSize.normal,
    marginBottom: 12,
    color:AppColors.black,
  },
  imgSelect: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: AppColors.primary,
    marginHorizontal: 5,
    backgroundColor: AppColors.lightGray,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgUnSelect: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: AppColors.blackLight,
    marginHorizontal: 5,
    backgroundColor: AppColors.white,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

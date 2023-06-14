import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {GREETINGS_BACKGROUND} from '../assets';
import SafeView from '../components/SafeView';
import {
  AppColors,
  FontSize,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../utilities/Globals';
import PrimaryButton from '../components/PrimaryButton';
import {AppStrings} from '../utilities/AppStrings';
import MediumText from '../components/MediumText';

export default function Greetings(props) {
  return (
    <SafeView>
      <View style={styles.container}>
        <Image source={GREETINGS_BACKGROUND} style={styles.bgImg} />
        <View style={{alignItems: 'center', marginTop: WINDOW_HEIGHT * 0.58}}>
          <MediumText
            text={AppStrings.welcomeOnly}
            customStyles={{fontSize: FontSize.thirty, color: AppColors.white}}
          />
          <MediumText
            text={AppStrings.happyToSeeYou}
            customStyles={{fontSize: FontSize.big, color: AppColors.white}}
          />
          <PrimaryButton text={AppStrings.login} onPress={()=>props.navigation.navigate("Login")}/>
          <PrimaryButton
            onPress={()=>props.navigation.navigate("Packages")}
            text={AppStrings.viewPackage}
            customStyles={{marginTop: 0,mariginBottom:WINDOW_HEIGHT*0.02}}
            customTextStyle={{color: AppColors.black}}
            bottomGradientColor={'#FFF'}
            topGradientColor={'#FFF'}
          />
        </View>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bgImg: {
    height: WINDOW_HEIGHT,
    width: WINDOW_HEIGHT,
    position: 'absolute',
    transform: [{translateX: -WINDOW_WIDTH * 0.1}],
  },
});

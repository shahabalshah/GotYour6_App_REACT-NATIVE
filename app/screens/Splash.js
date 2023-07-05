import {StyleSheet, Text, View, Image, StatusBar, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {LOGO, REVEAL_LOGO} from '../assets';
import { WINDOW_HEIGHT } from '../utilities/Globals';
import PrimaryText from '../components/PrimaryText';

export default function Splash(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animationHandler = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  const navHandler = () => {
    setTimeout(() => {
      props.navigation.replace('AuthNavigationHandler');
    }, 4200);
  };
  useEffect(() => {
    animationHandler();
    navHandler()
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFF'} />
      <Animated.View style={{opacity: fadeAnim,height:WINDOW_HEIGHT*0.7,flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
        <Image source={REVEAL_LOGO} style={styles.prilogo} />
        <PrimaryText
        text={'Situational Awareness Solutions'.toLocaleUpperCase()}
        />
      </Animated.View>
      {/* <Image source={LOGO} style={styles.logo} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
    position: 'absolute',
    transform: [{translateY: -170},{translateX:-3}],
  },
  prilogo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    opacity: 1,
  },
});

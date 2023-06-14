import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useEffect} from 'react';
import {Svg, Path} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const SIZE = 200;

const AnimatedPath = Animated.createAnimatedComponent(Path);
// `C 0.4 ${c1y.value}, 0.6 ${c2y.value}, 1 0.5 `,
export default function Wave({percentage}) {
  const c1y = useSharedValue(0.5);
  const c2y = useSharedValue(0.2);

  const animatedProps = useAnimatedProps(() => {
    const path = [
      'M 0 0.5',
      `C 0.3 ${c2y.value}, 0.5 ${c1y.value}, 1 0.5 `,
      'V 4',
      'H 0',
    ].join(' ');

    return {
      d: path,
    };
  });
  const animatedProps2 = useAnimatedProps(() => {
    const path = [
      'M 0 0.5',
      `C 0.3 ${c1y.value}, 0.5 ${c2y.value}, 1 0.5 `,
      'V 4',
      'H 0',
    ].join(' ');

    return {
      d: path,
    };
  });

  const handleWave = () => {
    (c1y.value = 0.2), (c2y.value = 0.8);
    c1y.value = withRepeat(withTiming(0.8, {duration: 800}), -1, true);
    c2y.value = withDelay(
      100,
      withRepeat(withTiming(0.2, {duration: 800}), -1, true),
    );
  };
  useEffect(() => {
    handleWave();
  }, []);

  return (
    <View
      style={{
        height: 200,
        width: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      overflow="hidden"
      >
      <View
        style={{
          position: 'absolute',
          transform: [
            {
              translateY:
                percentage <= 0
                  ? 65
                  : (percentage <= 25)
                  ? 30
                  : (percentage >= 50 && percentage < 75)
                  ? 0
                  : (percentage >= 75 && percentage < 90)
                  ? -30
                  : (percentage > 95 && percentage <= 100)
                  ? -120
                  : (percentage > 75 && percentage >= 90)
                  ? -80
                  : 0,
            },
          ],
        }}>
        <View style={{flexDirection: 'row'}}>
          <Svg style={{width: 100, height: 500}} viewBox="0 0 1 1">
            <AnimatedPath
              fill={'rgba(100,216,256,0.8)'}
              animatedProps={animatedProps2}
            />
          </Svg>
          <Svg style={{width: 100, height: 500}} viewBox="0 0 1 1">
            <AnimatedPath
              fill={'rgba(100,216,256,0.8)'}
              animatedProps={animatedProps2}
            />
          </Svg>
          <View style={{flexDirection: 'row', position: 'absolute'}}>
            <Svg style={{width: 100, height: 500}} viewBox="0 0 1 1">
              <AnimatedPath
                fill={'rgba(1,216,256,0.8)'}
                animatedProps={animatedProps}
              />
            </Svg>
            <Svg style={{width: 100, height: 500}} viewBox="0 0 1 1">
              <AnimatedPath
                fill={'rgba(1,216,256,0.8)'}
                animatedProps={animatedProps}
              />
            </Svg>
          </View>
        </View>
      </View>
      <View style={{position: 'absolute'}}>
        <Text>50%</Text>
      </View>
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.0)',
          'rgba(0,0,0,0.01)',
          'rgba(0,0,0,0.2)',
          'rgba(0,0,0,0.5)',
        ]}
        style={{
          height: 200,
          width: 200,
          position: 'absolute',
        }}></LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({});

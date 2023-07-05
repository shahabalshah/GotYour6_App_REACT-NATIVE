import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {
  AppColors,
  FontSize,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../utilities/Globals';
import {
  INFO_ICON,
  IPHONE_ICON_HOME,
  MONITOR_ICON_HOME,
  TELEPHONE_HOME,
  SHARE_ICON,
  NAVIGATE_ICON,
  REFRESH_ICON,
  CHAT_BUBBLE_ICON,
  VIDEO_CAMERA,
  WATCH_ICON_HOME,
} from '../assets';
import PrimaryText from './PrimaryText';
import MediumText from './MediumText';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ActivityIndicator} from '@react-native-material/core';
import BoldText from './BoldText';

export default function NewDetailsBubble({
  userName,
  batteryLevel,
  onSharePress,
  onPressNavigation,
  onPressRefresh,
  onPressChatIcon,
  onPressVideoCamera,
  onPressTelephoneIcon,
  gadgetOnPress,
  isPhone,
  address,
  customIcon,
  dateString,
  dateStringOne,
  dateStringTwo,
}) {
  return (
    <View
      style={{
        position: 'absolute',
        transform: [
          {
            translateY:
              WINDOW_HEIGHT > 576 ? WINDOW_HEIGHT * 0.55 : WINDOW_HEIGHT * 0.7,
          },
          {
            translateX: WINDOW_WIDTH * 0.04,
          },
        ],
      }}>
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={isPhone ? IPHONE_ICON_HOME : WATCH_ICON_HOME}
            style={{height: 24, width: 24, resizeMode: 'contain'}}
          />
          <MediumText
            text={userName ? userName : 'User Name...'}
            customStyles={{
              fontSize: FontSize.normal,
              width: WINDOW_WIDTH * 0.3,
            }}
          />
          <Icon name="battery" size={12} color={'green'} />
          {batteryLevel &&
          batteryLevel !== NaN &&
          batteryLevel !== 'NaN%' &&
          batteryLevel != '0%' ? (
            <PrimaryText
              text={batteryLevel}
              customStyles={{
                fontSize: FontSize.small,
                color: AppColors.black,
                marginLeft: 2,
              }}
            />
          ) : (
            <ActivityIndicator size={'small'} color={AppColors.primary} />
          )}
        </View>
        <PrimaryText
          numberOfLines={2}
          text={!address && address == '' ? 'Waiting for Address' : address}
          customStyles={{
            color: AppColors.black,
            fontSize: FontSize.small,
            width: WINDOW_WIDTH * 0.6,
            lineHeight: 24,
          }}
        />

        <View
          style={{
            width: WINDOW_WIDTH * 0.6,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <PrimaryText
            text={dateStringOne}
            customStyles={{
              color: AppColors.blackLight,
              fontSize: FontSize.small,
            }}
          />
          <PrimaryText
            text={dateStringTwo}
            customStyles={{
              color: AppColors.blackLight,
              fontSize: FontSize.small,
            }}
          />
        </View>
        <View
          style={{
            width: WINDOW_WIDTH * 0.6,
            height: WINDOW_HEIGHT * 0.14,
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: AppColors.blackExtraLight,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: AppColors.blackExtraLight,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightWidth: 1,
                borderRightColor: AppColors.blackExtraLight,
              }}>
              <TouchableOpacity onPress={onPressTelephoneIcon}>
                <Image
                  source={TELEPHONE_HOME}
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightWidth: 1,
                borderRightColor: AppColors.blackExtraLight,
              }}>
              <TouchableOpacity onPress={onPressVideoCamera}>
                <Image
                  source={VIDEO_CAMERA}
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={onPressChatIcon}>
                <Image
                  source={CHAT_BUBBLE_ICON}
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightWidth: 1,
                borderRightColor: AppColors.blackExtraLight,
              }}>
              <TouchableOpacity onPress={onPressRefresh}>
                <Image
                  source={REFRESH_ICON}
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightWidth: 1,
                borderRightColor: AppColors.blackExtraLight,
              }}>
              <TouchableOpacity onPress={onPressNavigation}>
                <Image
                  source={NAVIGATE_ICON}
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={onSharePress}>
                <Image
                  source={SHARE_ICON}
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            width: WINDOW_WIDTH * 0.7,
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Image
            source={INFO_ICON}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH * 0.7,
    height: WINDOW_HEIGHT * 0.33,
    borderRadius: (WINDOW_HEIGHT * 0.09) / 2,
    backgroundColor: AppColors.white,
    flex: 1,
    flexDirection: 'column',
    padding: 15,
  },
});

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

export default function DetailsBubble({
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
}) {
  const [date, setdate] = useState(new Date());

  return (
    <View
      style={{
        alignItems: 'center',
        width: WINDOW_WIDTH,
        position: 'absolute',
        transform: [
          {
            translateY:
              WINDOW_HEIGHT > 576 ? WINDOW_HEIGHT * 0.5 : WINDOW_HEIGHT * 0.8,
          },
        ],
      }}>
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            onPress={gadgetOnPress}
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            {isPhone ? (
              <Image
                source={IPHONE_ICON_HOME}
                style={{height: 30, width: 50, resizeMode: 'contain'}}
              />
            ) : (
              <Image
                source={customIcon}
                style={{height: 30, width: 50, resizeMode: 'contain'}}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              flex:6,
              justifyContent: 'center',
              flexDirection:'row'
            }}>
            <View style={{marginLeft: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: WINDOW_WIDTH * 0.32,
                }}>
                <BoldText
                  text={'hellooo'}
                  customStyles={{
                    fontSize: FontSize.normal,
                    color: AppColors.black,
                    marginRight: 2,
                  }}
                />
                <Icon name="battery" size={12} color={'green'} />
                {batteryLevel !== NaN &&
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
                text={address == '' ? 'Waiting for Address' : address}
                customStyles={{
                  color: AppColors.black,
                  fontSize: FontSize.small,
                }}
              />
              <PrimaryText
                text={dateString}
                customStyles={{
                  color: AppColors.blackLight,
                  fontSize: FontSize.small,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 4}}>
          <View style={{flex: 1}}></View>
          <View
            style={{
              flex: 7,
              borderWidth: 1,
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
          <View style={{flex: 1}}></View>
        </View>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
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
    width: WINDOW_WIDTH * 0.75,
    height: WINDOW_HEIGHT * 0.4,
    borderRadius: (WINDOW_HEIGHT * 0.09) / 2,
    backgroundColor: AppColors.white,
    elevation: 5,
    flex: 1,
    flexDirection: 'column',
  },
});

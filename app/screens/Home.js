import {
  Platform,
  StyleSheet,
  Text,
  View,
  Share,
  PermissionsAndroid,
  Linking,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useState, useContext, useRef} from 'react';
import SafeView from '../components/SafeView';
import Mapbox from '@rnmapbox/maps';
import {
  AppColors,
  FontSize,
  MAIN_CARDWIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../utilities/Globals';
import HomeFloatingIcon from '../components/HomeFloatingIcon';
import {
  WATCH_ICON_HOME,
  IPHONE_ICON_HOME,
  PIN_ICON_HOME,
  LOCATION_HISTORY_ICON_HOME,
  SATELITE_ICON_HOME,
  MONITOR_ICON_HOME,
  LOGO,
  AVATAR_ONE,
  AVATAR_TWO,
  AVATAR_THREE,
  AVATAR_FOUR,
  AVATAR_FIVE,
  AVATAR_SIX,
  AIR_ICON,
  NEW_WATCH,
} from '../assets';
import DetailsBubble from '../components/DetailsBubble';
import {
  formatConnectionResponse,
  formatLocationResponse,
} from '../utilities/DataFormater';
import AppContext from '../utilities/AppContext';
import TcpSocket from 'react-native-tcp-socket';
import PrimaryText from '../components/PrimaryText';
import {ActivityIndicator} from '@react-native-material/core';
import {LOCATING} from '../assets/LottieAnimations';
import Lottie from 'lottie-react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {getData, postData} from '../utilities/ApiCalls';
import DeviceInfo from 'react-native-device-info';
import MapComp from '../components/MapComp';
import MapCompSatellite from '../components/MapCompSatellite';
import NewDetailsBubble from '../components/NewDetailsBubble';

Geocoder.init('AIzaSyAx7FCcvU1-w3vTvfTj6hokgqs_0LF3P54');

const connectionData = '[3G*7703762021*0009*LK,0,0,77]';

const locationSuccess =
  '[3G*7703762021*00ab*UD_LTE,030623,143103,A,51.498258,N,0.405050,W,0.77,311.415,45.7,10,100,91,0,0,00000000,2,1,234,20,137984,1119,100,1119,137984,7,1,My VW 8622,da:10:68:3d:11:ca,-77,1.194124]';

const locationFail =
  '[3G*7703762021*013a*UD_LTE,030623,210248,V,0,N,0,E,0,0,0,0,100,80,0,0,00000000,4,1,234,20,393288,1119,100,1119,393287,0,2147483647,2147483647,5,2147483647,2147483647,0,5,devolo-bcf2afaad671,bc:f2:af:aa:d6:71,-52,Chong,24:6f:8c:9c:34:90,-57,,24:6f:8c:9c:34:94,-57,Family room TV.v,fa:8f:ca:5d:e1:d3,-58,Infinite,50:70:43:36:f3:5a,-58,0]';
let newCRCounter = 0;
let isPhoneNew = true;
//[3G*7703762021*0002*TS]
//[3G*7703762021*0002*CR]
//[3G*7703762021*0002*LK]
let client;
client = TcpSocket.createConnection({
  host: 'gotyour693.com',
  port: 3000,
});

function formatDate(date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day.toString().padStart(2, '0')} ${
    months[monthIndex]
  },${year}`;
  return formattedDate;
}
export default function Home(props) {
  const fadeAnim = useRef(new Animated.Value(-WINDOW_WIDTH)).current;
  let timeOutOne;
  let timeOutTwo;
  let timeOutThree;
  const [showModal, setshowModal] = useState(false);
  const {DeviceId, UserData, setDeviceId} = useContext(AppContext);
  const [isSatellite, setisSatellite] = useState(false);
  const [batteryLevel, setbatteryLevel] = useState(0);
  const [mobLat, setmobLat] = useState(0);
  const [mobLong, setmobLong] = useState(0);
  const [WatchAddress, setWatchAddress] = useState('');
  const [isPhone, setisPhone] = useState(true);
  const [PhoneAddress, setPhoneAddress] = useState('');
  const [allDevies, setAllDevices] = useState([]);
  const [DeviceData, setDeviceData] = useState();
  const [MobileTime, setMobileTime] = useState(new Date());
  const [toggle, settoggle] = useState(false);
  const [locTime, setlocTime] = useState();
  const [LocationDate, setLocationDate] = useState(new Date());
  const [bubbleVisible, setbubbleVisible] = useState(false);
  // console.log('locationDate', LocationDate)
  const [phoneBatteryLevel, setphoneBatteryLevel] = useState();
  const [locationData, setlocationData] = useState({
    coordinates: [0, 0],
    status: 'fail',
    direction: 'X',
  });
  const [oldlocation, setoldlocation] = useState();
  const [LK, setLK] = useState(false);
  const [CRCount, setCRCount] = useState(0);
  const coordinates =
    locationData?.status == 'success'
      ? [
          locationData?.direction == 'W'
            ? -locationData?.coordinates[0]
            : locationData?.coordinates[0],
          locationData?.coordinates[1],
        ]
      : oldlocation?.status == 'success'
      ? [
          oldlocation?.direction == 'W'
            ? -oldlocation?.coordinates[0]
            : oldlocation?.coordinates[0],
          oldlocation?.coordinates[1],
        ]
      : [0, 0];
  const mobileCoordintaes = [mobLat, mobLong];
  const getBatteryLevel = async () => {
    const batteryLevelPhone = await DeviceInfo.getBatteryLevel();
    setphoneBatteryLevel(batteryLevelPhone);
    console.log('Battery Level:', batteryLevelPhone);
  };

  const sendCommandAfterDelay = (client, command) => {
    if (!client) {
      return;
    }
    console.log('calling');
    if (newCRCounter === 2 || newCRCounter === 1) {
      return;
    }
    if (client && command.includes(DeviceId)) {
      console.log('Sending command For Location:', command);
      client.write(command);
      newCRCounter = 0;
    }
  };

  const DialCall = () => {
    Linking.openURL(`tel:${DeviceData.phonenumber}`);
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: WINDOW_WIDTH * 0.01,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: -WINDOW_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const sendLKCommand = (client, command) => {
    if (!client) {
      return;
    }
    if (client) {
      console.log('Sending command LK:', command);
      client.write(command);
    } else {
      return;
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              // console.log('position', position)
              setmobLat(position.coords.latitude);
              setmobLong(position.coords.longitude);
              getPhoneAddress(
                position.coords.latitude,
                position.coords.longitude,
              );
              // setMobileTime(new Date(position.coords.timestamp))
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('location Denied!');
        }
      } else {
        const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if (result === RESULTS.GRANTED) {
          console.log('Location permission granted.');
          // You can perform additional logic here after obtaining the permission
        } else if (result === RESULTS.DENIED) {
          const requestResult = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );

          if (requestResult === RESULTS.GRANTED) {
            console.log('Location permission granted.');
            // You can perform additional logic here after obtaining the permission
          } else {
            console.log('Location permission denied.');
            // You can handle the denial of permission here
          }
        }
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  const getWatchAddress = async (lat, long) => {
    let res = await Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        // console.log('addressComponent', addressComponent);

        setWatchAddress(addressComponent);
      })
      .catch(error => {
        // console.log('Address not extracted');
        console.log('error', error);
      });
  };
  const getPhoneAddress = async (lat, long) => {
    let res = await Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        // console.log('addressComponent', addressComponent);
        setPhoneAddress(addressComponent);
      })
      .catch(error => {
        // console.log('Address not extracted');
        console.log('error', error);
      });
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    //   client = TcpSocket.createConnection({
    //   host: 'gotyour693.com',
    //   port: 3000,
    // });
    // client = client.createConnection({
    //   host: 'gotyour693.com',
    //   port: 3000,
    // })
    // Establish a connection to the TCP socket
    const connectToSocket = () => {
      return new Promise((resolve, reject) => {
        // Handle connection events
        client.on('connect', () => {
          console.log('Connected to TCP socket');
          resolve();
        });

        client.on('data', data => {
          console.log('Received data from TCP socket:', data.toString());
          if (data.toString().includes('LK')) {
            setLK(true);
            // setbatteryLevel(formatConnectionResponse(data.toString()));
          } else if (
            data.toString().includes('UD') ||
            (data.toString().includes('TDSCDMA') &&
              data.toString().includes(DeviceId))
          ) {
            newCRCounter = newCRCounter + 1;
            if (data.toString().includes(DeviceId)) {
              console.log('DeviceId in CR command', DeviceId);
              sendCommandAfterDelay(client, `[3G*${DeviceId}*0002*CR]`);
            }
            // console.log('CRCount', CRCount);
            // console.log('locationData', locationData);
            clearTimeout(timeOutTwo);
            let locRes = formatLocationResponse(data.toString());

            if (
              locRes?.status == 'success' &&
              data.toString().includes(DeviceId)
            ) {
              console.log('in here success!');
              setLocationDate(new Date());
              setoldlocation(locRes);
              console.log('oldlocation', oldlocation)
              setbatteryLevel(locRes.batteryLevel);
              getWatchAddress(
                locRes.coordinates[1],
                locRes.direction == 'W'
                  ? -locRes.coordinates[0]
                  : locRes.coordinates[0],
              );
              // console.log('oldlocation', oldlocation);
            } else if (
              locRes?.status == 'fail' &&
              data.toString().includes(DeviceId)
            ) {
              setbatteryLevel(locRes.batteryLevel);
            }
            // console.log('locRes', locRes);
            // console.log('locationData', locationData);
            setlocationData(locRes);
          }
          if (
            data.toString().includes('CONFIG') &&
            data.toString().includes(DeviceId)
          ) {
            newCRCounter = 3;
            setLK(true);
            console.log('LK is here', LK);
            sendCommandAfterDelay(client, `[3G*${DeviceId}*0002*CR]`);
            console.log('DeviceId in CR command', DeviceId);
          }
        });

        client.on('error', error => {
          console.log('TCP socket error:', error);
          clearTimeout(timeOutOne);
          clearTimeout(timeOutTwo);
          reject(error);
        });

        client.on('close', () => {
          console.log('TCP socket connection closed');
          clearTimeout(timeOutOne);
          clearTimeout(timeOutTwo);
        });
      });
    };

    // Connect to the TCP socket
    connectToSocket()
      .then(() => {
        sendLKCommand(client, `[3G*${DeviceId}*0002*LK]`);
      })
      .catch(error => {
        console.log('error in call');
        clearTimeout(timeOutOne);
        clearTimeout(timeOutTwo);
      })
      .then(() => {
        console.log('Command sent successfully after 30 seconds');
      })
      .catch(error => {
        clearTimeout(timeOutOne);
        clearTimeout(timeOutTwo);
        console.error(
          'Error while establishing connection or sending command:',
          error,
        );
      });

    // Clean up the connection when the component unmounts
  }, [toggle]);

  const handleShareLocation = () => {
    const locationUrl = !isPhone
      ? `https://www.google.com/maps/search/?api=1&query=${coordinates[1]},${coordinates[0]}`
      : `https://www.google.com/maps/search/?api=1&query=${mobLat},${mobLong}`;
    const phoneLocatin = Share.share({
      message: `Check Out my Location from GotYour6 App: ${locationUrl}`,
      url: locationUrl,
    });
  };

  useEffect(() => {
    return () => {
      // client.destroy(); // Close the TCP socket connection here
      clearTimeout(timeOutOne);
      clearTimeout(timeOutTwo);
    };
  }, []);

  useEffect(() => {
    timeOutThree = 3000;
    setInterval(() => {
      if (isPhoneNew) {
      } else {
        // console.log('Watch.....');
      }
    }, timeOutThree);

    return () => {
      clearInterval(timeOutThree);
    };
  }, []);

  useEffect(() => {
    getPhoneAddress(mobLat, mobLong);
  }, [mobLat]);

  const deviceGetAll = () => {
    console.log('UserData._id', UserData._id);
    postData('device/findAllDevice/', {userid: UserData._id}).then(res => {
      // console.log('all watches data', res.user.data);
      setAllDevices(res.user.data);
    });
  };

  useEffect(() => {
    getBatteryLevel();
    console.log('DeviceId', DeviceId);
    deviceGetAll();
    postData('device/deviceDetails/', {deviceID: DeviceId}).then(res => {
      // console.log('WATCH INFOOOOOOOOOO...........', res);
      setDeviceData(res.user.data);
    });
  }, [oldlocation || mobLat]);

  useEffect(() => {
    setoldlocation({
      coordinates: [0, 0],
      status: 'fail',
      direction: 'X',
    });
    sendLKCommand(client, `[3G*${DeviceId}*0002*LK]`);
  }, [toggle]);

  return (
    <SafeView>
      {isPhone ? (
        isSatellite ? (
          <MapCompSatellite
            coordinates={coordinates}
            isPhone={isPhone}
            mobLat={mobLat}
            mobLong={mobLong}
            onPinPress={() => {
              if (bubbleVisible) {
                fadeOut();
              } else if (!bubbleVisible) {
                fadeIn();
              }
              setbubbleVisible(!bubbleVisible);
            }}
          />
        ) : (
          <MapComp
            coordinates={coordinates}
            isPhone={isPhone}
            mobLat={mobLat}
            mobLong={mobLong}
            onPinPress={() => {
              if (bubbleVisible) {
                fadeOut();
              } else if (!bubbleVisible) {
                fadeIn();
              }
              setbubbleVisible(!bubbleVisible);
            }}
          />
        )
      ) : null}

      {LK && !isPhone ? (
        oldlocation?.direction != 'X' && oldlocation?.status != 'fail' ? (
          isSatellite ? (
            <MapCompSatellite
              coordinates={coordinates}
              isPhone={isPhone}
              onPinPress={() => {
                if (bubbleVisible) {
                  fadeOut();
                } else if (!bubbleVisible) {
                  fadeIn();
                }
                setbubbleVisible(!bubbleVisible);
              }}
            />
          ) : (
            <MapComp
              coordinates={coordinates}
              isPhone={isPhone}
              onPinPress={() => {
                if (bubbleVisible) {
                  fadeOut();
                } else if (!bubbleVisible) {
                  fadeIn();
                }
                setbubbleVisible(!bubbleVisible);
              }}
            />
          )
        ) : (
          <View
            style={{
              width: WINDOW_WIDTH,
              height: WINDOW_HEIGHT,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Lottie source={LOCATING} autoPlay loop />
          </View>
        )
      ) : null}
      <View style={styles.iconsContainer}>
        <HomeFloatingIcon
          source={WATCH_ICON_HOME}
          text={'Add\nGadget'}
          onPress={() => props.navigation.navigate('ScanWatch')}
        />
        <HomeFloatingIcon
          source={
            isPhone ? IPHONE_ICON_HOME : WATCH_ICON_HOME
            //   DeviceData?.avatar == 'A'
            // ? AVATAR_ONE
            // : DeviceData?.avatar == 'B'
            // ? AVATAR_TWO
            // : DeviceData?.avatar == 'C'
            // ? AVATAR_THREE
            // : DeviceData?.avatar == 'D'
            // ? AVATAR_FOUR
            // : DeviceData?.avatar == 'E'
            // ? AVATAR_FIVE
            // : AVATAR_SIX
          }
          text={isPhone ? UserData?.name : DeviceData?.name}
          onPress={() => {
            setisPhone(!isPhone);
            isPhoneNew = !isPhoneNew;
          }}
        />
        <HomeFloatingIcon
          onPress={() => setshowModal(true)}
          source={NEW_WATCH}
          text={'My\nGadgets'}
        />
        <HomeFloatingIcon
          source={LOCATION_HISTORY_ICON_HOME}
          text={'Location\nHistory'}
        />
        <HomeFloatingIcon source={PIN_ICON_HOME} text={'GeoFence'} />

        <HomeFloatingIcon
          source={SATELITE_ICON_HOME}
          text={!isSatellite ? 'Satelite' : 'Hybrid'}
          onPress={() => setisSatellite(!isSatellite)}
        />
        <HomeFloatingIcon source={MONITOR_ICON_HOME} text={'Health\nMonitor'} />

        <HomeFloatingIcon source={AIR_ICON} text={'Air\nQuality'} />
        <HomeFloatingIcon source={IPHONE_ICON_HOME} text={'App\nGuide'} />
      </View>
      {/* <DetailsBubble
        dateString={
          !isPhone
            ? LocationDate?.toLocaleTimeString() +
              ' ' +
              formatDate(LocationDate)
            : MobileTime?.toLocaleTimeString() +
              ' ' +
              formatDate(MobileTime)
        }
        userName={isPhone ? UserData?.name : DeviceData?.name}
        batteryLevel={
          isPhone
            ? (phoneBatteryLevel * 100).toFixed(0) + '%'
            : batteryLevel + '%'
        }
        onSharePress={() => {
          handleShareLocation();
        }}
        gadgetOnPress={() => {
          setisPhone(!isPhone);
          isPhoneNew = !isPhoneNew;
        }}
        isPhone={isPhone}
        onPressRefresh={() => {
          newCRCounter = 3;
          sendCommandAfterDelay(client, `[3G*${DeviceId}*0002*CR]`);
        }}
        onPressTelephoneIcon={() => DialCall()}
        address={isPhone ? PhoneAddress : WatchAddress}
        customIcon={
          WATCH_ICON_HOME
        }
      /> */}
      <Animated.View style={{transform: [{translateX: fadeAnim}]}}>
        <NewDetailsBubble
          dateStringOne={
            !isPhone
              ? LocationDate?.toLocaleTimeString()
              : MobileTime?.toLocaleTimeString()
          }
          dateStringTwo={
            !isPhone ? formatDate(LocationDate) : formatDate(MobileTime)
          }
          userName={isPhone ? UserData?.name : DeviceData?.name}
          batteryLevel={
            isPhone
              ? (phoneBatteryLevel * 100).toFixed(0) + '%'
              : batteryLevel + '%'
          }
          onSharePress={() => {
            handleShareLocation();
          }}
          gadgetOnPress={() => {
            setisPhone(!isPhone);
            isPhoneNew = !isPhoneNew;
          }}
          isPhone={isPhone}
          onPressRefresh={() => {
            newCRCounter = 3;
            sendCommandAfterDelay(client, `[3G*${DeviceId}*0002*CR]`);
          }}
          onPressTelephoneIcon={() => DialCall()}
          address={isPhone ? PhoneAddress : WatchAddress}
          customIcon={WATCH_ICON_HOME}
        />
      </Animated.View>
      <Modal visible={showModal} animationType={'slide'} transparent={true}>
        <TouchableOpacity onPress={() => setshowModal(false)}>
          <Text>Close</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: AppColors.modalBG,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: MAIN_CARDWIDTH,
              height: WINDOW_HEIGHT * 0.4,
              backgroundColor: AppColors.lightGray,
              borderRadius: 15,
              alignItems: 'center',
            }}>
            <PrimaryText text={'Select Gadget'} />
            <FlatList
              data={allDevies}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setDeviceData(item);
                      setDeviceId(item.deviceID);
                      setshowModal(false);
                      settoggle(!toggle);
                      setbatteryLevel('0');
                      setWatchAddress('Waiting for Address');
                      setLK(true);
                    }}
                    style={{
                      flexDirection: 'row',
                      width: MAIN_CARDWIDTH * 0.9,
                      height: WINDOW_HEIGHT * 0.07,
                      backgroundColor: AppColors.white,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 12,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={
                          item.avatar == 'A'
                            ? AVATAR_ONE
                            : item.avatar == 'B'
                            ? AVATAR_TWO
                            : item.avatar == 'C'
                            ? AVATAR_THREE
                            : item.avatar == 'D'
                            ? AVATAR_FOUR
                            : item.avatar == 'E'
                            ? AVATAR_FIVE
                            : AVATAR_SIX
                        }
                        style={{height: 30, width: 30, resizeMode: 'contain'}}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}>
                        <PrimaryText text={item.name} />
                        <PrimaryText
                          text={item.phonenumber}
                          customStyles={{fontSize: FontSize.small}}
                        />
                      </View>
                    </View>
                    <View
                      style={
                        DeviceId == item.deviceID
                          ? styles.selected
                          : styles.unselected
                      }
                    />

                    {/* {"IEMI": "865677037620217", "__v": 0, "_id": "6491d2e47332da7172f98151", "avatar": "D", "createdAt": "2023-06-20T16:25:08.385Z", "deviceID": "7703762021", "name": "WowWatch", "phonenumber": "+923454896389", "status": "ACTIVE", "updatedAt": "2023-06-20T16:25:08.385Z", "userid": "649040b818c7939c7accfdb1"} */}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    alignItems: 'center',
    width: 80,
    height: WINDOW_HEIGHT * 0.75,
    backgroundColor: 'transparent',
    position: 'absolute',
    transform: [
      {translateX: WINDOW_WIDTH * 0.8},
      {
        translateY: WINDOW_HEIGHT * 0.01,
      },
    ],
  },
  selected: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: AppColors.primary,
    marginRight: 15,
  },
  unselected: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: AppColors.white,
    marginRight: 15,
    borderWidth: 1,
    borderColor: AppColors.blackLight,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import SafeView from '../components/SafeView';
import Mapbox, {setAccessToken} from '@rnmapbox/maps';
import {AppColors, WINDOW_HEIGHT, WINDOW_WIDTH} from '../utilities/Globals';
import HomeFloatingIcon from '../components/HomeFloatingIcon';
import {
  WATCH_ICON_HOME,
  IPHONE_ICON_HOME,
  PIN_ICON_HOME,
  LOCATION_HISTORY_ICON_HOME,
  SATELITE_ICON_HOME,
  MONITOR_ICON_HOME,
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

const connectionData = '[3G*7703762021*0009*LK,0,0,77]';

const locationSuccess =
  '[3G*7703762021*00ab*UD_LTE,030623,143103,A,51.498258,N,0.405050,W,0.77,311.415,45.7,10,100,91,0,0,00000000,2,1,234,20,137984,1119,100,1119,137984,7,1,My VW 8622,da:10:68:3d:11:ca,-77,1.194124]';

const locationFail =
  '[3G*7703762021*013a*UD_LTE,030623,210248,V,0,N,0,E,0,0,0,0,100,80,0,0,00000000,4,1,234,20,393288,1119,100,1119,393287,0,2147483647,2147483647,5,2147483647,2147483647,0,5,devolo-bcf2afaad671,bc:f2:af:aa:d6:71,-52,Chong,24:6f:8c:9c:34:90,-57,,24:6f:8c:9c:34:94,-57,Family room TV.v,fa:8f:ca:5d:e1:d3,-58,Infinite,50:70:43:36:f3:5a,-58,0]';
let newCRCounter = 0;
//[3G*7703762021*0002*TS]
//[3G*7703762021*0002*CR]
//[3G*7703762021*0002*LK]
export default function Home(props) {
  let timeOutOne;
  let timeOutTwo;
  const {DeviceId, UserData} = useContext(AppContext);
  console.log('UserData', UserData);
  const [batteryLevel, setbatteryLevel] = useState(0);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
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
  console.log('coordinates', coordinates);
  console.log('locationData', locationData);
  const defaultStyle = {
    version: 8,
    name: 'Land',
    sources: {
      map: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        minzoom: 1,
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#f2efea',
        },
      },
      {
        id: 'map',
        type: 'raster',
        source: 'map',
        paint: {
          'raster-fade-duration': 100,
        },
      },
    ],
  };

  const sendCommandAfterDelay = (client, command) => {
    if (!client) {
      return;
    }
    console.log('calling');
    if (newCRCounter === 2 || newCRCounter === 1) {
      return;
    }
    if (client) {
      console.log('Sending command For Location:', command);
      client.write(command);
      newCRCounter = 0;
    }
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

  useEffect(() => {
    let client = TcpSocket.createConnection({
      host: 'gotyour693.com',
      port: 3000,
    });

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
            setbatteryLevel(formatConnectionResponse(data.toString()));
          } else if (
            data.toString().includes('UD_LTE') ||
            data.toString().includes('UD_WCDMA') ||
            data.toString().includes('UD_TDSCDMA') ||
            data.toString().includes('WCDMA') ||
            data.toString().includes('TDSCDMA')
          ) {
            newCRCounter = newCRCounter + 1;
            if (newCRCounter === 3) {
              sendCommandAfterDelay(client, `[3G*${DeviceId}*0002*CR]`);
            }
            console.log('CRCount', CRCount);
            console.log('locationData', locationData);
            clearTimeout(timeOutTwo);
            let locRes = formatLocationResponse(data.toString());
            if (locRes?.status == 'success') {
              console.log('in here success!');
              setoldlocation(locRes);
              console.log('oldlocation', oldlocation);
            }
            console.log('locRes', locRes);
            console.log('locationData', locationData);
            setlocationData(locRes);
          } else if (data.toString().includes('CONFIG')) {
            setLK(true);
            console.log('LK is here', LK);
            clearTimeout(timeOutTwo);
            sendCommandAfterDelay(client, `[3G*${DeviceId}*0002*CR]`);
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
    return () => {
      client.destroy(); // Close the TCP socket connection here
      clearTimeout(timeOutOne);
      clearTimeout(timeOutTwo);
    };
  }, []);

  return (
    <SafeView>
      {LK ? (
        oldlocation?.direction != 'X' && oldlocation?.status != 'fail' ? (
          <Mapbox.MapView
            styleJSON={JSON.stringify(defaultStyle)}
            style={{
              height: WINDOW_HEIGHT,
              width: WINDOW_WIDTH,
              position: 'absolute',
            }}>
            <Mapbox.Camera
              zoomLevel={14}
              //   style={{flex: 1}}
              centerCoordinate={coordinates}
            />
            <Mapbox.PointAnnotation id="point" coordinate={coordinates} />
          </Mapbox.MapView>
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
      ) : (
        <View
          style={{
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <PrimaryText text={'Waiting for Connection....'} />
          <ActivityIndicator size={'large'} color={AppColors.primary} />
        </View>
      )}
      <View style={styles.iconsContainer}>
        <HomeFloatingIcon source={WATCH_ICON_HOME} text={'Add\nGadget'} />
        <HomeFloatingIcon
          onPress={() => props.navigation.navigate('GadgetDetails')}
          source={IPHONE_ICON_HOME}
          text={UserData.name}
        />
        <HomeFloatingIcon source={PIN_ICON_HOME} text={'GeoFence'} />
        <HomeFloatingIcon
          source={LOCATION_HISTORY_ICON_HOME}
          text={'Location\nHistory'}
        />
        <HomeFloatingIcon source={SATELITE_ICON_HOME} text={'Satelite'} />
        <HomeFloatingIcon source={MONITOR_ICON_HOME} text={'Health\nMonitor'} />
        <HomeFloatingIcon source={MONITOR_ICON_HOME} text={'Air\nQuality'} />
      </View>
      <DetailsBubble
        userName={UserData.name}
        batteryLevel={batteryLevel + '%'}
      />
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
});

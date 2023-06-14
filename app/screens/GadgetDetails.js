import {StyleSheet, Text, View,ScrollView} from 'react-native';
import React from 'react';
import SafeView from '../components/SafeView';
import Header from '../components/Header';
import {AppStrings} from '../utilities/AppStrings';
import {
  AppColors,
  FontSize,
  MAIN_CARDWIDTH,
  WINDOW_WIDTH,
} from '../utilities/Globals';
import PrimaryText from '../components/PrimaryText';
import MediumText from '../components/MediumText';
import Mapbox from '@rnmapbox/maps';

export default function GadgetDetails(props) {
  const coordinates = [71.48929, 34.002478];
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
  return (
    <SafeView>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Header
          title={AppStrings.gadgeDetails}
          onBackPress={() => props.navigation.goBack()}
        />
        <View
          style={{
            width: WINDOW_WIDTH * 0.95,
            borderRadius: 10,
            backgroundColor: AppColors.white,
            marginTop: 15,
          }}>
          <View style={{flexDirection: 'row', marginTop: 22}}>
            <PrimaryText
              text={'User Name'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
            <MediumText
              text={'Kelly'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 22}}>
            <PrimaryText
              text={'Gadget ID'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
            <MediumText
              text={'123456789'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 22}}>
            <PrimaryText
              text={'Gadget ID'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
            <MediumText
              text={'123456789'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 22}}>
            <PrimaryText
              text={'Location'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
            <MediumText
              text={'66 Romford Road, Eastlight Avenue, Essex, London'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 22}}>
            <PrimaryText
              text={'Data'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
            <MediumText
              text={'Wifi /Sim Card'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 22}}>
            <PrimaryText
              text={'Gadget Status'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
            <MediumText
              text={'Online/Offline'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 22}}>
            <PrimaryText
              text={'Last Update'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
            <MediumText
              text={'05:54:45 01 Jan 2022'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 22}}>
            <PrimaryText
              text={'Battery Health'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
            <MediumText
              text={'55%'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 22, marginBottom: 22}}>
            <PrimaryText
              text={'Map'}
              customStyles={{
                fontSize: FontSize.normal,
                marginLeft: 10,
                marginRight: 60,
              }}
            />
          </View>
          <View style={{width:WINDOW_WIDTH*0.95,alignItems:'center'}}>
            <Mapbox.MapView
              styleJSON={JSON.stringify(defaultStyle)}
              style={{
                height: 300,
                width: 350,
              }}>
              <Mapbox.Camera
                zoomLevel={14}
                //   style={{flex: 1}}
                centerCoordinate={coordinates}
              />
              <Mapbox.PointAnnotation id="point" coordinate={coordinates} />
            </Mapbox.MapView>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({});

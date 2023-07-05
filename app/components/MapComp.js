import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Mapbox from '@rnmapbox/maps';
import { WINDOW_HEIGHT,WINDOW_WIDTH } from '../utilities/Globals';


export default function MapComp({isPhone, coordinates, mobLong, mobLat,onPinPress}) {
  return (
    <Mapbox.MapView
    styleJSON={Mapbox.StyleURL.Street}
    style={{
      height: WINDOW_HEIGHT,
      width: WINDOW_WIDTH,
      position: 'absolute',
    }}>
      
    <Mapbox.Camera
      zoomLevel={17}
      centerCoordinate={!isPhone ? coordinates : [mobLong, mobLat]}
    />
    <Mapbox.PointAnnotation
      id="point"
      coordinate={!isPhone ? coordinates : [mobLong, mobLat]}
      onSelected={onPinPress}
    />
  </Mapbox.MapView>
  )
}

const styles = StyleSheet.create({})
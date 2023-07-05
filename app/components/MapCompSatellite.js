import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import React from 'react'
import Mapbox from '@rnmapbox/maps';
import { WINDOW_HEIGHT,WINDOW_WIDTH } from '../utilities/Globals';
export default function MapCompSatellite({isPhone, coordinates, mobLong, mobLat,onPinPress}) {
  return (
    <Mapbox.MapView
    styleJSON={Mapbox.StyleURL.SatelliteStreet}
    style={{
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
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
import React from 'react';
import { Platform, View } from 'react-native';
export default function SafeView({ children,customStyle}) {
  return (
    <View
      style={[{
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 35 : 0,
      },customStyle]}>
      {children}
    </View>
  );
}
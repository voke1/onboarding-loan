import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';

export default () => (
  <View
    style={{
      alignItems: 'center',
      flex: 0.3,
      justifyContent: 'center',
    }}
  >
    <ActivityIndicator
      size="large"
    />
  </View>
);

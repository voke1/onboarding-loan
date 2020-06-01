import React from 'react';
import { 
  ActivityIndicator, 
  View
} from 'react-native';

export default () => {
  return <View 
    style={{
      alignItems: 'center',
      flex: .3,
      justifyContent: 'center'
    }}
  >
    <ActivityIndicator 
      size="large"
    />
  </View>
};

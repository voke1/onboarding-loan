import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Icon
} from 'native-base';
import PropTypes from 'prop-types';

import Text from '../../../components/text';
import { WHITE_SPACING } from '../../../constants/styles';
import StripIcon from './strip-icon';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'column',
    height: 149.2,
    justifyContent: 'center',
    margin: WHITE_SPACING * 2,
    marginRight: WHITE_SPACING,
    padding: WHITE_SPACING * 2,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    width: 140,
  },
});

const strip = (props) => {
  const {
    androidIcon, iconStyle, iosIcon, onPress,
    style, subtitle, text, textStyle,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        ...style,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-evenly',
        }}
      >
        {/* <Icon
          android={androidIcon}
          ios={iosIcon}
          style={{
            ...iconStyle,
            fontSize: 200,
            opacity: .035,
            position: 'absolute',
            top: -25,
            left: -75,
          }}
        /> */}
        <StripIcon
          android={androidIcon}
          ios={iosIcon}
          style={iconStyle}
        />
      
        {/* <Text
          bold
          left
          style={{
            flexWrap: 'wrap',
            fontSize: 14,
            width: '100%',
            ...textStyle,
          }}
          white
        >
          {text}
        </Text> */}
        {/* {subtitle && (
          <Text
            grey
          >
            {subtitle}
          </Text>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

strip.propTypes = {
  androidIcon: PropTypes.string,
  iconStyle: PropTypes.object,
  iosIcon: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  textStyle: PropTypes.object,
};

export default strip;

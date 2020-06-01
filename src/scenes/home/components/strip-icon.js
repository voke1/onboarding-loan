import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { COLOUR_WHITE } from '../../../constants/styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(40, 40, 40, .15)',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
});

const stripIcon = (props) => {
  const {
    android,
    style,
    ios,
  } = props;

  return (
    <View
      style={
        styles.container
      }
    >
      <Icon
        android={android}
        ios={ios}
        style={{
          color: COLOUR_WHITE,
          fontSize: 30,
          ...style,
        }}
      />
    </View>
  );
};

stripIcon.propTypes = {
  android: PropTypes.string,
  ios: PropTypes.string,
  style: PropTypes.object,
};

export default stripIcon;

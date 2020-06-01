import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';


const BaseScene = (props) => {
  const {
    children,
    style,
  } = props;

  return (
    <View
      style={{
        ...styles.view,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

BaseScene.propTypes = {
  children: PropTypes.object,
  style: PropTypes.object,
};

export default BaseScene;

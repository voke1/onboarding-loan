import React from 'react';
import { Image, StatusBar } from 'react-native';

import { COLOUR_TRANSPARENT } from '../../constants/styles';
import BaseScene from '../base/scene';
import smedanLogo from '../../assets/images/smedan_logo.png';
import styles from './styles';

const SplashScene = () => (
  <BaseScene
    style={{
      ...styles.view,
    }}
  >
    <StatusBar
      animated
      backgroundColor={COLOUR_TRANSPARENT}
      barStyle="dark-content"
      translucent
    />
    <Image
      resizeMode="contain"
      style={{
        width: 350,
        height: 350,
      }}
      source={smedanLogo}
    />
  </BaseScene>
);

export default SplashScene;

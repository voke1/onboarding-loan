import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import {
  Button,
  Text as NbText,
  View,
} from 'native-base';
import PropTypes from 'prop-types';

import BaseScene from '../base/scene';
import Text from '../../components/text';
import { COLOUR_TRANSPARENT, COLOUR_GREEN } from '../../constants/styles';
import bannerImage from '../../assets/images/BackgroundImage.jpeg';
import styles from './styles';


const LandingScene = (props) => {
  const { navigation } = props;
  console.log('landing props: ', props);

  return (
    <BaseScene
      style={styles.view}
    >
      <StatusBar
        animated
        backgroundColor={COLOUR_TRANSPARENT}
        barStyle="light-content"
        translucent
      />

      <ImageBackground
        imageStyle={{
          backgroundColor: 'rgba(0, 0, 0, 1)',
          opacity: 0.65,
        }}
        resizeMethod="scale"
        resizeMode="cover"
        source={bannerImage}
        style={styles.imageBackground}
      >
        <View
          style={styles.innerContainer}
        >
          <View>
            <Text
              biggest
              bold
              white
              style={{
                letterSpacing: 5,
                textShadowColor: 'rgba(10, 10, 10, .4)',
                textShadowRadius: 10,
                textShadowOffset: {
                  height: 5,
                  width: 0,
                },
              }}
            >
              SMEDAN
            </Text>
            <Text big bold white>Empowering MSMEs.</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              block
              onPress={() => navigation.replace('LoginScene')}
              style={{
                backgroundColor: COLOUR_GREEN,
              }}
            >
              <NbText>LOGIN </NbText>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </BaseScene>
  );
};

LandingScene.propTypes = {
  navigation: PropTypes.any,
};

export default LandingScene;

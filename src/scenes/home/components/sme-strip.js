import React from 'react';
import { 
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import {
  COLOUR_WHITE,
  COLOUR_BLACK,
  COLOUR_GREEN,
  COLOUR_GREEN_DARK,
  COLOUR_RED,
  WHITE_SPACING,
  COLOUR_GREY,
} from '../../../constants/styles';
import Text from '../../../components/text';


const SMEStrip = (props) => {
  const {
    business_address, business_name,
    middleName, navigation, photo, phone_number
  } = props;

  const initialCircleBackgroundColor = 'rgb(' + (Math.floor(Math.random() * 187)) + ',' + (Math.floor(Math.random() * 200)) + ',' + (Math.floor(Math.random() * 127)) + ')';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SMEDetailsScene', {
        SME: props,
      })}
      style={{
        alignItems: 'center',
        backgroundColor: COLOUR_WHITE,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        marginBottom: WHITE_SPACING,
        padding: WHITE_SPACING,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View style={{
          alignItems: 'center',
          backgroundColor: initialCircleBackgroundColor,
          borderRadius: 25,
          height: 50,
          justifyContent: 'center',
          marginRight: WHITE_SPACING,
          width: 50,
        }}>
          <Text
            mid
            white
          >
            {business_name}
          </Text>
        </View>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
          }}
        >
          <Text title>{`${business_name}`}</Text>
          <Text numberOfLines={1} grey>{`${phone_number} | ${business_address}`}</Text>
        </View>
      </View>
      <View>
        <Icon
          android="md-arrow-dropright"
          color={COLOUR_GREY}
          ios="ios-arrow-dropright"
        />
      </View>
    </TouchableOpacity>
  );
};

SMEStrip.propTypes = {
  business_address: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  middleName: PropTypes.string,
  navigation: PropTypes.object,
  photo: PropTypes.string,
};

export default SMEStrip;

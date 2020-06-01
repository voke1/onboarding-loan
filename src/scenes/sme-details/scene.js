import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Header, Left, Body, Title, Icon, Right,
} from 'native-base';
import PropTypes from 'prop-types';

import BaseScene from '../base/scene';
import { COLOUR_GREEN, COLOUR_WHITE, WHITE_SPACING } from '../../constants/styles';
import Text from '../../components/text';


const SMEDetailsScene = (props) => {
  const { navigation } = props;
  const sme = navigation.getParam('SME', {});
  const { 
    business_address, business_name, date_year_of_starting_business,
    business_premises, email, phone_number, website, ownership_type,
    registration_number, asset_category, employment_category, trading,
    manufacturing, specialised_services, general_services,
  } = sme;

  return (
    <BaseScene>
      <Header
        androidStatusBarColor={COLOUR_GREEN}
        style={{
          backgroundColor: COLOUR_GREEN,
        }}
      >
        <Left>
          <Icon
            android="md-arrow-back"
            ios="ios-arrow-back"
            onPress={() => navigation.goBack()}
            style={{
              color: COLOUR_WHITE,
            }}
          />
        </Left>
        <Body>
          <Title>{`${business_name}`}</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => navigation.navigate('EditSME', {sme})}>
            <Icon 
              android="md-document"
              ios="ios-document"
              style={{
                color: COLOUR_WHITE,
              }}
            />
          </TouchableOpacity>
        </Right>
      </Header>
      <ScrollView
        contentContainerStyle={{
          padding: WHITE_SPACING,
        }}
      >
        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Business Name</Text>
          <Text>{business_name}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Business Address</Text>
          <Text>{business_address}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Date/Year of Starting Business</Text>
          <Text>{date_year_of_starting_business}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Business Premises</Text>
          <Text>{business_premises}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Email</Text>
          <Text>{email}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Phone Number</Text>
          <Text>{phone_number}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Website</Text>
          <Text>{website}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Ownership Type</Text>
          <Text>{ownership_type}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Registration Number</Text>
          <Text>{registration_number}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Asset Category</Text>
          <Text>{asset_category}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Employment Category</Text>
          <Text>{employment_category}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Trading</Text>
          <Text>{trading}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Manufacturing</Text>
          <Text>{manufacturing}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>Specialised Services</Text>
          <Text>{specialised_services}</Text>
        </View>

        <View style={{marginVertical: WHITE_SPACING}}>
          <Text bold title>General Services</Text>
          <Text>{general_services}</Text>
        </View>
      </ScrollView>
    </BaseScene>
  );
};

SMEDetailsScene.propTypes = {
  navigation: PropTypes.object,
};

export default SMEDetailsScene;

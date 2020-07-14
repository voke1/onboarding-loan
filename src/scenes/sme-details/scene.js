import React, { Component } from 'react';
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
import Acordion from '../../Accordion/Accordion';

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
          <TouchableOpacity onPress={() => navigation.navigate('EditSME', { sme })}>
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
      <Acordion />
    </BaseScene>
  );
};

SMEDetailsScene.propTypes = {
  navigation: PropTypes.object,
};

export default SMEDetailsScene;

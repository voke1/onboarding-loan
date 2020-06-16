import React from 'react';
import { 
  Alert,
  ScrollView,
} from 'react-native';
import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Text as NbText,
  Title,
  Right,
} from 'native-base';
import PropTypes from 'prop-types';

import BaseScene from '../base/scene';
import { 
  COLOUR_GREEN,
  COLOUR_WHITE,
  WHITE_SPACING,
} from '../../constants/styles';
import ActivityIndicator from '../../components/activity-indicator';
import Profiles from '../../services/api/resources/profiles';
import TextInput from '../../components/form-controls/text-input';
import { ERROR_STATUS } from '../../constants/api';
import { storeData, retrieveData } from '../../utils/auth';



class ChangePasswordScene extends React.Component {
  profiles = new Profiles();

  constructor() {
    super();

    this.state = {
      invalidFields: [],
      requiredFields: [
        'current_password',
        'new_password',
        'new_password_confirmation',
      ],
      form: {

      },
      isFormValid: null,
      propagateFormErrors: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  
  }
  
  addInvalidField(fieldName) {
    const newInvalidFields = [
      ...this.state.invalidFields,
      fieldName
    ];

    this.setState({
      invalidFields: newInvalidFields,
      isValid: newInvalidFields.length === 0
    });
  }

  removeInvalidField(fieldName) {
    const newInvalidFields = this.state.invalidFields.filter(value => value !== fieldName);

    this.setState({
      invalidFields: newInvalidFields,
      isValid: newInvalidFields.length === 0
    });
  }

  updateFormField(params) {
    const newForm = {
      ...this.state.form,
      ...params
    };

    const isComplete = this.state.requiredFields.find(
      fieldName => newForm[fieldName] === null || newForm[fieldName] === undefined
    ) === undefined;

    this.setState({
      form: newForm,
      isComplete,
    });
  }

  async onSubmit() {
    const missingFields = this.state.requiredFields.filter(
      (value) => !Boolean(this.state.form[value])
    );

    if (missingFields.length > 0 || this.state.invalidFields.length > 0) {
      this.setState({
        propagateFormErrors: true,
      });

      return
    }

    this.setState({
      isLoading: true,
    });
    const result = await retrieveData();

    const {
      response,
      status,
    } = await this.profiles.updatePassword(this.state.form, result.email);

    this.setState({
      isLoading: false,
    });

    if (status === ERROR_STATUS) {
      Alert.alert(
        'Error',
        'An error occured! Check that current password is valid.'
      );

      return

    }

    Alert.alert(
      'Success',
      'Your password has been updated successfully!'
    );

    this.props.navigation.goBack();
  }

  render() {
    const { isFormValid, propagateFormErrors } = this.state;
    const { navigation } = this.props;

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
            <Title>Change Password</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView
          contentContainerStyle={{
            padding: WHITE_SPACING * 2
          }}
        >
          <TextInput
            autoCapitalize={'none'}
            inputLabel="Current Password"
            onValueChange={(current_password, isValid) => {
              this.updateFormField({current_password});
              isValid === false ? this.addInvalidField('current_password') : this.removeInvalidField('current_password');
            }}
            propagateError={propagateFormErrors}
            secureTextEntry
            validators={{
              password: true,
              required: true,
            }}
          />
          <TextInput
            autoCapitalize={'none'}
            inputLabel="New Password"
            onValueChange={(new_password, isValid) => {
              this.updateFormField({new_password});
              isValid === false ? this.addInvalidField('new_password') : this.removeInvalidField('new_password');
            }}
            propagateError={propagateFormErrors}
            secureTextEntry
            validators={{
              password: true,
              required: true,
            }}
          />
          <TextInput
            autoCapitalize={'none'}
            inputLabel="Confirm New Password"
            onValueChange={(new_password_confirmation, isValid) => {
              this.updateFormField({new_password_confirmation});
              isValid === false ? this.addInvalidField('new_password_confirmation') : this.removeInvalidField('new_password_confirmation');
            }}
            propagateError={propagateFormErrors}
            secureTextEntry
            validators={{
              equalTo: this.state.form.new_password,
              password: true,
              required: true,
            }}
          />

          <Button
            block
            disabled={this.state.isLoading}
            isLoading={this.state.isLoading}
            onPress={this.onSubmit}
            style={{
              backgroundColor: COLOUR_GREEN,
              marginTop: 40,
            }}
          >
            {this.state.isLoading ? <ActivityIndicator /> : <NbText>Submit</NbText>}
          </Button>
        </ScrollView>
      </BaseScene>
    );
  }
};

ChangePasswordScene.propTypes = {
  navigation: PropTypes.object,
};

export default ChangePasswordScene;

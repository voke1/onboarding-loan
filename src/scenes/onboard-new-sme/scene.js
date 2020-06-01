/* eslint-disable */
import React from 'react';
import {
  Alert,
  ScrollView,
  View,
} from 'react-native';
import {
  Accordion,
  Body,
  Header,
  Icon,
  Left,
  Title,
  Right,
  Button,
} from 'native-base';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLOUR_GREEN, COLOUR_GREEN_DARK, COLOUR_WHITE, COLOUR_GREY_LIGHT, WHITE_SPACING } from '../../constants/styles';
import BaseScene from '../base/scene';
import FormPicker from '../../components/form-controls/form-picker';
import PhoneInput from '../../components/form-controls/phone-input';
import Text from '../../components/text';
import TextInput from '../../components/form-controls/text-input';
import styles from './styles';
import FormMultiSelect from '../../components/form-controls/form-multiselect';
import GeneralBusinessTypes from '../../fixtures/general-services';
import ManufacturingBusinessTypes from '../../fixtures/manufacturing-business-types';
import SpecializedBusinessTypes from '../../fixtures/specialized-services';
import TradingBusinessTypes from '../../fixtures/trading-business-types';
import DateInput from '../../components/form-controls/date-input';
import SME from '../../services/api/resources/smes';
import { ERROR_STATUS } from '../../constants/api';


class BusinessInformation extends React.Component {
  constructor() {
    super();

    this.state = {
      form: {},
    };
  }

  render() {
    return (
      <View />
    );
  }
}

const Principal1Information = () => (
  <View style={styles.accordionTabStyle}>
    <TextInput
      inputLabel="Name"
    />
    <TextInput
      inputLabel="Position"
    />
    <FormPicker
      choices={[
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ]}
      inputLabel="Gender"
    />
    <TextInput
      inputLabel="Home Address"
    />
    <PhoneInput
      inputLabel="Phone Number"
    />
    <TextInput
      inputLabel="Email Address"
    />
    <FormPicker
      choices={[
        { label: 'Driver\'s Licence', value: 'Driver\'s Licence' },
        { label: 'International Passport', value: 'International Passport' },
        { label: 'National ID Card', value: 'National ID Card' },
        { label: 'Permanent Voters Card (PVC)', value: 'Permanent Voters Card (PVC)' },
      ]}
      inputLabel="Principal Identification Document"
    />
    <TextInput
      inputLabel="Principal Identification Number"
    />
    <TextInput
      inputLabel="BVN"
    />
  </View>
);

const Principal2Information = () => (
  <View style={styles.accordionTabStyle}>
    <TextInput
      inputLabel="Name"
    />
    <TextInput
      inputLabel="Position"
    />
    <FormPicker
      choices={[
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ]}
      inputLabel="Gender"
    />
    <TextInput
      inputLabel="Home Address"
    />
    <PhoneInput
      inputLabel="Phone Number"
    />
    <TextInput
      inputLabel="Email Address"
    />
    <FormPicker
      choices={[
        { label: 'Driver\'s Licence', value: 'Driver\'s Licence' },
        { label: 'International Passport', value: 'International Passport' },
        { label: 'National ID Card', value: 'National ID Card' },
        { label: 'Permanent Voters Card (PVC)', value: 'Permanent Voters Card (PVC)' },
      ]}
      inputLabel="Principal Identification Document"
    />
    <TextInput
      inputLabel="Principal Identification Number"
    />
    <TextInput
      inputLabel="BVN"
    />
  </View>
);

const BusinessDescription = () => (
  <View
    style={styles.accordionTabStyle}
  >
    <FormMultiSelect
      choices={TradingBusinessTypes.map(({ value, label }) => ({
        label,
        value,
      }))}
      inputLabel="Trading"
      selected={[]}
      outerContainerStyle={{
        height: 90,
      }}
    />
    <FormMultiSelect
      choices={ManufacturingBusinessTypes.map(({ value, label }) => ({
        label,
        value,
      }))}
      inputLabel="Manufacturing"
      outerContainerStyle={{
        height: 90,
      }}
      selected={[]}
    />
    <FormMultiSelect
      choices={SpecializedBusinessTypes.map(({ value, label }) => ({
        label,
        value,
      }))}
      inputLabel="Specialized"
      outerContainerStyle={{
        height: 90,
      }}
      selected={[]}
    />
    <FormMultiSelect
      choices={GeneralBusinessTypes.map(({ value, label }) => ({
        label,
        value,
      }))}
      inputLabel="General"
      outerContainerStyle={{
        height: 90,
      }}
      selected={[]}
    />
  </View>
);

class OnboardNewSME extends React.Component {
  sme = new SME();

  constructor() {
    super();

    this.state = {
      form: {},
      principal1InformationForm: {},
      principal2InformationForm: {},
      businessDescriptionForm: {},
    };

    this.submitForm = this.submitForm.bind(this);
    this.updateFormField = this.updateFormField.bind(this);
  }

  async submitForm() {
    this.setState({
      isLoading: true
    });

    const { status, response } = await this.sme.createSME(this.state.form);
    console.log('STATUS >> ', status);
    console.log('RESPONSE >> ', response);

    this.setState({
      isLoading: false
    });

    if (status === ERROR_STATUS) {

      Alert.alert(
        'Missing Fields',
        'All fields are required.'
      );

      return
    }

    Alert.alert(
      'Successfully created SME!'
    );

    this.setState({
      form: {

      },
    });

    this.props.navigation.goBack();
  }

  updateFormField(key, value) {
    const newFormData = {
      ...this.state.form,
      [key]: value,
    };

    this.setState({
      form: newFormData,
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <BaseScene>
        <Header
          androidStatusBarColor={COLOUR_GREEN_DARK}
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
            <Title>Register SME</Title>
          </Body>
          <Right>
            <Button disabled={this.state.isLoading} onPress={this.submitForm} transparent>
              <Text white>{this.state.isLoading ? 'Processing...' : 'Save'}</Text>
            </Button>
          </Right>
        </Header>

        <ScrollView contentContainerStyle={{
          padding: WHITE_SPACING
        }}>
          <TextInput
            autoCapitalize="words"
            inputLabel="Business Name"
            onValueChange={(value) => this.updateFormField('business_name', value)}
            validators={{
              minLength: 5,
              required: true,
            }}
          />
          <DateInput
            inputLabel="Date/Year of Starting Business"
            onValueChange={(value) => {
              this.updateFormField('date_year_of_starting_business', value)
              this.updateFormField('year_of_business', value)
            }}
            outerContainerStyle={{
              marginTop: 25,
              width: '100%',
            }}
            validators={{
              required: true,
            }}
          />
          <TextInput
            autoCapitalize="words"
            autoCompleteType="street-address"
            inputLabel="Business Address"
            onValueChange={(value) => {
              setTimeout(() => this.updateFormField('biz_address', value), 1000)
              this.updateFormField('business_address', value)
            }}
            validators={{
              minLength: 6,
              required: true,
            }}
          />
          <FormPicker
            inputLabel="Business Premises"
            choices={[
              { label: 'Select an Option', value: null },
              {
                label: 'Owned',
                value: 'Owned',
              },
              {
                label: 'Home',
                value: 'Home',
              },
              {
                label: 'Street Kiosk/Stall',
                value: 'Street Kiosk/Stall',
              },
              {
                label: 'Stall',
                value: 'Stall',
              },
            ]}
            onValueChange={(value) => this.updateFormField('business_premise', value)}
          />
          <PhoneInput
            country="NG"
            inputLabel="Phone Number"
            onValueChange={(value) => this.updateFormField('phone_number', value)}
            validators={{
              required: true,
            }}
          />
          <TextInput
            autoCapitalize={'none'}
            autoCompleteType="email"
            inputLabel="Email Address"
            onValueChange={(value) => this.updateFormField('email', value)}
            validators={{
              email: true,
              required: true,
            }}
          />
          <TextInput
            autoCapitalize={'none'}
            inputLabel="Website"
            keyboardType="url"
            onValueChange={(value) => this.updateFormField('website', value)}
            textContentType='URL'
            validators={{
              url: true,
            }}
          />
          <FormPicker
            inputLabel="Ownership Type"
            choices={[
              { label: 'Select an Option', value: null },
              {
                label: 'Sole Propreitorship',
                value: 'Sole Propreitorship',
              },
              {
                label: 'Limited Liability',
                value: 'Limited Liability',
              },
              {
                label: 'Hawking',
                value: 'Hawking',
              },
              {
                label: 'Partnership',
                value: 'Partnership',
              },
              {
                label: 'Street Trading',
                value: 'Street Trading',
              },
              {
                label: 'Other',
                value: 'Other',
              },
            ]}
            onValueChange={(value) => this.updateFormField('ownership_type', value)}
            validators={{
              required: true,
            }}
          />
          <FormPicker
            inputLabel="Business Registration Status"
            choices={[
              { label: 'Select an Option', value: null },
              {
                label: 'Registered with CAC',
                value: 'Registered with CAC',
              },
              {
                label: 'Not Registered with CAC',
                value: 'Not Registered with CAC',
              },
            ]}
            onValueChange={(value) => {
              this.updateFormField('reg_status', value)
            }}
            validators={{
              required: true,
            }}
          />
          <TextInput
            autoCapitalize={true}
            inputLabel="Business Registration Number"
            onValueChange={(value) => {
              setTimeout(() => this.updateFormField('reg_num', value), 1000)
              this.updateFormField('registration_number', value)
            }}
            validators={{
              required: true,
              minLength: 6,
            }}
          />
          <FormPicker
            inputLabel="Asset Category"
            choices={[
              { label: 'Select an Option', value: null },
              {
                label: 'Less than N1 million in Assets',
                value: 'Less than N1 million in Assets',
              },
              {
                label: 'Less than N5 million in Assets',
                value: 'Less than N5 million in Assets',
              },
              {
                label: 'Less than N50 million in Assets',
                value: 'Less than N50 million in Assets',
              },
              {
                label: 'Less than N500 million in Assets',
                value: 'Less than N500 million in Assets',
              },
            ]}
            onValueChange={(value) => this.updateFormField('asset_category', value)}
            validators={{
              required: true,
            }}
          />
          <FormPicker
            inputLabel="Employment Category"
            choices={[
              { label: 'Select an Option', value: null },
              {
                label: '0 employee',
                value: '0 employee',
              },
              {
                label: 'Less than 5 Employees',
                value: 'Less than 5 Employees',
              },
              {
                label: 'Less than 10 Employees',
                value: 'Less than 10 Employees',
              },
              {
                label: 'Less than 50 Employees',
                value: 'Less than 50 Employees',
              },
              {
                label: 'Less than 200 Employees',
                value: 'Less than 200 Employees',
              },
            ]}
            onValueChange={(value) => this.updateFormField('employment_category', value)}
            validators={{
              required: true,
            }}
          />



          <Text big style={{backgroundColor: COLOUR_GREY_LIGHT, marginTop: WHITE_SPACING * 4, paddingVertical: 15, paddingHorizontal: 10}}>Principal 1 Information</Text>
          <TextInput
            autoCapitalize="words"
            autoCompleteType="name"
            inputLabel="Name"
            onValueChange={(value) => this.updateFormField('principal1_name', value)}
            validators={{
              required: true,
              minLength: 6,
            }}
          />
          <TextInput
            inputLabel="Position"
            onValueChange={(value) => this.updateFormField('principal1_position', value)}
            validators={{
              required: true,
              minLength: 3,
            }}
          />
          <FormPicker
            choices={[
              { label: 'Select an Option', value: null },
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            onValueChange={(value) => this.updateFormField('principal1_gender', value)}
            inputLabel="Gender"
            validators={{
              required: true,
            }}
          />
          <TextInput
            autoCapitalize="words"
            autoCompleteType="street-address"
            inputLabel="Home Address"
            onValueChange={(value) => this.updateFormField('principal1_address', value)}
            validators={{
              required: true,
              minLength: 6,
            }}
          />
          <PhoneInput
            inputLabel="Phone Number"
            onValueChange={(value) => this.updateFormField('principal1_phone', value)}
            validators={{
              required: true,
            }}
          />
          <TextInput
            autoCapitalize="none"
            autoCompleteType="email"
            inputLabel="Email Address"
            keyboardType="email-address"
            onValueChange={(value) => this.updateFormField('principal1_email', value)}
            validators={{
              email: true,
              required: true,
            }}
          />
          <FormPicker
            choices={[
              { label: 'Select an Option', value: null },
              { label: 'Driver\'s Licence', value: 'Driver\'s Licence' },
              { label: 'International Passport', value: 'International Passport' },
              { label: 'National ID Card', value: 'National ID Card' },
              { label: 'Permanent Voters Card (PVC)', value: 'Permanent Voters Card (PVC)' },
            ]}
            inputLabel="Principal Identification Document"
            onValueChange={(value) => this.updateFormField('princial1_id')}
            validators={{
              required: true,
            }}
          />
          <TextInput
            inputLabel="Principal Identification Number"
            onValueChange={(value) => this.updateFormField('principal1_id', value)}
            validators={{
              minLength: 6,
              required: true,
            }}
          />
          <TextInput
            inputLabel="BVN"
            keyboardType="number-pad"
            onValueChange={(value) => this.updateFormField('principal1_BVN', value)}
            validators={{
              length: 11,
              required: true,
            }}
          />



          <Text big style={{backgroundColor: COLOUR_GREY_LIGHT, marginTop: WHITE_SPACING * 4, paddingVertical: 15, paddingHorizontal: 10}}>Principal 2 Information</Text>
          <TextInput
            autoCapitalize="words"
            autoCompleteType="name"
            inputLabel="Name"
            onValueChange={(value) => this.updateFormField('principal2_name', value)}
            validators={{
              minLength: 6,
              required: true,
            }}
          />
          <TextInput
            inputLabel="Position"
            onValueChange={(value) => this.updateFormField('principal2_position', value)}
            validators={{
              minLength: 4,
              required: true,
            }}
          />
          <FormPicker
            choices={[
              { label: 'Select an Option', value: null },
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            inputLabel="Gender"
            onValueChange={(value) => this.updateFormField('principal2_gender', value)}
            validators={{
              required: true,
            }}
          />
          <TextInput
            autoCapitalize="words"
            autoCompleteType="street-address"
            inputLabel="Home Address"
            onValueChange={(value) => this.updateFormField('principal2_address', value)}
            validators={{
              minLength: 6,
              required: true,
            }}
          />
          <PhoneInput
            inputLabel="Phone Number"
            onValueChange={(value) => this.updateFormField('principal2_phone', value)}
            validators={{
              required: true,
            }}
          />
          <TextInput
            autoCapitalize={'none'}
            autoCompleteType="email"
            inputLabel="Email Address"
            keyboardType="email-address"
            onValueChange={(value) => this.updateFormField('principal2_email', value)}
            validators={{
              email: true,
              required: true,
            }}
          />
          <FormPicker
            choices={[
              { label: 'Select an Option', value: null },
              { label: 'Driver\'s Licence', value: 'Driver\'s Licence' },
              { label: 'International Passport', value: 'International Passport' },
              { label: 'National ID Card', value: 'National ID Card' },
              { label: 'Permanent Voters Card (PVC)', value: 'Permanent Voters Card (PVC)' },
            ]}
            inputLabel="Principal Identification Document"
            onValueChange={(value) => this.updateFormField('princial2_id')}
            validators={{
              required: true,
            }}
          />
          <TextInput
            inputLabel="Principal Identification Number"
            onValueChange={(value) => this.updateFormField('principal2_id', value)}
            validators={{
              minLength: 6,
              required: true,
            }}
          />
          <TextInput
            inputLabel="BVN"
            keyboardType="number-pad"
            onValueChange={(value) => this.updateFormField('principal2_BVN', value)}
            validators={{
              minLength: 11,
              required: true,
            }}
          />



          <Text big style={{backgroundColor: COLOUR_GREY_LIGHT, marginTop: WHITE_SPACING * 4, paddingVertical: 15, paddingHorizontal: 10, marginBottom: 20}}>Business Description</Text>
                
          <FormMultiSelect
            choices={TradingBusinessTypes.map(({ value, label }) => ({
              label,
              value,
            }))}
            inputLabel="Trading"
            onValueChange={selected => this.updateFormField('trading', JSON.stringify(selected))}
            selected={[]}
            outerContainerStyle={{
              height: 90,
            }}
          />
          <FormMultiSelect
            choices={ManufacturingBusinessTypes.map(({ value, label }) => ({
              label,
              value,
            }))}
            inputLabel="Manufacturing"
            onValueChange={selected => this.updateFormField('manufacturing', JSON.stringify(selected))}
            outerContainerStyle={{
              height: 90,
            }}
            selected={[]}
          />
          <FormMultiSelect
            choices={SpecializedBusinessTypes.map(({ value, label }) => ({
              label,
              value,
            }))}
            inputLabel="Specialized"
            onValueChange={selected => this.updateFormField('specialised_services', JSON.stringify(selected))}
            outerContainerStyle={{
              height: 90,
            }}
            selected={[]}
          />
          <FormMultiSelect
            choices={GeneralBusinessTypes.map(({ value, label }) => ({
              label,
              value,
            }))}
            inputLabel="General"
            onValueChange={selected => this.updateFormField('general_services', JSON.stringify(selected))}
            outerContainerStyle={{
              height: 90,
            }}
            selected={[]}
          />
          {/* <BusinessInformation
            form={this.state.form}
            updateFormField={this.updateFormField}
          />
          <Principal1Information
            form={this.state.form}
            updateFormField={this.updateFormField}
          />
          <Principal2Information 
            form={this.state.form}
            updateFormField={this.updateFormField}
          />
          <BusinessDescription 
            form={this.state.form}
            updateFormField={this.updateFormField}
          /> */}
        </ScrollView>

        {/* <Accordion
          dataArray={accordionTabs}
          renderHeader={({ title }, expanded) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: COLOUR_GREY_LIGHT,
                flexDirection: 'row',
                height: 75,
                justifyContent: 'space-between',
                marginBottom: WHITE_SPACING,
                paddingHorizontal: WHITE_SPACING,
              }}
            >
              <Text title>{title}</Text>
              <Icon
                android={`md-arrow-drop${expanded ? 'up' : 'down'}`}
                ios={`ios-arrow-drop${expanded ? 'up' : 'down'}`}
              />
            </TouchableOpacity>
          )}
          renderContent={({ content }) => formSections[content]}
        /> */}

      </BaseScene>
    );
  }
}

OnboardNewSME.propTypes = {
  navigation: PropTypes.object,
};

export default OnboardNewSME;

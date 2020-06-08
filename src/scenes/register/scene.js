import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar
} from 'react-native';
import {
  Body,
  Button,
  Content,
  Form,
  Header,
  Icon,
  Left,
  Text as NbText,
  Title,
  View,
  Right,
  Toast,
} from 'native-base';
import PropTypes from 'prop-types';

import BaseScene from '../base/scene';
import TextInput from '../../components/form-controls/text-input';
import { COLOUR_GREEN, COLOUR_GREEN_DARK } from '../../constants/styles';
import styles from './styles';
import Text from '../../components/text';
import Auth from '../../services/api/resources/auth';
import { ERROR_STATUS } from '../../constants/api';
import { saveAuthToken } from '../../utils/auth';

class RegisterScene extends Component {
  auth = new Auth();

  constructor() {
    super();

    this.state = {
      isFormValid: true,
    };

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.firstvNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.mobileInput = React.createRef();
    this.onRegister = this.onRegister.bind(this);
  }

  async onRegister() {
    const { firstName, lastName, email, mobile, password } = this.state;
    const { navigation } = this.props;

    this.setState({
      isLoading: true,
    });
    // navigation.navigate('HomeScene');

    const result = await this.auth.register(
      firstName,
      lastName,
      email,
      mobile,
      password
    )
    console.log('STATUS: ', result)

    // const { error } = response

    if (result.status === 'ERROR') {
      Alert.alert(
        'An error occured. Please, check the data and try again!'
      );
    }

    else {
      // const { token } = response;
      // saveAuthToken(token);
      navigation.replace('HomeScene');
    }

    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { navigation } = this.props;
    const { isFormValid } = this.state;

    return (
      <BaseScene>
        <StatusBar
          animated
          translucent={false}
        />
        <Header
          androidStatusBarColor={COLOUR_GREEN_DARK}
          style={{
            backgroundColor: COLOUR_GREEN,
          }}
        >
          <Body>
            <Title>Register</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <View style={styles.titleBox}>
            <Text
              bigger
              bold
              green
            >
              Welcome
            </Text>
            <Text
              green
              mid
            >
              Empowering MSMEs.
            </Text>
          </View>
          <Form>
            <TextInput
              autoCapitalize={'none'}
              inputLabel="First Name"
              keyboardType="first-name"
              onValueChange={(firstName) => this.setState({
                firstName
              })}
              textContentType="firstName"
              textInputRef={this.firstNameInput}
            />
            <TextInput
              autoCapitalize={'none'}
              inputLabel="Last Name"
              keyboardType="last-name"
              onValueChange={(LastName) => this.setState({
                LastName
              })}
              textContentType="lastName"
              textInputRef={this.lastNameInput}

            />
            <TextInput
              autoCapitalize={'none'}
              inputLabel="Email"
              keyboardType="email-address"
              onValueChange={(email) => this.setState({
                email
              })}
              textContentType="emailAddress"
              textInputRef={this.emailInput}
              validators={{
                email: true,
                required: true,
              }}
            />
            <TextInput
              autoCapitalize={'none'}
              inputLabel="Mobile"
              keyboardType="mobile"
              onValueChange={(mobile) => this.setState({
                mobile
              })}
              textContentType="lastName"
              textInputRef={this.mobileInput}

            />
            <TextInput
              autoCapitalize={'none'}
              inputLabel="Password"
              onValueChange={(password) => this.setState({
                password
              })}
              secureTextEntry
              textInputRef={this.passwordInput}
              validators={{
                password: true,
                required: true,
              }}
            />
            <Button
              block
              disabled={!isFormValid || this.state.isLoading}
              isLoading={this.state.isLoading}
              onPress={this.onRegister}
              style={{
                backgroundColor: COLOUR_GREEN,
                marginTop: 40,
              }}
            >
              {this.state.isLoading ? <ActivityIndicator /> : <NbText>Register</NbText>}
            </Button>
          </Form>
        </Content>
      </BaseScene>
    );
  }
}

RegisterScene.propTypes = {
  navigation: PropTypes.any,
};

export default RegisterScene;

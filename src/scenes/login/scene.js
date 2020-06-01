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

class LoginScene extends Component {
  auth = new Auth();

  constructor() {
    super();

    this.state = {
      isFormValid: true,
    };

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();

    this.onLogin = this.onLogin.bind(this);
  }

  async onLogin() {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.setState({
      isLoading: true,
    });
    // navigation.navigate('HomeScene');

    const { status, response } = await this.auth.login(
      email,
      password
    )
    
    const { error } = response

    if (status === ERROR_STATUS) {
      Alert.alert(
        error || 'An error occured. Please, check the data and try again!'
      );
    }

    else {
      const { token } = response;
      saveAuthToken(token);
      navigation.replace('HomeScene');
    }

    this.setState({
      isLoading: false,
    });

    console.log(status, response)
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
            <Title>Login</Title>
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
              Welcome Back
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
              onPress={this.onLogin}
              style={{
                backgroundColor: COLOUR_GREEN,
                marginTop: 40,
              }}
            >
              {this.state.isLoading ? <ActivityIndicator /> : <NbText>Login</NbText>}
            </Button>
          </Form>
        </Content>
      </BaseScene>
    );
  }
}

LoginScene.propTypes = {
  navigation: PropTypes.any,
};

export default LoginScene;

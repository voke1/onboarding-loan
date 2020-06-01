/* eslint-disable */
import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput as RnTextInput,
  View,
} from 'react-native';
import {
  Item, Input, Label,
} from 'native-base';
import PropTypes from 'prop-types';

import { 
  COLOUR_RED, 
  COLOUR_LINK_BLUE, 
  COLOUR_GREY_LIGHT, 
  FONT_SIZE_TITLE, 
  COLOUR_GREY
} from '../../constants/styles';
import { 
  validateEmail,
  validateFieldLength,
  validatePassword,
} from '../../utils/form-validators'
import RegexPatterns from '../../utils/regex-patterns';
import Text from '../text';

const styles = StyleSheet.create({
  textInput: {
    margin: 0,
    marginTop: 20,
    padding: 0,
    paddingVertical: 5,
  },
});

class TextInput extends React.Component {

  constructor (props) {
    super(props);

    const { defaultValue, validators } = props;

    this.state = {
      borderColor: COLOUR_GREY_LIGHT,
      errorMessage: null,
      fieldIsValid: props.progateError ? true : null,
      hideText: props.secureTextEntry,
      value: defaultValue || null,
      validators,
    };

    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  checkInputValidity(value=this.state.value) {
    const { country } = this.props;
    const validators = this.state.validators || {};

    let errorMessage = null;
    let fieldIsValid = true;

    if (validators.required == undefined && ((value !== null && value.length === 0) || value === null)) {
        
    }

    else {
      if (validators.minLength && value !== null) {
        fieldIsValid = validateFieldLength(value, validators.minLength);
        if (!fieldIsValid) {
          errorMessage = `Field must be at least ${validators.minLength} characters`;
        }
      }

      else if (validators.required) {
        fieldIsValid = value !== null;
        if (!fieldIsValid) {
          errorMessage  = 'Field is required'
        }
      }
      
      else {
        const regex = RegexPatterns['phone'][country || 'NG'];
        if (regex && !regex.test(value)) {
          errorMessage = 'Phone number is not valid';
          fieldIsValid = false;
        }
      }      

      // else if (validators.length && value !== null) {
      //   fieldIsValid = validateFieldLength(value, null, null, validators.length);
      //   if (!fieldIsValid) {
      //     errorMessage = `Field must be ${validators.length} characters`;
      //   }
      // }

      // else if (validators.email && value !== null) {
      //   fieldIsValid = validateEmail(value);
      //   if (!fieldIsValid) {
      //     errorMessage = 'Field is not a valid email';
      //   }
      // }

      // else if (validators.password && value !== null) {
      //   fieldIsValid = validatePassword(value);
      //   if (!fieldIsValid) {
      //     errorMessage = 'Field must have at least four (4) characters.';
      //   }
      // }

      // else if (validators.required) {
      //   fieldIsValid = value !== null;
      //   if (!fieldIsValid) {
      //     errorMessage  = 'Field is required'
      //   }
      // }

      // else if (validators.rawRegex) {
      //   const regexExp = new RegExp(validators.rawRegex);
      //   if (!value.match(regexExp)) {
      //     fieldIsValid = false;
      //     errorMessage  = 'Field is invalid';
      //   }
      // }
    }

    this.setState({
      errorMessage,
      fieldIsValid
    });

    return {
      errorMessage,
      fieldIsValid
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      const fieldIsValid = this.checkInputValidity(nextProps.defaultValue);
      this.onChangeText(nextProps.defaultValue);
      this.props.onChangeText && this.props.onChangeText(nextProps.defaultValue, fieldIsValid);
    }

    const validators = this.state.validators || {};

    if (nextProps.propagateError !== this.props.propagateError && validators.required) {
      this.state.value === null && this.setState({
        errorMessage: 'Field is required',
        fieldIsValid: false,
      });

      return true;
    }

    return true;
  }

  onBlur () {
    this.props.onBlur && this.props.onBlur();
    const { fieldIsValid } = this.checkInputValidity();
    this.setState({
      borderColor: fieldIsValid ? COLOUR_GREY_LIGHT : COLOUR_RED,
      focused: false,
    });
    
    this.props.onChangeText && this.props.onChangeText(this.state.value, fieldIsValid);
  }

  onChangeText (value) {
    this.setState({
      value,
    });
    this.props.onValueChange && this.props.onValueChange(value);
  }

  onFocus () {
    this.setState({
      borderColor: COLOUR_LINK_BLUE,
      errorMessage: null,
      fieldIsValid: null,
      focused: true,
    });

    // Animated.timing(this.state.borderColor, {
    //   toValue: COLOUR_LINK_BLUE,
    //   easing: Easing.back(),
    //   duration: 2000,
    // }).start();
  }

  render() {
    const { 
      borderColor,
      errorMessage,
      fieldIsValid,
    } = this.state;
    const { country, inputLabel, secureTextEntry, style } = this.props;

    return (
      <View>
        <Item
          floatingLabel
          secureTextEntry={secureTextEntry}
          style={{
            borderColor,
            ...styles.textInput,
            ...style,
          }}
        >
          <Label style={{
            color: fieldIsValid === false ? COLOUR_RED : COLOUR_GREY,
          }}>{inputLabel}</Label>
          <Input
            autoCapitalize={this.props.autoCapitalize}
            autoCompleteType={this.props.autoCompleteType}
            defaultValue={'AAAAAA'}
            editable={!this.props.disabled}
            keyboardType={"number-pad"}
            multiline={false} 
            onBlur={this.onBlur}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            onSubmitEditing={this.props.onSubmitEditing}
            placeholder={this.props.placeholder} 
            ref={this.props.textInputRef}
            returnKeyType="next"
            style={{
              fontSize: FONT_SIZE_TITLE,
              padding: 0,
              paddingLeft: 15,
              width: (this.props.rightIcon || this.props.secureTextEntry) ? '70%' : '85%',
              ...this.props.inputStyle,
            }}
            textContentType={"telephoneNumber"}
            secureTextEntry={secureTextEntry}
          />
        </Item>
        {errorMessage && <Text 
          red
          right
          style={{
            right: 0,
            bottom: -25,
            position: 'absolute',
          }}
        >
          {errorMessage}
        </Text>}
      </View>
    );
  }
}

TextInput.propTypes = {
  inputLabel: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.object,
};

export default TextInput;

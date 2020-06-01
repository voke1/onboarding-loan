import React from 'react'
import { 
  Picker,
  View
} from 'react-native'
import { Icon, Label } from 'native-base';

import { 
  COLOUR_BLACK,
  COLOUR_GREY,
  COLOUR_LIGHT_GREY,
  COLOUR_RED,
  COLOUR_WHITE, 
  COLOUR_GREY_LIGHT
} from '../../constants/styles';
import Text from '../../components/text';

export default class FormPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || null,
      fieldIsValid: props.progateError ? true : null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      const itemValue = nextProps.defaultValue;
      const isValid = true;

      this.props.onSelect(itemValue, isValid);
      this.setState({
        errorMessage: isValid ? null : 'Field is required',
        fieldIsValid: isValid,
        value: itemValue
      });
    }

    const validators = this.props.validators || {};

    if (nextProps.propagateError !== this.props.propagateError && validators.required) {
      this.state.value === null && this.setState({
        errorMessage: 'Field is required',
        fieldIsValid: false
      })

      return true;
    }

    return true;
  }

  render () {
    return <View style={{
        ...this.props.outerContainerStyle,
        marginTop: 30,
      }}>
      <Label style={{color: this.state.fieldIsValid === false ? COLOUR_RED : COLOUR_GREY}}>{this.props.inputLabel}</Label>
      <View style={{
        alignItems: 'center',
        backgroundColor: COLOUR_WHITE,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLOUR_GREY,
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 5,
        ...this.props.innerContainerStyle
      }}>

        <Icon
          android="md-arrow-dropdown-circle"
          ios="ios-arrow-dropdown-circle"
          containerStyle={{
            position: 'absolute',
            right: 15
          }}
          style={{
            color: COLOUR_GREY,
          }}
        />

        <Picker
          selectedValue={this.state.value || this.props.defaultValue}
          style={{
            backgroundColor: 'transparent',
            borderColor: COLOUR_GREY,
            borderWidth: 15,
            padding: 5,
            height: 50, 
            width: '100%'
          }}
          onValueChange={(itemValue, itemIndex) => {
            const isValid = itemIndex !== 0;
            this.props.onValueChange(itemValue, isValid);
            this.setState({
              errorMessage: isValid ? null : 'Field is required',
              fieldIsValid: isValid,
              value: itemValue
            });
          }}>
            <Picker.Item key={0} label={"Select an option"} value={0} color={COLOUR_BLACK} />
            {
              this.props.choices && this.props.choices.map(({label, value}, index) => {
                return <Picker.Item key={index + 1} label={label} value={value} color={COLOUR_BLACK} />
              })
            }
        </Picker>
      </View>
      
      <Text small red style={{
        position: 'absolute',
        textAlign: 'right',
        top: 90,
        width: '100%',
      }}>{this.state.errorMessage}</Text>
    </View>
  }
}

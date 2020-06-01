import React from 'react';
import { View } from 'react-native';
import { DatePicker } from 'native-base';
import { COLOUR_RED, COLOUR_GREY } from '../../constants/styles';
import Text from '../text';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);

    console.log('DEFAULT', props.defaultValue)

    this.state = {
      value: new Date(props.defaultValue),
    };
  }

  // componentDidMount(){
  //   console.log(`form Date props --> ${JSON.stringify(this.props)}`)
  //   console.log('form date has mounted')
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      const date = nextProps.defaultValue;
      const isValid = true;

      this.setState({
        errorMessage: null,
        fieldIsValid: isValid,
        value: date
      });
      this.props.onDateSelect(date, isValid);
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

  onBlur() {
    console.log('BLURRED FORM DATE');
  }

  render () {
    return <View style={{
      ...this.props.outerContainerStyle
    }}>
      
      <Text style={{color: this.state.fieldIsValid === false ? COLOUR_RED : COLOUR_GREY}}>{this.props.inputLabel}</Text>
      <View style={{
        flexDirection: 'row'
      }}>  
        <DatePicker
          cancelBtnText="Cancel"
          confirmBtnText="Confirm"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          defaultDate={this.state.value}
          date={this.state.value}
          format="YYYY-MM-DD"
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          mode="date"
          onCloseModal={this.onBlur}
          onDateChange={(date) => {
            this.setState({
              errorMessage: null,
              fieldIsValid: true,
              value: date
            })
            this.props.onValueChange(date, true)
          }}
          placeholder={this.props.placeholder}
          style={{width: 200}}
        />
      </View>
      <Text small red style={{
        position: 'absolute',
        textAlign: 'right',
        top: 70,
        width: '100%',
      }}>{this.state.errorMessage}</Text>
    </View>
  }
}

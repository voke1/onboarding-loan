import React, { Component } from 'react';
import {
  FlatList,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Icon,
} from 'native-base';
import PropTypes from 'prop-types';

import Text from '../text';
import {
  COLOUR_GREY,
  COLOUR_GREY_LIGHT,
  COLOUR_LINK_BLUE,
  COLOUR_RED,
  COLOUR_WHITE,
  COLOUR_GREEN,
} from '../../constants/styles';
import TextInput from './text-input';

const DEFAULT_MIN_LENGTH = 1;

export default class FormMultiSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldIsValid: props.propagateError ? true : null,
      modalVisible: false,
      searchTerm: '',
      selected: [],
    };

    this.onDeselect = this.onDeselect.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    const { selected } = this.props;

    console.log(selected);

    this.setState({
      selected: Array.isArray(selected) ? selected.map((value) => value) : [],
    });
  }

  shouldComponentUpdate(nextProps) {
    const { selected } = this.state;
    const { defaultValue, onSelect, propagateError } = this.props;
    let { validators } = this.props;

    if (nextProps.defaultValue !== defaultValue) {
      const itemValue = nextProps.defaultValue;
      const isValid = true;

      onSelect(itemValue, isValid);
      this.setState({
        errorMessage: isValid ? null : 'Field is required',
        fieldIsValid: isValid,
      });
    }

    validators = validators || {};
    const minLength = validators.minLength || DEFAULT_MIN_LENGTH;

    if (nextProps.propagateError !== propagateError && validators.required) {
      selected.length < minLength && this.setState({
        errorMessage: `Select at least ${minLength}.`,
        fieldIsValid: false,
      });

      return true;
    }

    return true;
  }

  onSelect(item) {
    const { onValueChange, onSelect, validators } = this.props;
    const { selected } = this.state;

    const newSelected = [
      ...selected,
      item,
    ];

    this.setState({
      selected: newSelected,
    });

    const minLength = validators ? validators.length || 0 : 0;
    const isValid = newSelected.length > minLength;

    this.setState({
      errorMessage: isValid ? null : `Select at least ${minLength}`,
      fieldIsValid: isValid,
    });

    onSelect && onSelect(item, isValid);
    onValueChange && onValueChange(newSelected);
  }

  onDeselect(item) {
    const { onDeselect, onValueChange, validators } = this.props;
    const { selected } = this.state;

    const newSelected = selected.filter((value) => value !== item);

    this.setState({
      selected: newSelected,
    });

    const minLength = validators ? validators.length || DEFAULT_MIN_LENGTH : DEFAULT_MIN_LENGTH;
    const isValid = newSelected.length > minLength;

    this.setState({
      errorMessage: isValid ? null : `Select at least ${minLength}`,
      fieldIsValid: isValid,
    });

    onDeselect && onDeselect(item);
    onValueChange && onValueChange(newSelected);
  }

  get contentSummary() {
    const { choices } = this.props;
    const { selected } = this.state;
    const limit = 3;
    const contentToDisplay = selected.slice(0, limit);

    let str = '';
    contentToDisplay.map((value) => {
      const choice = choices.find((item) => item.value === value);
      str += ` ${choice ? choice.label.replace(/_/g, ' ') : ''},`;
    });

    const contentToDisplayStr = str.slice(0, str.length - 1);
    const sizeDiff = selected.length - contentToDisplay.length;

    return sizeDiff ? `${contentToDisplayStr} +${sizeDiff} more` : `${contentToDisplayStr}`;
  }

  renderChoice(item) {
    const { label, value } = item;
    const { selected } = this.state;

    const choiceIsSelected = selected.includes(value);

    return (
      <TouchableOpacity
        onPressOut={() => {
          selected.includes(value) ? this.onDeselect(value) : this.onSelect(value);
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            height: 35,
            justifyContent: 'space-between',
            margin: 10,
          }}
        >
          <Text
            green={choiceIsSelected}
            style={{
              marginLeft: 10,
            }}
            title
          >
            {label.replace(/_/g, ' ')}
          </Text>
          {choiceIsSelected && (
            <Icon
              android="md-checkmark"
              ios="ios-checkmark"
              size={32}
              style={{
                color: COLOUR_GREEN,
              }}
              type="feather"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      choices, innerContainerStyle, leftIcon, leftIconColor,
      leftIconSize, outerContainerStyle, rightIcon, secureTextEntry,
      inputLabel,
    } = this.props;
    const {
      disabled, errorMessage, fieldIsValid, focused, hideText,
      modalVisible, searchResults, searchTerm,
    } = this.state;

    return (
      <View
        style={{
          ...outerContainerStyle,
        }}
      >
        <Modal
          animationType="slide"
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
            });
          }}
          presentationStyle={{
            height: 60,
          }}
          transparent={false}
          visible={modalVisible}
        >

          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              marginTop: 22,
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({
                modalVisible: false,
              })}
              style={{
                alignItems: 'center'
              }}
            >
              <Text bold green>
                DONE
              </Text>
            </TouchableOpacity>
            {/* <Button
              onPressOut={() => {
                this.setState({
                  modalVisible: false,
                });
              }}
              title="Close"
              titleStyle={{
                color: COLOUR_RED,
              }}
              style={{
                marginTop: 50,
              }}
              transparent
            /> */}
            <TextInput
              hideOptionalLabel
              inputLabel="Search"
              outerContainerStyle={{
                marginBottom: 10,
              }}
              onChangeText={
                (searchTermRaw) => searchTerm && this.setState({
                  searchResults: choices.filter(
                    (value) => {
                      const searchTermRefined = searchTermRaw.toLowerCase();
                      const valueLabel = value.label.toLowerCase();

                      return valueLabel.includes(searchTermRefined);
                    },
                  ),
                  searchTerm,
                })
              }
              placeholder="Search"
            />
            <FlatList
              contentContainerStyle={{
                backgroundColor: COLOUR_WHITE,
              }}
              data={searchTerm.length > 0 ? searchResults : choices}
              renderItem={(data) => this.renderChoice(data.item)}
            />
          </View>
        </Modal>

        <Text style={{ color: fieldIsValid === false ? COLOUR_RED : COLOUR_GREY, fontSize: 16, marginBottom: 5 }}>{inputLabel}</Text>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: disabled ? COLOUR_GREY_LIGHT : COLOUR_WHITE,
            borderColor: focused ? COLOUR_LINK_BLUE : COLOUR_GREY_LIGHT,
            borderWidth: focused ? 3 : 2,
            borderRadius: 25,
            flexDirection: 'row',
            height: 45,
            justifyContent: 'flex-start',
            padding: 0,
            ...innerContainerStyle,
          }}
        >
          {leftIcon && (
            <View
              style={{
                padding: 10,
                width: '15%',
              }}
            >
              <Icon
                name={leftIcon}
                size={leftIconSize || 28}
                type="material"
                color={leftIconColor || COLOUR_GREY_LIGHT}
              />
            </View>
          )}

          <TouchableOpacity
            onPress={() => this.setState({
              modalVisible: true,
            })}
            style={{
              paddingHorizontal: 15,
              width: '100%',
            }}
          >
            <Text>{this.contentSummary}</Text>
          </TouchableOpacity>

          {rightIcon && (
            <View
              style={{
                alignItems: 'flex-end',
                width: '15%',
              }}
            >
              <Icon
                color={COLOUR_GREY_LIGHT}
                name={hideText ? 'visibility' : 'visibility-off'}
                onPress={() => this.setState({ hideText: !hideText })}
                size={28}
                style={{
                  padding: 10,
                }}
              />
            </View>
          )}

          {secureTextEntry && !rightIcon && (
            <View
              style={{
                alignItems: 'flex-end',
                padding: 10,
                width: '15%',
              }}
            >
              <Icon
                color={COLOUR_GREY_LIGHT}
                name={hideText ? 'visibility' : 'visibility-off'}
                size={28}
                onPress={() => this.setState({ hideText: !hideText })}
              />
            </View>
          )}
        </View>

        <Text
          red
          small
          style={{
            position: 'absolute',
            textAlign: 'right',
            top: 70,
            width: '100%',
          }}
        >
          {errorMessage}
        </Text>
      </View>
    );
  }
}

FormMultiSelect.propTypes = {
  choices: PropTypes.array,
  defaultValue: PropTypes.string,
  innerContainerStyle: PropTypes.object,
  leftIcon: PropTypes.object,
  leftIconColor: PropTypes.string,
  leftIconSize: PropTypes.number,
  onDeselect: PropTypes.func,
  onSelect: PropTypes.func,
  outerContainerStyle: PropTypes.object,
  propagateError: PropTypes.bool,
  rightIcon: PropTypes.object,
  secureTextEntry: PropTypes.bool,
  selected: PropTypes.array,
  inputLabel: PropTypes.string,
  validators: PropTypes.array,
};

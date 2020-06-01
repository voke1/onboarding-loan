import React from 'react';
import { Text as RnText } from 'react-native';
import PropTypes from 'prop-types';

import {
  COLOUR_WHITE,
  FONT_SIZE_BIG,
  FONT_SIZE_BIGGER,
  FONT_SIZE_BIGGEST,
  FONT_SIZE_SMALL,
  COLOUR_BLACK,
  COLOUR_GREEN,
  COLOUR_GREY,
  FONT_SIZE_TITLE,
  COLOUR_RED,
  COLOUR_GREEN_LIGHT,
} from '../constants/styles';


const Text = (props) => {
  const {
    big, bigger, biggest, bold, children,
    green, grey, lightGreen, red, small,
    style, title, white,
  } = props;
  const predefinedStyle = {
    color: COLOUR_BLACK,
  };

  if (big) {
    predefinedStyle.fontSize = FONT_SIZE_BIG;
  }

  if (bigger) {
    predefinedStyle.fontSize = FONT_SIZE_BIGGER;
  }

  if (biggest) {
    predefinedStyle.fontSize = FONT_SIZE_BIGGEST;
  }

  if (bold) {
    predefinedStyle.fontWeight = 'bold';
  }

  if (green) {
    predefinedStyle.color = COLOUR_GREEN;
  }

  if (grey) {
    predefinedStyle.color = COLOUR_GREY;
  }

  if (lightGreen) {
    predefinedStyle.color = COLOUR_GREEN_LIGHT;
  }

  if (red) {
    predefinedStyle.color = COLOUR_RED;
  }

  if (small) {
    predefinedStyle.fontSize = FONT_SIZE_SMALL;
  }

  if (title) {
    predefinedStyle.fontSize = FONT_SIZE_TITLE;
  }

  if (white) {
    predefinedStyle.color = COLOUR_WHITE;
  }

  return (
    <RnText
      {...props}
      style={{
        ...predefinedStyle,
        ...style,
      }}
    >
      {children}
    </RnText>
  );
};

Text.propTypes = {
  big: PropTypes.bool,
  bigger: PropTypes.bool,
  biggest: PropTypes.bool,
  bold: PropTypes.bool,
  children: PropTypes.object,
  green: PropTypes.bool,
  grey: PropTypes.bool,
  lightGreen: PropTypes.bool,
  red: PropTypes.string,
  small: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.bool,
  white: PropTypes.bool,
};

export default Text;

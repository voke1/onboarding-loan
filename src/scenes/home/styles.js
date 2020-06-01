import { StyleSheet } from 'react-native';
import {
  COLOUR_SCENE_BACKGROUND,
  WHITE_SPACING,
  COLOUR_WHITE,
  COLOUR_GREEN,
} from '../../constants/styles';

export default StyleSheet.create({
  baseContainer: {
    backgroundColor: COLOUR_SCENE_BACKGROUND,
    flex: 2,
  },
  dateAndNameContainer: {
    backgroundColor: COLOUR_GREEN,
    height: 200,
    justifyContent: 'center',
    padding: WHITE_SPACING,
  },
  registeredSMEsContainer: {
    backgroundColor: COLOUR_SCENE_BACKGROUND,
  },
  searchInputView: {
    backgroundColor: COLOUR_WHITE,
    marginBottom: WHITE_SPACING * 2,
    padding: WHITE_SPACING,
  },
});

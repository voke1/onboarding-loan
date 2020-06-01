import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'space-evenly',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight,
    padding: 20,
  },
  view: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  }
});

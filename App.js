/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import SplashScene from './src/scenes/splash';
import Navigation from './src/routes';
import store from './src/services/redux/store';
import {
  loadNavigationState,
  persistNavigationState,
} from './src/utils/navigation';

const persistenceKey = 'persistenceKey';


const App = () => (
  <Provider store={store}>
    <Navigation
      loadNavigationState={() => loadNavigationState(persistenceKey)}
      persistNavigationState={() => persistNavigationState(persistenceKey)}
      renderLoadingExperimental={() => <SplashScene />}
    />
  </Provider>
);

export default App;

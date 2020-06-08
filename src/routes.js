import { createAppContainer, createStackNavigator } from 'react-navigation';

import ChangePasswordScene from './scenes/change-password';
import EditSME from './scenes/edit-sme';
import HomeScene from './scenes/home';
import LandingScene from './scenes/landing';
import LoginScene from './scenes/login';
import RegisterScene from './scenes/register';
import OnboardNewSMEScene from './scenes/onboard-new-sme/scene';
import SMEDetailsScene from './scenes/sme-details';
import SplashScene from './scenes/splash';

const routes = createStackNavigator({
  ChangePassword: {
    screen: ChangePasswordScene,
    navigationOptions: {
      header: null,
    },
  },
  EditSME: {
    screen: EditSME,
    navigationOptions: {
      header: null,
    },
  },
  HomeScene: {
    screen: HomeScene,
    navigationOptions: {
      header: null,
    },
  },
  LandingScene: {
    screen: LandingScene,
    navigationOptions: {
      header: null,
    },
  },
  LoginScene: {
    screen: LoginScene,
    navigationOptions: {
      header: null,
    },
  },
  RegisterScene: {
    screen: RegisterScene,
    navigationOptions: {
      header: null,
    },
  },
  OnboardNewSME: {
    screen: OnboardNewSMEScene,
    navigationOptions: {
      header: null,
    },
  },
  SMEDetailsScene: {
    screen: SMEDetailsScene,
    navigationOptions: {
      header: null,
    },
  },
  SplashScene: {
    screen: SplashScene,
    navigationOptions: {
      header: null,
    },
  },
}, {
  initialRouteName: 'LandingScene',
});

export default createAppContainer(routes);

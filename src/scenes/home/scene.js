import React from 'react';
import {
  Alert,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import Svg, { Circle, Ellipse, Path, Polygon, Rect } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createBottomTabNavigator,
} from 'react-navigation';
import {
  Body,
  Fab,
  Header,
  Icon,
  Right,
  Text as NbText,
  Title,
  Toast,
  Button,
} from 'native-base';
import PropTypes from 'prop-types';

import ActivityIndicator from '../../components/activity-indicator';
import BaseScene from '../base/scene';
import Strip from './components/strip';
import Collaborating from '../../illustrations/collaborating';
import Text from '../../components/text';
import {
  COLOUR_BLACK,
  COLOUR_GREEN,
  COLOUR_GREEN_DARK,
  COLOUR_GREY,
  COLOUR_RED,
  COLOUR_YELLOW_LIGHT,
  COLOUR_WHITE,
  WHITE_SPACING,
} from '../../constants/styles';
import SMEStrip from './components/sme-strip';
import Profiles from '../../services/api/resources/profiles';
import SME from '../../services/api/resources/smes';
import styles from './styles';
import TextInput from '../../components/form-controls/text-input';
import { ERROR_STATUS } from '../../constants/api';
import { retrieveData } from '../../utils/auth';
import { Card, CardItem } from 'native-base';
import userImage from '../../assets/images/Union.png'



const HomeTab = (props) => {

  const { navigation } = props;

  return (
    <BaseScene style={styles.baseContainer}>
      <ScrollView>
        <StatusBar
          animated
          backgroundColor={COLOUR_GREEN_DARK}
          barStyle="light-content"
        // translucent
        />

        <View
          style={{
            ...styles.dateAndNameContainer,
          }}
        >

          <Svg fill="none" height="110" width="130" style={{ position: 'absolute', top: 0, right: 0 }}>
            <Path
              opacity="0.063399"
              d="M109 77C150.974 77 185 42.9736 185 1C185 -40.9736 150.974 -75 109 -75C67.0264 -75 33 -40.9736 33 1C33 42.9736 67.0264 77 109 77Z"
              stroke="white"
              strokeWidth="65" />
          </Svg>
          <Svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            width="145"
            height="89"
            viewBox="0 0 145 89"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              opacity="0.063399"
              d="M36 56C77.9736 56 112 21.9736 112 -20C112 -61.9736 77.9736 -96 36 -96C-5.97364 -96 -40 -61.9736 -40 -20C-40 21.9736 -5.97364 56 36 56Z"
              stroke="white"
              strokeWidth="65" />
          </Svg>
          {/* Beginning */}
          <View style={{ alignItems: 'flex-end' }}>
            <Collaborating />
          </View>
          {/* END */}

          <Text
            mid
            white
          >
            {/* Jan, 10 2020. */}
          </Text>
          <Text
            bigger
            bold
            white
            style={{
              opacity: .5
            }}
          >
            Welcome Back
          </Text>
        </View>

        <Svg fill="none" height="110" width="130" style={{ position: 'absolute', top: 200, right: 0 }}>
          <Path
            opacity="0.23399"
            d="M109 77C150.974 77 185 42.9736 185 1C185 -40.9736 150.974 -75 109 -75C67.0264 -75 33 -40.9736 33 1C33 42.9736 67.0264 77 109 77Z"
            stroke={'#d03c3f'}
            strokeWidth="65" />
        </Svg>
        <Svg
          width="92"
          height="132"
          viewBox="0 0 92 132"
          xlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: .4,
            right: 0,
            position: 'absolute',
            top: 460
          }}>
          <Path d="M66 115C93.062 115 115 93.062 115 66C115 38.938 93.062 17 66 17C38.938 17 17 38.938 17 66C17 93.062 38.938 115 66 115Z" fill="none" stroke="#00425F" strokeWidth="33" />
        </Svg>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Registered SMEs')}
          >
            <Card style={{ marginTop: "9%", marginRight: '10%', marginLeft: '10%', alignItems: "center", height: 130, elevation: 30, }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ marginTop: '10%' }}>

                  <Text style={styles1.cardText1} >Total </Text>
                  <Text style={styles1.cardText2} >90</Text>

                </View>
                <View style={styles1.dot1}>
                  <Image
                    style={{

                      marginTop: '25%',
                      marginLeft: '30%',
                      height: 40,
                      width: 30
                    }}
                    source={userImage}
                  />
                </View>

              </View>

            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Registered SMEs')}
          >
            <Card style={{ marginTop: '5%', marginRight: '10%', marginLeft: '10%', alignItems: "center", height: 130, elevation: 30, }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ marginTop: '10%' }}>

                  <Text style={styles1.cardText1} >Today </Text>
                  <Text style={styles1.cardText2} >10</Text>

                </View>
                <View style={styles1.dot1}>
                  <Image
                    style={{

                      marginTop: '25%',
                      marginLeft: '30%',
                      height: 40,
                      width: 30
                    }}
                    source={userImage}
                  />
                </View>

              </View>

            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Registered SMEs')}
          >
            <Card style={{ marginTop: '5%', marginRight: '10%', marginLeft: '10%', alignItems: "center", height: 130 }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ marginTop: '10%' }}>

                  <Text style={styles1.cardText1} >This Month </Text>
                  <Text style={styles1.cardText2} >50</Text>

                </View>
                <View style={styles1.dot1}>
                  <Image
                    style={{

                      marginTop: '25%',
                      marginLeft: '30%',
                      height: 40,
                      width: 30
                    }}
                    source={userImage}
                  />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Fab
        onPress={() => navigation.navigate('OnboardNewSME')}
        style={{
          backgroundColor: COLOUR_GREEN,
        }}
      >
        <Icon name="add" />
      </Fab>
    </BaseScene>
  );
};

HomeTab.propTypes = {
  navigation: PropTypes.object,
};




class RegisteredSMEsTab extends React.Component {
  smes = new SME();

  constructor() {
    super();

    this.state = {
      isLoading: false
    };

    this.loadData = this.loadData.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.setState({
      isLoading: true,
    });

    const { response, status } = await this.smes.getSMEs()
    console.log('RESPONSE: ', response);
    console.log('STATUS: ', status);

    if (status == ERROR_STATUS) {
      return
    }

    const { data } = response;
    const smes = response;
    console.log("SMES: ", smes)

    console.log(smes)

    this.setState({
      isLoading: false,
      smes,
    })
  }

  refresh() {
    this.setState({
      isLoading: true,
    });

    this.loadData();
  }

  render() {
    const { isLoading } = this.state;
    const { navigation } = this.props;

    return (
      <BaseScene style={styles.registeredSMEsContainer}>
        <StatusBar
          animated
          backgroundColor={COLOUR_GREEN}
          barStyle="light-content"
        />
        <Header
          androidStatusBarColor={COLOUR_GREEN_DARK}
          style={{
            backgroundColor: COLOUR_GREEN,
          }}
        >
          <Body><Title>Registered SMEs</Title></Body>
          <Right
            onPress={this.refresh}
          >
            <TouchableOpacity
              onPress={this.refresh}
              style={{
                alignItems: 'flex-end',
                width: 200,
              }}
            >
              <Icon
                name="refresh"
                style={{
                  color: COLOUR_WHITE,
                }}
              />
            </TouchableOpacity>
          </Right>
        </Header>
        <View
          style={{
            ...styles.searchInputView,
          }}
        >
          <TextInput inputLabel="Search" />
        </View>
        <FlatList
          contentContainerStyle={{
            ...styles.registeredSMEsContainer,
          }}
          data={this.state.smes}
          renderItem={({
            item,
          }) => <SMEStrip {...item} navigation={navigation} />}
        />
        {isLoading && <ActivityIndicator />}
        <Fab
          onPress={() => navigation.navigate('OnboardNewSME')}
          style={{
            backgroundColor: COLOUR_GREEN,
          }}
        >
          <Icon name="add" />
        </Fab>
      </BaseScene>
    );
  }
};

RegisteredSMEsTab.propTypes = {
  navigation: PropTypes.object,
};




class ProfileTab extends React.Component {
  profiles = new Profiles();

  constructor() {
    super();

    this.state = {
      form: {

      },
      invalidFields: [],
      propagateFormErrors: false,
      requiredFields: ['name', 'email'],
    }

    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  addInvalidField(fieldName) {
    const newInvalidFields = [
      ...this.state.invalidFields,
      fieldName
    ];

    this.setState({
      invalidFields: newInvalidFields,
      isValid: newInvalidFields.length === 0
    });
  }

  removeInvalidField(fieldName) {
    const newInvalidFields = this.state.invalidFields.filter(value => value !== fieldName);

    this.setState({
      invalidFields: newInvalidFields,
      isValid: newInvalidFields.length === 0
    });
  }

  updateFormField(params) {
    const newForm = {
      ...this.state.form,
      ...params
    };

    const isComplete = this.state.requiredFields.find(
      fieldName => newForm[fieldName] === null || newForm[fieldName] === undefined
    ) === undefined;

    this.setState({
      form: newForm,
      isComplete,
    });
  }

  async loadData() {
    this.setState({
      isLoading: true,
    });
    const result = await retrieveData();
    const { status, response } = await this.profiles.getProfile(result.email);

    if (status === ERROR_STATUS) {
      return
    }
    this.setState({
      form: {
        ...response
      },
      isLoading: false,
    })
  }

  async save() {
    const missingFields = this.state.requiredFields.filter(
      (value) => !Boolean(this.state.form[value])
    );

    if (missingFields.length > 1 || this.state.invalidFields.length > 1) {
      this.setState({
        propagateFormErrors: true,
      });

      return
    }

    this.setState({
      isLoading: true,
    });

    const { status, response } = await this.profiles.updateProfile({
      id: this.state.form._id,
      firstName: this.state.form.firstName,
      lastName: this.state.form.lastName,
      email: this.state.form.email,
    });

    this.setState({
      isLoading: false,
    });

    if (status === ERROR_STATUS) {
      Alert.alert(
        'Error',
        'An error occured. Check your input and try again later.'
      );
    } else {
      Alert.alert(
        'Success',
        'Your profile was updated successfully!'
      );
    }
  }

  render() {
    const { isFormValid, propagateFormErrors } = this.state;

    return (
      <BaseScene>

        <Header
          androidStatusBarColor={COLOUR_GREEN_DARK}
          style={{
            backgroundColor: COLOUR_GREEN,
          }}
        >
          <Body><Title>Profile</Title></Body>
          <Right
            onPress={this.save}
          >
          </Right>
        </Header>
        <View
          style={{
            padding: WHITE_SPACING * 2,
          }}
        >
          <TextInput
            autoCapitalize="words"
            defaultValue={this.state.form.firstName}
            inputLabel="First Name"
            keyboardType="name"
            onValueChange={(firstName, isValid) => {
              this.updateFormField({ firstName });
              isValid === false ? this.addInvalidField('firstName') : this.removeInvalidField('firstName');
            }}
            propagateErrors={propagateFormErrors}
            validators={{
              required: true,
            }}
          />
          <TextInput
            autoCapitalize="words"
            defaultValue={this.state.form.lastName}
            inputLabel="Last Name"
            keyboardType="name"
            onValueChange={(lastName, isValid) => {
              this.updateFormField({ lastName });
              isValid === false ? this.addInvalidField('lastName') : this.removeInvalidField('lastName');
            }}
            propagateErrors={propagateFormErrors}
            validators={{
              required: true,
            }}
          />
          <TextInput
            autoCapitalize="words"
            defaultValue={this.state.form.email}
            inputLabel="Email"
            keyboardType="email"
            onValueChange={(email, isValid) => {
              this.updateFormField({ email });
              isValid === false ? this.addInvalidField('email') : this.removeInvalidField('email');
            }}
            propagateErrors={propagateFormErrors}
            validators={{
              email: true,
              required: true,
            }}
          />

          <Button
            block
            disabled={this.state.isLoading}
            isLoading={this.state.isLoading}
            onPress={this.save}
            style={{
              backgroundColor: COLOUR_GREEN,
              marginTop: 40,
            }}
          >
            {this.state.isLoading ? <ActivityIndicator /> : <NbText>Update</NbText>}
          </Button>
        </View>
      </BaseScene>
    )
  }
}

ProfileTab.propTypes = {
  navigation: PropTypes.object,
}





export default createBottomTabNavigator({
  Home: HomeTab,
  'Registered SMEs': RegisteredSMEsTab,
  Profile: ProfileTab,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = () => <Ionicons name="md-home" size={25} color={tintColor} />;
        } else if (routeName === 'Registered SMEs') {
          iconName = 'md-list';
        } else if (routeName === 'Profile') {
          iconName = 'md-person';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: COLOUR_GREEN,
      inactiveTintColor: 'gray',
    },
  });


const styles1 = StyleSheet.create({

  dot: {
    backgroundColor: 'rgba(5, 25, 92, 0.25)',
    width: 79,
    height: 81,
    marginTop: '3%',
    // marginBottom: 3,
    borderRadius: 68,
    // marginLeft: '30%',
  },

  dot1: {
    backgroundColor: COLOUR_GREEN,
    width: 79,
    height: 81,
    marginTop: '7%',
    // marginBottom: 3,
    borderRadius: 68,
    marginLeft: '30%',
  },


  text1: {
    color: '#000000',
    fontFamily: 'Nunito Sans',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    lineHeight: 19,
    marginTop: '20%'
  },
  text2: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontFamily: 'Nunito Sans',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    lineHeight: 19,
    marginTop: '3%'
  },
  text3: {
    color: '#05195C',
    fontFamily: 'Nunito Sans',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    lineHeight: 38,
  },
  text4: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontFamily: 'Nunito Sans',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 19,
    marginTop: '3%'
  },
  cardText: {
    color: '#000000',
    fontFamily: 'Nunito Sans',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    lineHeight: 27,
  },
  cardText1: {
    color: '#7E8EAA',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    lineHeight: 20,
  },
  cardText2: {
    color: '#000000',
    fontFamily: 'Nunito Sans',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    lineHeight: 30,
  },
});
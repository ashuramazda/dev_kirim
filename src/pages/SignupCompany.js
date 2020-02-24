import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import RegisterFormCompany from '../components/RegisterFormCompany';

class SignupCompany extends Component { 
  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.personalContainer}>
            <TouchableOpacity style={styles.iconpersonalContainer}>
              <Icon
                style={styles.personalIcon}
                name="user-circle"
                size={30}
                color="grey"
              />
            </TouchableOpacity>
            <Text style={styles.personalStyle}>Personal</Text>
          </View>
          <View style={styles.orContainer}>
            <Text>Or</Text>
          </View>
          <View style={styles.companyContainer}>
            <TouchableOpacity 
            style={styles.iconcompanyContainer}
            onPress={() =>
              this.props.navigation.navigate('SignupPersonal')
            }>
              <Icon
                style={styles.personalIcon}
                name="building"
                size={30}
                color="#09116e"
              />
            </TouchableOpacity>
            <Text style={styles.personalStyle}>Company</Text>
          </View>
        </View>
        <RegisterFormCompany type="Sign Up" />
        <View style={styles.signupTextcont}>
          <Text style={styles.signupText}>Already have an Account?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.signupTextbutton}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextcont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'black',
    fontSize: 16,
  },
  signupTextbutton: {
    color: '#030966',
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 5,
  },
  logoContainer: {
    paddingTop: 50,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 50,
  },
  personalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orContainer: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalStyle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  iconpersonalContainer: {
    width: 40,
    height: 40,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconcompanyContainer: {
    width: 40,
    height: 40,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personalIcon: {
    position: 'absolute',
  },
});

export default withNavigation(SignupCompany);
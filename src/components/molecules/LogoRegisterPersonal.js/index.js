import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class LogoRegisterPersonal extends Component {

  static navigationOptions = {
    title: null,
  }

  render() {
    return (
      <View style={styles.logoContainer}>
        <View style={styles.personalContainer}>
          <TouchableOpacity style={styles.iconpersonalContainer}>
            <Icon
              style={styles.personalIcon}
              name="user-circle"
              size={30}
              color="#09116e"
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
            onPress={() => this.props.navigation.push('SignupCompany')}
          >
            <Icon
              style={styles.personalIcon}
              name="building"
              size={30}
              color="grey"
            />
          </TouchableOpacity>
          <Text style={styles.personalStyle}>Company</Text>
        </View>
      </View>
    );
  }  
}

const styles = StyleSheet.create({ 
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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


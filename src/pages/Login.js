import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/FormLogin';

export default class Login extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Form type="Sign In" navigation={this.props.navigation}/>
        <View style={styles.signupTextcont}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
            <Text style={styles.signupTextbutton}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextcont: {
    flexGrow: 1,
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
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#060d78',
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 16,
    width: 300,
  },
});
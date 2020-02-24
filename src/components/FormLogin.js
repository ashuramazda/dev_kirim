import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Text,  
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Form, Input, Item} from 'native-base';
import { connect } from 'react-redux';
import { saveUserToken } from '../actions/action';
import { curl } from './Common';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

class FormLogin extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      email_phone: '',
      password: '',
      error: '',
    }

    this._signInAsync = this._signInAsync.bind(this);
  }

  _signInAsync = () => {
    if(this.state.email_phone == ''){
      Alert.alert('Email field is empty !');
    }else if(this.state.password == ''){
      Alert.alert('Password field is empty !');
    }else{
      let data = {
        email_phone : this.state.email_phone,
        password: this.state.password,
        login_type: 'S',
        device_type: 'Apps',
        device_token: 'Apps',
      };
  
      curl('customer/login', data).then(response => {
        
        if(response.code == '0' || response.code == '2'){
          Alert.alert(response.message)
        }else{
          this.props.saveUserToken(response.data.token)
            .then(() => {
              this.props.navigation.navigate('App');
            })
            .catch((error) => {
              this.setState({ error })
            })
        }
        
      });
      
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>LOGIN</Text>
        <Form style={styles.formLoginStyle}>
          <Item style={styles.itemStyle}>
            <Input
              style={styles.inputBox}
              keyboardType="email-address"
              placeholder="Email Address"
              placeholderTextColor="#ffff"
              ref={(input) => this._email = input}
              onChangeText={(email_phone) => this.setState({email_phone})}
              returnKeyType="next"
              onSubmitEditing={(event) => {
                this._password._root.focus(); }}
            />
            <Icon
              style={styles.usernameIcon}
              name="user"
              size={25}
              color="#ffff"
            />
          </Item>
          <Item style={styles.itemStyle}>
            <Input
              style={styles.inputBox}
              ref={(input) => this._password = input}
              placeholder="Password"
              secureTextEntry={true}
              name="password"
              ref={(input) => this._email = input}
              onChangeText={(password) => this.setState({password})}
            />
            <Icon
              style={styles.passwordIcon}
              name="lock"
              size={25}
              color="#ffff"
            />
          </Item>
        </Form>
        <View>
          <TouchableOpacity style={styles.button} onPress={this._signInAsync}>
            <Text style={styles.buttonText}>{this.props.type}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  containerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#030966',
    textAlign: 'center',
  },
  formLoginStyle: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  inputBox: {
    backgroundColor: 'rgba(26, 45, 44, 0.48)',
    borderRadius: 20,
    fontSize: 16,    
    paddingLeft: 50,
    position: 'relative',
    color: '#fff',
  },
  itemStyle: {
    margin: 10,
    width: 300,
    height: 40,
    borderColor: 'transparent',
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
  usernameIcon: {
    paddingLeft: 15,
    paddingBottom: 5,
    position: 'absolute',
  },
  passwordIcon: {
    paddingLeft: 15,
    paddingTop: 5,
    position: 'absolute',
  },
});

AppRegistry.registerComponent('FormLogin', () => Form);


const mapStateToProps = state => ({
  token: state.token,
});


const mapDispatchToProps = dispatch => ({
  saveUserToken: (token) => dispatch(saveUserToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);

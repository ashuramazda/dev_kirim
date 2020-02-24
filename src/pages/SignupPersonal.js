import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput, Picker, TouchableOpacity} from 'react-native';
import RegisterFormPersonal from '../components/RegisterFormPersonal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { decryption, curl } from '../components/Common';
import { CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export default class SignupPersonal extends Component {

  static navigationOptions = {
    title: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      country: [],
      countryvalue: '',
    }
  }

  componentDidMount() {
    curl('customer/countryList', [])
      .then(response => {
        this.setState({
          country: response.data
        });
      });
  }  

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
              onPress={() =>
                this.props.navigation.navigate('SignupCompany')
              }>
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
        <RegisterFormPersonal />        
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
  
  containerlogopersonal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    top: 7,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  passwordContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  countryContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    bottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  repasswordContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    bottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  provinceContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 13,
  },
  inputName: {
    width: 190,
    height: 40,
    backgroundColor: 'rgba(26, 45, 44, 0.48)',
    borderRadius: 4,
    fontSize: 14,
    color: '#ffffff',
    padding: 10,
    marginHorizontal: 3,
  },
  inputEmail: {
    width: 386,
    height: 40,
    backgroundColor: 'rgba(26, 45, 44, 0.48)',
    borderRadius: 4,
    fontSize: 14,
    color: '#ffffff',
    marginHorizontal: 3,
    marginTop: 0,
    padding: 5,
  },
  pickerContainer: {
    borderRadius: 6,
    width: 140,
    height: 40,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
    top: 7,
  },
  pickerProvinceContainer: {
    borderRadius: 6,
    width: 190,
    height: 40,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
    top: 7,
  },
  inputCodearea: {
    width: 140,
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(26, 45, 44, 0.48)',
    borderRadius: 50,
    fontSize: 14,
    color: '#ffffff',
    paddingLeft: 20,
    paddingRight: 10,
  },
  inputProvince: {
    width: 190,
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(26, 45, 44, 0.48)',
    borderRadius: 50,
    fontSize: 14,
    color: '#ffffff',
    paddingLeft: 20,
    paddingRight: 10,
  },
  inputPhonenumber: {
    width: 243,
    height: 40,
    backgroundColor: 'rgba(26, 45, 44, 0.48)',
    borderRadius: 4,
    fontSize: 14,
    color: '#ffffff',
    marginHorizontal: 3,
    marginTop: 14,
    padding: 10,
  },
  inputCity: {
    width: 190,
    height: 40,
    backgroundColor: 'rgba(26, 45, 44, 0.48)',
    borderRadius: 4,
    fontSize: 14,
    color: '#ffffff',
    marginHorizontal: 3,
    marginTop: 14,
    padding: 10,
  },
  inputPassword: {
    width: 386,
    height: 40,
    backgroundColor: 'rgba(26, 45, 44, 0.48)',
    borderRadius: 4,
    fontSize: 14,
    color: '#ffffff',
    marginHorizontal: 3,
    marginTop: 14,
    padding: 10,
  },
  reinputPassword: {
    width: 386,
    height: 40,
    backgroundColor: 'rgba(26, 45, 44, 0.48)',
    borderRadius: 4,
    fontSize: 14,
    color: '#ffffff',
    marginHorizontal: 3,
    marginTop: 7,
    padding: 10,
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

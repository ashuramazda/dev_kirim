import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {Input, Item, Container, Content, Label, CheckBox, Picker, Card, CardItem, Body, Button} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {decryption, curl} from './Common';
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

export default class RegisterFormCompany extends Component {
  
  static navigationOptions = {
    title: null,
  }

  constructor(props){
    super(props);
    this.state = {
      list_country : [],
      list_country_code: [],
      countryvalue : '',
      country_id: '',
      list_province: [],
      province_id: '',
      list_city: [],
      city_id: '',
      first_name: '',
      email: '',
      country_code: '',
      password: '',
      password_confirmation: '',
      mobile_number: '',
      address_line1: '',
      address_line2: '',
      person_name: '',
      person_country_code: '',
      person_mobile_number: '',
      customer_position: '',
      accept_terms: false,
    }
  }

  componentDidMount(){
    curl('customer/countryList', [])
    .then(response => {
      let country_code = [];
      let list_country = [];
      response.data.map ((item, key) => {
        
        country_code.push({
          label: item.code,
          value: item.code,
        })

        list_country.push({
          label: item.country_name,
          value: item.id,
        })
      });

      this.setState ({
        list_country_code: country_code,
        list_country: list_country,
      })
    });    
  }

  _provinceList = () => {
    if(this.state.country_id != ''){
      curl('customer/stateListByCountry', {country_id: this.state.country_id})
        .then(response => {
          let list_province = [];
          response.data.map ((item, key) => {
            list_province.push({
              label: item.province_name,
              value: item.province_id,
            })
          });

          this.setState ({
            list_province: list_province,
          })
        });
    }
  }

  _cityList = () => {
    if(this.state.province_id != ''){
      curl('customer/cityListByState', {province_id: this.state.province_id})
        .then(response => {
          let list_city = [];
          response.data.map ((item, key) => {
            list_city.push({
              label: item.city_name,
              value: item.city_id,
            })
          });

          this.setState ({
            list_city: list_city,
          })
        });
    }
  }

  _signUpAsync = () => {
    if(this.state.email == ''){
      Alert.alert('Email field is empty !');
    }else if(this.state.password == ''){
      Alert.alert('Password field is empty !');
    }else if(this.state.country_id == ''){
      Alert.alert('Country Not Selected !');
    }else if(this.state.country_code == ''){
      Alert.alert('Country Code Not Selected !');
    }else if(this.state.province_id == ''){
      Alert.alert('Province Not Selected !');
    }else if(this.state.city_id == ''){
      Alert.alert('City Not Selected !');
    }else if(this.state.first_name == ''){
      Alert.alert('First Name is empty !');
    }else if(this.state.mobile_number == ''){
      Alert.alert('Mobile Number is empty !');
    }else if(this.state.password_confirmation == ''){
      Alert.alert('Password Confirmation is empty !');
    }else if(this.state.person_name == ''){
      Alert.alert('Contact Person is empty !');
    }else if(this.state.person_country_code == ''){
      Alert.alert('Contact Person Country Code is empty !');
    }else if(this.state.person_mobile_number == ''){
      Alert.alert('Contact Person Mobile Number is empty !');
    }else if(this.state.customer_position == ''){
      Alert.alert('Contact Person Position is empty !');
    }else if(this.state.password_confirmation != this.state.password){
      Alert.alert('Password Confirmation doesnt match !');
    }else if(this.state.accept_terms == false){
      Alert.alert('Terms & Conditions must accepted before registration !');
    }else{
      let data = {
        email : this.state.email,
        password: this.state.password,
        country_id: this.state.country_id,
        province_id: this.state.province_id,
        city_id: this.state.city_id,
        first_name: this.state.first_name,
        country_code: this.state.country_code,
        mobile_number: this.state.mobile_number,
        person_name: this.state.person_name,
        person_country_code: this.state.person_country_code,
        person_mobile_number: this.state.person_mobile_number,
        customer_position: this.state.customer_position,
        account_type: 'Company',
        login_type: 'S',
        device_type: 'Apps',
        device_token: 'Apps',
        otp_code: '0',
      };
  
      curl('customer/signup', data).then(response => {
        console.log('res',response)
        if(response.code == '0' || response.code == '2'){
          Alert.alert(response.message)
        }else{
          this.props.navigation.navigate('Auth');
        }
        
      });
      
    }
  };

  render() {

    return (
      <KeyboardAwareScrollView style={{flex: 1}}>
        <Container>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>Company Account</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Row>
                    <Col style={styles.col}>
                      <Item floatingLabel>
                        <Label>Company Name</Label>
                        <Input onChangeText={(first_name) => this.setState({first_name})}/>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col style={styles.col}>
                      <Item floatingLabel>
                        <Label>Company Email</Label>
                        <Input onChangeText={(email) => this.setState({email})}/>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col size={30} style={styles.col_country_code}>
                      <Item picker>
                        <Picker
                          enabled={this.state.list_country_code.length > 0 ? true : false}
                          mode="dropdown"
                          iosIcon={<Ionicons name="ios-arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Select country code"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.country_code}
                          onValueChange={
                            (itemValue, itemIndex) =>
                            this.setState ({
                              country_code: itemValue
                            })
                          }
                        >
                        {this.state.list_country_code.map((name, index) => (
                          <Picker.Item label={name.label} value={name.value} />
                        ))}
                        </Picker>
                      </Item>
                    </Col>
                    <Col size={65} style={styles.col}>
                      <Item floatingLabel>
                        <Label>Company Mobile Number</Label>
                        <Input onChangeText={(mobile_number) => this.setState({mobile_number})}/>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col style={styles.col}>
                      <Item floatingLabel>
                        <Label>Company Address Line 1</Label>
                        <Input onChangeText={(address_line1) => this.setState({address_line1})}/>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col style={styles.col}>
                      <Item floatingLabel>
                        <Label>Company Address Line 2</Label>
                        <Input onChangeText={(address_line2) => this.setState({address_line2})}/>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col style={styles.col}>
                      <Item picker>
                        <Picker
                          enabled={this.state.list_country.length > 0 ? true : false}
                          mode="dropdown"
                          iosIcon={<Ionicons name="ios-arrow-down"/>}
                          style={{ width: undefined }}
                          placeholder="Select country"
                          placeholderStyle={{ color: "#bfc6ea"}}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.country_id}
                          onValueChange={
                            (itemValue, itemIndex) =>
                            this.setState ({
                              country_id: itemValue
                            }, () => {
                              this._provinceList();
                            })
                          }
                        >
                        {this.state.list_country.map((name, index) => (
                          <Picker.Item label={name.label} value={name.value} />
                        ))}
                        </Picker>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col style={styles.col}>
                      <Item picker>
                        <Picker
                          enabled={this.state.list_province.length > 0 ? true : false}
                          mode="dropdown"
                          iosIcon={<Ionicons name="ios-arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Select province"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.province_id}
                          onValueChange={
                            (itemValue, itemIndex) =>
                            this.setState ({
                              province_id: itemValue
                            }, () => {
                              this._cityList();
                            })
                          }
                        >
                        {this.state.list_province.map((name, index) => (
                          <Picker.Item label={name.label} value={name.value} />
                        ))}
                        </Picker>
                      </Item>
                    </Col>

                    <Col style={styles.col}>
                      <Item picker>
                        <Picker
                          enabled={this.state.list_city.length > 0 ? true : false}
                          mode="dropdown"
                          iosIcon={<Ionicons name="ios-arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Select city"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.city_id}
                          onValueChange={
                            (itemValue, itemIndex) =>
                            this.setState ({
                              city_id: itemValue
                            })
                          }
                        >
                        {this.state.list_city.map((name, index) => (
                          <Picker.Item label={name.label} value={name.value} />
                        ))}
                        </Picker>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col style={styles.col}>
                      <Item floatingLabel>
                        <Label>Contact Person Name</Label>
                        <Input onChangeText={(person_name) => this.setState({person_name})}/>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col size={30} style={styles.col_country_code}>
                      <Item picker>
                        <Picker
                          enabled={this.state.list_country_code.length > 0 ? true : false}
                          mode="dropdown"
                          iosIcon={<Ionicons name="ios-arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Select country code"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.person_country_code}
                          onValueChange={
                            (itemValue, itemIndex) =>
                            this.setState ({
                              person_country_code: itemValue
                            })
                          }
                        >
                        {this.state.list_country_code.map((name, index) => (
                          <Picker.Item label={name.label} value={name.value} />
                        ))}
                        </Picker>
                      </Item>
                    </Col>
                    <Col size={65} style={styles.col}>
                      <Item floatingLabel>
                        <Label>Person Mobile Number</Label>
                        <Input onChangeText={(person_mobile_number) => this.setState({person_mobile_number})}/>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col style={styles.col}>
                      <Item floatingLabel>
                        <Label>Contact Person Position</Label>
                        <Input onChangeText={(customer_position) => this.setState({customer_position})}/>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col style={styles.col}>
                      <Item floatingLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
                      </Item>
                    </Col>
                  </Row>

                  <Row style={{marginTop: 20}}>
                    <Col style={styles.col}>
                      <Item floatingLabel>
                        <Label>Confirm Password</Label>
                        <Input secureTextEntry={true} onChangeText={(password_confirmation) => this.setState({password_confirmation})}/>
                      </Item>
                    </Col>
                  </Row>
                </Body>
              </CardItem>
              <CardItem footer bordered>
                <TouchableOpacity onPress={() => {
                    if(this.state.accept_terms){
                      this.setState({accept_terms: false})
                    }else{
                      this.setState({accept_terms: true})
                    }
                  }}>

                  <CheckBox 
                    checked={this.state.accept_terms}
                    onPress={() => {
                      if(this.state.accept_terms){
                        this.setState({accept_terms: false})
                      }else{
                        this.setState({accept_terms: true})
                      }
                    }}
                  />
                  <Body style={{marginLeft: 40, marginTop: -17}}>
                    <Text>Accept Terms & Condition</Text>
                  </Body>
                </TouchableOpacity>
              </CardItem>
            </Card>

            <Button iconRight primary onPress={this._signUpAsync}>
              <Text style={styles.text_signup}>SIGN UP</Text>
              <Ionicons name='ios-arrow-round-forward' size={30} style={{color: '#fff',marginRight: 20}}/>
            </Button>
          </Content>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
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
  col: {
    marginLeft: 5,
    marginRight: 5,
  },
  col_country_code: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 20,
  },
  text_signup: {
    color: '#fff', 
    fontWeight: 'bold', 
    marginLeft: 10
  },
});

AppRegistry.registerComponent(
  'RegisterFormCompany',
  () => RegisterFormCompany,
);

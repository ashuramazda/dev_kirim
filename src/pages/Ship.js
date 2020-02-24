import React, {Component} from 'react';
import {View, Text, StyleSheet, BackHandler, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import { getShipData, saveShipData } from '../actions/action';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import { Container, Header, Left, Body, Right, Button, Title, Card, CardItem, Item, Label, Input, Content, Picker, CheckBox, Textarea} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Col, Row } from "react-native-easy-grid";
import Dialog from "react-native-dialog";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ImagePicker from 'react-native-image-picker';
import { curl } from '../components/Common';


const images = [
  "https://static.vecteezy.com/system/resources/previews/000/425/737/non_2x/delivery-man-with-box-postman-design-isolated-on-white-background-courier-in-hat-and-uniform-with-package-vector.jpg",
  "https://lh5.googleusercontent.com/proxy/yF4KnrBV-RWYT_XzLQbZkyowetpb9eX2ENKb_WDRS_thI7l-2DmAP5rFU2knevb_kYNnNx9zevJa9cojLXEWjhZKde4qZrq-kvT4NqNEew",
  "https://images.qourier.com/imgs/images/website/samedaydeliverysingapore-768x512.png",
  "https://i0.wp.com/www.r3sc.com.br/wp-content/uploads/2018/01/163088-entrega-de-mercadorias-x-formas-de-evitar-problemas-e-atrasos.jpg?fit=999%2C667&ssl=1"
];

const ground_cargo = [
  { label: 'Motorcycle', value: 'Motorcycle' },
  { label: 'Car', value: 'Car' },
]

const radioValue = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 },
]

class Ship extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      active_page: 'Pickup Request',
      pickup_date_visible: false,
      pickup_start_visible: false,
      pickup_end_visible: false,
      list_gender: [],
      list_country_code: [],
      list_country: [],
      list_province: [],
      list_city: [],
      to_list_province: [],
      to_list_city: [],
      list_shipped_item: [],
      list_vehicle: [],
      list_vehicle_manufacture_year: [],
      list_shipped_option: [],
      list_payment: [],
      modal_direct: false,
      //form
      pickup_date: '',
      pickup_start_time_ins: '',
      pickup_end_time_ins: '',
      courier_store_id: '',
      //from
      gender_id: 1,
      first_name: '',
      last_name: '',
      street_line1: '',
      street_line2: '',
      country_code: '',
      mobile_number: '',
      country_id: '',
      province_id: '',
      city_id: '',
      postal_code: '',
      is_primary: 0,
      is_save: 0,
      //to
      to_gender_id: 1,
      to_first_name: '',
      to_last_name: '',
      to_street_line1: '',
      to_street_line2: '',
      to_country_code: '',
      to_mobile_number: '',
      to_country_id: '',
      to_province_id: '',
      to_city_id: '',
      to_postal_code: '',
      to_is_save: 0,
      //ship
      shipped_item_type_id: '',
      shipped_item_name: '',
      sub_shipped_item_type_id: '',
      sub_shipped_item_name: '',
      vehicle_brand: '',
      vehicle_model: '',
      vehicle_manufacture_year: '',
      vehicle_color: '',
      shipped_option_id: '',
      shipped_option_name: '',
      sub_shipped_option_id: '',
      sub_shipped_option_name: '',
      is_ground_cargo: '',
      item_image: false,
      item_description: '',
      quantity: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      is_box: '',
      is_insurance: '',
      instruction: '',
      payment_option_id: '',
      payment_option_name: '',
    }
    this.onBackPress = this.onBackPress.bind(this);
    this.findId = this.findId.bind(this);
    this.addBox = this.addBox.bind(this);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    //Gender
    curl('customer/genderList', [])
    .then(response => {
      let list_gender = [];
      response.data.map ((item, key) => {
        
        list_gender.push({
          label: item.title,
          value: item.id,
        })
      });

      this.setState ({
        list_gender: list_gender,
      })
    });
    
    //Country List
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

    //Shipped Item Type
    curl('customer/shippedItemTypes', [])
    .then(response => {
      this.setState ({
        list_shipped_item: response.data,
      })
    });
    
    //Vehicle Brand
    curl('customer/carbrandList', [])
    .then(response => {
      this.setState ({
        list_vehicle: response.data,
      })
    });

    //Vehicle Manufacture Year
    let year = new Date().getFullYear();
    let list_vehicle_manufacture_year = [];
    for(let i= year-20; i <= year; i++){
      list_vehicle_manufacture_year.push({value: i, label: i});
    }

    this.setState({list_vehicle_manufacture_year: list_vehicle_manufacture_year});

    //Payment
    curl('customer/paymentOptions', [])
    .then(response => {
      this.setState ({
        list_payment: response.data,
      })
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.navigation.state.params.boxData != undefined){
      if(this.props.navigation.state.params.boxData.box_details.length > 0){
        this.setState({is_box: 1});
      }
    }
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.goBack(null);
    return true; 
  }

  showDatePicker = () => {
    this.setState({pickup_date_visible: true});
  };

  hideDatePicker = () => {
    this.setState({pickup_date_visible: false});
  };

  handleConfirm = date => {
    let newDate = date.toISOString().slice(0,10);
    this.setState({
      pickup_date: newDate,
    }, () => {
      this.hideDatePicker();
    })
  };

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

  _ToProvinceList = () => {
    if(this.state.to_country_id != ''){
      curl('customer/stateListByCountry', {country_id: this.state.to_country_id})
        .then(response => {
          let list_province = [];
          response.data.map ((item, key) => {
            list_province.push({
              label: item.province_name,
              value: item.province_id,
            })
          });

          this.setState ({
            to_list_province: list_province,
          })
        });
    }
  }

  _ToCityList = () => {
    if(this.state.to_province_id != ''){
      curl('customer/cityListByState', {province_id: this.state.to_province_id})
        .then(response => {
          let list_city = [];
          response.data.map ((item, key) => {
            list_city.push({
              label: item.city_name,
              value: item.city_id,
            })
          });

          this.setState ({
            to_list_city: list_city,
          })
        });
    }
  }

  _shippedOptionsList = () => {
    if(this.state.city_id != '' && this.state.to_city_id != ''){
      curl('customer/shippedOptions', {from_city_id: this.state.city_id, to_city_id: this.state.to_city_id})
        .then(response => {
          this.setState ({
            list_shipped_option: response.data == null ? [] : response.data,
          })
        });
    }
  }

  findId(search, array){
    return array.find( list => list.id === search)
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ item_image: response })
      }
    })
  }

  addBox = (value) => {
    this.setState({
      is_box: value
    }, () => {
      if(value == 1){
        this.props.saveShipData(this.state)
        .then(() => {
          this.props.navigation.navigate('AddBox');
        })
        .catch((error) => {
            console.log(error);
        })
      }
    })
  }

  render() {
    const subShippedItem = this.findId(this.state.shipped_item_type_id, this.state.list_shipped_item) ? this.findId(this.state.shipped_item_type_id, this.state.list_shipped_item).subData : [];

    const list_vehicle_model = this.findId(this.state.vehicle_brand, this.state.list_vehicle) ? this.findId(this.state.vehicle_brand, this.state.list_vehicle).subCategoryData : [];

    const subShippedOption = this.findId(this.state.shipped_option_id, this.state.list_shipped_option) ? this.findId(this.state.shipped_option_id, this.state.list_shipped_option).subData : [];

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onBackPress}>
              <Ionicons name='ios-arrow-round-back' style={{marginLeft: 15}} size={30}/>
            </Button>
          </Left>
          <Body>
            <Text>Ship</Text>
          </Body>
          <Right>

          </Right>
        </Header>

        <Content padder>
          <Row style={{marginTop: 10}}>
            <Col style={{marginLeft: 10, marginRight: 5}}>
              <Button 
                bordered={ this.state.active_page == 'Pickup Request' ? false : true}
                primary={ this.state.active_page == 'Pickup Request' ? true : false}
                style={ this.state.active_page == 'Pickup Request' ? styles.active_page : {}}
                onPress={() => this.setState({active_page: 'Pickup Request'})}>
                <Row>
                  <View style={styles.viewType}>
                  
                    <Text 
                    style={this.state.active_page == 'Pickup Request' ? styles.textTypeSelected : styles.textType}>
                      <FontAwesome5 
                      name="truck"
                      size={20}
                      style={this.state.active_page == 'Pickup Request' ? styles.iconTypeSelected : styles.iconType}/>
                      Pickup Request
                    </Text>
                  </View>
                </Row>
              </Button>
            </Col>

            <Col style={{marginLeft: 5, marginRight: 10}}>
              <Button 
                bordered={ this.state.active_page == 'Drop Off' ? false : true}
                primary={ this.state.active_page == 'Drop Off' ? true : false}
                style={ this.state.active_page == 'Drop Off' ? styles.active_page : {}}
                onPress={() => this.setState({active_page: 'Drop Off'})}>
                <Row>
                  <View style={styles.viewType}>
                    <Text 
                    style={this.state.active_page == 'Drop Off' ? styles.textTypeSelected : styles.textType}>
                      <FontAwesome5 
                      name="home"
                      size={20}
                      style={this.state.active_page == 'Drop Off' ? styles.iconTypeSelected : styles.iconType}/>
                      Drop Off
                    </Text>
                  </View>
                  
                </Row>
              </Button>
            </Col>
          </Row>

          {this.state.active_page == 'Pickup Request' && 
          <Row style={{marginTop: 10}}>
            <Col>
              <Card>
                <CardItem header bordered>
                  <Text>Set Pickup Date & Time</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Row>
                      <Col>
                        <Item>
                          <Input 
                            placeholder="Pickup Date" 
                            onTouchStart={this.showDatePicker}
                            editable={false}
                            value={this.state.pickup_date}/>
                          <Feather active name='calendar' size={20} style={{marginLeft: 10}}/>

                          <DateTimePickerModal
                            isVisible={this.state.pickup_date_visible}
                            mode="date"
                            onConfirm={this.handleConfirm}
                            onCancel={this.hideDatePicker}
                          />
                        </Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col size={45}>
                        <Item>
                          <Input 
                            placeholder="Pickup Time" 
                            onTouchStart={() => this.setState({pickup_start_visible: true})}
                            editable={false}
                            value={this.state.pickup_start_time_ins}/>
                          <Feather active name='clock' size={20} style={{marginLeft: 10}}/>

                          <DateTimePickerModal
                            isVisible={this.state.pickup_start_visible}
                            mode="time"
                            onConfirm={(time) => {
                              let newTime = time.getHours()+':'+time.getMinutes();
                              
                              this.setState({
                                pickup_start_time_ins: newTime,
                              }, () => {
                                this.setState({pickup_start_visible: false});
                              })
                            }}
                            onCancel={() => this.setState({pickup_start_visible: false})}
                          />
                        </Item>
                      </Col>

                      <Col size={10}>
                        <Text style={styles.toText}>To</Text>
                      </Col>

                      <Col size={45}>
                        <Item>
                          <Input 
                            placeholder="Pickup Time" 
                            onTouchStart={() => this.setState({pickup_end_visible: true})}
                            editable={false}
                            value={this.state.pickup_end_time_ins}/>
                          <Feather active name='clock' size={20} style={{marginLeft: 10}}/>

                          <DateTimePickerModal
                            isVisible={this.state.pickup_end_visible}
                            mode="time"
                            onConfirm={(time) => {
                              let newTime = time.getHours()+':'+time.getMinutes();
                              
                              this.setState({
                                pickup_end_time_ins: newTime,
                              }, () => {
                                this.setState({pickup_end_visible: false});
                              })
                            }}
                            onCancel={() => this.setState({pickup_end_visible: false})}
                          />
                        </Item>
                      </Col>
                    </Row>
                  </Body>
                </CardItem>
              </Card>
            </Col>
          </Row>
          }

          {this.state.active_page == 'Drop Off' && 
          <Row style={{marginTop: 10}}>
            <Col>
              <Card>
                <CardItem header bordered>
                  <Text>Kirim Location</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Row>
                      <Col>
                        <Item regular>
                          <Input 
                            placeholder="Find Kirim Location" 
                            onTouchStart={() => console.log('clicked')}
                            editable={false}
                            value={this.state.courier_store_id}/>
                          <Feather active name='search' size={20} style={{marginRight: 10}}/>
                        </Item>
                      </Col>
                    </Row>
                  </Body>
                </CardItem>
              </Card>
            </Col>
          </Row>
        }

          {/* CONTENT */}
          <Row style={{marginTop: 10}}>
            <Col>
              <Card>
                <CardItem header bordered style={{flex: 1,flexDirection:'row'}}>
                  <Text style={styles.floatLeft}>From</Text>

                  <TouchableOpacity style={styles.floatRight} onPress={() => this.addBox(this.state.box_details.length-1)}>
                    <Text style={styles.textAddress}>
                        Choose address
                    </Text>
                    <Ionicons name="ios-arrow-forward" size={20} style={{color: '#042893'}}/>
                    
                  </TouchableOpacity>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Row>
                      <Col size={20} style={{marginRight: 15, marginTop: 13}}>
                        <Picker
                          regular
                          enabled={this.state.list_gender.length > 0 ? true : false}
                          mode="dropdown"
                          iosIcon={<Ionicons name="ios-arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Select gender"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.gender_id}
                          onValueChange={
                            (itemValue, itemIndex) =>
                            this.setState ({
                              gender_id: itemValue
                            })
                          }
                        >
                        {this.state.list_gender.map((name, index) => (
                          <Picker.Item key={index} label={name.label} value={name.value} />
                        ))}
                        </Picker>
                      </Col>

                      <Col style={styles.col} size={40}>
                        <Item floatingLabel>
                          <Label>First Name</Label>
                          <Input onChangeText={(first_name) => this.setState({first_name})}/>
                        </Item>
                      </Col>

                      <Col style={styles.col} size={40}>
                        <Item floatingLabel last>
                          <Label>Last Name</Label>
                          <Input onChangeText={(last_name) => this.setState({last_name})}/>
                        </Item>
                      </Col>
                    </Row>

                    <Row style={{marginTop: 20}}>
                      <Col style={styles.col}>
                        <Item floatingLabel last>
                          <Label>Street Line 1</Label>
                          <Input onChangeText={(street_line1) => this.setState({street_line1})}/>
                        </Item>
                      </Col>
                    </Row>

                    <Row style={{marginTop: 20}}>
                      <Col style={styles.col}>
                        <Item floatingLabel last>
                          <Label>Street Line 2</Label>
                          <Input onChangeText={(street_line2) => this.setState({street_line2})}/>
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
                            <Picker.Item key={index} label={name.label} value={name.value} />
                          ))}
                          </Picker>
                        </Item>
                      </Col>

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
                            <Picker.Item key={index} label={name.label} value={name.value} />
                          ))}
                          </Picker>
                        </Item>
                      </Col>
                    </Row>

                    <Row style={{marginTop: 20}}>
                      <Col style={styles.col_country_code}>
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
                              }, () => {
                                this._shippedOptionsList();
                              })
                            }
                          >
                          {this.state.list_city.map((name, index) => (
                            <Picker.Item key={index} label={name.label} value={name.value} />
                          ))}
                          </Picker>
                        </Item>
                      </Col>

                      <Col style={styles.col}>
                        <Item floatingLabel last>
                          <Label>Postal Code</Label>
                          <Input keyboardType="numeric" onChangeText={(postal_code) => this.setState({postal_code})}/>
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
                            <Picker.Item key={index} label={name.label} value={name.value} />
                          ))}
                          </Picker>
                        </Item>
                      </Col>
                      <Col size={65} style={styles.col}>
                        <Item floatingLabel>
                          <Label>Mobile Phone</Label>
                          <Input onChangeText={(mobile_number) => this.setState({mobile_number})}/>
                        </Item>
                      </Col>
                    </Row>
                  </Body>
                </CardItem>

                <CardItem footer bordered>
                  <TouchableOpacity onPress={() => {
                      if(this.state.is_primary == 1){
                        this.setState({is_primary: 0})
                      }else{
                        this.setState({is_primary: 1})
                      }
                    }}>

                    <CheckBox 
                      checked={this.state.is_primary == 1 ? true : false}
                      onPress={() => {
                        if(this.state.is_primary == 1){
                          this.setState({is_primary: 0})
                        }else{
                          this.setState({is_primary: 1})
                        }
                      }}
                    />
                    <Body style={{marginLeft: 40, marginTop: -17}}>
                      <Text>Primary Address</Text>
                    </Body>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                      if(this.state.is_save == 1){
                        this.setState({is_save: 0})
                      }else{
                        this.setState({is_save: 1})
                      }
                    }}>

                    <CheckBox 
                      checked={this.state.is_save == 1 ? true : false}
                      onPress={() => {
                        if(this.state.is_save == 1){
                          this.setState({is_save: 0})
                        }else{
                          this.setState({is_save: 1})
                        }
                      }}
                    />
                    <Body style={{marginLeft: 40, marginTop: -17}}>
                      <Text>Save Address</Text>
                    </Body>
                  </TouchableOpacity>
                </CardItem>
              </Card>
            </Col>
          </Row>

          <Row style={{marginTop: 10}}>
            <Col>
              <Card>
                <CardItem header bordered style={{flex: 1,flexDirection:'row'}}>
                  <Text style={styles.floatLeft}>To</Text>

                  <TouchableOpacity style={styles.floatRight} onPress={() => this.addBox(this.state.box_details.length-1)}>
                    <Text style={styles.textAddress}>
                        Choose address
                    </Text>
                    <Ionicons name="ios-arrow-forward" size={20} style={{color: '#042893'}}/>
                    
                  </TouchableOpacity>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Row>
                      <Col size={20} style={{marginRight: 15, marginTop: 13}}>
                        <Picker
                          regular
                          enabled={this.state.list_gender.length > 0 ? true : false}
                          mode="dropdown"
                          iosIcon={<Ionicons name="ios-arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Select gender"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.to_gender_id}
                          onValueChange={
                            (itemValue, itemIndex) =>
                            this.setState ({
                              to_gender_id: itemValue
                            })
                          }
                        >
                        {this.state.list_gender.map((name, index) => (
                          <Picker.Item key={index} label={name.label} value={name.value} />
                        ))}
                        </Picker>
                      </Col>

                      <Col style={styles.col} size={40}>
                        <Item floatingLabel>
                          <Label>First Name</Label>
                          <Input onChangeText={(to_first_name) => this.setState({to_first_name})}/>
                        </Item>
                      </Col>

                      <Col style={styles.col} size={40}>
                        <Item floatingLabel last>
                          <Label>Last Name</Label>
                          <Input onChangeText={(to_last_name) => this.setState({to_last_name})}/>
                        </Item>
                      </Col>
                    </Row>

                    <Row style={{marginTop: 20}}>
                      <Col style={styles.col}>
                        <Item floatingLabel last>
                          <Label>Street Line 1</Label>
                          <Input onChangeText={(to_street_line1) => this.setState({to_street_line1})}/>
                        </Item>
                      </Col>
                    </Row>

                    <Row style={{marginTop: 20}}>
                      <Col style={styles.col}>
                        <Item floatingLabel last>
                          <Label>Street Line 2</Label>
                          <Input onChangeText={(to_street_line2) => this.setState({to_street_line2})}/>
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
                            selectedValue={this.state.to_country_id}
                            onValueChange={
                              (itemValue, itemIndex) =>
                              this.setState ({
                                to_country_id: itemValue
                              }, () => {
                                this._ToProvinceList();
                              })
                            }
                          >
                          {this.state.list_country.map((name, index) => (
                            <Picker.Item key={index} label={name.label} value={name.value} />
                          ))}
                          </Picker>
                        </Item>
                      </Col>

                      <Col style={styles.col}>
                        <Item picker>
                          <Picker
                            enabled={this.state.to_list_province.length > 0 ? true : false}
                            mode="dropdown"
                            iosIcon={<Ionicons name="ios-arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select province"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.to_province_id}
                            onValueChange={
                              (itemValue, itemIndex) =>
                              this.setState ({
                                to_province_id: itemValue
                              }, () => {
                                this._ToCityList();
                              })
                            }
                          >
                          {this.state.to_list_province.map((name, index) => (
                            <Picker.Item key={index} label={name.label} value={name.value} />
                          ))}
                          </Picker>
                        </Item>
                      </Col>
                    </Row>

                    <Row style={{marginTop: 20}}>
                      <Col style={styles.col_country_code}>
                        <Item picker>
                          <Picker
                            enabled={this.state.to_list_city.length > 0 ? true : false}
                            mode="dropdown"
                            iosIcon={<Ionicons name="ios-arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select city"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.to_city_id}
                            onValueChange={
                              (itemValue, itemIndex) =>
                              this.setState ({
                                to_city_id: itemValue
                              }, () => {
                                this._shippedOptionsList();
                              })
                            }
                          >
                          {this.state.to_list_city.map((name, index) => (
                            <Picker.Item key={index} label={name.label} value={name.value} />
                          ))}
                          </Picker>
                        </Item>
                      </Col>

                      <Col style={styles.col}>
                        <Item floatingLabel last>
                          <Label>Postal Code</Label>
                          <Input keyboardType="numeric" onChangeText={(to_postal_code) => this.setState({to_postal_code})}/>
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
                            selectedValue={this.state.to_country_code}
                            onValueChange={
                              (itemValue, itemIndex) =>
                              this.setState ({
                                to_country_code: itemValue
                              })
                            }
                          >
                          {this.state.list_country_code.map((name, index) => (
                            <Picker.Item key={index} label={name.label} value={name.value} />
                          ))}
                          </Picker>
                        </Item>
                      </Col>
                      <Col size={65} style={styles.col}>
                        <Item floatingLabel>
                          <Label>Mobile Phone</Label>
                          <Input onChangeText={(to_mobile_number) => this.setState({to_mobile_number})}/>
                        </Item>
                      </Col>
                    </Row>
                  </Body>
                </CardItem>

                <CardItem footer bordered>

                  <TouchableOpacity onPress={() => {
                      if(this.state.to_is_save == 1){
                        this.setState({to_is_save: 0})
                      }else{
                        this.setState({to_is_save: 1})
                      }
                    }}>

                    <CheckBox 
                      checked={this.state.to_is_save == 1 ? true : false}
                      onPress={() => {
                        if(this.state.to_is_save == 1){
                          this.setState({to_is_save: 0})
                        }else{
                          this.setState({to_is_save: 1})
                        }
                      }}
                    />
                    <Body style={{marginLeft: 40, marginTop: -17}}>
                      <Text>Save Address</Text>
                    </Body>
                  </TouchableOpacity>
                </CardItem>
              </Card>
            </Col>
          </Row>

          <Row style={{marginTop: 10}}>
            <Col>
              <Card>
                <CardItem header bordered>
                  <Text>What Do You Want to Ship</Text>
                </CardItem>
                <CardItem bordered>
                  {this.state.list_shipped_item.map((row,index) => (
                  <Button
                    key={index}
                    bordered={this.state.shipped_item_type_id != row.id ? true : false}
                    primary={this.state.shipped_item_type_id == row.id ? true : false} 
                    style={styles.btnShippedItem}
                    onPress={() => this.setState({
                      shipped_item_type_id : row.id,
                      shipped_item_name: row.title
                    })}>
                    <View 
                      key={index}
                      style={{flex: 1,flexDirection:'column', justifyContent:'center'}}>
                      <Image
                        key={index}
                        resizeMode={'cover'}
                        style={{width: 40, height: 40, alignSelf: 'center'}}
                        source={{uri: row.selected_img}}
                      />
                      <Text style={this.state.shipped_item_type_id == row.id ? styles.textShippedItemActive : styles.textShippedItem}>{row.title}</Text>
                    </View>
                  </Button>
                  ))}
                </CardItem>

                {subShippedItem.length > 0 && this.state.shipped_item_type_id != 4 ? 
                <CardItem bordered>
                  {subShippedItem.map((row,index) => (
                  <Button
                    key={index}
                    bordered={this.state.sub_shipped_item_type_id != row.id ? true : false}
                    primary={this.state.sub_shipped_item_type_id == row.id ? true : false} 
                    style={styles.btnShippedItem}
                    onPress={() => this.setState({
                      sub_shipped_item_type_id : row.id,
                      sub_shipped_item_name: row.title
                    })}>
                    <View 
                      key={index}
                      style={{flex: 1,flexDirection:'column', justifyContent:'center'}}>
                      <Image
                        key={index}
                        resizeMode={'cover'}
                        style={{width: 40, height: 40, alignSelf: 'center'}}
                        source={{uri: row.selected_img}}
                      />
                      <Text style={this.state.sub_shipped_item_type_id == row.id ? styles.textShippedItemActive : styles.textShippedItem}>{row.title}</Text>
                    </View>
                  </Button>
                  ))}
                </CardItem>
                : null}

                {/* VEHICLE */}
                {this.state.shipped_item_type_id == 4 ?
                  <View>
                    <CardItem bordered>
                      <Row>
                        <Col style={styles.col}>
                          <Item picker>
                            <Picker
                              enabled={this.state.list_vehicle.length > 0 ? true : false}
                              mode="dropdown"
                              iosIcon={<Ionicons name="ios-arrow-down"/>}
                              style={{ width: undefined }}
                              placeholder="Select vehicle"
                              placeholderStyle={{ color: "#bfc6ea"}}
                              placeholderIconColor="#007aff"
                              selectedValue={this.state.vehicle_brand}
                              onValueChange={
                                (itemValue, itemIndex) =>
                                this.setState ({
                                  vehicle_brand: itemValue
                                })
                              }
                            >
                            {this.state.list_vehicle.map((brand, index) => (
                              <Picker.Item key={index} label={brand.brand_name} value={brand.id} />
                            ))}
                            </Picker>
                          </Item>
                        </Col>

                        <Col style={styles.col}>
                          <Item picker>
                            <Picker
                              enabled={list_vehicle_model.length > 0 ? true : false}
                              mode="dropdown"
                              iosIcon={<Ionicons name="ios-arrow-down" />}
                              style={{ width: undefined }}
                              placeholder="Select model"
                              placeholderStyle={{ color: "#bfc6ea" }}
                              placeholderIconColor="#007aff"
                              selectedValue={this.state.vehicle_model}
                              onValueChange={
                                (itemValue, itemIndex) => 
                                  this.setState ({
                                    vehicle_model: itemValue
                                  })
                              }
                            >
                            {list_vehicle_model.length > 0 ? list_vehicle_model.map((model, index) => (
                              <Picker.Item key={index} label={model.model_name} value={model.model_id} />
                            )) : null}
                            </Picker>
                          </Item>
                        </Col>
                      </Row>
                    </CardItem>

                    <CardItem bordered>
                      <Row>
                        <Col style={styles.col_country_code}>
                          <Item picker>
                            <Picker
                              enabled={this.state.list_vehicle_manufacture_year.length > 0 ? true : false}
                              mode="dropdown"
                              iosIcon={<Ionicons name="ios-arrow-down" />}
                              style={{ width: undefined }}
                              placeholder="Select year"
                              placeholderStyle={{ color: "#bfc6ea" }}
                              placeholderIconColor="#007aff"
                              selectedValue={this.state.vehicle_manufacture_year}
                              onValueChange={
                                (itemValue, itemIndex) =>
                                this.setState ({
                                  vehicle_manufacture_year: itemValue
                                })
                              }
                            >
                            {this.state.list_vehicle_manufacture_year.map((name, index) => (
                              <Picker.Item key={index} label={name.label} value={name.value} />
                            ))}
                            </Picker>
                          </Item>
                        </Col>

                        <Col style={styles.col}>
                          <Item floatingLabel last>
                            <Label>Vehicle Color</Label>
                            <Input keyboardType="numeric" onChangeText={(vehicle_color) => this.setState({vehicle_color})}/>
                          </Item>
                        </Col>
                      </Row>
                    </CardItem>
                  </View>
                : null}
              </Card>
            </Col>
          </Row>

          <Row style={{marginTop: 10}}>
            <Col>
              <Card>
                <CardItem header bordered>
                  <Text>Item Photo</Text>
                </CardItem>
                <CardItem bordered style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity style={{ width: 120,height: 120, borderColor: 'grey', borderWidth: 1 }} onPress={this.handleChoosePhoto}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      {this.state.item_image ? (
                        <Image
                          source={{ uri: this.state.item_image.uri }}
                          style={{ width: 120, height: 120 }}
                        />
                      ): <MaterialCommunityIcons name="plus" size={40} style={{color: 'grey'}}/>}
                    </View>
                  </TouchableOpacity>
                </CardItem>
              </Card>
            </Col>
          </Row>

          <Row style={{marginTop: 10}}>
            <Col>
              <Card>
                <CardItem header bordered>
                  <Text>Item Description</Text>
                </CardItem>
                <CardItem bordered>
                  <Textarea 
                  rowSpan={3} 
                  bordered 
                  style={{flex: 1}} 
                  placeholder="Item Description" 
                  onChangeText={(item_description) => this.setState({item_description})}
                  value={this.state.item_description} />
                </CardItem>
              </Card>
            </Col>
          </Row>

          <Row style={{marginTop: 10}}>
            <Col>
              <Card>
                <CardItem header bordered>
                  <Text>Choose Shipped Option</Text>
                </CardItem>
                <CardItem bordered>
                  {this.state.city_id != '' && this.state.to_city_id != '' ?
                    this.state.list_shipped_option.length > 0 ?
                      this.state.list_shipped_option.map((row,index) => (
                      <Button
                        key={index}
                        bordered={this.state.shipped_option_id != row.id ? true : false}
                        primary={this.state.shipped_option_id == row.id ? true : false} 
                        style={styles.btnShippedItem}
                        onPress={() => this.setState({
                          shipped_option_id : row.id,
                          shipped_option_name: row.title
                        })}>
                        <View 
                          key={index}
                          style={{flex: 1,flexDirection:'column', justifyContent:'center'}}>
                          <Image
                            key={index}
                            resizeMode={'cover'}
                            style={{width: 40, height: 40, alignSelf: 'center'}}
                            source={{uri: row.selected_img}}
                          />
                          <Text style={this.state.shipped_option_id == row.id ? styles.textShippedItemActive : styles.textShippedItem}>{row.title}</Text>
                        </View>
                      </Button>
                      ))
                      : <Text style={{fontWeight: 'bold'}}>Origin and destination city not yet supported</Text>
                  : <Text style={{fontWeight: 'bold'}}>Choose origin and destination city first</Text>}
                  
                </CardItem>

                {subShippedOption.length > 0 ?
                <CardItem bordered>
                  {subShippedOption.map((row,index) => (
                  <Button
                    key={index}
                    bordered={this.state.sub_shipped_option_id != row.id ? true : false}
                    primary={this.state.sub_shipped_option_id == row.id ? true : false} 
                    style={styles.btnShippedItem}
                    onPress={() => this.setState({
                      sub_shipped_option_id : row.id,
                      sub_shipped_option_name: row.title,
                      modal_direct: row.id == 5 ? true : false,
                    })}>
                    <View
                      key={index}
                      style={{flex: 1,flexDirection:'column', justifyContent:'center'}}>
                      <Text style={this.state.sub_shipped_option_id == row.id ? styles.textShippedItemActive : styles.textShippedItem}>{row.title}</Text>
                    </View>
                  </Button>
                  ))}
                </CardItem>
                : null}
                
                <View>
                  <Dialog.Container visible={this.state.modal_direct}>
                    <Dialog.Title>Direct</Dialog.Title>
                    <RadioForm
                      initial={-1}
                      radio_props={ground_cargo}
                      style={{marginLeft: 10}}
                      onPress={(cargo) => {
                        this.setState({
                          is_ground_cargo:cargo,
                          modal_direct: false,
                        })
                      }}
                    />
                  </Dialog.Container>
                </View>
                
                {this.state.shipped_item_type_id != 4 &&
                  <View>
                    <CardItem bordered>
                    <Row>
                      <Col style={styles.col}>
                        <Item floatingLabel>
                          <Label>Quantity</Label>
                          <Input keyboardType='numeric' onChangeText={(quantity) => this.setState({quantity})}/>
                        </Item>
                      </Col>

                      <Col style={styles.col}>
                        <Item floatingLabel last>
                          <Label>Weight (Kg)</Label>
                          <Input keyboardType='numeric' onChangeText={(weight) => this.setState({weight})}/>
                        </Item>
                      </Col>
                    </Row>
                  </CardItem>

                  <CardItem bordered>
                    <Row>
                      <Col style={styles.col}>
                        <Item floatingLabel>
                          <Label>Length</Label>
                          <Input keyboardType='numeric' onChangeText={(length) => this.setState({length})}/>
                        </Item>
                      </Col>

                      <Col style={styles.col}>
                        <Item floatingLabel last>
                          <Label>Width</Label>
                          <Input keyboardType='numeric' onChangeText={(width) => this.setState({width})}/>
                        </Item>
                      </Col>

                      <Col style={styles.col}>
                        <Item floatingLabel last>
                          <Label>Height</Label>
                          <Input keyboardType='numeric' onChangeText={(height) => this.setState({height})}/>
                        </Item>
                      </Col>
                    </Row>
                  </CardItem>
                  </View>
                }

                  {/* BOX */}
                  {this.state.shipped_item_type_id != 4 && 
                  <CardItem bordered>
                    <View>
                      <Text style={{flex: 1}}>
                        Do you want Box
                      </Text>

                      <RadioForm
                        style={{marginTop: 15}}
                        formHorizontal={true}
                        animation={true}
                      >
                        {/* To create radio buttons, loop through your array of options */}
                        {
                          radioValue.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} >
                              {/*  You can set RadioButtonLabel before RadioButtonInput */}
                              <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={this.state.is_box === obj.value}
                                borderWidth={1}
                                buttonInnerColor={'#042893'}
                                buttonOuterColor={this.state.is_box === obj.value ? '#042893' : '#000'}
                                buttonSize={15}
                                buttonOuterSize={15}
                                buttonStyle={{}}
                                buttonWrapStyle={i == 0 ? {} : {marginLeft: 15}}
                                onPress={(is_box) => this.addBox(is_box)}
                              />
                              <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 15, color: 'black'}}
                                labelWrapStyle={{marginLeft: -5,marginTop: -3}}
                                onPress={(is_box) => this.addBox(is_box)}
                              />
                            </RadioButton>
                          ))
                        }  
                      </RadioForm>
                    </View>
                    
                  </CardItem>
                }

                {/* INSURANCE */}
                <CardItem bordered>
                    <View>
                      <Text style={{flex: 1}}>
                        Do you want Insurance
                      </Text>

                      <RadioForm
                        style={{marginTop: 15}}
                        formHorizontal={true}
                        animation={true}
                      >
                        {/* To create radio buttons, loop through your array of options */}
                        {
                          radioValue.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} >
                              {/*  You can set RadioButtonLabel before RadioButtonInput */}
                              <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={this.state.is_insurance === obj.value}
                                borderWidth={1}
                                buttonInnerColor={'#042893'}
                                buttonOuterColor={this.state.is_insurance === obj.value ? '#042893' : '#000'}
                                buttonSize={15}
                                buttonOuterSize={15}
                                buttonStyle={{}}
                                buttonWrapStyle={i == 0 ? {} : {marginLeft: 15}}
                                onPress={(is_insurance) => this.setState({is_insurance})}
                              />
                              <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 15, color: 'black'}}
                                labelWrapStyle={{marginLeft: -5,marginTop: -3}}
                                onPress={(is_insurance) => this.setState({is_insurance})}
                              />
                            </RadioButton>
                          ))
                        }  
                      </RadioForm>
                  </View>
                </CardItem>

              <CardItem bordered>
                <View style={{flex: 1}}>
                  <Text style={{flex: 1}}>
                    Instruction
                  </Text>

                  <Textarea 
                  rowSpan={3} 
                  bordered 
                  style={{flex: 1}} 
                  placeholder="Instruction" 
                  onChangeText={(instruction) => this.setState({instruction})}
                  value={this.state.instruction} />
                </View>
              </CardItem>
                
              </Card>
            </Col>
          </Row>

          <Row style={{marginTop: 10}}>
            <Col>
              <Card>
                <CardItem header bordered>
                  <Text>Payment</Text>
                </CardItem>
                <CardItem bordered style={styles.paymentWrap}>
                  {this.state.list_payment.length > 0 ?
                      this.state.list_payment.map((row,index) => (
                      <Button
                        key={index}
                        bordered={this.state.payment_option_id != row.id ? true : false}
                        primary={this.state.payment_option_id == row.id ? true : false} 
                        style={styles.btnPayment}
                        onPress={() => this.setState({
                          payment_option_id : row.id,
                          payment_option_name: row.title
                        })}>
                        <View 
                          key={index}
                          style={{flex: 1,flexDirection:'column', justifyContent:'center'}}>
                          <Text style={this.state.payment_option_id == row.id ? styles.textShippedItemActive : styles.textShippedItem}>{row.title}</Text>
                        </View>
                      </Button>
                      ))
                  : <Text style={{fontWeight: 'bold'}}>No payment list</Text>}
                  
                </CardItem>
              </Card>
            </Col>
          </Row>

          <Button iconRight primary onPress={() => this.props.navigation.navigate('ShipmentList')}>
            <Text style={styles.text_review}>Review</Text>
            <Ionicons name='ios-arrow-round-forward' size={30} style={{color: '#fff',marginRight: 20}}/>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileIconContainer:{
    backgroundColor: 'red',    
  },
  profileIconButton: {   
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'blue',
  },
  profileIcon:{
    backgroundColor: 'green',
  },
  typeSelected: {
    borderBottomColor: 'blue',
    borderBottomWidth: 5
  },
  iconTypeSelected: {
    marginLeft: 15,
    color: '#fff',
  },
  iconType: {
    marginLeft: 15,
  },
  textTypeSelected: {
    marginLeft: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  textType: {
    marginLeft: 15,
  },
  toText: {
    fontSize: 15,
    marginTop: 20,
    marginLeft: 10,
  },
  viewType: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
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
  active_page: {
    backgroundColor: '#060d78',
  },
  btnShippedItem: {
    width: 83, 
    height: 100, 
    marginLeft: -7, 
    marginRight: 20
  },
  textShippedItem: {
    alignSelf: 'center',
    marginTop: 10
  },
  textShippedItemActive: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold'
  },
  text_review: {
    color: '#fff', 
    fontWeight: 'bold', 
    marginLeft: 10
  },
  btnPayment: {
    width: '19%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  paymentWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  floatLeft: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'flex-start',
  },
  floatRight: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-end',
  },
  textAddress: {
    color: '#042893',
    fontWeight: 'bold',
    marginTop: 2,
    marginRight: 10
  },
});

const mapStateToProps = state => ({
  ship: state.ship,
});


const mapDispatchToProps = dispatch => ({
  getShipData: () => dispatch(getShipData()),
  saveShipData: (data) => dispatch(saveShipData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ship);
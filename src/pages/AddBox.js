import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  BackHandler,
  Image,
} from 'react-native';

import { Container, Header, Left, Body, Right, Button, Title, Card, CardItem, Item, Label, Input, Content} from 'native-base';
import { connect } from 'react-redux';
import Feather from 'react-native-vector-icons/dist/Feather';
import {curl} from '../components/Common';
import { Col, Row } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { getUserLocation, saveBoxData, getBoxData } from '../actions/action';

class AddBox extends Component {
  
  static navigationOptions = {
    title: null,
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
      box_details : [
        {id: 0, length: '', width: '', height: '', quantity: '', box_charge: 0}
      ],
      currency_name: '',
      currency_symbol: '',
      box_basecost: 0,
      total_quantity: 0,
      all_box_charge: 0,
    }

    this.onBackPress = this.onBackPress.bind(this);
    this.addBox = this.addBox.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    this.props.getUserLocation().then(() => {
      this.setState({
        currency_name: this.props.location.location.currency_name,
        currency_symbol: this.props.location.location.currency_symbol,
      },() => {
        curl('customer/box_basecost', {currency: this.state.currency_name})
        .then(response => {
          this.setState ({
            box_basecost: response.data.filed_value,
          })
        });
      })
    })

    this.props.getBoxData().then(() => {
      if(this.props.box.box !== undefined){
        this.setState({
          box_details : [],
          box_basecost: 0,
          total_quantity: 0,
          all_box_charge: 0,
        },() => {
          this.setState({
            box_details : this.props.box.box.box_details,
            box_basecost: this.props.box.box.box_basecost,
            total_quantity: this.props.box.box.total_quantity,
            all_box_charge: this.props.box.box.all_box_charge,
          })
        })
      }
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.goBack(null);
    return true; 
  }

  handleConfirm = () => {
    this.state.box_details.map(
      (obj) => {
        if(obj.length == '' && obj.width == '' && obj.height == '' && obj.quantity == ''){
          Alert.alert('Please fill all box detail')
        }else{
          const boxData = {
            box_details : this.state.box_details,
            box_basecost: this.state.box_basecost,
            total_quantity: this.state.total_quantity,
            all_box_charge: this.state.all_box_charge,
          }
          this.props.saveBoxData(boxData)
          .then(() => {
            this.props.navigation.navigate('Ship', {boxData : boxData});
          })
          .catch((error) => {
              console.log(error);
          })
        }
      }
    )
  }

  boxCharge = (index) => {
    var box = this.state.box_details[index];
    var currency_name = this.state.currency_name;
    if(box.length != '' && box.width != '' && box.height != '' && box.quantity != ''){

      var meter = (box.height * box.length * box.width) / 6000 * 3 * this.state.box_basecost;
      var box_charge = currency_name == 'Rupiah' ? Math.ceil(meter * box.quantity) : (meter * box.quantity).toFixed(2);

      this.setState(prevState => ({
        box_details: prevState.box_details.map(
          obj => (obj.id === index ? Object.assign(obj, { box_charge: box_charge }) : obj)
        )
      }), () => {
        var total_quantity = 0;
        var all_box_charge = 0;
        this.state.box_details.map((row,index) => {
          total_quantity += parseInt(row.quantity);
          all_box_charge += parseFloat(row.box_charge);
        })
        this.setState({
          total_quantity: total_quantity,
          all_box_charge: all_box_charge
        });
      });
    }
    
  }

  addBox = (prevIndex) => {
    this.state.box_details.map(
      (obj) => {
        if(obj.id == prevIndex){
          if(obj.length == '' && obj.width == '' && obj.height == '' && obj.quantity == ''){
            Alert.alert('Please fill all box detail')
          }else{
            const newData = this.state.box_details;
            newData.push({id: 1, length: '', width: '', height: '', quantity: '', box_charge: 0});
            this.setState(prevState => ({
              box_details: newData,
            }));
          }
        }else{
          Alert.alert("Can't add box")
        }
      }
    )
  };

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onBackPress}>
              <Ionicons name='ios-arrow-round-back' style={{marginLeft: 15}} size={30}/>
            </Button>
          </Left>
          <Body>
            <Title>Box</Title>
          </Body>
          <Right>
            
          </Right>
        </Header>

          <View style={styles.header}>
            <Row style={styles.rowHeader}>
              <Col size={75} style={{justifyContent:'center'}}>
                <Text style={styles.textHeader}>
                  We provide a customized size box, with the right box size can help the safety of the goods and save the shipping cost. we also can help you packing with no cost, But were not responsible for any demage during the packing process especially for glassware.
                </Text>
              </Col>

              <Col size={25} style={{justifyContent:'center'}}>
                <Image 
                  style={{width: 100, height: 100, alignSelf: 'flex-end', marginRight: 20}}
                  source={require('../../../KirimBaru/src/assets/images/icon/box&package_icon.png')}
                />
              </Col>
            </Row>
            
          </View>
        <Content padder style={{backgroundColor: '#ecf0f1'}}>
          {this.state.box_details.map((row, index) => (
            <Card key={index}>
              <CardItem>
                <Row style={{marginTop: 10}}>
                  <Col style={{borderRightColor: 'grey', borderRightWidth: 1}}>
                    <Item floatingLabel>
                      <Label style={{fontSize: 12}}>Length (CM)</Label>
                      <Input 
                      keyboardType="numeric"
                      value={row.length}
                      onChangeText={(length) => {
                        this.setState(prevState => ({
                          box_details: prevState.box_details.map(
                            obj => (obj.id === index ? Object.assign(obj, { length: length }) : obj)
                          )
                        }), () => {
                          this.boxCharge(index);
                        });
                      }}/>
                    </Item>
                  </Col>

                  <Col style={{borderRightColor: 'grey', borderRightWidth: 1}}>
                    <Item floatingLabel>
                      <Label style={{fontSize: 12}}>Width (CM)</Label>
                      <Input 
                      keyboardType="numeric"
                      value={row.width}
                      onChangeText={(width) => {
                        this.setState(prevState => ({
                          box_details: prevState.box_details.map(
                            obj => (obj.id === index ? Object.assign(obj, { width: width }) : obj)
                          )
                        }), () => {
                          this.boxCharge(index);
                        });
                      }}/>
                    </Item>
                  </Col>

                  <Col style={{borderRightColor: 'grey', borderRightWidth: 1}}>
                    <Item floatingLabel>
                      <Label style={{fontSize: 12}}>Height (CM)</Label>
                      <Input 
                      keyboardType="numeric"
                      value={row.height}
                      onChangeText={(height) => {
                        this.setState(prevState => ({
                          box_details: prevState.box_details.map(
                            obj => (obj.id === index ? Object.assign(obj, { height: height }) : obj)
                          )
                        }), () => {
                          this.boxCharge(index);
                        });
                      }}/>
                    </Item>
                  </Col>

                  <Col>
                    <Item floatingLabel>
                      <Label style={{fontSize: 12}}>Quantity</Label>
                      <Input 
                      keyboardType="numeric"
                      value={row.quantity}
                      onChangeText={(quantity) => {
                        this.setState(prevState => ({
                          box_details: prevState.box_details.map(
                            obj => (obj.id === index ? Object.assign(obj, { quantity: quantity }) : obj)
                          )
                        }), () => {
                          this.boxCharge(index);
                        });
                      }}/>
                    </Item>
                  </Col>
                </Row>
              </CardItem>
              <CardItem footer style={{flex: 1,flexDirection:'column',textAlign: 'center'}}>
                <View style={styles.priceContainer}>
                  <Text style={{fontWeight: 'bold', color: 'grey'}}>
                    PRICE OF THE BOX 
                  </Text>

                  <Text style={{color: '#042893', marginLeft: 10,fontWeight: 'bold'}}>
                    {this.state.currency_symbol}
                    {row.box_charge}
                  </Text>
                </View>
              </CardItem>
              
            </Card>
          ))}

          <Card>
            <CardItem style={styles.footerContainer}>
              <View style={{flex: 1,flexDirection:'row'}}>
                <TouchableOpacity style={styles.btnAdd} onPress={() => this.addBox(this.state.box_details.length-1)}>
                  <Feather name="plus" size={20} style={{color: 'grey'}}/>
                  <Text style={styles.textAdd}>
                      ADD
                  </Text>
                </TouchableOpacity>

                <View style={styles.textBox}>
                  <Text style={{fontWeight: 'bold', color: 'grey'}}>
                    BOX QTY :
                  </Text>

                  <Text style={styles.textQty}>
                    {this.state.total_quantity} PICS
                  </Text>
                </View>
              </View>
            </CardItem>
          </Card>
        </Content>

        <Card style={ styles.bottomView} >
          <CardItem footer style={{flex: 1,flexDirection:'column',textAlign: 'center'}}>
            <View style={styles.priceContainer}>
              <Text style={{fontWeight: 'bold', color: 'grey'}}>
                PRICE OF ALL BOX :
              </Text>

              <Text style={{color: '#042893', marginLeft: 10,fontWeight: 'bold'}}>
                {this.state.currency_symbol}
                {this.state.all_box_charge}
              </Text>
            </View>
            
            <Button block primary style={styles.btnConfirm} onPress={this.handleConfirm}>
              <Text style={styles.text_confirm}>CONFIRM</Text>
            </Button>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: { 
    backgroundColor: '#042893', 
    borderWidth: 1, 
    height: '25%'
  },
  rowHeader: {
    flex: 1,flexDirection:'row'
  },
  textHeader: {
    fontSize: 15, 
    color: '#fff', 
    fontWeight: '500', 
    marginLeft: 10, 
    textAlign: 'left', 
    width: '90%'
  },
  btnAdd: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'flex-start'
  },
  priceContainer: {
    flex: 1,
    flexDirection:'row',
    textAlign: 'center'
  },
  footerContainer: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'flex-start'
  },
  textAdd: {
    fontWeight: 'bold',
    color: 'grey', 
    marginTop: 3, 
    marginLeft: 10
  },
  textBox: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-end'
  },
  textQty: {
    color: '#042893', 
    marginLeft: 10,
    fontWeight: 'bold'
  },
  bottomView:{
    width: '100%', 
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 20
  },
  text_confirm: {
    color: '#fff', 
    fontWeight: 'bold', 
    marginLeft: 10,
  },
  btnConfirm: {
    backgroundColor: '#042893',
  }
});

const mapStateToProps = state => ({
  location: state.location,
  box: state.box
});


const mapDispatchToProps = dispatch => ({
  getUserLocation: () => dispatch(getUserLocation()),
  getBoxData: () => dispatch(getBoxData()),
  saveBoxData: (data) => dispatch(saveBoxData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBox);
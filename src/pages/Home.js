import React, {component, Component} from 'react';
import {View, Text, StyleSheet, BackHandler, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import {BackgroundCarousel} from '../components/BackgroundCarousel';
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';
import Logo from '../components/Logo';

const images = [
  "https://static.vecteezy.com/system/resources/previews/000/425/737/non_2x/delivery-man-with-box-postman-design-isolated-on-white-background-courier-in-hat-and-uniform-with-package-vector.jpg",
  "https://lh5.googleusercontent.com/proxy/yF4KnrBV-RWYT_XzLQbZkyowetpb9eX2ENKb_WDRS_thI7l-2DmAP5rFU2knevb_kYNnNx9zevJa9cojLXEWjhZKde4qZrq-kvT4NqNEew",
  "https://images.qourier.com/imgs/images/website/samedaydeliverysingapore-768x512.png",
  "https://i0.wp.com/www.r3sc.com.br/wp-content/uploads/2018/01/163088-entrega-de-mercadorias-x-formas-de-evitar-problemas-e-atrasos.jpg?fit=999%2C667&ssl=1"
]

export default class Home extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true; 
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            
          </Left>
          <Body>
            <Image
            style={{width: 70, height: 40}}
            source={require('../../../KirimBaru/src/assets/images/logotransparant.png')}
          />
          </Body>
          <Right>
            <Button transparent>
              <Icon name='user-circle' size={25}/>
            </Button>
          </Right>
        </Header>
        <View style={{ backgroundColor: 'pink'}}>
          <BackgroundCarousel images={images}/>
        </View>

        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#fff' }}>
          
          <TouchableOpacity style={{ width: 120, marginHorizontal: 8, marginTop: 15, marginBottom: 10, height: 100, backgroundColor: '#060d78' }} onPress={() => {
            this.props.navigation.navigate('Ship')
          }}>
            <View style={styles.buttonList}>
              <Icon name="send" size={35} style={{color: '#fff'}}/>
              <Text style={styles.textButtonList}>Ship</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 120, marginHorizontal: 8, marginTop: 15, marginBottom: 10, height: 100, backgroundColor: '#060d78' }} onPress={() => {
            this.props.navigation.navigate('ShipmentList')
          }}>
            <View style={styles.buttonList}>
              <FontAwesome5 name="box-open" size={35} style={{color: '#fff'}}/>
              <Text style={styles.textButtonList}>Shipment List</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 120, marginHorizontal: 8, marginTop: 15, marginBottom: 10, height: 100, backgroundColor: '#060d78' }} onPress={() => {
            this.props.navigation.navigate('QuickTools')
          }}>
            <View style={styles.buttonList}>
              <FontAwesome5 name="hammer" size={35} style={{color: '#fff'}}/>
              <Text style={styles.textButtonList}>Quick Tools</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 120, marginHorizontal: 8, marginTop: 10, marginBottom: 5, height: 100, backgroundColor: '#060d78' }} onPress={() => {
            this.props.navigation.navigate('Notification')
          }}>
            <View style={styles.buttonList}>
              <FontAwesome5 name="clipboard-list" size={35} style={{color: '#fff'}}/>
              <Text style={styles.textButtonList}>Notification</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 120, marginHorizontal: 8, marginTop: 10, marginBottom: 5, height: 100, backgroundColor: '#060d78' }} onPress={() => {
            this.props.navigation.navigate('ProductService')
          }}>
            <View style={styles.buttonList}>
              <FontAwesome5 name="hand-holding-heart" size={35} style={{color: '#fff'}}/>
              <Text style={styles.textButtonList}>Product Service</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ width: 120, marginHorizontal: 8, marginTop: 10, marginBottom: 5, height: 100, backgroundColor: '#060d78' }} onPress={() => {
            this.props.navigation.navigate('Manage')
          }}>
            <View style={styles.buttonList}>
              <Octicons name="checklist" size={40} style={{color: '#fff'}}/>
              <Text style={styles.textButtonList}>Manage</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 120, marginHorizontal: 8, marginTop: 10, marginBottom: 5, height: 100, backgroundColor: '#060d78' }} onPress={() => {
            this.props.navigation.navigate('Location')
          }}>
            <View style={styles.buttonList}>
              <FontAwesome5 name="map-marked-alt" size={40} style={{color: '#fff'}}/>
              <Text style={styles.textButtonList}>Locations</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 120, marginHorizontal: 8, marginTop: 10, marginBottom: 5, height: 100, backgroundColor: '#060d78' }} onPress={() => {
            this.props.navigation.navigate('Share')
          }}>
            <View style={styles.buttonList}>
              <SimpleLineIcons name="share" size={40} style={{color: '#fff'}}/>
              <Text style={styles.textButtonList}>Share</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: 120, marginHorizontal: 8, marginTop: 10, marginBottom: 5, height: 100, backgroundColor: '#060d78' }} onPress={() => {
            this.props.navigation.navigate('ContactUs')
          }}>
            <View style={styles.buttonList}>
              <MaterialCommunityIcons name="contacts" size={40} style={{color: '#fff'}}/>
              <Text style={styles.textButtonList}>Contact Us</Text>
            </View>
          </TouchableOpacity>
        </View>      
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
  buttonList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonList: {
    color: '#fff',
    fontSize: 15, 
    marginTop: 5
  },
});
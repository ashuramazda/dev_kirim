import React, {component, Component} from 'react';
import {View, Text, StyleSheet, BackHandler, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Left, Body, Right, Button, Title, Card, CardItem, Item, Label, Input, Content, Picker, CheckBox, Textarea} from 'native-base';
import {BackgroundCarousel} from '../components/BackgroundCarousel';

const images = [
  "https://static.vecteezy.com/system/resources/previews/000/425/737/non_2x/delivery-man-with-box-postman-design-isolated-on-white-background-courier-in-hat-and-uniform-with-package-vector.jpg",
  "https://lh5.googleusercontent.com/proxy/yF4KnrBV-RWYT_XzLQbZkyowetpb9eX2ENKb_WDRS_thI7l-2DmAP5rFU2knevb_kYNnNx9zevJa9cojLXEWjhZKde4qZrq-kvT4NqNEew",
  "https://images.qourier.com/imgs/images/website/samedaydeliverysingapore-768x512.png",
  "https://i0.wp.com/www.r3sc.com.br/wp-content/uploads/2018/01/163088-entrega-de-mercadorias-x-formas-de-evitar-problemas-e-atrasos.jpg?fit=999%2C667&ssl=1"
]

export default class ShipmentList extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  constructor(props){
    super(props);

    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.goBack(null);
    return true; 
  }
  
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
            <Text>Ship</Text>
          </Body>
          <Right>

          </Right>
        </Header>

        <Content padder>
          <View style={styles.container}>
            <View style={styles.profileIconContainer}>
              <TouchableOpacity style={styles.profileIconButton}>
                <Icon
                  style={styles.profileIcon}
                  name="user-circle"
                  size={30}
                  color="#09116e"
                />
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'pink'}}>
              <Text>ShipmentList</Text>
              <BackgroundCarousel images={images}/>
            </View>        
          </View>
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
});
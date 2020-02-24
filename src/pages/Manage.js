import React, {component, Component} from 'react';
import {View, Text, StyleSheet, BackHandler, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
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
          <Text>Manage</Text>
          <BackgroundCarousel images={images}/>
        </View>        
      </View>
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
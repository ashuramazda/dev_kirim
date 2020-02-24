import React, {Component} from 'react';
import {AppRegistry, View, Image, StyleSheet, Text} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../../KirimBaru/src/assets/images/logotransparant.png')}
        />
        <Text style={styles.logoText}>Welcome to our App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',    
  },
  image: {
    width: 100,
    height: 100,
  },
  logoText: {
    fontSize: 18,
    color: 'black'
  }
});

AppRegistry.registerComponent('Logo', () => Logo);

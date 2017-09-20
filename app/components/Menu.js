import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ItemMenu from './ItemMenu';

const LogoFurb = require('../images/logo-furb.png');

export default class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={LogoFurb}
          />
        </View>
        <View style={{ backgroundColor: '#FFCC00', height: 3 }} />
        <View style={styles.itensMenu}>
          <ItemMenu
            app={this.props.app}
            icon='location-on'
            text='Check-in'
            onPress={Actions.matricula}
          />
          <ItemMenu
            icon='exit-to-app'
            text='Entrar'
            onPress={Actions.matricula}
          />
          <ItemMenu
            styleIcon={styles.icon}
            icon='exit-to-app'
            text='Sair'
            onPress={Actions.matricula}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  imgContainer: {
    alignItems: 'center',
    backgroundColor: '#00549A',
    padding: 20
  },
  itensMenu: {
    paddingTop: 30
  },
  icon: {
    transform: [{
      scaleX: -1
    }]
  }
});

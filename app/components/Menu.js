import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ItemMenu from './ItemMenu';
import { removeItem } from '../lib/Util';
import { modificaToken } from '../actions/AutenticacaoActions';

const LogoFurb = require('../images/logo-furb.png');

class Menu extends Component {
  sair() {
    removeItem('token');
    this.props.modificaToken(false);
  }

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
          {!this.props.hasToken && <ItemMenu
            app={this.props.app}
            icon='exit-to-app'
            text='Entrar'
            onPress={Actions.login}
          />}
          {this.props.hasToken && <ItemMenu
            app={this.props.app}
            styleIcon={styles.icon}
            icon='exit-to-app'
            text='Sair'
            onPress={this.sair.bind(this)}
          />}
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

const mapStateToProps = state => (
  {
    hasToken: state.AutenticacaoReducer.hasToken
  }
);

export default connect(mapStateToProps, { modificaToken })(Menu);

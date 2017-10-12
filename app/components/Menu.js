import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ItemMenu from './ItemMenu';
import { removeItem } from '../lib/Util';
import { modificaToken, modificaEmail } from '../actions/AutenticacaoActions';

const LogoFurb = require('../images/logo-furb.png');

class Menu extends Component {
  sair() {
    removeItem('programacaoCursoUsuario');
    removeItem('programacaoUsuario');
    removeItem('email');
    removeItem('token');
    this.props.modificaToken(false);
    this.props.modificaEmail('');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={LogoFurb}
          />
        </View>
        <Text style={styles.usuario}>
          {this.props.email ? `Usuário: ${this.props.email}` : ''}
        </Text>
        <View style={{ backgroundColor: '#FFCC00', height: 4 }} />
        <View style={styles.itensMenu}>
          {this.props.hasToken && <ItemMenu
            icon='location-on'
            text='Check-in'
            onPress={this.props.isMinistrante ? Actions.checkinMinistrante : Actions.checkin}
          />}
          {this.props.hasToken && <ItemMenu
            icon='settings'
            text='Minhas Oficinas'
            onPress={() => Actions.programacao({ filtrarPorUsuario: true })}
          />}
          {!this.props.hasToken && <ItemMenu
            icon='exit-to-app'
            text='Entrar'
            onPress={Actions.login}
          />}
          {this.props.hasToken && <ItemMenu
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
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },
  itensMenu: {
    paddingTop: 20
  },
  icon: {
    transform: [{
      scaleX: -1
    }]
  },
  usuario: {
    color: '#FFF',
    backgroundColor: '#00549A',
    fontSize: 12
  }
});

const mapStateToProps = state => (
  {
    hasToken: state.AutenticacaoReducer.hasToken,
    email: state.AutenticacaoReducer.email,
    isMinistrante: state.AutenticacaoReducer.isMinistrante
  }
);

export default connect(mapStateToProps, { modificaToken, modificaEmail })(Menu);

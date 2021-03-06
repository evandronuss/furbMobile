import React, { Component } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Loading from '../components/Loading';
import URL_API from '../lib/Configuracoes';
import { saveItem, removeItem } from '../lib/Util';
import {
  modificaToken,
  modificaEmail,
  modificaLogin,
  modificaIsMinistrante
} from '../actions/AutenticacaoActions';

class Login extends Component {
	constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
	}

  entrar() {
    if (this.props.isConnected) {
      this.setState({ visible: true });

      axios.get(`${URL_API}Login/${this.props.email}/${this.props.login}`)
      .then(response => {
        this.props.modificaIsMinistrante(response.data.isMinistrante);

        if (response.data.token) {
          saveItem('email', this.props.email);
          saveItem('login', this.props.login);
          saveItem('isMinistrante', this.props.isMinistrante);
          saveItem('token', response.data.token);
          this.props.modificaToken(true);
          this.setState({ visible: false });
          Actions.pop();
        } else {
          removeItem('email');
          removeItem('login');
          removeItem('isMinistrante');
          removeItem('token');
          this.props.modificaToken(false);
          this.setState({ visible: false });

          if (this.props.isMinistrante) { 
            Alert.alert('E-mail e/ou Login inválido', 'Ministrantes devem informar e-mail e login corretos!');
          } else {
            Alert.alert('E-mail inválido', 'Insira um e-mail cadastrado no evento Interação FURB.');
          }
        }
      })
      .catch(() => console.log('Erro ao recuperar os dados'));
    } else {
      Alert.alert('', 'Ops! Parece que você está sem internet.');
    }    
  }

	render() {
		return (
      <View
        style={styles.container}
      >
        <Loading visible={this.state.visible} />
        <TextInput
          onChangeText={email => this.props.modificaEmail(email)}
          keyboardType="email-address"
          placeholder="exemplo@email.com"
          value={this.props.email}
          autoFocus
        />
        {!!this.props.isMinistrante && <TextInput
          onChangeText={login => this.props.modificaLogin(login)}
          placeholder="exemplo"
          value={this.props.login}
        />}
        <Button
          onPress={this.entrar.bind(this)}
          color="#00549A"
          title="Entrar"
        />
      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 20
  },
});

const mapStateToProps = state => (
  {
    email: state.AutenticacaoReducer.email,
    login: state.AutenticacaoReducer.login,
    isMinistrante: state.AutenticacaoReducer.isMinistrante,
    isConnected: state.ConnectionReducer.isConnected
  }
);

export default connect(mapStateToProps, {
  modificaToken,
  modificaEmail,
  modificaLogin,
  modificaIsMinistrante
})(Login);

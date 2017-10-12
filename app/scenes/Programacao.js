import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import ListaCard from '../components/ListaCard';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import URL_API from '../lib/Configuracoes';
import { saveItem, getItem, isObject } from '../lib/Util';

class Programacao extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      listaCards: [],
      visible: true,
      date: ''
    };
  }

  componentWillMount() {
    let urlFiltro = '';
    let item = 'programacao';
    
    if (this.props.filtrarPorUsuario) {
      urlFiltro = `GetProgramacaoUsuario/${this.props.email}`;
      item = 'programacaoUsuario';
    }

    if (this.props.isConnected) {
      axios.get(`${URL_API}programacao/${urlFiltro}`)
        .then(response => this.carregarInformacoesOnline(response, item))
        .catch(() => this.carregarInformacoesOffline(item));
    } else {
      this.carregarInformacoesOffline(item);
    }
  }

  carregarInformacoesOnline(response, item) {
    saveItem(item, JSON.stringify(response));

    this.carregarInformacoes(response);
  }

  carregarInformacoesOffline(item) {
    console.log('Erro ao recuperar os dados');

    getItem(item).then((response) => {
      if (response) {
        this.carregarInformacoes(JSON.parse(response.value), response.date);
      } else if (this.props.isConnected) {
        Alert.alert('Nenhum Registro foi encontrado!');
        this.setState({ visible: false });
        Actions.pop();
      } else {
        Alert.alert('Ops! Parece que você está sem internet.');
        this.setState({ visible: false });
        Actions.pop();
      }
    });
  }

  carregarInformacoes(response, date) {
    if (response && isObject(response.data)) {
      this.setState({
        listaCards: response.data.data,
        visible: false,
        date
      });
    } else if (this.props.isConnected) {
      Alert.alert('Ops! Ocorreu um erro ao carregar os dados.');
      this.setState({ visible: false });
      Actions.pop();
    } else {
      Alert.alert('Ops! Parece que você está sem internet.');
      this.setState({ visible: false });
      Actions.pop();
    }
  }  

	render() {
		return (
      <ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
        <MessageDate date={this.state.date} />
        <ListaCard
          listaCards={this.state.listaCards}
          onPressDefault={Actions.programacaocurso}
          onPressDefaultParams={{ filtrarPorUsuario: this.props.filtrarPorUsuario }}
        />
      </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => (
  {
    email: state.AutenticacaoReducer.email,
    isConnected: state.ConnectionReducer.isConnected
  }
);

export default connect(mapStateToProps, null)(Programacao);

import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ListaCard from '../components/ListaCard';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import { removerObjetosDuplicados, ordenarObjetos, saveItem, getItem, isArray } from '../lib/Util';
import { URL_SITE } from '../lib/Configuracoes';

class Cursos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listaCards: [],
      visible: true,
      date: ''
    };
	}

  componentWillMount() {
    if (this.props.isConnected) {
      axios.get(`${URL_SITE}cursos.json`)
        .then(response => this.carregarInformacoesOnline(response))
        .catch(() => this.carregarInformacoesOffline());
    } else {
      this.carregarInformacoesOffline();
    }
  }
  
  carregarInformacoesOnline(response) {
    saveItem('Cursos', JSON.stringify(response));

    this.carregarInformacoes(response);
  }

  carregarInformacoesOffline() {
    console.log('Erro ao recuperar os dados');

    getItem('Cursos').then((response) => {
      if (response) {
        this.carregarInformacoes(JSON.parse(response.value), response.date);
      } else if (this.props.isConnected) {
        Alert.alert('', 'Nenhum Registro foi encontrado!');
        this.setState({ visible: false });
        Actions.pop();
      } else {
        Alert.alert('', 'Ops! Parece que você está sem internet.');
        this.setState({ visible: false });
        Actions.pop();
      }
    });
  }

  carregarInformacoes(response, date) {
    if (response && isArray(response.data)) {
      this.setState({
        listaCards: this.filtrarDadosExibir(response.data),
        visible: false,
        date
      });
    } else if (this.props.isConnected) {
      Alert.alert('', 'Ops! Ocorreu um erro ao carregar os dados.');
      this.setState({ visible: false });
      Actions.pop();
    } else {
      Alert.alert('', 'Ops! Parece que você está sem internet.');
      this.setState({ visible: false });
      Actions.pop();
    }
  }
  
  filtrarDadosExibir(data) {
    let retorno = [];
    
    if (this.props.id === 'cursos') {
      data.map(d => retorno.push(JSON.parse(`{"text":"${d.text[0]}"}`)));
      retorno = removerObjetosDuplicados(retorno, 'text');
    } else {
      retorno = data.filter(d => d.text[0].toLowerCase() === this.props.id.toLowerCase());
    }

    return ordenarObjetos(retorno, 'text');
  }

	render() {
		return (
      <ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
        <MessageDate date={this.state.date} />
        <ListaCard
          listaCards={this.state.listaCards}
          cardSize={this.props.id === 'cursos' ? 100 : undefined}
          onPressDefault={this.props.id === 'cursos' ? Actions.cursos : Actions.curso}
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
    isConnected: state.ConnectionReducer.isConnected
  }
);

export default connect(mapStateToProps, null)(Cursos);

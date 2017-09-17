import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ListaCard from '../components/ListaCard';
import Loading from '../components/Loading';
import URL_SITE from '../lib/Configuracoes';

export default class Programacao extends Component {
  constructor(props) {
    super(props);

    this.state = { listaCards: [], visible: true };
  }

  componentWillMount() {
    axios.get(`${URL_SITE}programacao.json`)
      .then(response => this.setState({
        listaCards: response.data.data,
        visible: false
      }))
      .catch(() => console.log('Erro ao recuperar os dados'));
  }

	render() {
		return (
      <ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
        <ListaCard
          listaCards={this.state.listaCards}
          onPressDefault={Actions.programacaocurso}
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

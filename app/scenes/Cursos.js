import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ListaCard from '../components/ListaCard';
import Loading from '../components/Loading';
import { removerObjetosDuplicados, ordenarObjetos } from '../lib/Util';

export default class Cursos extends Component {
  constructor(props) {
    super(props);

    this.state = { listaCards: [], visible: true };
	}

  componentWillMount() {
    axios.get('http://localhost:8081/data/cursos.json')
      .then(response => this.setState({
        listaCards: this.filtrarDadosExibir(response.data),
        visible: false
      }))
      .catch(() => console.log('Erro ao recuperar os dados'));
  }

  filtrarDadosExibir(data) {
    let retorno = data;
    
    if (this.props.id === 'cursos') {
      retorno.map(d => d.text = d.text[0]);
      retorno = removerObjetosDuplicados(retorno, 'text');
    } else {
      retorno = retorno.filter(d => d.text[0].toLowerCase() === this.props.id.toLowerCase());
    }

    return ordenarObjetos(retorno, 'text');
  }

	render() {
		return (
      <ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
        <ListaCard
          listaCards={this.state.listaCards}
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

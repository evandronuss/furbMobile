import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ListaCard from '../components/ListaCard';
import Loading from '../components/Loading';
//import file from '../../data/cursos/centros-cursos.json';

export default class Centros extends Component {
  constructor(props) {
    super(props);

    this.state = { listaCards: [], visible: true };
  }

  componentWillMount() {
    //this.setState({ listaCards: file, visible: false });

    axios.get('http://localhost:8081/data/centros.json')
      .then(response => this.setState({
        listaCards: response.data,
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
          onPressDefault={Actions.cursos}
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

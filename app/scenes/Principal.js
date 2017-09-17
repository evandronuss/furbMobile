import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ListaCard from '../components/ListaCard';

export default class Principal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listaCards: [{
        text: 'A FURB',
        icon: 'account-balance',
        onPress: Actions.furb
      }, {
        text: 'Cursos',
        icon: 'local-library',
        onPress: Actions.centros
      }, {
        text: 'Ingresso',
        icon: 'arrow-downward',
        onPress: Actions.ingresso
      }, {
        text: 'Apoio Financeiro',
        icon: 'payment',
        onPress: Actions.financiamento
      }, {
        text: 'Matrícula',
        icon: 'edit',
        onPress: Actions.matricula
      }, {
        text: 'Interação',
        type: 'ionicon',
        icon: 'ios-hand',
        onPress: Actions.interacao
      }]
    };
  }

  render() {
    return (
			<ScrollView style={styles.container}>
        <ListaCard listaCards={this.state.listaCards} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

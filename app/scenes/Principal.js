import React, { Component } from 'react';
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
        text: 'Finaciamento',
        icon: 'payment',
        onPress: Actions.financiamento
      }, {
        text: 'Matrícula',
        icon: 'edit',
        onPress: Actions.matricula
      }]
    };
  }

  render() {
    return (
      <ListaCard listaCards={this.state.listaCards} />
    );
  }
}
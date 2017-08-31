import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import ListaCard from '../components/ListaCard';

export default class Cursos extends Component {
	render() {
		return (
      <ListaCard
        listaCards={this.props.data.listaCards}
        panels={this.props.data.panels}
        onPressDefault={Actions.curso}
      />
		);
	}
}

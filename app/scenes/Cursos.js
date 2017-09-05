import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ListaCard from '../components/ListaCard';

export default class Cursos extends Component {
	render() {
		return (
      <ScrollView style={styles.container}>
        <ListaCard
          listaCards={this.props.data.listaCards}
          panels={this.props.data.panels}
          onPressDefault={Actions.curso}
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

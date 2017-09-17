import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';

export default class Financiamento extends Component {
	constructor(props) {
    super(props);

    this.state = { panels: [], contentPanels: [], visible: true };
	}

  componentWillMount() {
    axios.get('http://localhost:8081/data/financiamento.json')
      .then(response => this.setState({
        panels: response.data.panels,
        contentPanels: response.data.contentPanels,
        visible: false
      }))
      .catch(() => console.log('Erro ao recuperar os dados'));
  }

	render() {
    return (
      <ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
        <Panels
          panels={this.state.panels}
          contentPanels={this.state.contentPanels}
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

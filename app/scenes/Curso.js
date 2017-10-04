import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import URL_SITE from '../lib/Configuracoes';

export default class Curso extends Component {
	constructor(props) {
    super(props);

    this.state = { panels: [], contentPanels: [], visible: true };
	}

  componentWillMount() {
    axios.all([
      axios.get(`${URL_SITE}cursos/paineis_cursos.json`),
      axios.get(`${URL_SITE}cursos/informacoes/${this.props.id}.json`)
    ])
    .then(axios.spread((paineisResponse, informacaoResponse) => this.setState({
      panels: paineisResponse.data,
      contentPanels: informacaoResponse.data.contentPanels,
      visible: false
    })))
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

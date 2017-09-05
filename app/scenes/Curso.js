import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import file from '../../data/cursos/artes_visuais.json';

export default class Curso extends Component {
	constructor(props) {
    super(props);

    this.state = { contentPanels: [], visible: true };
	}

  componentWillMount() {
    this.setState({
      contentPanels: file.contentPanels,
      visible: false
    });

    /*axios.get(`http://localhost:8081/data/cursos/${this.props.id}.json`)
      .then(response => this.setState({
        contentPanels: response.data.contentPanels,
        visible: false
      }))
      .catch(() => console.log('Erro ao recuperar os dados'));*/
  }

	render() {
    return (
			<ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
        <Panels
          panels={this.props.panels}
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

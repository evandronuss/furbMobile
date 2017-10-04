import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import URL_SITE from '../lib/Configuracoes';

export default class FURB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      panels: [],
      contentPanels: [],
      visible: true
    };
  }

  componentWillMount() {
    axios.get(`${URL_SITE}furb.json`)
      .then(response => this.setState({
        content: response.data.content,
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
        <View style={styles.containerText}>
          <HTMLView
            value={`<p>${this.state.content}</p>`}
          />
        </View>
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
  },
  containerText: {
    padding: 15
  }
});

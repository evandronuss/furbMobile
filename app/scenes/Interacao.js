import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';

export default class Interacao extends Component {
	constructor(props) {
    super(props);

    this.state = {
      content: '',
      programacao: '',
      panels: [],
      contentPanels: [],
      visible: true
    };
	}

  componentWillMount() {
    axios.get('http://localhost:8081/data/interacao.json')
      .then(response => this.setState({
        content: response.data.content,
        programacao: response.data.programacao,
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
          <TouchableHighlight
            onPress={Actions.programacao}
          >
            <View>
              {!this.state.visible && <HTMLView
                value={`<br /><a>${this.state.programacao.title}</a>`}
              />}
            </View>
          </TouchableHighlight>
          {!this.state.visible && <Text style={styles.warning}>
            {`* ${this.state.programacao.warning}`}
          </Text>}
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
  },
  warning: {
    fontSize: 12,
    color: 'red'
  }
});

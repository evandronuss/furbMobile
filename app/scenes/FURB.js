import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import file from '../../data/furb.json';

export default class FURB extends Component {
  constructor(props) {
    super(props);

    this.state = { sobre: '' };
  }

  componentWillMount() {
    this.setState({ sobre: file.sobre });
    /*axios.get('http://localhost:8081/data/furb.json')
      .then(response => this.setState(response.data))
      .catch(() => console.log('Erro ao recuperar os dados'));*/
  }

	render() {
		return (
      <View style={styles.container}>
        <HTMLView
          value={`<p>${this.state.sobre}</p>`}
        />
      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
});

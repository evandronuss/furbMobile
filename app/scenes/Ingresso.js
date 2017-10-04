import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';
import Topic from '../components/Topic';
import Loading from '../components/Loading';
import URL_SITE from '../lib/Configuracoes';

export default class Ingresso extends Component {
	constructor(props) {
    super(props);

    this.state = { data: [], visible: true };
	}

  componentWillMount() {
    axios.get(`${URL_SITE}ingresso.json`)
      .then(response => this.setState({
        data: response.data,
        visible: false
      }))
      .catch(() => console.log('Erro ao recuperar os dados'));
  }

  renderTextContent(content, key) {
		return (
      <HTMLView
        key={key}
        value={`<p>${content}</p>`}
      />
		);
  }

  renderTopicContent(topics, key) {
		return (
      <Topic
        key={key}
        topics={topics}
      />
		);
  }

	render() {
		return (
			<ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
        <View
          style={[styles.content]}
        >
          {this.state.data.map((item, index) => {
            const key = `content_${index}`;

            if (item.topics) {
              return this.renderTopicContent(item.topics, key);
            }

            return this.renderTextContent(item.content, key);
          })}
        </View>
      </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 20
  }
});

import React, { Component } from 'react';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';
import Topic from '../components/Topic';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import URL_API from '../lib/Configuracoes';
import { saveItem, getItem, isObject } from '../lib/Util';

class Ingresso extends Component {
	constructor(props) {
    super(props);

    this.state = {
      data: [],
      visible: true,
      date: ''
    };
	}

  componentWillMount() {
    if (this.props.isConnected) {
      axios.get(`${URL_API}ingresso`)
        .then(response => this.carregarInformacoesOnline(response))
        .catch(() => this.carregarInformacoesOffline());
    } else {
      this.carregarInformacoesOffline();
    }
  }
  
  carregarInformacoesOnline(response) {
    saveItem('Ingresso', JSON.stringify(response));

    this.carregarInformacoes(response);
  }

  carregarInformacoesOffline() {
    console.log('Erro ao recuperar os dados');

    getItem('Ingresso').then((response) => {
      if (response) {
        this.carregarInformacoes(JSON.parse(response.value), response.date);
      } else if (this.props.isConnected) {
        Alert.alert('', 'Nenhum Registro foi encontrado!');
        this.setState({ visible: false });
        Actions.pop();
      } else {
        Alert.alert('', 'Ops! Parece que você está sem internet.');
        this.setState({ visible: false });
        Actions.pop();
      }
    });
  }

  carregarInformacoes(response, date) {
    if (response && isObject(response.data)) {
      this.setState({
        data: response.data.data,
        visible: false,
        date
      });
    } else if (this.props.isConnected) {
      Alert.alert('', 'Ops! Ocorreu um erro ao carregar os dados.');
      this.setState({ visible: false });
      Actions.pop();
    } else {
      Alert.alert('', 'Ops! Parece que você está sem internet.');
      this.setState({ visible: false });
      Actions.pop();
    }
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
        <MessageDate date={this.state.date} />
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

const mapStateToProps = state => (
  {
    isConnected: state.ConnectionReducer.isConnected
  }
);

export default connect(mapStateToProps, null)(Ingresso);

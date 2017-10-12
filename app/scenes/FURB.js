import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import { URL_SITE } from '../lib/Configuracoes';
import { saveItem, getItem, isObject } from '../lib/Util';

class FURB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      panels: [],
      contentPanels: [],
      visible: true,
      date: ''
    };
  }

  componentWillMount() {
    if (this.props.isConnected) {
      axios.get(`${URL_SITE}furb.json`)
        .then(response => this.carregarInformacoesOnline(response))
        .catch(() => this.carregarInformacoesOffline());
    } else {
      this.carregarInformacoesOffline();
    }
  }

  carregarInformacoesOnline(response) {
    saveItem('FURB', JSON.stringify(response));

    this.carregarInformacoes(response);
  }

  carregarInformacoesOffline() {
    console.log('Erro ao recuperar os dados');

    getItem('FURB').then((response) => {
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
        content: response.data.content,
        panels: response.data.panels,
        contentPanels: response.data.contentPanels,
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

	render() {
		return (
      <ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
        <MessageDate date={this.state.date} />
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

const mapStateToProps = state => (
  {
    isConnected: state.ConnectionReducer.isConnected
  }
);

export default connect(mapStateToProps, null)(FURB);

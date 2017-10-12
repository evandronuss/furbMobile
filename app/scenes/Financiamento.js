import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import { URL_SITE } from '../lib/Configuracoes';
import { saveItem, getItem, isObject } from '../lib/Util';

class Financiamento extends Component {
	constructor(props) {
    super(props);

    this.state = {
      panels: [],
      contentPanels: [],
      visible: true,
      date: ''
    };
	}

  componentWillMount() {
    if (this.props.isConnected) {
      axios.get(`${URL_SITE}financiamento.json`)
        .then(response => this.carregarInformacoesOnline(response))
        .catch(() => this.carregarInformacoesOffline());
    } else {
      this.carregarInformacoesOffline();
    }
  }

  carregarInformacoesOnline(response) {
    saveItem('Financiamento', JSON.stringify(response));

    this.carregarInformacoes(response);
  }

  carregarInformacoesOffline() {
    console.log('Erro ao recuperar os dados');

    getItem('Financiamento').then((response) => {
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

const mapStateToProps = state => (
  {
    isConnected: state.ConnectionReducer.isConnected
  }
);

export default connect(mapStateToProps, null)(Financiamento);

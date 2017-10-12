import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import URL_API from '../lib/Configuracoes';
import { saveItem, getItem } from '../lib/Util';

class Interacao extends Component {
	constructor(props) {
    super(props);

    this.state = {
      content: '',
      programacao: '',
      panels: [],
      contentPanels: [],
      visible: true,
      date: ''
    };
	}

  componentWillMount() {
    if (this.props.isConnected) {
      axios.get(`${URL_API}interacao`)
        .then(response => this.carregarInformacoesOnline(response))
        .catch(() => this.carregarInformacoesOffline());
    } else {
      this.carregarInformacoesOffline();
    }
  }
  
  carregarInformacoesOnline(response) {
    saveItem('Interacao', JSON.stringify(response));

    this.carregarInformacoes(response);
  }

  carregarInformacoesOffline() {
    console.log('Erro ao recuperar os dados');

    getItem('Interacao').then((response) => {
      if (response) {
        this.carregarInformacoes(JSON.parse(response.value), response.date);
      } else if (this.props.isConnected) {
        Alert.alert('Nenhum Registro foi encontrado!');
        this.setState({ visible: false });
        Actions.pop();
      } else {
        Alert.alert('Ops! Parece que você está sem internet.');
        this.setState({ visible: false });
        Actions.pop();
      }
    });
  }

  carregarInformacoes(response, date) {
    if (
      response &&
      response.data &&
      response.data.content &&
      response.data.programacao &&
      response.data.panels &&
      response.data.contentPanels
    ) {
      this.setState({
        content: response.data.content,
        programacao: response.data.programacao,
        panels: response.data.panels,
        contentPanels: response.data.contentPanels,
        visible: false,
        date
      });
    } else if (this.props.isConnected) {
      Alert.alert('Ops! Ocorreu um erro ao carregar os dados.');
      this.setState({ visible: false });
      Actions.pop();
    } else {
      Alert.alert('Ops! Parece que você está sem internet.');
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
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'#FFF'}
            onPress={Actions.programacao}
          >
            <View>
              {!this.state.visible && !!this.state.programacao.title && <HTMLView
                value={`<br /><a>${this.state.programacao.title}</a>`}
              />}
            </View>
          </TouchableHighlight>
          {!this.state.visible && !!this.state.programacao.warning && <Text style={styles.warning}>
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

const mapStateToProps = state => (
  {
    isConnected: state.ConnectionReducer.isConnected
  }
);

export default connect(mapStateToProps, null)(Interacao);

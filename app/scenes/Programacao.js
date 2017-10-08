import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import ListaCard from '../components/ListaCard';
import Loading from '../components/Loading';
import URL_API from '../lib/Configuracoes';

class Programacao extends Component {
  constructor(props) {
    super(props);
    
    this.state = { listaCards: [], visible: true };
  }

  componentWillMount() {
    let urlFiltro = '';
    
    if (this.props.filtrarPorUsuario) {
      urlFiltro = `GetProgramacaoUsuario/${this.props.email}`;
    }

    axios.get(`${URL_API}programacao/${urlFiltro}`)
      .then(response => this.setState({
        listaCards: response.data.data,
        visible: false
      }))
      .catch(() => console.log('Erro ao recuperar os dados'));
  }

	render() {
		return (
      <ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
        <ListaCard
          listaCards={this.state.listaCards}
          onPressDefault={Actions.programacaocurso}
          onPressDefaultParams={{ filtrarPorUsuario: this.props.filtrarPorUsuario }}
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
    email: state.AutenticacaoReducer.email
  }
);

export default connect(mapStateToProps, null)(Programacao);

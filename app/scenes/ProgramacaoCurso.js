import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import URL_API from '../lib/Configuracoes';
import { gerarNomeArquivo, saveItem, getItem, isObject } from '../lib/Util';

class ProgramacaoCurso extends Component {
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
    let urlFiltro = '';
    let item = '';

    if (this.props.filtrarPorUsuario) {
      urlFiltro = `GetProgramacaoCursoUsuario/${this.props.id}/${this.props.email}/`;
      item = `programacaoCursoUsuario/${this.props.id}`;
    } else {
      urlFiltro = `GetProgramacaoCurso/${this.props.id}/`;
      item = `programacaoCurso/${this.props.id}`;
    }

    if (this.props.isConnected) {
      axios.all([
        axios.get(`${URL_API}programacao/${urlFiltro}`),
        axios.get(`${URL_API}Oficina/${this.props.id}`)
      ])
      .then(axios.spread((programacaoResponse, localResponse) => {
        const programacaoInformacoes = {
          panels: programacaoResponse.data.panels,
          contentPanels: this.adicionarLocal(programacaoResponse, localResponse)
        };
        
        this.carregarInformacoesOnline(programacaoInformacoes, item);
      }))
      .catch(() => this.carregarInformacoesOffline(item));
    } else {
      this.carregarInformacoesOffline(item);
    }
  }
  
  carregarInformacoesOnline(response, item) {
    saveItem(item, JSON.stringify(response));

    this.carregarInformacoes(response);
  }

  carregarInformacoesOffline(item) {
    console.log('Erro ao recuperar os dados');

    getItem(item).then((response) => {
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
    if (isObject(response)) {
      this.setState({
        panels: response.panels,
        contentPanels: response.contentPanels,
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
  
  adicionarLocal(programacaoResponse, localResponse) {
    const panels = programacaoResponse.data.panels;
    const contentPanels = programacaoResponse.data.contentPanels;
    const localData = localResponse.data;

    for (const id in localData) {
      if (localData[id] && localData[id].horarios) {
        for (let i = 0; i < panels.length; i++) {
          if (
            gerarNomeArquivo(panels[i].title) === id &&
            contentPanels[i] &&
            contentPanels[i].contentPanel
          ) {
            for (let x = 0; x < localData[id].horarios.length; x++) {
              if (
                localData[id].horarios[x] &&
                localData[id].horarios[x].hora &&
                localData[id].horarios[x].hora.length >= 5
              ) {
                const localHora = localData[id].horarios[x];

                for (let y = 0; y < contentPanels[i].contentPanel.length; y++) {
                  if (
                    contentPanels[i].contentPanel[y] &&
                    contentPanels[i].contentPanel[y].horarios
                  ) {
                    const contentPanel = contentPanels[i].contentPanel[y];

                    for (let z = 0; z < contentPanel.horarios.length; z++) {
                      if (
                        contentPanel.horarios[z] &&
                        contentPanel.horarios[z].horario &&
                        contentPanel.horarios[z].horario.length >= 5
                      ) {
                        if (
                          contentPanel.horarios[z].horario.substring(0, 5).replace(':', 'h') ===
                          localHora.hora.substring(0, 5).replace(':', 'h')
                        ) {
                          contentPanel.horarios[z].campus = localHora.campus;
                          contentPanel.horarios[z].local = localHora.local;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return contentPanels;
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
    email: state.AutenticacaoReducer.email,
    isConnected: state.ConnectionReducer.isConnected
  }
);

export default connect(mapStateToProps, null)(ProgramacaoCurso);

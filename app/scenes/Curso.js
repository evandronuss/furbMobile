import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import URL_API, { URL_SITE } from '../lib/Configuracoes';
import { formatMoney, saveItem, getItem } from '../lib/Util';

class Curso extends Component {
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
      axios.all([
        axios.get(`${URL_SITE}cursos/paineis_cursos.json`),
        axios.get(`${URL_SITE}cursos/informacoes/${this.props.id}.json`),
        axios.get(`${URL_API}Curso/GetMensalidadeCurso/${this.props.id}`)
      ])
      .then(axios.spread((paineisResponse, informacaoResponse, mensalidadeResponse) => {
        const informacoesCursos = this.adicionarMensalidade(
          paineisResponse,
          informacaoResponse,
          mensalidadeResponse
        );

        this.carregarInformacoesOnline(informacoesCursos);
      }))
      .catch(() => this.carregarInformacoesOffline());
    } else {
      this.carregarInformacoesOffline();
    }
  }
  
  carregarInformacoesOnline(response) {
    saveItem(`Curso/${this.props.id}`, JSON.stringify(response));

    this.carregarInformacoes(response);
  }

  carregarInformacoesOffline() {
    console.log('Erro ao recuperar os dados');

    getItem(`Curso/${this.props.id}`).then((response) => {
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
    this.setState({
      panels: response.panels,
      contentPanels: response.contentPanels,
      visible: false,
      date
    });
  }

  adicionarMensalidade(paineisResponse, informacaoResponse, mensalidadeResponse) {
    const turnos = mensalidadeResponse.data;
    let conteudo = '';
    const panels = paineisResponse.data;
    const contentPanels = informacaoResponse.data.contentPanels;

    for (let i = 0; i < turnos.length; i++) {
      const creditoFinanceiro1Fase = turnos[i].creditoFinanceiro1Fase;
      const creditoFinanceiroSemestre = turnos[i].creditoFinanceiroSemestre;
      const valorMensalidade6Parcelas = formatMoney(turnos[i].valorMensalidade6Parcelas);
      const valorMatricula6Parcelas = formatMoney(turnos[i].valorMatricula6Parcelas);
      const valorMensalidade5Parcelas = formatMoney(turnos[i].valorMensalidade5Parcelas);
      const valorMatricula5Parcelas = formatMoney(turnos[i].valorMatricula5Parcelas);

      conteudo += 
        `<b>Turno ${turnos[i].nome}</b>` +
        '<br /><br />' +
        `<b>Créditos Financeiro na 1ª fase:</b> ${creditoFinanceiro1Fase}` +
        '<br />' +
        `<b>Créditos Financeiro no semestre:</b> ${creditoFinanceiroSemestre}` +
        '<br />' +
        `<b>Mensalidade em 6 parcelas:</b> R$ ${valorMensalidade6Parcelas}` +
        '<br />' +
        `<b>Matrícula em 6 parcelas:</b> R$ ${valorMatricula6Parcelas}` +
        '<br />' +
        `<b>Mensalidade em 5 parcelas:</b> R$ ${valorMensalidade5Parcelas}` +
        '<br />' +
        `<b>Matrícula em 5 parcelas:</b> R$ ${valorMatricula5Parcelas}`;

      if (i !== (turnos.length - 1)) {
        conteudo += '<br /><br /><br />';
      }
    }

    conteudo += '<br /><br /><b><a href="http://www.furb.br/web/mensalidades.php">furb.br/web/mensalidades</a></b>';

    panels.splice(1, 0, {
      ref: 'mensalidades',
      title: 'Mensalidades'
    });

    contentPanels.mensalidades = [{
      content: conteudo
    }];

    return {
      panels,
      contentPanels
    };
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

export default connect(mapStateToProps, null)(Curso);

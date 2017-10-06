import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import URL_SITE, { URL_API } from '../lib/Configuracoes';
import { formatMoney } from '../lib/Util';

export default class Curso extends Component {
	constructor(props) {
    super(props);

    this.state = { panels: [], contentPanels: [], visible: true };
	}

  componentWillMount() {
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

      this.setState({
        panels: informacoesCursos.panels,
        contentPanels: informacoesCursos.contentPanels,
        visible: false
      });
    }))
    .catch(() => console.log('Erro ao recuperar os dados'));
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

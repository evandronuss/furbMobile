import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Panels from '../components/Panels';
import Loading from '../components/Loading';
import URL_SITE, { URL_API } from '../lib/Configuracoes';
import { gerarNomeArquivo } from '../lib/Util';

export default class ProgramacaoCurso extends Component {
	constructor(props) {
    super(props);

    this.state = { panels: [], contentPanels: [], visible: true };
	}

  adicionarLocal(programacaoResponse, localResponse) {
    let panels = programacaoResponse.data.panels;
    let contentPanels = programacaoResponse.data.contentPanels;
    let localData = localResponse.data;

    for (const id in localData) {
      if (!localData[id] || !localData[id].horarios) {
        continue;
      }

      for (const i = 0; i < panels.length; i++) {
        if (
          gerarNomeArquivo(panels[i].title) !== id ||
          !contentPanels[i] ||
          !contentPanels[i].contentPanel
        ) {
          continue;
        }

        for (const x = 0; x < localData[id].horarios.length; x++) {
          if (
            !localData[id].horarios[x] ||
            !localData[id].horarios[x].hora ||
            localData[id].horarios[x].hora.length < 5
          ) {
            continue;
          }

          const localHora = localData[id].horarios[x];

          for (const y = 0; y < contentPanels[i].contentPanel.length; y++) {
            if (
              !contentPanels[i].contentPanel[y] ||
              !contentPanels[i].contentPanel[y].horarios
            ) {
              continue;
            }

            const contentPanel = contentPanels[i].contentPanel[y];

            for (const z = 0; z < contentPanel.horarios.length; z++) {
              if (
                !contentPanel.horarios[z] ||
                !contentPanel.horarios[z].horario ||
                contentPanel.horarios[z].horario.length < 5
              ) {
                continue;
              }

              if (
                contentPanel.horarios[z].horario.substring(0, 5).replace(":", "h") ===
                localHora.hora.substring(0, 5).replace(":", "h")
              ) {
                contentPanel.horarios[z].campus = localHora.campus;
                contentPanel.horarios[z].local = localHora.local;
              }
            }
          }
        }
      }
    }

    return contentPanels;
  }

  componentWillMount() {
    axios.all([
      axios.get(`${URL_SITE}programacao/${this.props.id}.json`),
      axios.get(`${URL_API}Oficina/${this.props.id}`)
    ])
    .then(axios.spread((programacaoResponse, localResponse) => this.setState({
      panels: programacaoResponse.data.panels,
      contentPanels: this.adicionarLocal(programacaoResponse, localResponse),
      visible: false
    })));
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

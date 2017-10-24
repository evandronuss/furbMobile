import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Alert,
  Button,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';
import URL_API from '../lib/Configuracoes';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import { saveItem, getItem, isArray } from '../lib/Util';
import { adicionarPresenca, apagarPresencas } from '../actions/CheckinActions';

class CheckinMinistrante extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursoSelecionado: '',
      oficinaSelecionada: '',
      cursos: [],
      oficinas: [],
      timeoutId: 0,
      visible: true,
      date: ''
    };
  }
  
  componentWillMount() {
    if (this.props.isConnected) {
      axios.get(`${URL_API}Checkin/GetCursosOficinas/${this.props.email}`)
        .then(response => this.carregarInformacoesOnline(response))
        .catch(() => this.carregarInformacoesOffline());
    } else {
      this.carregarInformacoesOffline();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }

  onRead(e) {
    const that = this;
    const presenca = {
      email: e.data,
      curso: this.state.cursoSelecionado,
      oficina: this.state.oficinaSelecionada
    };

    if (this.props.isConnected) {
      axios.post(`${URL_API}Checkin`, [presenca])
        .catch(() => this.props.adicionarPresenca(presenca));  
    } else {
      this.props.adicionarPresenca(presenca);
    }

    Alert.alert('', e.data, [{
      text: 'OK',
      onPress: () => this.setState({
        timeoutId: setTimeout(that.scanner.reactivate.bind(that.scanner), 3000)
      })
    }]);
  }

  carregarInformacoesOnline(response) {
    saveItem('CheckinDropDown', JSON.stringify(response));

    this.carregarInformacoes(response);
  }

  carregarInformacoesOffline() {
    console.log('Erro ao recuperar os dados');

    getItem('CheckinDropDown').then((response) => {
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
    if (response && isArray(response.data)) {
      const cursos = response.data;
      const oficinas = response.data[0].oficinas;

      this.setState({
        cursoSelecionado: cursos[0].id,
        oficinaSelecionada: oficinas[0].id,
        cursos,
        oficinas,
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

  enviarPresencasArmazenadas() {
    if (this.props.presencas.length > 0) {
      const presencas = this.props.presencas;

      this.setState({
        visible: true,
        textContent: 'Enviando...'
      });

      axios.post(`${URL_API}Checkin`, presencas)
        .then(() => {
          this.setState({
            textContent: undefined,
            visible: false
          });

          this.props.apagarPresencas(presencas);
        });
    }
  }

  topContent() {
    return (
      <View
        style={styles.container}
      >
        <Loading textContent={this.state.textContent} visible={this.state.visible} />
        <MessageDate date={this.state.date} />
        <Picker
          style={styles.picker}
          prompt="Cursos"
          selectedValue={this.state.cursoSelecionado}
          onValueChange={itemValue => {
            const curso = this.state.cursos.filter(c => c.id === itemValue);
            const oficinas = curso[0].oficinas;

            this.setState({
              cursoSelecionado: itemValue,
              oficinas,
              oficinaSelecionada: oficinas[0].id,
            });
          }}
        >
          {this.state.cursos.filter(c => c.nome !== '').map(c =>
            <Picker.Item key={`Curso_${c.id}`} label={c.nome} value={c.id} />
          )}
        </Picker>
        <Picker
          style={styles.picker}
          prompt="Oficinas"
          selectedValue={this.state.oficinaSelecionada}
          onValueChange={itemValue => this.setState({ oficinaSelecionada: itemValue })}
        >
          {this.state.oficinas.filter(o => o.nome !== '').map(o =>
            <Picker.Item key={`Oficina_${o.id}`} label={o.nome} value={o.id} />
          )}
        </Picker>
      </View>
    );
  }

  bottomContent() {
    return (
      <View style={[styles.container, this.props.isConnected ? styles.containerBottom : undefined]}>
        {this.props.isConnected &&
        isArray(this.props.presencas) &&
        this.props.presencas.length > 0 &&
        <Button
          onPress={this.enviarPresencasArmazenadas.bind(this)}
          color="#00549A"
          title="Enviar presenças ao servidor"
        />}
        {this.props.isConnected &&
        isArray(this.props.presencas) &&
        this.props.presencas.length > 0 &&
        <Text style={styles.text}>
          Se você não enviar as presenças ao servidor elas serão enviadas automaticamente
          quando houver conexão.
        </Text>}
        {!this.props.isConnected &&
        isArray(this.props.presencas) &&
        this.props.presencas.length > 0 &&
        <Text style={styles.text}>
          Existem presenças armazenadas localmente que serão enviadas automaticamente ao servidor
          quando houver conexão.
        </Text>}
      </View>
    );
  }

  render() {
		return (
      <QRCodeScanner
        ref={(node) => { this.scanner = node; }}
        onRead={this.onRead.bind(this)}
        topContent={this.topContent()}
        bottomContent={this.bottomContent()}
      />
		);
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    alignSelf: 'stretch'
  },
	containerBottom: {
    paddingTop: 5
  },
  picker: {
    flex: 1
  },
  text: {
    fontSize: 11,
    color: '#6D6D72',
    margin: 5
  }
});

const mapStateToProps = state => (
  {
		email: state.AutenticacaoReducer.email,
    isConnected: state.ConnectionReducer.isConnected,
		presencas: state.CheckinReducer.presencas
  }
);

export default connect(mapStateToProps, { adicionarPresenca, apagarPresencas })(CheckinMinistrante);

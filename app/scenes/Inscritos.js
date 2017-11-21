import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Alert,
  Picker,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import URL_API from '../lib/Configuracoes';
import Loading from '../components/Loading';
import MessageDate from '../components/MessageDate';
import { saveItem, getItem, isArray } from '../lib/Util';

class Inscritos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursoSelecionado: '',
      oficinaSelecionada: '',
      cursos: [],
      oficinas: [],
      inscritos: [],
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

      this.carregarInscritosOficina(cursos[0].id, oficinas[0].id);
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

  carregarInscritosOficina(curso, oficina) {
    this.setState({
      visible: true
    });

    if (this.props.isConnected) {
      axios.get(`${URL_API}Oficina/GetInscritos/${curso}/${oficina}`)
        .then(response => this.carregarInscritosOnline(response))
        .catch(() => this.carregarInscritosOffline());
    } else {
      this.carregarInscritosOffline();
    }
  }

  carregarInscritosOnline(response) {
    saveItem('InscritosOficina', JSON.stringify(response));

    this.carregarInscritos(response);
  }

  carregarInscritosOffline() {
    console.log('Erro ao recuperar os dados');

    getItem('InscritosOficina').then((response) => {
      if (response) {
        this.carregarInscritos(JSON.parse(response.value), response.date);
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

  carregarInscritos(response, date) {
    if (response && isArray(response.data)) {
      this.setState({
        inscritos: response.data,
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
      <View
        style={styles.container}
      >
        <Loading visible={this.state.visible} />
        <MessageDate date={this.state.date} />
        <Picker
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

            this.carregarInscritosOficina(itemValue, oficinas[0].id);
          }}
        >
          {this.state.cursos.filter(c => c.nome !== '').map(c =>
            <Picker.Item key={`Curso_${c.id}`} label={c.nome} value={c.id} />
          )}
        </Picker>
        <Picker
          prompt="Oficinas"
          selectedValue={this.state.oficinaSelecionada}
          onValueChange={itemValue => {
            this.setState({ oficinaSelecionada: itemValue });

            this.carregarInscritosOficina(this.state.cursoSelecionado, itemValue);
          }}
        >
          {this.state.oficinas.filter(o => o.nome !== '').map(o =>
            <Picker.Item key={`Oficina_${o.id}`} label={o.nome} value={o.id} />
          )}
        </Picker>
        <View style={{ backgroundColor: '#000', height: 1 }} />
        <ScrollView style={{ flex: 1 }}>
          {this.state.inscritos.map((i, index) => (
            <Text key={`inscritos_${index}`} style={styles.text}>
              {i.nome}
            </Text>
          ))}
        </ScrollView>
      </View>
		);
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1
  },
  text: {
    fontSize: 16,
    color: '#000',
    margin: 5
  }
});

const mapStateToProps = state => (
  {
		email: state.AutenticacaoReducer.email,
    isConnected: state.ConnectionReducer.isConnected
  }
);

export default connect(mapStateToProps, null)(Inscritos);

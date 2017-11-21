import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  StyleSheet,
  TouchableHighlight,
  View,
  NetInfo
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import Moment from 'moment';
import PushNotification from 'react-native-push-notification';
import Menu from './components/Menu';
import Principal from './scenes/Principal';
import Login from './scenes/Login';
import FURB from './scenes/FURB';
import Cursos from './scenes/Cursos';
import Curso from './scenes/Curso';
import Ingresso from './scenes/Ingresso';
import Financiamento from './scenes/Financiamento';
import Matricula from './scenes/Matricula';
import Interacao from './scenes/Interacao';
import Programacao from './scenes/Programacao';
import ProgramacaoCurso from './scenes/ProgramacaoCurso';
import Checkin from './scenes/Checkin';
import CheckinMinistrante from './scenes/CheckinMinistrante';
import Inscritos from './scenes/Inscritos';
import {
  modificaToken,
  modificaEmail,
  modificaLogin,
  modificaIsMinistrante
} from './actions/AutenticacaoActions';
import { alteraStatusConexao } from './actions/ConnectionActions';
import { apagarPresencas, modificaPresencas } from './actions/CheckinActions';
import { getItem, isArray } from './lib/Util';
import URL_API from './lib/Configuracoes';

class App extends Component {
  componentWillMount() {
    getItem('email').then((response) => {
      this.props.modificaEmail(response ? response.value : '');
    });
    getItem('login').then((response) => {
      this.props.modificaLogin(response ? response.value : '');
    });
    getItem('isMinistrante').then((response) => {
      this.props.modificaIsMinistrante(response ? response.value : '');
    });
    getItem('token').then((response) => {
      this.props.modificaToken(response && response.value !== null);
    });
    getItem('Presencas').then((response) => {
      if (response && isArray(response.value)) {
        this.props.modificaPresencas(response.value);

        if (this.props.isConnected) {
          this.enviarPresencasArmazenadas();
        }
      }
    });

    if (this.props.isConnected) {
      this.carregarNotificacoes();
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', (isConnected) =>
      this.handleConnectionChange(isConnected)
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', (isConnected) =>
      this.handleConnectionChange(isConnected)
    );
  }

  handleConnectionChange(isConnected) {
    this.props.alteraStatusConexao(isConnected);

    if (isConnected) {
      this.carregarNotificacoes();
      this.enviarPresencasArmazenadas();
    }
  }

  enviarPresencasArmazenadas() {
    if (this.props.presencas.length > 0) {
      const presencas = this.props.presencas;

      axios.post(`${URL_API}Checkin`, presencas)
        .then(() => this.props.apagarPresencas(presencas));
    }
  }

  carregarNotificacoes() {
    axios.get(`${URL_API}notificacao`)
      .then(response => { this.configurarNotificacoes(response.data.data); })
      .catch(() => console.log('Erro ao recuperar os dados'));
  }

  configurarNotificacoes(notificacoes) {
    PushNotification.cancelAllLocalNotifications();

    const dataAtual = new Date();

    for (const i in notificacoes) {
      const dataNotificacao = Moment(notificacoes[i].date, 'DD-MM-YYYY h:mm').toDate();

      if (dataNotificacao > dataAtual) {
        PushNotification.localNotificationSchedule({
          message: notificacoes[i].message,
          date: dataNotificacao
        });
      }
    }
  }  

  openDrawer() {
    this.drawer.openDrawer();
  }

  closeDrawer() {
    this.drawer.closeDrawer();
  }

  burgerMenu() {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={'#00549A'}
        onPress={this.openDrawer.bind(this)}
      >
        <View>
          <Icon
            name='menu'
            size={30}
            color='#FFF'
            style={{ paddingLeft: 15 }}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={260}
        ref={(drawerElement) => { this.drawer = drawerElement; }}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        renderNavigationView={() => <Menu />}
      >
        <Router
          navigationBarStyle={styles.navigationBarStyle}
          titleStyle={styles.titleStyle}
          headerTintColor='#FFF'
          sceneStyle={{ backgroundColor: '#FFF' }}
        >
          <Scene key='root'>
            <Scene
              key='principal'
              component={Principal}
              initil
              title='FURB - Universidade de Blumenau'
              renderLeftButton={this.burgerMenu.bind(this)}
            />
            <Scene
              key='login'
              component={Login}
              title='Login'
              onEnter={this.closeDrawer.bind(this)}
            />
            <Scene
              key='furb'
              component={FURB}
              title='FURB - Universidade de Blumenau'
            />
            <Scene
              key='cursos'
              component={Cursos}
              title='Cursos'
            />
            <Scene
              key='curso'
              component={Curso}
              title='Curso'
            />
            <Scene
              key='ingresso'
              component={Ingresso}
              title='Ingresso'
            />
            <Scene
              key='financiamento'
              component={Financiamento}
              title='Apoio Financeiro'
            />
            <Scene
              key='matricula'
              component={Matricula}
              title='Matrícula'
            />
            <Scene
              key='interacao'
              component={Interacao}
              title='Interação'
            />
            <Scene
              key='programacao'
              component={Programacao}
              title='Programação'
              onEnter={this.closeDrawer.bind(this)}
            />
            <Scene
              key='programacaocurso'
              component={ProgramacaoCurso}
              title='Programação'
            />
            <Scene
              key='checkin'
              component={Checkin}
              title='Check-in'
              onEnter={this.closeDrawer.bind(this)}
            />
            <Scene
              key='checkinMinistrante'
              component={CheckinMinistrante}
              title='Check-in'
              onEnter={this.closeDrawer.bind(this)}
            />
            <Scene
              key='inscritosOficinas'
              component={Inscritos}
              title='Inscritos por Oficinas'
              onEnter={this.closeDrawer.bind(this)}
            />
          </Scene>
        </Router>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: '#00549A'
  },
  titleStyle: {
    color: '#FFF'
  }
});

const mapStateToProps = state => (
  {
    isConnected: state.ConnectionReducer.isConnected,
		presencas: state.CheckinReducer.presencas
  }
);

export default connect(mapStateToProps, {
  modificaToken,
  modificaEmail,
  modificaLogin,
  modificaIsMinistrante,
  alteraStatusConexao,
  apagarPresencas,
  modificaPresencas
})(App);

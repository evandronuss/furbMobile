import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Moment from 'moment';
import axios from 'axios';
import App from './app/App';
import URL_SITE from './app/lib/Configuracoes';

export default class furbMobile extends Component {
  componentWillMount() {
    axios.get(`${URL_SITE}notificacoes.json`)
      .then(response => { this.configurarNotificacoes(response.data); })
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

  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('furbMobile', () => furbMobile);

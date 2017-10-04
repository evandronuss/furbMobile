import React, { Component } from 'react';
import {
  AsyncStorage,
  DrawerLayoutAndroid,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
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
import { modificaToken, modificaEmail } from './actions/AutenticacaoActions';

class App extends Component {
  componentWillMount() {
    AsyncStorage.getItem('email').then((email) => {
      this.props.modificaEmail(email);
    });
    AsyncStorage.getItem('token').then((token) => {
      this.props.modificaToken(token !== null);
    });
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
            />
            <Scene
              key='programacaocurso'
              component={ProgramacaoCurso}
              title='Programação'
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

export default connect(null, { modificaToken, modificaEmail })(App);

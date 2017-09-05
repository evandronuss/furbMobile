import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import Menu from './components/Menu';
import Principal from './scenes/Principal';
import FURB from './scenes/FURB';
import Centros from './scenes/Centros';
import Cursos from './scenes/Cursos';
import Curso from './scenes/Curso';
import Ingresso from './scenes/Ingresso';
import Financiamento from './scenes/Financiamento';
import Matricula from './scenes/Matricula';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerClosed: true,
      drawerLockMode: 'unlocked'
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setDrawerState = this.setDrawerState.bind(this);
  }

  setDrawerState() {
    this.setState({
      drawerClosed: !this.state.drawerClosed
    });
  }

  ativarDrawer() {
    this.setState({
      drawerLockMode: 'unlocked'
    });
  }

  desativarDrawer() {
    this.setState({
      drawerLockMode: 'locked-closed'
    });
  }

  toggleDrawer() {
    if (this.state.drawerClosed) {
      this.drawer.openDrawer();
    } else {
      this.drawer.closeDrawer();
    }
  }

  burgerMenu() {
    return (
      <TouchableHighlight
        onPress={this.toggleDrawer}
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
        drawerWidth={300}
        ref={(drawerElement) => { this.drawer = drawerElement; }}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        onDrawerOpen={this.setDrawerState}
        onDrawerClose={this.setDrawerState}
        renderNavigationView={() => <Menu app={this} />}
        drawerLockMode={this.state.drawerLockMode}
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
              key='furb'
              component={FURB}
              title='FURB - Universidade de Blumenau'
            />
            <Scene
              key='centros'
              component={Centros}
              title='Centros dos Cursos'
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

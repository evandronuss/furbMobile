import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './app/App';
import reducers from './app/reducers';

export default class furbMobile extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('furbMobile', () => furbMobile);

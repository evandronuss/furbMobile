import React, { Component } from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  Linking
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { buscarImagemPais, buscarUrlPais } from '../lib/Util';

export default class ItemMenu extends Component {
  onPress() {
    Linking.openURL(buscarUrlPais(this.props.iconTitle));
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.onPress.bind(this)}
        activeOpacity={1}
        underlayColor='#FFF'
      >
        <View style={styles.itemMenu}>
          <Image
            source={buscarImagemPais(this.props.iconTitle)}
          />
          <HTMLView
            style={styles.text}
            value={`<a>${this.props.iconTitle}</a>`}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  itemMenu: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  text: {
    marginLeft: 10
  }
});

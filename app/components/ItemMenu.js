import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class ItemMenu extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
      >
        <View style={styles.itemMenu}>
          <Icon
            name={this.props.icon}
            size={30}
            color='#005FA4'
            iconStyle={this.props.styleIcon}
          />
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  itemMenu: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30
  },
  text: {
    color: '#005FA4',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlignVertical: 'center'
  }
});

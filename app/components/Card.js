import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class Card extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <TouchableHighlight
          onPress={() => this.props.onPress()}
        >
          <View style={[styles.card, { width: this.props.cardSize, height: this.props.cardSize }]}>
            {this.props.icon && <Icon
              name={this.props.icon}
              type={this.props.type}
              size={50}
              color='#FFF'
            />}
            <Text
              style={[
                styles.text,
                this.props.text.length === 1 && !this.props.icon ? styles.letter : undefined
              ]}
            >
              {this.props.text}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#00549A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  text: {
    color: '#FFF',
    textAlign: 'center'
  },
  letter: {
    fontSize: 40
  }
});

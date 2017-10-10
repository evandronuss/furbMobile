import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MessageDate extends Component {
	render() {
		return (
			<View style={styles.container}>
        {!!this.props.date && <Text style={styles.text}>
          Atualizado em: {this.props.date}
        </Text>}
      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: {
    fontSize: 11,
    color: '#6D6D72'
  }
});

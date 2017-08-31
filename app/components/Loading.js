import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Loading extends Component {
	render() {
		return (
			<Spinner
        visible={this.props.visible}
        textContent={'Carregando...'}
        textStyle={{ color: '#FFF', marginTop: -50 }}
        overlayColor='rgba(0, 0, 0, 0.60)'
        size='large'
			/>
		);
	}
}

import React, { Component } from 'react';
import {
	Text,
  Dimensions,
	ScrollView,
	StyleSheet
} from 'react-native';
import Image from 'react-native-transformable-image';

const LogoFurb = require('../images/matricula-calouros.png');

export default class Matricula extends Component {
  constructor(props) {
		super(props);
		
		const width = Dimensions.get('window').width;

    this.state = {
			dimensoes: {
				width,
				height: (width * 1.4141)
			}
		};
	}

  onLayout() {
		const width = Dimensions.get('window').width;

    this.setState({
			dimensoes: {
				width,
				height: (width * 1.4141)
			}
    });
  }

	render() {
		return (
			<ScrollView style={styles.container} onLayout={this.onLayout.bind(this)}>
				<Text style={styles.texto}>
					Para se matrícular siga o seguinte fluxo:
				</Text>
				{<Image
					style={this.state.dimensoes}
					source={LogoFurb}
					pixels={this.state.dimensoes}
				/>}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
			flex: 1,
			paddingTop: 5
	},
	texto: {
		marginLeft: 10
	}
});

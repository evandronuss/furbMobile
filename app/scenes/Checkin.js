import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

class Checkin extends Component {
  render() {
		if (this.props.isMinistrante) {
			return (
				<View style={styles.container}>
					<Text style={styles.texto}>
						Realize Check-in nas Oficinas que você visitar apresentando este QRCode.
					</Text>
					<View style={styles.QRCode}>
						<QRCode
							size={200}
							value={this.props.email}
						/>
					</View>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<Text style={styles.texto}>
					Realize Check-in nas Oficinas que você visitar apresentando este QRCode.
				</Text>
				<View style={styles.QRCode}>
					<QRCode
						size={200}
						value={this.props.email}
					/>
				</View>
			</View>
		);
  }
}

const styles = StyleSheet.create({
	container: {
			flex: 1,
			alignItems: 'center',
			padding: 30
	},
	texto: {
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center'
	},
	QRCode: {
		marginTop: 60
	}
});

const mapStateToProps = state => (
  {
		email: state.AutenticacaoReducer.email,
		isMinistrante: state.AutenticacaoReducer.isMinistrante
  }
);

export default connect(mapStateToProps, null)(Checkin);

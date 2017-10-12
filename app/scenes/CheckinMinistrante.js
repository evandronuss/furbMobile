import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import {
  Alert,
	StyleSheet,
	View
} from 'react-native';

class CheckinMinistrante extends Component {


  onRead(e) {
    const that = this;
    Alert.alert('', e.data, [{
      text: 'OK',
      onPress: () => setTimeout(that.scanner.reactivate.bind(that.scanner), 3000)
    }]);
  }

  render() {
		return (
			<View style={styles.container}>
				<QRCodeScanner
          ref={(node) => { this.scanner = node; }}
          onRead={this.onRead.bind(this)}
				/>
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
		email: state.AutenticacaoReducer.email
  }
);

export default connect(mapStateToProps, null)(CheckinMinistrante);

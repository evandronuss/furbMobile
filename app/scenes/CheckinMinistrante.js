import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import {
  Alert,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';

class CheckinMinistrante extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: ''
    };
  }

  onRead(e) {
    const that = this;
    Alert.alert('', e.data, [{
      text: 'OK',
      onPress: () => setTimeout(that.scanner.reactivate.bind(that.scanner), 3000)
    }]);
  }

  topContent() {
    return (
      <View
        style={styles.container}
      >
        <Picker
          style={styles.picker}
          prompt="Cursos"
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <Picker
          style={styles.picker}
          prompt="Oficinas"
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }

  render() {
		return (
      <QRCodeScanner
        ref={(node) => { this.scanner = node; }}
        onRead={this.onRead.bind(this)}
        topContent={this.topContent()}
      />
		);
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  picker: {
    flex: 1
  }
});

const mapStateToProps = state => (
  {
		email: state.AutenticacaoReducer.email
  }
);

export default connect(mapStateToProps, null)(CheckinMinistrante);

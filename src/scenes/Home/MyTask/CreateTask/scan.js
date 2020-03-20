import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
// import { Text, View, StyleSheet, Button } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanQRScreen extends Component {  
  
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: false,
    }
  }

  componentDidMount = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({hasPermission: (status === 'granted')});
  };

  handleBarCodeScanned = ({ data }) => {
    this.props.route.params.callback(data);
    this.props.navigation.navigate('CreateTask');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />  
      </View>
    )
  }
}
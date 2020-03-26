import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { SafeAreaView } from 'react-navigation';

export default class ScanScreen extends Component {  
  
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
    this.props.navigation.navigate(this.props.route.params.screen);
    this.props.route.params.callback(data);
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <PaperTopNavigation
            title='Scan QRCode'
            leftIcon='arrow-back'
            leftScreen='Back'
            {...this.props}/>
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
      </SafeAreaView>
    )
  }
}
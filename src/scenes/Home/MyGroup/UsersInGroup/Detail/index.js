import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Layout, Text, Modal, Icon, Input, Button } from '@ui-kitten/components';

export default class DetailScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 'adadadsadasdasdawddddddddddddddddd'
      },
    };
  }
  
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <QRCode
          value={this.state.data.id}/>
        <Text category='h5' style={{marginTop: 50}}>Name: <Text category='h5'>awd</Text></Text>
        <Text category='h5'>Email: </Text>
        <Text category='h5'>Role: </Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Layout, Text, Modal, Icon, Input, Button } from '@ui-kitten/components';

export default class CreateUserScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
    <SafeAreaView style={styles.mainContainer}>
      <Text category='h1'>CreateUser</Text>
    </SafeAreaView>
    )
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
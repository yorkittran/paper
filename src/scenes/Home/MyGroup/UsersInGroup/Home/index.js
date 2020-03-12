import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Layout, Text, Modal, Icon, Input, Button } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';

export default HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.mainContainer}>
    <Text category='h1'>HomeScreen</Text>
    <Button onPress={() => navigation.navigate('HomeC')}>Go to HomeChild</Button>
    <Button onPress={() => navigation.navigate('HomeCC')}>Go to HomeChildChild</Button>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
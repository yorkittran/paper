import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Layout, Text, Modal, Icon, Input, Button } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';

const Stack = createStackNavigator();

const HomeChildScreen = ({ navigation }) => (
  <SafeAreaView style={styles.mainContainer}>
    <Text category='h1'>HomeChildScreen</Text>
  </SafeAreaView>
)

const HomeChildChildScreen = ({ navigation }) => (
  <SafeAreaView style={styles.mainContainer}>
    <Text category='h1'>HomeChildChildScreen</Text>
  </SafeAreaView>
)

const UsersInGroupNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="HomeC" component={HomeChildScreen} />
      <Stack.Screen name="HomeCC" component={HomeChildChildScreen} />
    </Stack.Navigator>
  );
}

export default class UsersInGroupScreen extends Component {

  render() {
    return (
      <UsersInGroupNavigator navigation={this.props.navigation} />
    );
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
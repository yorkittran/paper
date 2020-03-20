import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateTaskScreen from '../scenes/Home/MyTask/CreateTask/create';
import ScanQRScreen from '../scenes/Home/MyTask/CreateTask/scan';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      <Stack.Screen name="ScanQR" component={ScanQRScreen} />
    </Stack.Navigator>
  );
}

export default class CreateTaskNavigator extends Component {

  render() {
    return (
      <Navigator navigation={this.props.navigation} />
    );
  }
};
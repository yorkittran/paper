import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../scenes/Home/SystemManagement/User/list';
import DetailScreen from '../scenes/Home/SystemManagement/User/detail';
import EditingScreen from '../scenes/Home/SystemManagement/User/edit';
import CreatingScreen from '../scenes/Home/SystemManagement/User/create';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Editing" component={EditingScreen} />
      <Stack.Screen name="Creating" component={CreatingScreen} />
    </Stack.Navigator>
  );
}

export default class UserNavigator extends Component {

  render() {
    return (
      <Navigator navigation={this.props.navigation} />
    );
  }
};
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../scenes/Home/SystemManagement/ViewUser/List';
import DetailScreen from '../scenes/Home/SystemManagement/ViewUser/Detail';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default class UsersInGroupNavigator extends Component {

  render() {
    return (
      <Navigator navigation={this.props.navigation} />
    );
  }
};
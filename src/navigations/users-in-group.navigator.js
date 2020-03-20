import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../scenes/Home/MyGroup/UsersInGroup/list';
import DetailScreen from '../scenes/Home/MyGroup/UsersInGroup/detail';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} options={({ route }) => ({title: route.params.userName })}/>
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
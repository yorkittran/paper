import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from '../scenes/Home/Home/Profile/detail';
import EditScreen from '../scenes/Home/Home/Profile/edit';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}

export default class ProfileNavigator extends Component {

  render() {
    return (
      <Navigator navigation={this.props.navigation} />
    );
  }
};
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    </Stack.Navigator>
  );
}

export default class HandoutTaskNavigator extends Component {

  render() {
    return (
      <Navigator navigation={this.props.navigation} />
    );
  }
};
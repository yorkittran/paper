import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
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
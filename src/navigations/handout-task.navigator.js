import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../scenes/Home/MyTask/HandoutTask/list';
import DetailScreen from '../scenes/Home/MyTask/HandoutTask/detail';
import EditScreen from '../scenes/Home/MyTask/HandoutTask/edit';
import EvaluateScreen from '../scenes/Home/MyTask/HandoutTask/evaluate';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Evaluate" component={EvaluateScreen} />
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
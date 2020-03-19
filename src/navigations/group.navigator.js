import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../scenes/Home/SystemManagement/Group/list';
import ListUserScreen from '../scenes/Home/SystemManagement/Group/user-list';
import DetailScreen from '../scenes/Home/SystemManagement/Group/user-detail';
import EditingScreen from '../scenes/Home/SystemManagement/Group/edit';
import CreatingScreen from '../scenes/Home/SystemManagement/Group/create';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="ListUser" component={ListUserScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Editing" component={EditingScreen} />
      <Stack.Screen name="Creating" component={CreatingScreen} />
    </Stack.Navigator>
  );
}

export default class GroupNavigator extends Component {

  render() {
    return (
      <Navigator navigation={this.props.navigation} />
    );
  }
};
import React, { Component } from 'react';
import { DrawerNavigator } from '../../navigations/drawer.navigator';
import { NavigationContainer } from '@react-navigation/native';

export default class HomeScreen extends Component {

  render() {
    return (
      <NavigationContainer>
        <DrawerNavigator navigation={this.props.navigation} />
      </NavigationContainer>
    );
  }
};
import React from 'react';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as theme } from '@eva-design/eva';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreen from './src/scenes/Login';
import AppNavigator from './src/components/navigation';

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Router>
        <Scene key="root">
          <Scene key="home" hideNavBar={true} component={AppNavigator} panHandlers={null} initial />
          <Scene key="login" hideNavBar={true} component={LoginScreen} />
        </Scene>
      </Router>
    </ApplicationProvider>
  </React.Fragment>
);

export default App;
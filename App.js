import React from 'react';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { mapping, light as theme } from '@eva-design/eva';
import { AppNavigator } from './components/navigation.component';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
  </Layout>
);

const App = () => (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <HomeScreen/>
      <AppNavigator/>
    </ApplicationProvider>
);

export default App;
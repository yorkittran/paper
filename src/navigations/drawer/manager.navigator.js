import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as UIKittenDrawer, DrawerHeaderFooter, Icon, Button, Layout } from '@ui-kitten/components';
import NotificationScreen from '../../scenes/Home/Home/Notification/list';
import ProfileScreen from '../../scenes/Home/Home/Profile/detail';
import TaskNavigator from '../task.navigator';
import GroupNavigator from '../group.navigator';
import { URL_LOGOUT } from '../../config/constants';

const Drawer = createDrawerNavigator();

const deleteToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    // fetch(URL_LOGOUT, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token
    //   },
    // });
    Actions.login();
  } catch (error) {
    console.error(error);
  }
};

const DrawerContent = ({ navigation, state }) => {

  const HomeIcon = () => (
    <Icon name='home-outline'/>
  );

  const BellIcon = () => (
    <Icon name='bell-outline'/>
  );

  const BookmarkIcon = () => (
    <Icon name='bookmark-outline'/>
  );

  const FolderIcon = () => (
    <Icon name='folder-outline'/>
  );

  const LogoutIcon = () => (
    <Icon name='log-out-outline' fill='#FFFFFF'/>
  );

  const HeaderHome = () => (
    <DrawerHeaderFooter
      title='HOME'
      titleStyle={{fontWeight: '800', fontSize: 18, marginTop: 20}}
    />
  );

  const drawerHome = [
    { title: 'Profile', icon: HomeIcon },
    { title: 'Notification', icon: BellIcon },
  ];

  const onSelectHome = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  const HeaderManagement = () => (
    <DrawerHeaderFooter
      title='MANAGEMENT'
      titleStyle={{fontWeight: '800', fontSize: 18, marginTop: 20}}
    />
  );

  const drawerManagement = [
    { title: 'Task', icon: BookmarkIcon },
    { title: 'Group', icon: FolderIcon },
  ];

  const onSelectManagement = (index) => {
    navigation.navigate(state.routeNames[index + drawerHome.length]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout>
        <UIKittenDrawer
          data={drawerHome}
          header={HeaderHome}
          onSelect={onSelectHome}
          appearance='noDivider'
        />
        <UIKittenDrawer
          data={drawerManagement}
          header={HeaderManagement}
          onSelect={onSelectManagement}
          appearance='noDivider'
        />
      </Layout>
      <Button 
        style={{flexDirection: 'row-reverse', margin: 20, marginTop: 'auto'}} 
        size='large'
        status='danger' 
        icon={LogoutIcon} 
        onPress={deleteToken}
      >LOGOUT</Button>
    </SafeAreaView>
  );
};

export const ManagerDrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} initialRouteName="Task">
    <Drawer.Screen name='Profile' component={ProfileScreen}/>
    <Drawer.Screen name='Notification' component={NotificationScreen}/>
    <Drawer.Screen name='Task' component={TaskNavigator}/>
    <Drawer.Screen name='Group' component={GroupNavigator}/>
  </Drawer.Navigator>
);
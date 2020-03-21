import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as UIKittenDrawer, DrawerHeaderFooter, Icon, Button } from '@ui-kitten/components';
import NotificationScreen from '../../scenes/Home/Home/Notification/list';
import ProfileNavigator from '../profile.navigator';
import TaskNavigator from '../task.navigator';
import UserNavigator from '../user.navigator';
import GroupNavigator from '../group.navigator';

const Drawer = createDrawerNavigator();

const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
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

  const PersonIcon = () => (
    <Icon name='person-outline'/>
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

  const HeaderSystemManagement = () => (
    <DrawerHeaderFooter
      title='SYSTEM MANAGEMENT'
      titleStyle={{fontWeight: '800', fontSize: 18, marginTop: 20}}
    />
  );

  const drawerSystemManagement = [
    { title: 'Task', icon: BookmarkIcon },
    { title: 'User', icon: PersonIcon },
    { title: 'Group', icon: FolderIcon },
  ];

  const onSelectSystemManagement = (index) => {
    navigation.navigate(state.routeNames[index + drawerHome.length]);
  };

  return (
    <SafeAreaView>
      <UIKittenDrawer
        data={drawerHome}
        header={HeaderHome}
        onSelect={onSelectHome}
        appearance='noDivider'
      />
      <UIKittenDrawer
        data={drawerSystemManagement}
        header={HeaderSystemManagement}
        onSelect={onSelectSystemManagement}
        appearance='noDivider'
      />
      <Button 
        style={{flexDirection: 'row-reverse', margin: 20}} 
        size='large'
        status='danger' 
        icon={LogoutIcon} 
        onPress={deleteToken}
      >LOGOUT</Button>
    </SafeAreaView>
  );
};

export const AdminDrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} initialRouteName="Task">
    <Drawer.Screen name='Profile' component={ProfileNavigator}/>
    <Drawer.Screen name='Notification' component={NotificationScreen}/>
    <Drawer.Screen name='Task' component={TaskNavigator}/>
    <Drawer.Screen name='User' component={UserNavigator}/>
    <Drawer.Screen name='Group' component={GroupNavigator}/>
  </Drawer.Navigator>
);
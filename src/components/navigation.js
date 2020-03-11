import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as UIKittenDrawer, DrawerHeaderFooter, Icon, Layout, Text } from '@ui-kitten/components';
import GivenTaskScreen from '../scenes/MyTask/GivenTask';
import HandoutTaskScreen from '../scenes/MyTask/HandoutTask';
import CreateTaskScreen from '../scenes/MyTask/CreateTask';
import ApproveTaskScreen from '../scenes/MyTask/ApproveTask';
import UsersInGroupScreen from '../scenes/MyGroup/UsersInGroup';
import ViewUserScreen from '../scenes/SystemManagement/ViewUser';
import CreateUserScreen from '../scenes/SystemManagement/CreateUser';
import ViewGroupScreen from '../scenes/SystemManagement/ViewGroup';
import CreateGroupScreen from '../scenes/SystemManagement/CreateGroup';


const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {

  const FileTextIcon = () => (
    <Icon name='file-text-outline'/>
  );

  const PaperPlaneIcon = () => (
    <Icon name='paper-plane'/>
  );

  const FileAddIcon = () => (
    <Icon name='file-add-outline'/>
  );
  
  const CheckmarkCircleIcon = () => (
    <Icon name='checkmark-circle'/>
  );

  const PeopleIcon = () => (
    <Icon name='people-outline'/>
  );

  const PersonIcon = () => (
    <Icon name='person-outline'/>
    );

  const PersonAddIcon = () => (
    <Icon name='person-add-outline'/>
  );

  const FolderIcon = () => (
    <Icon name='folder-outline'/>
  );

  const FolderAddIcon = () => (
    <Icon name='folder-add-outline'/>
  );

  const HeaderMyTask = () => (
    <DrawerHeaderFooter
      title='MY TASKS'
      titleStyle={{fontWeight: '800', fontSize: 18}}
    />
  );

  const HeaderMyGroup = () => (
    <DrawerHeaderFooter
      title='MY GROUP'
      titleStyle={{fontWeight: '800', fontSize: 18, marginTop: 20}}
    />
  );

  const HeaderSystemManagement = () => (
    <DrawerHeaderFooter
      title='SYSTEM MANAGEMENT'
      titleStyle={{fontWeight: '800', fontSize: 18, marginTop: 20}}
    />
  );
  
  const drawerMyTask = [
    { title: 'Given Task', icon: FileTextIcon },
    { title: 'Handout Task', icon: PaperPlaneIcon },
    { title: 'Create Task', icon: FileAddIcon },
    { title: 'Approve Task', icon: CheckmarkCircleIcon  },
  ];

  const drawerMyGroup = [
    { title: 'Users In Group', icon: PeopleIcon },
  ];

  const drawerSystemManagement = [
    { title: 'View User', icon: PersonIcon },
    { title: 'Create User', icon: PersonAddIcon },
    { title: 'View Group', icon: FolderIcon },
    { title: 'Create Group', icon: FolderAddIcon },
  ];

  const onSelectMyTask = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  const onSelectMyGroup = (index) => {
    navigation.navigate(state.routeNames[index + drawerMyTask.length]);
  };

  const onSelectSystemManagement = (index) => {
    navigation.navigate(state.routeNames[index + drawerMyTask.length + drawerMyGroup.length]);
  };

  return (
    <SafeAreaView>
      <UIKittenDrawer
        data={drawerMyTask}
        header={HeaderMyTask}
        onSelect={onSelectMyTask}
        appearance='noDivider'
      />
      <UIKittenDrawer
        data={drawerMyGroup}
        header={HeaderMyGroup}
        onSelect={onSelectMyGroup}
        appearance='noDivider'
      />
      <UIKittenDrawer
        data={drawerSystemManagement}
        header={HeaderSystemManagement}
        onSelect={onSelectSystemManagement}
        appearance='noDivider'
      />
    </SafeAreaView>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
    <Drawer.Screen name='GivenTask' component={GivenTaskScreen}/>
    <Drawer.Screen name='HandoutTask' component={HandoutTaskScreen}/>
    <Drawer.Screen name='CreateTask' component={CreateTaskScreen}/>
    <Drawer.Screen name='ApproveTask' component={ApproveTaskScreen}/>
    <Drawer.Screen name='UsersInGroup' component={UsersInGroupScreen}/>
    <Drawer.Screen name='ViewUser' component={ViewUserScreen}/>
    <Drawer.Screen name='CreateUser' component={CreateUserScreen}/>
    <Drawer.Screen name='ViewGroup' component={ViewGroupScreen}/>
    <Drawer.Screen name='CreateGroup' component={CreateGroupScreen}/>
  </Drawer.Navigator>
);

export default class AppNavigator extends Component {

  render () {
    return (
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
    )
  }
};
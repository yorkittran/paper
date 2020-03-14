import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as UIKittenDrawer, DrawerHeaderFooter, Icon, Button } from '@ui-kitten/components';
import GivenTaskNavigator from '../navigations/given-task.navigator';
import HandoutTaskNavigator from '../navigations/handout-task.navigator';
import CreateTaskScreen from '../scenes/Home/MyTask/CreateTask';
import ApproveTaskScreen from '../scenes/Home/MyTask/ApproveTask';
import UsersInGroupNavigator from '../navigations/users-in-group.navigator';
import UserNavigator from '../navigations/user.navigator';
import GroupNavigator from '../navigations/group.navigator';


const Drawer = createDrawerNavigator();


const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    Actions.login();
  } catch (error) {
    console.log(error);
  }
};

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

  const FolderIcon = () => (
    <Icon name='folder-outline'/>
  );

  const LogoutIcon = () => (
    <Icon name='log-out-outline' fill='#FFFFFF'/>
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
    { title: 'User', icon: PersonIcon },
    { title: 'Group', icon: FolderIcon },
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

export const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} initialRouteName="UsersInGroup">
    <Drawer.Screen name='GivenTask' component={GivenTaskNavigator}/>
    <Drawer.Screen name='HandoutTask' component={HandoutTaskNavigator}/>
    <Drawer.Screen name='CreateTask' component={CreateTaskScreen}/>
    <Drawer.Screen name='ApproveTask' component={ApproveTaskScreen}/>
    <Drawer.Screen name='UsersInGroup' component={UsersInGroupNavigator}/>
    <Drawer.Screen name='User' component={UserNavigator}/>
    <Drawer.Screen name='Group' component={GroupNavigator}/>
  </Drawer.Navigator>
);
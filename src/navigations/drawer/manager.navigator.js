import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as UIKittenDrawer, DrawerHeaderFooter, Icon, Button } from '@ui-kitten/components';
import GivenTaskNavigator from '../given-task.navigator';
import HandoutTaskNavigator from '../handout-task.navigator';
import CreateTaskScreen from '../../scenes/Home/MyTask/CreateTask';
import ApproveTaskScreen from '../../scenes/Home/MyTask/ApproveTask';
import UsersInGroupNavigator from '../users-in-group.navigator';

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

  const LogoutIcon = () => (
    <Icon name='log-out-outline' fill='#FFFFFF'/>
  );

  const HeaderMyTask = () => (
    <DrawerHeaderFooter
      title='MY TASKS'
      titleStyle={{fontWeight: '800', fontSize: 18, marginTop: 20}}
    />
  );

  const HeaderMyGroup = () => (
    <DrawerHeaderFooter
      title='MY GROUP'
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

  const onSelectMyTask = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  const onSelectMyGroup = (index) => {
    navigation.navigate(state.routeNames[index + drawerMyTask.length]);
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

export const ManagerDrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} initialRouteName="UsersInGroup">
    <Drawer.Screen name='GivenTask' component={GivenTaskNavigator}/>
    <Drawer.Screen name='HandoutTask' component={HandoutTaskNavigator}/>
    <Drawer.Screen name='CreateTask' component={CreateTaskScreen}/>
    <Drawer.Screen name='ApproveTask' component={ApproveTaskScreen}/>
    <Drawer.Screen name='UsersInGroup' component={UsersInGroupNavigator}/>
  </Drawer.Navigator>
);
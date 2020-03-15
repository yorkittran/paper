import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as UIKittenDrawer, DrawerHeaderFooter, Icon, Button } from '@ui-kitten/components';
import HandoutTaskNavigator from '../handout-task.navigator';
import CreateTaskScreen from '../../scenes/Home/MyTask/CreateTask';
import ApproveTaskScreen from '../../scenes/Home/MyTask/ApproveTask';
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

  const PaperPlaneIcon = () => (
    <Icon name='paper-plane'/>
  );

  const FileAddIcon = () => (
    <Icon name='file-add-outline'/>
  );
  
  const CheckmarkCircleIcon = () => (
    <Icon name='checkmark-circle'/>
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
    { title: 'Handout Task', icon: PaperPlaneIcon },
    { title: 'Create Task', icon: FileAddIcon },
    { title: 'Approve Task', icon: CheckmarkCircleIcon  },
  ];

  const drawerSystemManagement = [
    { title: 'User', icon: PersonIcon },
    { title: 'Group', icon: FolderIcon },
  ];

  const onSelectMyTask = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  const onSelectSystemManagement = (index) => {
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
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} initialRouteName="User">
    <Drawer.Screen name='HandoutTask' component={HandoutTaskNavigator}/>
    <Drawer.Screen name='CreateTask' component={CreateTaskScreen}/>
    <Drawer.Screen name='ApproveTask' component={ApproveTaskScreen}/>
    <Drawer.Screen name='User' component={UserNavigator}/>
    <Drawer.Screen name='Group' component={GroupNavigator}/>
  </Drawer.Navigator>
);
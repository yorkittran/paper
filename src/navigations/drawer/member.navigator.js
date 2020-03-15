import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as UIKittenDrawer, DrawerHeaderFooter, Icon, Button } from '@ui-kitten/components';
import GivenTaskNavigator from '../given-task.navigator';
import CreateTaskScreen from '../../scenes/Home/MyTask/CreateTask';

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

  const FileAddIcon = () => (
    <Icon name='file-add-outline'/>
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
 
  const drawerMyTask = [
    { title: 'Given Task', icon: FileTextIcon },
    { title: 'Create Task', icon: FileAddIcon },
  ];

  const onSelectMyTask = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <UIKittenDrawer
        data={drawerMyTask}
        header={HeaderMyTask}
        onSelect={onSelectMyTask}
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

export const MemberDrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} initialRouteName="GivenTask">
    <Drawer.Screen name='GivenTask' component={GivenTaskNavigator}/>
    <Drawer.Screen name='CreateTask' component={CreateTaskScreen}/>
  </Drawer.Navigator>
);
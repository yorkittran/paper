import React from 'react';
import { Icon, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';

export const ListTopNavigation = ({ navigation }) => {

  const createUser = () => {
    // console.log(navigation);
    navigation.navigate('Creating');
  }

  const PlusIcon = (style) => (
    <Icon {...style} name='plus'/>
  );

  const renderCreateAction = () => (
    <TopNavigationAction icon={PlusIcon} onPress={createUser}/>
  );

  return (
    <TopNavigation
      title='List User'
      alignment='center'
      rightControls={renderCreateAction()}
    />
  );
};
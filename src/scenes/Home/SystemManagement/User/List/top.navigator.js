import React from 'react';
import { Icon, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';

export const ListTopNavigation = ({ navigation }) => {

  const createUser = () => {
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
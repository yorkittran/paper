import React from 'react';
import { Icon, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';

export const ListTopNavigation = ({ navigation }) => {

  const onCreate = () => {
    navigation.navigate('Creating');
  }

  const PlusIcon = (style) => (
    <Icon {...style} name='plus'/>
  );

  const renderCreateAction = () => (
    <TopNavigationAction icon={PlusIcon} onPress={onCreate}/>
  );

  return (
    <TopNavigation
      title='List Group'
      alignment='center'
      rightControls={renderCreateAction()}
    />
  );
};
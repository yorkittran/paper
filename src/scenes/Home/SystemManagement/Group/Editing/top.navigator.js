import React from 'react';
import { Icon, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';

export const EditingTopNavigation = ({ navigation }) => {
  
  const BackIcon = (style) => (
    <Icon {...style} name='arrow-back'/>
  );
  
  const goBack = () => {
    navigation.goBack();
  }

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={goBack}/>
  );

  return (
    <TopNavigation
      title='Editing Group'
      alignment='center'
      leftControl={renderBackAction()}
    />
  );
};
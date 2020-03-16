import React from 'react';
import { Icon, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

export const EditingTopNavigation = ({ navigation }) => {

  const goBack = () => {
    navigation.goBack();
  }

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={goBack}/>
  );

  return (
    <TopNavigation
      title='Editing'
      alignment='center'
      leftControl={renderBackAction()}
    />
  );
};
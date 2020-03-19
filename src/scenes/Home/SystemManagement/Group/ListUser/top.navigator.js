import React from 'react';
import { Icon, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';

export const ListUserTopNavigation = ({ navigation, route }) => {

  const goBack = () => {
    navigation.goBack();
  }

  const onEdit = () => {
    navigation.navigate('Editing', { groupId: route.params.groupId });
  }

  const BackIcon = (style) => (
    <Icon {...style} name='arrow-back'/>
  );

  const EditIcon = (style) => (
    <Icon {...style} name='edit-2'/>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={goBack}/>
  );

  const renderEditAction = () => (
    <TopNavigationAction icon={EditIcon} onPress={onEdit}/>
  );

  return (
    <TopNavigation
      title='User in Group'
      alignment='center'
      leftControl={renderBackAction()}
      rightControls={renderEditAction()}
    />
  );
};
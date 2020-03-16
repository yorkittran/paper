import React from 'react';
import { Icon, OverflowMenu, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

const MenuIcon = (style) => (
  <Icon {...style} name='more-vertical'/>
);

const EditIcon = (style) => (
  <Icon {...style} name='edit-2'/>
);

const TrashIcon = (style) => (
  <Icon {...style} name='trash-2'/>
);

export const DetailTopNavigation = ({ navigation, route }) => {

  const [menuVisible, setMenuVisible] = React.useState(false);

  const menuData = [
    { title: 'Edit', icon: EditIcon },
    { title: 'Delete', icon: TrashIcon },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const goBack = () => {
    navigation.goBack();
  }

  const onMenuItemSelect = (index) => {
    if (index == 0) {
      // Edit
      navigation.navigate('Editing', { userId: route.params.userId });
    } else {
      // Delete
    }

    setMenuVisible(false);
  };

  const renderMenuAction = () => (
    <OverflowMenu
      visible={menuVisible}
      data={menuData}
      onSelect={onMenuItemSelect}
      onBackdropPress={toggleMenu}>
      <TopNavigationAction
        icon={MenuIcon}
        onPress={toggleMenu}
      />
    </OverflowMenu>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={goBack}/>
  );

  return (
    <TopNavigation
      title='User Detail'
      alignment='center'
      leftControl={renderBackAction()}
      rightControls={renderMenuAction()}
    />
  );
};
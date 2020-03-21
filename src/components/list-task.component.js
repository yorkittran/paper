import React from 'react';
import { List, ListItem, Icon } from '@ui-kitten/components';

export const PaperListStatus = ({ data, navigation }) => {

  const ForwardIcon = () => (
    <Icon name='arrow-ios-forward' width={20} height={20} fill='#8F9BB3'/>
  );

  const renderItem = ({ item }) => {
    switch (item.status) {
      case 'Pending Approval':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#B7771A'}}
            onPress={() => navigation.navigate('Detail', { taskId: item.id })}
            accessory={ForwardIcon}
          />
        );
      case 'Approved':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#42E5F7'}}
            onPress={() => navigation.navigate('Detail', { taskId: item.id })}
            accessory={ForwardIcon}
          />
        );
      case 'Rejected':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#FF4830'}}
            onPress={() => navigation.navigate('Detail', { taskId: item.id })}
            accessory={ForwardIcon}
          />
        );
      case 'Not Started':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#8F9BB3'}}
            onPress={() => navigation.navigate('Detail', { taskId: item.id })}
            accessory={ForwardIcon}
          />
        );
      case 'Ongoing':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#3366FF'}}
            onPress={() => navigation.navigate('Detail', { taskId: item.id })}
            accessory={ForwardIcon}
          />
        );
      case 'Committed':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#FFBB35'}}
            onPress={() => navigation.navigate('Detail', { taskId: item.id })}
            accessory={ForwardIcon}
          />
        );
      case 'Completed':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#1939B7'}}
            onPress={() => navigation.navigate('Detail', { taskId: item.id })}
            accessory={ForwardIcon}
          />
        );
      case 'Incompleted':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#218CB1'}}
            onPress={() => navigation.navigate('Detail', { taskId: item.id })}
            accessory={ForwardIcon}
          />
        );
      case 'Overdue':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#B7181F'}}
            onPress={() => navigation.navigate('Detail', { taskId: item.id })}
            accessory={ForwardIcon}
          />
        );
    }
  }

  return (
    <List 
      data={data}
      renderItem={renderItem}/>
  );
};
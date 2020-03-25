import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_NOTIFICATION } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { List, ListItem, Spinner, Layout, Text } from '@ui-kitten/components';

export default class NotificationScreen extends Component {  
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount = () => {
    this.FetchData();
  };

  FetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch(URL_NOTIFICATION, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        data: responseData.data,
        loading: false,
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  readNotification = async (id) => {
    const token = await AsyncStorage.getItem('token');
    fetch(URL_NOTIFICATION + '/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({is_read: '1'})
    }).catch((error) => {
      console.error(error);
    });
    this.FetchData();
  }

  Dot = () => (
    <Text category='h6' status='primary'>•</Text>
  )

  renderItem = ({ item }) => (
    item.is_read == '0'
    ?
    <ListItem
      title={item.title}
      description={item.content}
      icon={this.Dot}
      titleStyle={{ fontWeight: '900' }}
      onPress={() => this.readNotification(item.id)}
    />
    : 
    <ListItem
      title={item.title}
      description={item.content}
      onPress={() => this.readNotification(item.id)}
    />
  )

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <Spinner size='giant'/>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <PaperTopNavigation
          title='Notifications'
          leftIcon='menu'
          leftScreen='Drawer'
          {...this.props}/>
        <Layout style={styles.mainContainer}>
          <List data={this.state.data} renderItem={this.renderItem} />
        </Layout>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_NOTIFICATION } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { List, ListItem, Spinner, Layout } from '@ui-kitten/components';

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

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      description={item.content}
      // onPress={}
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
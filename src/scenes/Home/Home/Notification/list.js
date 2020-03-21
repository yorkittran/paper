import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_TASK_HANDOUT } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { Icon, Input, List, ListItem, Spinner, Layout, Text, Select } from '@ui-kitten/components';

export default class NotificationScreen extends Component {  
  
  constructor(props) {
    let statusSource = [
      { text: 'Not Started' },
      { text: 'Ongoing' },
      { text: 'Committed' }
    ];

    super(props);
    this.state = {
      loading: true,
      terms: '',
      status: statusSource,
    };
    this.statusSource = statusSource;
    this.dataSource = [];
  }

  componentDidMount = () => {
    this.FetchData();
  };

  FetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch(URL_TASK_HANDOUT, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState(
        {
          dataFiltered: responseData.data,
          loading: false,
        },() => {
          this.dataSource = responseData.data;
        }
      );
    }).catch((error) => {
      console.error(error);
    });
  }

  ForwardIcon = () => (
    <Icon name='arrow-ios-forward' width={20} height={20} fill='#8F9BB3'/>
  );

  renderItem = ({ item }) => {
    switch (item.status) {
      case 'Not Started':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            onPress={() => this.props.navigation.navigate('Detail', { taskId: item.id })}
            accessory={this.ForwardIcon}
          />
        );
      case 'Ongoing':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#3366FF'}}
            onPress={() => this.props.navigation.navigate('Detail', { taskId: item.id })}
            accessory={this.ForwardIcon}
          />
        );
      case 'Committed':
        return (
          <ListItem
            title={item.name}
            description={'• ' + item.status}
            descriptionStyle={{color: '#FFAA00'}}
            onPress={() => this.props.navigation.navigate('Detail', { taskId: item.id })}
            accessory={this.ForwardIcon}
          />
        );
    }
  }

  SearchIcon = () => (
    <Icon name='search-outline'/>
  )

  filtered = (terms, status) => {
    const dataFiltered = this.dataSource.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : '' . toUpperCase();
      const textData = terms.toUpperCase();
      return itemData.indexOf(textData) > -1 && status.findIndex(i => i.text === item.status) > -1;
    });

    this.setState({
      terms: terms,
      status: status,
      dataFiltered: dataFiltered,
    });
  };

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
          title='List Handout Task'
          leftIcon='menu'
          leftScreen='Drawer'
          {...this.props}/>
        <Layout style={styles.mainContainer}>
          <Select 
            placeholder='Select Status'
            data={this.statusSource} 
            multiSelect={true}
            size='small'
            selectedOption={this.state.status} 
            onSelect={status => this.filtered(this.state.terms, status)}
            style={styles.inputSearch}/>
          <Input
            value={this.state.terms}
            placeholder='Search...'
            icon={this.SearchIcon}
            size='large'
            autoCapitalize='none'
            onChangeText={terms => this.filtered(terms, this.state.status)}
            style={styles.inputSearch}/>
          <List data={this.state.dataFiltered} renderItem={this.renderItem} />
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
  inputSearch: {
    marginHorizontal: '5%',
    marginTop: '2%',
  },
});
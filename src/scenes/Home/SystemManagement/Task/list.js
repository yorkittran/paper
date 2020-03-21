import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_TASK } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { Icon, Input, Spinner, Layout, Select } from '@ui-kitten/components';
import { PaperListStatus } from '../../../../components/list-task.component';

export default class ListScreen extends Component {  
  
  constructor(props) {

    let statusSource = [
      { text: 'Pending Approval' },
      { text: 'Approved' },
      { text: 'Rejected' },
      { text: 'Not Started' },
      { text: 'Ongoing' },
      { text: 'Committed' },
      { text: 'Completed' },
      { text: 'Incompleted' },
      { text: 'Overdue' }
    ];

    super(props);
    this.state = {
      loading: true,
      terms: '',
      status: statusSource
    };
    this.statusSource = statusSource;
    this.dataSource = [];
  }

  componentDidMount = () => {
    this.FetchData();
  };

  FetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch(URL_TASK, {
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
            title='List Task'
            leftIcon='menu'
            leftScreen='Drawer'
            rightIcon='plus'
            rightScreen='Create'
            {...this.props}/>
          <Layout style={styles.mainContainer}>
            <Select 
              placeholder='Select Status'
              data={this.statusSource} 
              multiSelect={true}
              size='small'
              selectedOption={this.state.status} 
              onSelect={status => this.filtered(this.state.terms, status)}
              style={styles.inputFiltered}/>
            <Input
              value={this.state.terms}
              placeholder='Search...'
              icon={this.SearchIcon}
              size='large'
              autoCapitalize='none'
              onChangeText={terms => this.filtered(terms, this.state.status)}
              style={styles.inputFiltered}/>
            <PaperListStatus data={this.state.dataFiltered} navigation={this.props.navigation}/>
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
  inputFiltered: {
    marginHorizontal: '5%',
    marginTop: '2%',
  },
});
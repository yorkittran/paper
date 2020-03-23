import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_TASK, URL_USER } from '../../../../config/constants';
import { SafeAreaView, ScrollView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { Icon, Input, Spinner, Layout, Select, Datepicker, Autocomplete } from '@ui-kitten/components';
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
      loading       : true,
      assignee      : {title: ''},
      terms         : '',
      terms_assignee: '',
      status        : statusSource,
      start_date    : null,
      end_date      : null,
    };
    this.statusSource    = statusSource;
    this.dataSource      = [];
    this.assigneesSource = [];
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

    // Get users for autocomplete
    fetch(URL_USER, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      var users = [];
      if (responseData.data.length > 0) {
        responseData.data.forEach((user) => {
          users.push({
            value: user.id,
            title: user.name,
          });
        });
      }
      this.setState({
        assignees: users
      },() => {
        this.assigneesSource = users;
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  SearchIcon = () => (
    <Icon name='search-outline'/>
  )

  CalendarIcon = () => (
    <Icon name='calendar'/>
  );

  filtered = (assignee, terms, status, start_date, end_date) => {
    const dataFiltered = this.dataSource.filter(item => {
      let start_date_js = null;
      let end_date_js = null;
      if (item.start_at) {
        let start_timestamp = item.start_at.split(' ');
        start_date_js   = new Date(Date.parse(start_timestamp[0]));
      }
      if (item.end_at) {
        let end_timestamp = item.end_at.split(' ');
        end_date_js   = new Date(Date.parse(end_timestamp[0]));
      }
      const itemData = item.name ? item.name.toUpperCase() : '' . toUpperCase();
      const assigneeData = item.assignee ? item.assignee.toUpperCase() : '' . toUpperCase();

      let assignee_bool   = assigneeData.indexOf(assignee.title.toUpperCase()) > -1;
      let terms_bool      = itemData.indexOf(terms.toUpperCase()) > -1;
      let status_bool     = status.findIndex(i => i.text === item.status) > -1;
      let start_date_bool = start_date ? start_date_js.setHours(0,0,0,0) >= start_date : true;
      let end_date_bool   = end_date ? end_date_js.setHours(0,0,0,0) <= end_date : true;
      return assignee_bool && terms_bool && status_bool && start_date_bool && end_date_bool;
    });

    this.setState({
      terms_assignee: assignee.title,
      assignee      : assignee,
      terms         : terms,
      status        : status,
      start_date    : start_date,
      end_date      : end_date,
      dataFiltered  : dataFiltered,
    });
  };

  filteredAssignee = (terms) => {
    const dataFiltered = this.assigneesSource.filter(item => {
      const itemData = item.title ? item.title.toUpperCase() : '' . toUpperCase();
      return itemData.indexOf(terms.toUpperCase()) > -1;
    });

    this.setState({
      terms_assignee: terms,
      assigneesFiltered: dataFiltered,
    });

    if (terms == '') {
      this.filtered({title: ''}, this.state.terms, this.state.status, this.state.start_date, this.stateend_date)
    }
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Layout style={styles.mainContainer}>
            <Select 
              placeholder='Select Status'
              data={this.statusSource} 
              multiSelect={true}
              size='medium'
              selectedOption={this.state.status} 
              onSelect={status => this.filtered(this.state.assignee, this.state.terms, status, this.state.start_date, this.state.end_date)}
              style={styles.inputFiltered}/>
            <Layout style={{flexDirection: 'row', marginTop: '1%', justifyContent: 'space-between'}}>
              <Datepicker
                placeholder='From Date'
                size='medium'
                style={[styles.inputFiltered, {width: '45%' ,marginRight: '0%', paddingRight: '1%'}]}
                date={this.state.start_date}
                onSelect={start_date => this.filtered(this.state.assignee, this.state.terms, this.state.status, start_date, this.state.end_date)}
                icon={this.CalendarIcon}/>
              <Datepicker
                placeholder='To Date'
                size='medium'
                style={[styles.inputFiltered, {width: '45%', marginLeft: '0%', paddingLeft: '1%'}]}
                date={this.state.end_date}
                onSelect={end_date => this.filtered(this.state.assignee, this.state.terms, this.state.status, this.state.start_date, end_date)}
                icon={this.CalendarIcon}/>
            </Layout>
            <Autocomplete
              placeholder='Assignee'
              value={this.state.terms_assignee}
                size='medium'
                style={styles.inputFiltered}
              data={this.state.assigneesFiltered}
              onSelect={assignee => this.filtered(assignee, this.state.terms, this.state.status, this.state.start_date, this.state.end_date)}
              onChangeText={terms_assignee => this.filteredAssignee(terms_assignee)}/>
            <Input
              value={this.state.terms}
              size='medium'
              placeholder='Search...'
              icon={this.SearchIcon}
              autoCapitalize='none'
              onChangeText={terms => this.filtered(this.state.assignee, terms, this.state.status, this.state.start_date, this.state.end_date)}
              style={styles.inputFiltered}/>
            <PaperListStatus data={this.state.dataFiltered} navigation={this.props.navigation}/>
          </Layout>
        </ScrollView>
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
    marginVertical: '0.5%',
  },
});
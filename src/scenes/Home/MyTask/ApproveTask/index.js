import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_USER_GET_ALL_USERS_EXCEPT_SELF } from '../../../../config/constants';
import { } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView } from 'react-native';
import { Spinner, Layout, Button, Icon } from '@ui-kitten/components';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { PaperInput } from '../../../../components/input.component';
import { PaperSelect } from '../../../../components/select.component';
import { ModalWithIcon } from '../../../../components/modal.component';
import { PaperTimePicker } from '../../../../components/timepicker.component';

export default class ApproveTaskScreen extends Component {  

  constructor(props) {
    let current_datetime = new Date();
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes();

    super(props);
    this.state = {
      loading: true,
      visible: false,
      start_at: formatted_date,
      end_at: formatted_date,
      current_datetime: current_datetime,
    };
  }

  componentDidMount = () => AsyncStorage.getItem('token').then((token) => {
    // Get info of Groups
    fetch(URL_USER_GET_ALL_USERS_EXCEPT_SELF, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      var assignees = [];
      // Push members to select
      if (responseData.data.length > 0) {
        responseData.data.forEach((assignee) => {
          assignees.push({
            value: assignee.id,
            text : assignee.name,
          })
        });
      }
      this.setState({
        loading: false,
        assignees: assignees,
        selected_assignee: assignees[0],
      })
    }).catch((error) => {
      console.error(error);
    });
  });

  submitCreating = () => AsyncStorage.getItem('token').then((token) => {
    console.warn("hi", (this.state.start_at.getDate() + "-" + (this.state.start_at.getMonth() + 1) + "-" + this.state.start_at.getFullYear() + " " + this.state.start_at.getHours() + ":" + this.state.start_at.getMinutes()))
    // var data = {};
    // data.name = this.state.name;
    // data.manager_id = this.state.selected_manager.value;
    // data.selected_members = [];
    
    
    // fetch(URL_GROUP, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then((response) => response.json())
    // .then((responseData) => {
    //   if (responseData.hasOwnProperty('message')) {
    //     this.setState({
    //       message: responseData.message,
    //       visible: !this.state.visible,
    //       messageName: '',
    //     });
    //     if (responseData.hasOwnProperty('errors')) {
    //       this.setState({validation: false});
    //       responseData.errors.hasOwnProperty('name')
    //         ? this.setState({messageName: responseData.errors.name})
    //         : this.setState({messageName: ''})
    //     } else {
    //       this.setState({validation: true})
    //     }
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  });

  PlusIcon = (style) => (
    <Icon {...style} name='plus'/>
  );

  CalendarIcon = (style) => (
    <Icon {...style} name='calendar'/>
  );

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
        <ScrollView showsVerticalScrollIndicator={false}>
          <PaperTopNavigation
            title='Creating Task'
            leftIcon='menu'
            leftScreen='Drawer'
            {...this.props}
          />
          <ModalWithIcon 
            onPress={() => this.setState({visible: !this.state.visible})} 
            visible={this.state.visible}
            message={this.state.message}
            validation={this.state.validation}
            navigation={this.props.navigation}
          />
          <Layout style={styles.mainContainer}>
            <PaperInput 
              lable='Name' 
              placeholder='Name' 
              message={this.state.messageName} 
              value={this.state.name} 
              onChangeText={(text) => this.setState({name: text})}
            />
            <PaperInput 
              lable='Description' 
              placeholder='Description' 
              caption={this.state.messageDescription ?? ''} 
              multiline={true}
              value={this.state.description} 
              onChangeText={(text) => this.setState({description: text})}
            />
            <PaperTimePicker
              label='Start At'
              date={this.state.current_datetime}
              message={this.state.messageStartAt}
              value={this.state.start_at}
              onChange={(datetime) => this.setState({start_at: datetime})}
            />
            <PaperTimePicker
              label='End At'
              date={this.state.current_datetime}
              message={this.state.messageEndAt}
              value={this.state.end_at}
              onChange={(datetime) => this.setState({end_at: datetime})}
            />
            <PaperSelect 
              label='Assignee'
              placeholder='Select Assignee'
              data={this.state.assignees} 
              selectedOption={this.state.selected_assignee} 
              onSelect={(user) => this.setState({selected_assignee: user})}
            />
            <Button 
              style={styles.button} 
              size='large'
              status='success' 
              icon={this.PlusIcon} 
              onPress={this.submitCreating}
            >CREATE</Button>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

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
    margin: 40,
  },
  button: {
    paddingHorizontal: 40, 
    paddingVertical: 10, 
    marginTop: 20, 
    flexDirection: 'row-reverse'
  },
});
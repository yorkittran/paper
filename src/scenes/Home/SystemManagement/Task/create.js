import React, { Component } from 'react';
import { AsyncStorage, Image } from 'react-native';
import { URL_USER, URL_TASK } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Spinner, Layout, Button, Icon, Select } from '@ui-kitten/components';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { PaperInput } from '../../../../components/input.component';
import { PaperModal } from '../../../../components/modal.component';
import { PaperTimePicker } from '../../../../components/timepicker.component';

export default class CreateScreen extends Component {  

  constructor(props) {
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getFullYear() + "-" +
      ("0" + (current_datetime.getMonth()+1)).slice(-2) + "-" +
      ("0" + current_datetime.getDate()).slice(-2) + " " +
      ("0" + current_datetime.getHours()).slice(-2) + ":" +
      ("0" + current_datetime.getMinutes()).slice(-2) + ":00";

    super(props);
    this.state = {
      loading: true,
      visible: false,
      start_at: current_datetime,
      end_at: current_datetime,
      formatted_date: formatted_date,
    };
  }

  componentDidMount = () => AsyncStorage.getItem('token').then((token) => {
    // Get info of Groups
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

  setSelectedAssignee = (id) => {
    this.state.assignees.forEach((assignee, index) => {
      if (assignee.value == id) {
        this.setState({selected_assignee: this.state.assignees[index]});
      }
    })
  }

  scanQR = () => {
    this.props.navigation.navigate('Scan', { callback: this.setSelectedAssignee.bind(this), screen: 'Create' });
  }
  
  submitCreating = () => AsyncStorage.getItem('token').then((token) => {
    var data             = {};
        data.name        = this.state.name;
        data.description = this.state.description;
        data.assignee_id = this.state.selected_assignee.value;
    
    var start = this.state.start_at;
    var end   = this.state.end_at;
    data.start_at =
      start.getFullYear() + "-" +
      ("0" + (start.getMonth()+1)).slice(-2) + "-" +
      ("0" + start.getDate()).slice(-2) + " " +
      ("0" + start.getHours()).slice(-2) + ":" +
      ("0" + start.getMinutes()).slice(-2) + ":00";
    data.end_at = 
      end.getFullYear() + "-" +
      ("0" + (end.getMonth()+1)).slice(-2) + "-" +
      ("0" + end.getDate()).slice(-2) + " " +
      ("0" + end.getHours()).slice(-2) + ":" +
      ("0" + end.getMinutes()).slice(-2) + ":00";

    fetch(URL_TASK, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.hasOwnProperty('message')) {
        this.setState({
          message: responseData.message,
          visible: !this.state.visible,
        });
        if (responseData.hasOwnProperty('errors')) {
          this.setState({validation: false});
          responseData.errors.hasOwnProperty('name')
            ? this.setState({messageName: responseData.errors.name})
            : this.setState({messageName: ''})
          responseData.errors.hasOwnProperty('description')
            ? this.setState({messageDescription: responseData.errors.description})
            : this.setState({messageDescription: ''})
        } else {
          this.setState({
            validation : true,
          })
        }
      }
    }).catch((error) => {
      console.error(error);
    });
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
        <PaperTopNavigation
          title='Create Task'
          leftIcon='arrow-back'
          leftScreen='Back'
          {...this.props}
        />
        <PaperModal 
          onPress={() => this.setState({visible: !this.state.visible})} 
          visible={this.state.visible}
          message={this.state.message}
          validation={this.state.validation}
          navigation={this.props.navigation}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
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
              message={this.state.messageDescription} 
              multiline={true}
              value={this.state.description} 
              onChangeText={(text) => this.setState({description: text})}
            />
            <PaperTimePicker
              label='Start At'
              date={this.state.start_at}
              message={this.state.messageStartAt}
              value={this.state.formatted_date}
              onChange={(datetime) => this.setState({start_at: datetime})}
            />
            <PaperTimePicker
              label='End At'
              date={this.state.end_at}
              message={this.state.messageEndAt}
              value={this.state.formatted_date}
              onChange={(datetime) => this.setState({end_at: datetime})}
            />
            <Layout style={{flexDirection: 'row'}}>
              <Select 
                label='Assignee'
                placeholder='Select Assignee'
                data={this.state.assignees} 
                selectedOption={this.state.selected_assignee} 
                onSelect={(user) => this.setState({selected_assignee: user})}
                style={{marginRight: 20, flexDirection: 'column', flex: 1}}
              />
              <TouchableOpacity onPress={this.scanQR} style={{marginTop: 15}}>
                <Image source={require('../../../../assets/qrcodescan.png')} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
            </Layout>
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
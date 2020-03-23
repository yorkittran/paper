import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_TASK, URL_TASK_UPDATE, URL_USER } from '../../../../config/constants';
import { } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView } from 'react-native';
import { Spinner, Layout, Button, Icon, Select } from '@ui-kitten/components';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { PaperInput } from '../../../../components/input.component';
import { PaperModal } from '../../../../components/modal.component';
import { PaperTimePicker } from '../../../../components/timepicker.component';

export default class EditScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
    };
  }

  componentDidMount = () => AsyncStorage.getItem('token').then((token) => {
    // Get Task
    fetch(URL_TASK + "/" + this.props.route.params.taskId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      let start_timestamp = responseData.data.start_at.split(/[- :]/);
      let end_timestamp = responseData.data.end_at.split(/[- :]/);

      let start_at = new Date(Date.UTC(start_timestamp[0], start_timestamp[1]-1, start_timestamp[2], start_timestamp[3], start_timestamp[4], start_timestamp[5]));
      let end_at = new Date(Date.UTC(end_timestamp[0], end_timestamp[1]-1, end_timestamp[2], end_timestamp[3], end_timestamp[4], end_timestamp[5]));

      this.setState({
        name           : responseData.data.name,
        description    : responseData.data.description_assigned,
        start_at       : new Date(start_at.setHours(start_at.getHours() - 7)),
        end_at         : new Date(end_at.setHours(end_at.getHours() - 7)),
        formatted_start: responseData.data.start_at,
        formatted_end  : responseData.data.end_at,
        assignee       : responseData.data.assignee,
      })
    }).catch((error) => {
      console.error(error);
    });

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
      var assignee_index = 0;
      // Push members to select
      if (responseData.data.length > 0) {
        responseData.data.forEach((assignee, index) => {
          assignees.push({
            value: assignee.id,
            text : assignee.name,
          })
          if (assignee.name == this.state.assignee) {
            assignee_index = index;
          }
        });
      }
      this.setState({
        loading: false,
        assignees: assignees,
        selected_assignee: assignees[assignee_index],
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
    this.props.navigation.navigate('Scan', { callback: this.setSelectedAssignee.bind(this), screen: 'Edit' });
  }
  
  submitEditing = () => AsyncStorage.getItem('token').then((token) => {
    var data = {};
    data.name = this.state.name;
    data.description_assigned = this.state.description;
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

    fetch(URL_TASK_UPDATE + "/" + this.props.route.params.taskId, {
      method: 'PUT',
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
          responseData.errors.hasOwnProperty('description_assigned')
            ? this.setState({messageDescription: responseData.errors.description_assigned})
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

  EditIcon = (style) => (
    <Icon {...style} name='edit-2'/>
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
          title='Edit Task'
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
              lable='Description' end_date
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
              value={this.state.formatted_start}
              onChange={(datetime) => this.setState({start_at: datetime})}
            />
            <PaperTimePicker
              label='End At'
              date={this.state.end_at}
              message={this.state.messageEndAt}
              value={this.state.formatted_end}
              onChange={(datetime) => this.setState({end_at: datetime})}
            />
            <Layout style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Select 
                label='Assignee'
                placeholder='Select Assignee'
                data={this.state.assignees} 
                selectedOption={this.state.selected_assignee} 
                onSelect={(user) => this.setState({selected_assignee: user})}
                style={{marginRight: 20, flexDirection: 'column', flex: 1}}
              />
              <Icon name='grid-outline' width={50} height={50} fill='#5670A1' style={{flexDirection: 'column'}} onPress={this.scanQR}/>
            </Layout>
            <Button 
              style={styles.button} 
              size='large'
              status='info' 
              icon={this.EditIcon} 
              onPress={this.submitEditing}
            >EDIT</Button>
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
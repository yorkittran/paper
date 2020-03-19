import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_GROUP, URL_USER_LIST_OF_MANAGERS_AVAILABLED, URL_USER_LIST_OF_MEMBERS_AVAILABLED } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Spinner, Layout, Button, Icon } from '@ui-kitten/components';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { PaperInput } from '../../../../components/input.component';
import { PaperSelect } from '../../../../components/select.component';
import { ModalWithIcon } from '../../../../components/modal.component';

export default class EditingScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
    };
  }

  componentDidMount = () => {
    this.FetchData();
  };

  FetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    var list_managers = [];
    var list_members  = [];

    // Get info of Group
    fetch(URL_GROUP + '/' + this.props.route.params.groupId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      // Push manager to select
      list_managers.push({
        value: responseData.data.manager_id,
        text : responseData.data.manager_name,
      });
      // Push members to select
      if (responseData.data.users_in_group.length > 0) {
        responseData.data.users_in_group.forEach((member) => {
          list_members.push({
            value: member.id,
            text : member.name,
          })
        });
      }
      var selected_members = list_members;
      this.setState({
        name            : responseData.data.name,
        list_managers   : list_managers,
        list_members    : list_members,
        selected_manager: list_managers[0],
        selected_members: selected_members,
      });
    }).catch((error) => {
      console.error(error);
    });

    // Get list of manager not manage any group
    fetch(URL_USER_LIST_OF_MANAGERS_AVAILABLED, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      // Push manager not manage any group to select
      if (responseData.data.length > 0) {
        responseData.data.forEach((manager) => {
          list_managers.push({
            value: manager.id,
            text : manager.name,
          });
        });
      }
      this.setState({list_managers: list_managers});
    }).catch((error) => {
      console.error(error);
    });

    // Get list of member not belong to any group
    fetch(URL_USER_LIST_OF_MEMBERS_AVAILABLED, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      // Push member not belong to any group to select
      var members_availabled = [];
      if (responseData.data.length > 0) {
        responseData.data.forEach((member) => {
          members_availabled.push({
            value: member.id,
            text : member.name,
          });
        });
      }
      this.setState({
        list_members: list_members.concat(members_availabled),
        loading: false,
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  submitEditing = () => AsyncStorage.getItem('token').then((token) => {
    var data = {};
    data.name = this.state.name;
    data.manager_id = this.state.selected_manager.value;
    data.selected_members = [];
    this.state.selected_members.forEach((member) => {
      data.selected_members.push(member.value);
    });
    
    fetch(URL_GROUP + '/' + this.props.route.params.groupId, {
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
          messageName: '',
        });
        if (responseData.hasOwnProperty('errors')) {
          this.setState({validation: false});
          responseData.errors.hasOwnProperty('name')
            ? this.setState({messageName: responseData.errors.name})
            : this.setState({messageName: ''})
        } else {
          this.setState({validation: true})
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  });

  EditIcon = (style) => (
    <Icon {...style} name='edit-2'/>
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
          title='Editing Group'
          leftIcon='arrow-back'
          leftScreen='Back'
          {...this.props}/>
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
            onChangeText={(text) => this.setState({name: text})}/>
          <PaperSelect 
            label='Managed by'
            placeholder='Select Manager'
            data={this.state.list_managers} 
            selectedOption={this.state.selected_manager} 
            onSelect={(selected_manager) => this.setState({selected_manager: selected_manager})}/>
          <PaperSelect 
            label='Member in group'
            placeholder='Select Member'
            data={this.state.list_members} 
            multiSelect={true}
            selectedOption={this.state.selected_members} 
            onSelect={(selected_members) => this.setState({selected_members: selected_members})}/>
          <Button 
            style={styles.button} 
            size='large'
            status='info' 
            icon={this.EditIcon} 
            onPress={this.submitEditing}
          >EDIT</Button>
        </Layout>
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
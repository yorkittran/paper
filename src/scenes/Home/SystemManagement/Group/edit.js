import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_GROUP, URL_USER_MEMBERS } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Spinner, Layout, Button, Icon, Input } from '@ui-kitten/components';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { PaperInput } from '../../../../components/input.component';
import { PaperSelect } from '../../../../components/select.component';
import { PaperModal } from '../../../../components/modal.component';

export default class EditScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
    };
    this.list_members = [];
  }

  componentDidMount = () => {
    this.FetchData();
  };

  FetchData = async () => {
    const token              = await AsyncStorage.getItem('token');
    var   members_selected   = [];
    var   members_availabled = [];

    // Get info of Group
    await fetch(URL_GROUP + '/' + this.props.route.params.groupId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      // Push members to select
      if (responseData.data.users_in_group.length > 0) {
        responseData.data.users_in_group.forEach(member => {
          members_selected.push({
            value: member.id,
            text : member.name,
          })
        });
      }
      this.setState({
        name   : responseData.data.name,
        manager: responseData.data.manager_name,
        selected_members: members_selected,
      });
    }).catch((error) => {
      console.error(error);
    });

    // Get list of member not belong to any group
    await fetch(URL_USER_MEMBERS, {
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
      if (responseData.data.length > 0) {
        responseData.data.forEach((member) => {
          members_availabled.push({
            value: member.id,
            text : member.name,
          });
        });
      }
      this.setState({ 
        loading: false,
        list_members: members_selected.concat(members_availabled),
      })
    }).catch((error) => {
      console.error(error);
    });
  }

  submitEditing = () => AsyncStorage.getItem('token').then((token) => {
    var data                  = {};
        data.name             = this.state.name;
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
      console.log(responseData)
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
          console.log('success')
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
          title='Edit Group'
          leftIcon='arrow-back'
          leftScreen='Back'
          {...this.props}/>
        <PaperModal 
          onPress={() => this.setState({visible: !this.state.visible})} 
          visible={this.state.visible}
          message={this.state.message}
          validation={this.state.validation}
          navigation={this.props.navigation}
          title='Back to List'
        />
        <Layout style={styles.mainContainer}>
          <PaperInput 
            lable='Name' 
            placeholder='Name' 
            message={this.state.messageName} 
            value={this.state.name} 
            onChangeText={(text) => this.setState({name: text})}/>
          <Input 
            label='Managed by'
            value={this.state.manager} 
            disabled={true}
            style={{marginBottom: 10}}/>
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
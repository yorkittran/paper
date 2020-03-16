import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_USER, ADMIN, MANAGER, MEMBER, ADMIN_VALUE, MANAGER_VALUE, MEMBER_VALUE } from '../../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Spinner, Layout, Button, Icon } from '@ui-kitten/components';
import { CreatingTopNavigation } from './top.navigator';
import { InputWithCaption } from '../../../../../components/input.component';
import { ModalWithIcon } from '../../../../../components/modal.component';
import { SelectRole } from '../../../../../components/select.component';

export default class EditingScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
    };
  }

  componentDidMount = () => {
    this.setState({loading: false})
  }

  submitCreating = () => AsyncStorage.getItem('token').then((token) => {
    var data = {};
    data.role = this.state.role.value;
    data.name = this.state.name;
    data.email = this.state.email;
    data.password = this.state.password;
    data.password_confirmation = this.state.password_confirmation;
    fetch(URL_USER, {
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
          messageName: '',
          messageEmail: '',
          messagePassword: '', 
          messageConfirmPassword: ''
        });
        if (responseData.hasOwnProperty('errors')) {
          this.setState({validation: false});
          responseData.errors.hasOwnProperty('name')
            ? this.setState({messageName: responseData.errors.name})
            : this.setState({messageName: ''})
          responseData.errors.hasOwnProperty('email')
            ? this.setState({messageEmail: responseData.errors.email})
            : this.setState({messageEmail: ''})
          responseData.errors.hasOwnProperty('password')
            ? responseData.errors.password.forEach((item) => {
              item.indexOf('confirm') > -1
                ? this.setState({messageConfirmPassword: item})
                : this.setState({messagePassword: item});
            })
            : this.setState({messagePassword: '', messageConfirmPassword: ''})
        } else {
          this.setState({validation: true})
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  });

  PlusIcon = (style) => (
    <Icon {...style} name='plus'/>
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
        <CreatingTopNavigation {...this.props}/>
        <ModalWithIcon 
          onPress={() => this.setState({visible: !this.state.visible})} 
          visible={this.state.visible}
          message={this.state.message}
          validation={this.state.validation}
          navigation={this.props.navigation}
        />
        <Layout style={styles.mainContainer}>
          <SelectRole 
            label='Role'
            placeholder='Select Role'
            data={[{ text: ADMIN, value: ADMIN_VALUE },{ text: MANAGER, value: MANAGER_VALUE },{ text: MEMBER, value: MEMBER_VALUE }]} 
            selectedOption={this.state.role} 
            onSelect={(role) => this.setState({role: role})}/>
          <InputWithCaption 
            lable='Name' 
            placeholder='Name' 
            message={this.state.messageName} 
            value={this.state.name} 
            onChangeText={(text) => this.setState({name: text})}/>
          <InputWithCaption 
            lable='Email' 
            placeholder='Email' 
            message={this.state.messageEmail} 
            value={this.state.email} 
            onChangeText={(text) => this.setState({email: text})}/>
          <InputWithCaption 
            lable='Password' 
            placeholder='Password' 
            message={this.state.messagePassword} 
            parentSecureTextEntry={true} 
            onChangeText={(text) => this.setState({password: text})}/>
          <InputWithCaption 
            lable='Confirm Password' 
            placeholder='Confirm Password' 
            message={this.state.messageConfirmPassword} 
            parentSecureTextEntry={true} 
            onChangeText={(text) => this.setState({password_confirmation: text})}/>
          <Button 
            style={styles.btnCreate} 
            size='large'
            status='success' 
            icon={this.PlusIcon} 
            onPress={this.submitCreating}
          >CREATE</Button>
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
  btnCreate: {
    paddingHorizontal: 40, 
    paddingVertical: 10, 
    marginTop: 20, 
    flexDirection: 'row-reverse'
  }
});
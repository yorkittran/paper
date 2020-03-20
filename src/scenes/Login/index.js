import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_LOGIN } from '../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import { Actions } from 'react-native-router-flux';
import { PaperInput } from '../../components/input.component';
import { PaperModal } from '../../components/modal.component';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@admin.mail',
      password: '123456',
      message: '',
      secureTextEntry: true,
      visible: false,
      propsInputEmail: {},
      propsInputPassword: {},
    };
  }
  
  EyeIcon = () => {
    return (
      <Icon name={this.state.secureTextEntry ? 'eye-off' : 'eye'}/>
    )
  }

  LoginIcon = () => (
    <Icon name='log-in-outline' fill='#FFFFFF'/>
  );

  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  }

  storeRole = async (role) => {
    try {
      await AsyncStorage.setItem('role', role);
    } catch (error) {
      console.error(error);
    }
  }

  onLogin = () => {
    var data = {};
    data.email = this.state.email;
    data.password = this.state.password;

    fetch(URL_LOGIN, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
          this.setState({});
          responseData.errors.hasOwnProperty('email')
            ? this.setState({messageEmail: responseData.errors.email})
            : this.setState({messageEmail: ''})
          responseData.errors.hasOwnProperty('password')
            ? this.setState({messagePassword: responseData.errors.password})
            : this.setState({messagePassword: ''})
        }
      }
      if (responseData.hasOwnProperty('token')) {
        this.storeToken(responseData.token)
        this.storeRole(responseData.role);
        Actions.home();
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  onChangeTextEmail = (email) => {
    this.setState({email: email});
    if (email.length > 0) {
      this.setState({propsInputEmail: {}});
    }
  };

  onChangeTextPassword = (password) => {
    this.setState({password: password});
    if (password.length > 0) {
      this.setState({propsInputPassword: {}});
    }
  };

  render () {
    return (
    <SafeAreaView style={styles.mainContainer}>
      <PaperModal 
        onPress={() => this.setState({visible: !this.state.visible})} 
        visible={this.state.visible}
        message={this.state.message}
        validation={this.state.validation}
        title='Back to List'
      />
      <Layout style={styles.container}>
        <Icon name='paper-plane-outline' width={100} height={100} fill='#151A30' style={{marginBottom: 10}}/>
        <Text category='h1' style={{marginBottom: 30, color: '#151A30'}}>Log in to Paper</Text>
        <PaperInput 
          lable='Email' 
          placeholder='Email' 
          message={this.state.messageEmail} 
          value={this.state.email} 
          onChangeText={(text) => this.setState({email: text})}/>
        <PaperInput 
          lable='Password' 
          placeholder='Password' 
          message={this.state.messagePassword}
          value={this.state.password} 
          parentSecureTextEntry={true} 
          onChangeText={(text) => this.setState({password: text})}/>
        <Button 
          style={styles.button} 
          size='large'
          status='primary'
          icon={this.LoginIcon} 
          onPress={this.onLogin}>LOGIN</Button>
      </Layout>
    </SafeAreaView>
    )
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 40
  },
  container: {
    alignItems: 'center',
    marginBottom: 30
  },
  button: {
    paddingHorizontal: 40, 
    paddingVertical: 10, 
    marginTop: 20, 
    flexDirection: 'row-reverse'
  },
});
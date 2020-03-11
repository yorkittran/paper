import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions } from 'react-native';
import { Layout, Text, Modal, Icon, Input, Button } from '@ui-kitten/components';
import { Actions } from 'react-native-router-flux';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      secureTextEntry: true,
      visible: false,
      propsInputEmail: {},
      propsInputPassword: {},
    };
  }

  onIconPress = () => {
    this.setState({secureTextEntry: !this.state.secureTextEntry});
  };

  renderIcon = () => {
    return (
      <Icon name={this.state.secureTextEntry ? 'eye-off' : 'eye'}/>
    )
  }

  onLogin = () => {
    var data = {};
    data.email = this.state.email;
    data.password = this.state.password;

    fetch("http://34.239.119.82:231/api/login", {
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
        if (responseData.hasOwnProperty('errors')) {
          if (responseData.errors.hasOwnProperty('email')) {
            this.setState({
              propsInputEmail: {
                status: 'danger',
                caption: responseData.errors.email
              }
            });
          }
          if (responseData.errors.hasOwnProperty('password')) {
            this.setState({
              propsInputPassword: {
                status: 'danger',
                caption: responseData.errors.password
              }
            });
          }
        }
        this.setState({message: responseData.message});
        this.toggleModal();
      }
      if (responseData.hasOwnProperty('api_token')) {
        console.log('ok');
        Actions.home();
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  toggleModal = () => {
    this.setState({visible: !this.state.visible});
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
      <Modal
        onBackdropPress={this.toggleModal}
        visible={this.state.visible}>
        <Layout style={styles.modalContainer}>
          <Icon name={'heart'}></Icon>
          <Text category='s1' style={{color: '#FFFFFF'}}>{this.state.message}</Text>
        </Layout>
      </Modal>
      <Layout style={styles.container}>
        <Text category='h1' style={{marginBottom: 30}}>Log in to Paper</Text>
        <Input
          label='Email'
          placeholder='Email'
          value={this.state.email}
          onChangeText={(email) => this.onChangeTextEmail(email)}
          style={styles.input}
          autoCapitalize='none'
          {...this.state.propsInputEmail}
        />
        <Input
          label='Password'
          placeholder='Password'
          value={this.state.password}
          onChangeText={(password) => this.onChangeTextPassword(password)}
          style={styles.input}
          icon={this.renderIcon}
          secureTextEntry={this.state.secureTextEntry}
          onIconPress={this.onIconPress}
          {...this.state.propsInputPassword}
        />
        <Button onPress={this.onLogin} status='primary' style={styles.button}>Login</Button>
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
  },
  container: {
    alignItems: 'center',
    marginBottom: 30
  },
  input: {
    paddingHorizontal: 40,
    marginBottom: 10,
    width: width,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginTop: 20,
  },
  modalContainer: {
    position: 'relative',
    width: width,
    padding: 20,
    top: -height/2+55,
    backgroundColor: '#DB282C',
  },
});
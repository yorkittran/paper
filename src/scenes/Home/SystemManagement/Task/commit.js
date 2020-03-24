import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { AsyncStorage, Image } from 'react-native';
import { URL_TASK_COMMIT } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Button, Icon, Text } from '@ui-kitten/components';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { PaperInput } from '../../../../components/input.component';
import { PaperModal } from '../../../../components/modal.component';

export default class CommitScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      image: null,
    };
  }

  componentDidMount = () => {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  submitCommitting = () => AsyncStorage.getItem('token').then((token) => {
    var data                = {};
        data.commit_message = this.state.commit_message;
        data.attached_file  = this.state.image;

    fetch(URL_TASK_COMMIT + '/' + this.props.route.params.taskId, {
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
          responseData.errors.hasOwnProperty('commit_message')
            ? this.setState({messageCommitted: responseData.errors.name})
            : this.setState({messageCommitted: ''})
          responseData.errors.hasOwnProperty('attached_file')
            ? this.setState({messageFile: responseData.errors.description})
            : this.setState({messageFile: ''})
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

  ArrowHeadIcon = (style) => (
    <Icon {...style} name='arrowhead-up'/>
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <PaperTopNavigation
          title='Commit Task'
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
              lable='Commit Message' 
              placeholder='Commit Message' 
              message={this.state.messageCommitted} 
              multiline={true}
              value={this.state.commit_message} 
              onChangeText={(text) => this.setState({commit_message: text})}
            />
            <Text category='label' style={{color: '#8F9BB3', marginBottom: '2%'}}>Evidence</Text>
            {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: '100%', height: '100%' }} />}
            <Button 
              style={styles.button} 
              size='small'
              status={this.state.image ? 'basic' : 'info'}
              appearance='outline' 
              onPress={this.pickImage}
              >{this.state.image ? 'Change Image' : 'Upload Image'}</Button>
            <Button 
              style={styles.button} 
              size='large'
              status='warning' 
              icon={this.ArrowHeadIcon} 
              onPress={this.submitCommitting}
            >COMMIT</Button>
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
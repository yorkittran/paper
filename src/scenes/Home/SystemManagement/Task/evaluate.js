import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_TASK_EVALUATE } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Button, Icon, RadioGroup, Radio, Select } from '@ui-kitten/components';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { PaperInput } from '../../../../components/input.component';
import { PaperModal } from '../../../../components/modal.component';

export default class EvaluateScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      mark: {text: 'Average', value: '3'},
      status: 0,
    };
    this.markSource = [
      {text: 'Very Bad', value: '1'},
      {text: 'Bad', value: '2'},
      {text: 'Average', value: '3'},
      {text: 'Mostly Cover', value: '4'},
      {text: 'Excellent', value: '5'},
    ]
  }

  submitEvaluating = () => AsyncStorage.getItem('token').then((token) => {
    var data         = {};
        data.comment = this.state.comment;
        data.mark    = this.state.mark;
        data.status  = this.state.status;
    
    fetch(URL_TASK_EVALUATE, {
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

  DoneIcon = (style) => (
    <Icon {...style} name='done-all'/>
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <PaperTopNavigation
          title='Evaluate Task'
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
              lable='Comment' 
              placeholder='Comment' 
              message={this.state.messageComment} 
              multiline={true}
              value={this.state.comment} 
              onChangeText={(text) => this.setState({comment: text})}
            />
            <Select 
              label='Mark'
              data={this.markSource} 
              selectedOption={this.state.mark} 
              onSelect={(mark) => this.setState({mark: mark})}
              style={{marginBottom: 10}}/>
            <RadioGroup
              selectedIndex={this.state.status}
              onChange={status => this.setState({status: status})}>
              <Radio status='success' text='Completed' checked={true}/>
              <Radio status='danger' text='Incompleted'/>
            </RadioGroup>
            <Button 
              style={styles.button} 
              size='large'
              status='primary' 
              icon={this.DoneIcon} 
              onPress={this.submitEvaluating}
            >EVALUATE</Button>
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
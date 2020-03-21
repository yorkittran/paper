import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_TASK } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Card, Text, Spinner, Layout, Button } from '@ui-kitten/components';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';

export default class DetailScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
    };
  }

  componentDidMount = () => AsyncStorage.getItem('token').then((token) => {
    fetch(URL_TASK + '/' + this.props.route.params.taskId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        loading: false,
        data: responseData.data,
      });
    }).catch((error) => {
      console.error(error);
    });
  });

  Header = () => (
    <Layout style={{marginVertical: 20, alignItems: 'center'}}>
      <Text category='h5'>{this.state.data.name}</Text>
    </Layout>
  );

  Footer = () => (
    <Layout style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Button style={{marginHorizontal: 4}} size='small' status='danger'>REJECT</Button>
      <Button style={{marginHorizontal: 4}} size='small' status='success'>APPROVE</Button>
    </Layout>
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
          title='Task Detail'
          leftIcon='arrow-back'
          leftScreen='Back'
          {...this.props}/>
        <Layout style={styles.mainContainer}>
          <Card header={this.Header} footer={this.Footer}>
            <Layout style={{minHeight: 180, justifyContent: 'center'}}>
              <Layout style={styles.textRow}>
                <Text style={styles.label}>NAME</Text>
                <Text style={styles.text}>{this.state.data.name}</Text>
              </Layout>
              <Layout style={styles.textRow}>
                <Text style={styles.label}>START AT</Text>
                <Text style={styles.text}>{this.state.data.start_at}</Text>
              </Layout>
              <Layout style={styles.textRow}>
                <Text style={styles.label}>END AT</Text>
                <Text style={styles.text}>{this.state.data.end_at}</Text>
              </Layout>
              <Layout style={styles.textRow}>
                <Text style={styles.label}>DESCRIPTION</Text>
                <Text style={styles.text}>{this.state.data.description_assigned}</Text>
              </Layout>
              <Layout style={styles.textRow}>
                <Text style={styles.label}>ASSIGNEE</Text>
                <Text style={styles.text}>{this.state.data.assignee}</Text>
              </Layout>
            </Layout>
          </Card>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRow: {
    flexDirection: 'row', 
    marginVertical: 5
  },
  label: {
    width: '40%', 
    fontSize: 15, 
    fontWeight: '800'
  },
  text: {
    width: '55%', 
    fontSize: 15
  },
});
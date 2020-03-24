import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_PROFILE } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Card, Text, Spinner, Layout } from '@ui-kitten/components';
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
    fetch(URL_PROFILE, {
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
    <Layout style={styles.cardHeader}>
      <QRCode value={"" + this.state.data.id} size={200}/>
    </Layout>
  );

  GroupName = () => {
    if (this.state.data.in_group_name) {
      return(
        <Layout style={styles.textRow}>
          <Text style={styles.label}>MEMBER IN</Text>
          <Text style={styles.text}>{this.state.data.in_group_name}</Text>
        </Layout>
      )
    } else if (this.state.data.manage_group_name) {
      return(
        <Layout style={styles.textRow}>
          <Text style={styles.label}>MANAGE</Text>
          <Text style={styles.text}>{this.state.data.manage_group_name}</Text>
        </Layout>
      )
    }
  }

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
          title='Profile'
          leftIcon='menu'
          leftScreen='Drawer'
          {...this.props}/>
        <Layout style={styles.mainContainer}>
          <Card header={this.Header} footer={this.Footer}>
            <Layout style={{justifyContent: 'center'}}>
              <Layout style={styles.textRow}>
                <Text style={styles.label}>NAME</Text>
                <Text style={styles.text}>{this.state.data.name}</Text>
              </Layout>
              <Layout style={styles.textRow}>
                <Text style={styles.label}>EMAIL</Text>
                <Text style={styles.text}>{this.state.data.email}</Text>
              </Layout>
              <Layout style={styles.textRow}>
                <Text style={styles.label}>ROLE</Text>
                <Text style={styles.text}>{this.state.data.role}</Text>
              </Layout>
              {this.GroupName()}
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
  cardHeader: {
    marginVertical: 30,
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
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_USER } from '../../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Card, Text, Spinner, Layout } from '@ui-kitten/components';

export default class DetailScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
    };
  }

  componentDidMount = () => AsyncStorage.getItem('token').then((token) => {
    fetch(URL_USER + '/' + this.props.route.params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(URL_USER + '/' + this.props.route.params.userId);
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
      <QRCode value={URL_USER + '/' + this.props.route.params.userId}/>
    </Layout>
  );

  GroupName = () => {
    if (this.state.data.in_group_name) {
      return <Text category='label' style={styles.label}>MEMBER IN   <Text style={styles.text}>{this.state.data.in_group_name}</Text></Text>;
    } else if (this.state.data.manage_group_name) {
      return <Text category='label' style={styles.label}>MANAGE         <Text style={styles.text}>{this.state.data.manage_group_name}</Text></Text>;
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
      <SafeAreaView style={styles.mainContainer}>
        <Card header={this.Header}>
          <Text category='label' style={styles.label}>NAME                <Text style={styles.text}>{this.state.data.name}</Text></Text>
          <Text category='label' style={styles.label}>EMAIL               <Text style={styles.text}>{this.state.data.email}</Text></Text>
          <Text category='label' style={styles.label}>ROLE                 <Text style={styles.text}>{this.state.data.role}</Text></Text>
          {this.GroupName()}
        </Card>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: {
    marginVertical: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    padding: 5,
  },
  text: {
    fontSize: 16,
  }
});
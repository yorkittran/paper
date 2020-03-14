import React, { Component } from 'react';
import { USER_API } from '../../../../../config/constants';
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
    this.userId = this.props.route.params.userId;
  }

  componentDidMount() {
    fetch(USER_API + '/' + this.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
  }

  Header = () => (
    <Layout style={styles.cardHeader}>
      <QRCode value={USER_API + '/' + this.userId}/>
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
      <SafeAreaView style={styles.mainContainer}>
        <Card header={this.Header}>
          <Text category='label' style={styles.label}>NAME     <Text style={styles.text}>{this.state.data.name}</Text></Text>
          <Text category='label' style={styles.label}>EMAIL    <Text style={styles.text}>{this.state.data.email}</Text></Text>
          <Text category='label' style={styles.label}>ROLE      <Text style={styles.text}>{this.state.data.role}</Text></Text>
          <Text category='label' style={styles.label}>GROUP  <Text style={styles.text}>{this.state.data.in_group_name}</Text></Text>
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
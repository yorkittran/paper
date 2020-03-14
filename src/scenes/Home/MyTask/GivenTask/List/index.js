import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Layout, Text, Modal, Icon, Input, Button, List, ListItem } from '@ui-kitten/components';

export default class ListScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: '',
    };
  }

  componentDidMount() {
    fetch("http://34.239.119.82:231/api/group/2", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({data: responseData.data});
    }).catch((error) => {
      console.error(error);
    });
  }

  detailUser = () => (
    <Button onPress={() => this.props.navigation.navigate('Detail')}>Detail</Button>
  );

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      description={item.email}
      accessory={this.detailUser}
    />
  );

  renderSearchIcon = () => (
    <Icon name='search-outline'/>
  )

  onChangeTextSearch = (search) => {
    this.setState({search: search});
    fetch("http://34.239.119.82:231/api/group/1?search=" + this.state.search, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({data: responseData.data});
    }).catch((error) => {
      console.error(error);
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Input
          value={this.state.search}
          placeholder='Search...'
          icon={this.renderSearchIcon}
          onChangeText={(search) => this.onChangeTextSearch(search)}
          style={styles.inputSearch}
        />
        <List data={this.state.data} renderItem={this.renderItem} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  inputSearch: {
    margin: 10,
    paddingLeft: 10,
  },
});
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_USER } from '../../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Icon, Input, List, ListItem, Spinner } from '@ui-kitten/components';

export default class ListScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      token: '',
      dataFiltered: [],
      terms: '',
    };
    this.dataSource = [];
  }

  componentDidMount = () => AsyncStorage.getItem('token').then((token) => {
    fetch(URL_USER, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState(
        {
          dataFiltered: responseData.data,
          loading: false,
        },() => {
          this.dataSource = responseData.data;
        }
      );
    }).catch((error) => {
      console.error(error);
    });
  });

  ForwardIcon = () => (
    <Icon name='arrow-ios-forward' width={20} height={20} fill='#8F9BB3'/>
  );

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      description={item.email}
      onPress={() => this.props.navigation.navigate('Detail', { userId: item.id, userName: item.name })}
      accessory={this.ForwardIcon}
    />
  );

  SearchIcon = () => (
    <Icon name='search-outline'/>
  )

  search = (terms) => {
    const dataFiltered = this.dataSource.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : '' . toUpperCase();
      const textData = terms.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      terms: terms,
      dataFiltered: dataFiltered,
    });
  };

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
        <Input
          value={this.state.terms}
          placeholder='Search...'
          icon={this.SearchIcon}
          size='large'
          onChangeText={terms => this.search(terms)}
          style={styles.inputSearch}
        />
        <List data={this.state.dataFiltered} renderItem={this.renderItem} />
      </SafeAreaView>
    );
  }
};

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
    backgroundColor: 'white',
  },
  inputSearch: {
    margin: 15,
  },
});
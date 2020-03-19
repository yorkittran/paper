import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_GROUP } from '../../../../config/constants';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { Icon, Input, List, ListItem, Spinner, Layout } from '@ui-kitten/components';

export default class ListScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      terms: '',
    };
    this.dataSource = [];
  }

  componentDidMount = () => {
    this.FetchData();
  };

  FetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch(URL_GROUP + '/' + this.props.route.params.groupId, {
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
          dataFiltered: responseData.data.users_in_group,
          loading: false,
        },() => {
          this.dataSource = responseData.data.users_in_group;
        }
      );
    }).catch((error) => {
      console.error(error);
    });
  }

  ForwardIcon = () => (
    <Icon name='arrow-ios-forward' width={20} height={20} fill='#8F9BB3'/>
  );

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      description={item.email}
      onPress={() => this.props.navigation.navigate('Detail', { userId: item.id})}
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <PaperTopNavigation
          title='List User'
          leftIcon='arrow-back'
          leftScreen='Back'
          rightIcon='edit-2'
          rightScreen='Editing'
          params={{ groupId: this.props.route.params.groupId }}
          {...this.props}/>
        <Layout style={styles.mainContainer}>
          <Input
            value={this.state.terms}
            placeholder='Search...'
            icon={this.SearchIcon}
            size='large'
            onChangeText={terms => this.search(terms)}
            style={styles.inputSearch}
          />
          <List data={this.state.dataFiltered} renderItem={this.renderItem} />
        </Layout>
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
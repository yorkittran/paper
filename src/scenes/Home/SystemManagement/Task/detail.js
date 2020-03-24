import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { URL_TASK, URL_TASK_REJECT, URL_TASK_APPROVE } from '../../../../config/constants';
import { SafeAreaView, ScrollView } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { Card, Text, Spinner, Layout, Button } from '@ui-kitten/components';
import { PaperTopNavigation } from '../../../../navigations/top.navigator';
import { PaperModal } from '../../../../components/modal.component';

const StatusText = ({ item }) => {
  switch (item.status) {
    case 'Pending Approval':
      return (
        <Text category='p1' style={{color: '#B7771A'}}>{'• ' + item.status}</Text>
      );
    case 'Rejected':
      return (
        <Text category='p1' style={{color: '#FF4830'}}>{'• ' + item.status}</Text>
      );
    case 'Not Started':
      return (
        <Text category='p1' style={{color: '#8F9BB3'}}>{'• ' + item.status}</Text>
      );
    case 'Ongoing':
      return (
        <Text category='p1' style={{color: '#3366FF'}}>{'• ' + item.status}</Text>
      );
    case 'Committed':
      return (
        <Text category='p1' style={{color: '#FFBB35'}}>{'• ' + item.status}</Text>
      );
    case 'Completed':
      return (
        <Text category='p1' style={{color: '#7DC914'}}>{'• ' + item.status}</Text>
      );
    case 'Incompleted':
      return (
        <Text category='p1' style={{color: '#FFAB88'}}>{'• ' + item.status}</Text>
      );
    case 'Overdue':
      return (
        <Text category='p1' style={{color: '#B7181F'}}>{'• ' + item.status}</Text>
      );
  }
}

const StatusFooter = ({ item, userName, onReject, onApprove, onDelete, onEdit, onCommit, onEvaluate }) => {
  switch (item.status) {
    case 'Pending Approval':
      return (
        <Layout style={styles.cardFooter}>
          <Button style={{marginHorizontal: 10}} size='medium' appearance='outline' status='danger' onPress={onReject}>REJECT</Button>
          <Button size='medium' appearance='outline' status='success' onPress={onApprove}>APPROVE</Button>
        </Layout>
      );
    case 'Rejected':
      let rejected_date = new Date(item.approved_at);
      let rejected_at = rejected_date.getFullYear() + "-" +
        ("0" + (rejected_date.getMonth()+1)).slice(-2) + "-" +
        ("0" + rejected_date.getDate()).slice(-2) + " " +
        ("0" + rejected_date.getHours()).slice(-2) + ":" +
        ("0" + rejected_date.getMinutes()).slice(-2) + ":00";
      return (
        <>
          <Layout style={[styles.textRow, {marginHorizontal: 20, marginTop: 20}]}>
            <Text style={[styles.label, {color: '#FF4830'}]}>REJECTER</Text>
            <Text style={[styles.text, {color: '#FF4830'}]}>{item.approver}</Text>
          </Layout>
          <Layout style={[styles.textRow, {marginHorizontal: 20, marginBottom: 20}]}>
            <Text style={[styles.label, {color: '#FF4830'}]}>REJECTED AT</Text>
            <Text style={[styles.text, {color: '#FF4830'}]}>{rejected_at}</Text>
          </Layout>
        </>
      );
    case 'Not Started':
      return (
      <Layout style={styles.cardFooter}>
        <Button style={{marginHorizontal: 10}} size='medium' appearance='outline' status='danger' onPress={onDelete}>DELETE</Button>
        <Button size='medium' appearance='outline' status='info' onPress={onEdit}>EDIT</Button>
      </Layout>
    );
    case 'Ongoing':
      if (item.assignee == userName) {
        return (
        <Layout style={styles.cardFooter}>
          <Button style={{marginHorizontal: 10}} size='medium' appearance='outline' status='warning' onPress={onCommit}>COMMIT</Button>
        </Layout>
        )
      } else {
        return (
          <></>
        )
      }
    case 'Committed':
      return (
        <>
          <Layout style={[styles.textRow, {marginHorizontal: 20, marginTop: 20}]}>
            <Text style={[styles.label, {color: '#FFBB35'}]}>COMMIT MESSAGE</Text>
            <Text style={[styles.text, {color: '#FFBB35'}]}>{item.commit_message}</Text>
          </Layout>
          <Layout style={[styles.textRow, {marginHorizontal: 20}]}>
            <Text style={[styles.label, {color: '#FFBB35'}]}>COMMIT AT</Text>
            <Text style={[styles.text, {color: '#FFBB35'}]}>{item.committed_at}</Text>
          </Layout>
          <Layout style={[styles.textRow, {marginHorizontal: 20, marginBottom: 20}]}>
            <Text style={[styles.label, {color: '#FFBB35'}]}>EVIDENCE</Text>
            {item.attached_file && <Image source={{ uri: item.attached_file }} style={styles.image} />}
          </Layout>
          {item.assignee != userName
          ?
            <Layout style={styles.cardFooter}>
              <Button size='medium' appearance='outline' status='primary' onPress={onEvaluate}>EVALUATE</Button>
            </Layout>
          : <></>
          }
        </>
      );
    case 'Completed':
      let completed_date = new Date(item.updated_at);
      let completed_at = completed_date.getFullYear() + "-" +
        ("0" + (completed_date.getMonth()+1)).slice(-2) + "-" +
        ("0" + completed_date.getDate()).slice(-2) + " " +
        ("0" + completed_date.getHours()).slice(-2) + ":" +
        ("0" + completed_date.getMinutes()).slice(-2) + ":00";
      return (
        <>
          <Layout style={[styles.textRow, {marginHorizontal: 20, marginTop: 20}]}>
            <Text style={[styles.label, {color: '#7DC914'}]}>COMMENT</Text>
            <Text style={[styles.text, {color: '#7DC914'}]}>{item.comment}</Text>
          </Layout>
          <Layout style={[styles.textRow, {marginHorizontal: 20}]}>
            <Text style={[styles.label, {color: '#7DC914'}]}>COMMENTER</Text>
            <Text style={[styles.text, {color: '#7DC914'}]}>{item.commenter}</Text>
          </Layout>
          <Layout style={[styles.textRow, {marginHorizontal: 20}]}>
            <Text style={[styles.label, {color: '#7DC914'}]}>FINISH AT</Text>
            <Text style={[styles.text, {color: '#7DC914'}]}>{completed_at}</Text>
          </Layout>
          <Layout style={[styles.textRow, {marginHorizontal: 20, marginBottom: 20}]}>
            <Text style={[styles.label, {color: '#7DC914'}]}>EVIDENCE</Text>
            {item.attached_file && <Image source={{ uri: item.attached_file }} style={styles.image} />}
          </Layout>
        </>
      );
      
    case 'Incompleted':
      let incompleted_date = new Date(item.updated_at);
      let incompleted_at = incompleted_date.getFullYear() + "-" +
        ("0" + (incompleted_date.getMonth()+1)).slice(-2) + "-" +
        ("0" + incompleted_date.getDate()).slice(-2) + " " +
        ("0" + incompleted_date.getHours()).slice(-2) + ":" +
        ("0" + incompleted_date.getMinutes()).slice(-2) + ":00";
      return (
        <>
          <Layout style={[styles.textRow, {marginHorizontal: 20, marginTop: 20}]}>
            <Text style={[styles.label, {color: '#FFAB88'}]}>COMMENT</Text>
            <Text style={[styles.text, {color: '#FFAB88'}]}>{item.comment}</Text>
          </Layout>
          <Layout style={[styles.textRow, {marginHorizontal: 20}]}>
            <Text style={[styles.label, {color: '#FFAB88'}]}>COMMENTER</Text>
            <Text style={[styles.text, {color: '#FFAB88'}]}>{item.commenter}</Text>
          </Layout>
          <Layout style={[styles.textRow, {marginHorizontal: 20}]}>
            <Text style={[styles.label, {color: '#FFAB88'}]}>FINISH AT</Text>
            <Text style={[styles.text, {color: '#FFAB88'}]}>{incompleted_at}</Text>
          </Layout>
          <Layout style={[styles.textRow, {marginHorizontal: 20, marginBottom: 20}]}>
            <Text style={[styles.label, {color: '#FFAB88'}]}>EVIDENCE</Text>
            {item.attached_file && <Image source={{ uri: item.attached_file }} style={styles.image} />}
          </Layout>
        </>
      );
    default:
      return (
        <></>
      );
  }
}

export default class DetailScreen extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
      data: {},
      userName: this.props.route.params.userName,
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
      let updated_date = new Date(responseData.data.updated_at);
      this.setState({
        updated_at: 
          updated_date.getFullYear() + "-" +
          ("0" + (updated_date.getMonth()+1)).slice(-2) + "-" +
          ("0" + updated_date.getDate()).slice(-2) + " " +
          ("0" + updated_date.getHours()).slice(-2) + ":" +
          ("0" + updated_date.getMinutes()).slice(-2) + ":00",
      });
    }).catch((error) => {
      console.error(error);
    });
  });

  onReject = () => AsyncStorage.getItem('token').then((token) => {
    fetch(URL_TASK_REJECT + '/' + this.props.route.params.taskId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.hasOwnProperty('message')) {
        this.setState({
          message: responseData.message,
          visible: !this.state.visible,
        });
        if (!responseData.hasOwnProperty('errors')) {
          this.setState({
            validation : true,
          })
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  })

  onApprove = () => AsyncStorage.getItem('token').then((token) => {
    fetch(URL_TASK_APPROVE + '/' + this.props.route.params.taskId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.hasOwnProperty('message')) {
        this.setState({
          message: responseData.message,
          visible: !this.state.visible,
        });
        if (!responseData.hasOwnProperty('errors')) {
          this.setState({
            validation : true,
          })
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  })

  onDelete = () => AsyncStorage.getItem('token').then((token) => {
    fetch(URL_TASK + '/' + this.props.route.params.taskId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.hasOwnProperty('message')) {
        this.setState({
          message: responseData.message,
          visible: !this.state.visible,
        });
        if (!responseData.hasOwnProperty('errors')) {
          this.setState({
            validation : true,
          })
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  })

  onEdit = () => {
    this.props.navigation.navigate('Edit', {taskId: this.props.route.params.taskId})
  }

  onCommit = () => {
    this.props.navigation.navigate('Commit', {taskId: this.props.route.params.taskId})
  }

  onEvaluate = () => {
    this.props.navigation.navigate('Evaluate', {taskId: this.props.route.params.taskId})
  }

  Header = () => (
    <Layout style={{margin: 20, alignItems: 'center', justifyContent: 'center'}}>
      <Text category='h5'>{this.state.data.name}</Text>
      <StatusText item={this.state.data}/>
    </Layout>
  );

  Footer = () => (
    <StatusFooter 
      item={this.state.data} 
      userName={this.state.userName}
      navigation={this.props.navigation} 
      onApprove={this.onApprove}
      onReject={this.onReject}
      onDelete={this.onDelete}
      onEdit={this.onEdit}
      onCommit={this.onCommit}
      onEvaluate={this.onEvaluate}
    />
  )

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <Spinner size='giant'/>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.safeArea}>
        <PaperTopNavigation
          title='Task Detail'
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
            <Card header={this.Header} footer={this.Footer} style={{marginVertical: 20}}>
              <Layout style={styles.cardBody}>
                <Layout style={styles.textRow}>
                  <Text style={styles.label}>NAME</Text>
                  <Text style={styles.text}>{this.state.data.name}</Text>
                </Layout>
                <Layout style={styles.textRow}>
                  <Text style={styles.label}>DESCRIPTION</Text>
                  <Text style={styles.text}>{this.state.data.description}</Text>
                </Layout>
                <Layout style={styles.textRow}>
                  <Text style={styles.label}>ASSIGNEE</Text>
                  <Text style={styles.text}>{this.state.data.assignee}</Text>
                </Layout>
                <Layout style={styles.textRow}>
                  <Text style={styles.label}>ASSIGNER</Text>
                  <Text style={styles.text}>{this.state.data.assigner}</Text>
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
                  <Text style={styles.label}>UPDATED AT</Text>
                  <Text style={styles.text}>{this.state.updated_at}</Text>
                </Layout>
              </Layout>
            </Card>
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
  safeArea: {
    flex: 1, 
    backgroundColor: '#FFFFFF'
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    // minHeight: '40%', 
    justifyContent: 'center'
  },
  cardFooter: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    margin: 20
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
    width: '52%', 
    fontSize: 15
  },
  image: {
    width: 160, 
    height: 120,
    borderRadius: 10
  }
});
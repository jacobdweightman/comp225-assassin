import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import Store from '../components/Store';

export default class JoinGame2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first: "",
      last: ""
    };
  }

  submit() {
    const {navigate} = this.props.navigation;

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'gameWaiting' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={{flex: 3}}>
          <Text style={styles.title}>{Store.gameName}</Text>
          <Text style={styles.inputLabel}>Enter your name!</Text>
          <Text style={styles.infoText}>
            This should be your real name, so that people in the game know who you
            are.
          </Text>
          <View style={{flex: 1}} />
          <TextInput
              style={styles.inputText}
              onChangeText={(first) => this.setState({first})}
              placeholder={"First name"}
              placeholderTextColor={"#888"}
              autoFocus={true}
          />
          <View style={{flex: 1}} />
          <TextInput
              style={styles.inputText}
              onChangeText={(last) => this.setState({last})}
              placeholder={"Last name"}
              placeholderTextColor={"#888"}
          />
          <View style={{flex: 1}} />
          <Button
              onPress={this.submit.bind(this)}//()=>navigate("game")}
              title="Submit"
              color="#7d97c1"
          />
        </View>
        <View style={{flex: 5}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    padding: 20
  },

  title: {
    fontSize: 36,
    color: "#eee"
  },

  inputLabel: {
    fontSize: 24,
    color: "#eee"
  },

  inputText: {
    fontSize: 24,
    color: "#ddd"
  },

  infoText: {
    fontSize: 16,
    color: "#ccc"
  }
});

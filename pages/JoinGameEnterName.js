import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import App, { Palette } from '../App';

// TODO: On submit, server has to check if name is duplicate, if not add player and
// send information for the game waiting / running page
export default class JoinGame2 extends React.Component {
  constructor(props) {
    super(props);
  }

  submit() {
    if (global.firstName.length < 2) { // basic input validation
      Alert.alert("Please enter a valid first name");
    }
    else if (global.lastName.length < 2) {
      Alert.alert("Please enter a valid last name");
    }
    else {
      // TODO: server check that name is not a duplicate
      global.playerList.push({first: global.firstName, last: global.lastName})
      const {navigate} = this.props.navigation;

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'gameWaiting' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 3}} >
          <View style={{flex: 1}} />{/*spacer*/}
          <Text style={styles.title}>{global.gameName}</Text>
          <Text style={[styles.inputLabel, {fontStyle: "italic"}]}>Game Code: #{global.code}</Text>
          <View style={{flex: 1}} />{/*spacer*/}
          <Text style={styles.inputLabel}>Enter your name!</Text>
          <Text style={styles.infoText}>
            This should be your real name, so that people in the game know who you
            are.
          </Text>
          <View style={{flex: 0.2}} />{/*spacer*/}
          <TextInput
              style={styles.inputText}
              onChangeText={(first) => global.firstName = first}
              placeholder={"First name"}
              placeholderTextColor={"#888"}
              autoFocus={true}
          />
          <View style={{flex: 0.2}} />{/*spacer*/}
          <TextInput
              style={styles.inputText}
              onChangeText={(last) => global.lastName = last}
              placeholder={"Last name"}
              placeholderTextColor={"#888"}
          />
          <View style={{flex: 1}} />{/*spacer*/}
          <Button
              onPress={this.submit.bind(this)}//()=>navigate("game")}
              // call the submit function
              title="Submit"
              color={Palette.color1}
          />
        </View>
        <View style={{flex: 2}} />{/*spacer*/}
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
    color: "#eee"
  }
});

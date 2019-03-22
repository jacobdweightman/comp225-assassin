import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Font, AppLoading } from 'expo';
import { LinearGradient } from 'expo';

import Store from '../components/Store';
import font from '../assets/fonts/Iceland_Regular.ttf';

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
      <LinearGradient colors= { ['#101010', '#7e8e9e','#7e8e9e','#F0F8FF']} style ={{position :'absolute', left: 0, bottom: 0, right: 0, top:0}}>
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
              autoFocus={true}
          />
          <View style={{flex: 1}} />
          <TextInput
              style={styles.inputText}
              onChangeText={(last) => this.setState({last})}
              placeholder={"Last name"}
          />
          <View style={{flex: 1}} />
          <TouchableOpacity 
          style={styles.button}
          onPress={this.submit.bind(this)}>
          <Text style={styles.text}> submit </Text>
        </TouchableOpacity>
        </View>
        <View style={{flex: 5}} />
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },

  title: {
    fontSize: 36,
    color: "#eee",
    fontFamily: 'font'
  },

  inputLabel: {
    fontSize: 24,
    color: "#eee",
    fontFamily: 'font'
  },

  inputText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'font'
  },

  infoText: {
    fontSize: 16,
    color: "#ccc", 
    fontFamily: 'font'
  },
    button: {
    height:50,
    backgroundColor: "slategray",
    borderRadius: 50,
    justifyContent: 'center',
  },

  text: {
    color: 'white',
    fontSize:24, 
    textAlign: 'center', 
    fontFamily: 'font'

  }
});

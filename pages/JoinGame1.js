import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Font, AppLoading } from 'expo';
import { LinearGradient } from 'expo';

import Store from '../components/Store'
import font from '../assets/fonts/Iceland_Regular.ttf';

export default class JoinGame1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameCode: ""
    };
  }

  next() {
    const {navigate} = this.props.navigation;

    Store.creator = false;

    return navigate("join2");
  }

  render() {
    return (
      <LinearGradient colors= { ['#101010', '#7e8e9e','#7e8e9e','#F0F8FF']} style ={{position :'absolute', left: 0, bottom: 0, right: 0, top:0}}>
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={{flex: 2}}>
          <Text style={styles.inputLabel}>Enter game code:</Text>
          <View style={{flex: 1}} />
          <TextInput
              style={styles.inputText}
              keyboardType={"number-pad"}
              onChangeText={(text) => this.setState({text})}
              placeholder={"Game code"}
              placeholderTextColor={"white"}
              autoFocus={true}
          />
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={styles.button}
            onPress={this.next.bind(this)}>
            <Text style={styles.text}> Join Game </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}} />
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

  inputLabel: {
    fontFamily: 'font',
    fontSize: 65,
    color: 'white'
  },

  inputText: {
    fontFamily: 'font',
    fontSize: 24,
    color: 'white'
  },
  button: {
    height:50, //I can't make the width be smaller because the button goes to the left!
    backgroundColor: 'slategray',
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

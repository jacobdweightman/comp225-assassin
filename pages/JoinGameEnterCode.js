import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo';

import App, { Palette } from '../App';

// TODO: pressing join game button will have to querry the server to see if the game
// code is valid and respond back
export default class JoinGame1 extends React.Component {
  constructor(props) {
    super(props);
  }

  next() {
    // TODO: check code that was entered
    global.creator = false;
    const {navigate} = this.props.navigation;
    return navigate("join2");
  }

  render() {
    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={styles.container}>
        <View style={{flex: 1}} />{/*spacer*/}
        <View style={{flex: 2}} >
          <Text style={styles.inputLabel}>Enter game code:</Text>
          <View style={{flex: .2}} />{/*spacer*/}
          <TextInput
              style={styles.inputText}
              keyboardType={"number-pad"}
              onChangeText={(text) => global.code = text}
              // onSubmitEditing={event => Alert.alert(global.code)}
              placeholder={"Game code"}
              placeholderTextColor={"#888"}
              autoFocus={true}
              maxLength={5}
          />
          <View style={{flex: 1}} />{/*spacer*/}
          <Button
              onPress={this.next.bind(this)}//call the next() function
              title="Join Game"
              color={Palette.color1}
          />
        </View>
        <View style={{flex: 3}} />{/*spacer*/}
      </View>
       </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  inputLabel: {
    fontSize: 36,
    color: "#eee",
    fontFamily:'font'
  },

  inputText: {
    fontSize: 24,
    color: "#ddd"
  }
});

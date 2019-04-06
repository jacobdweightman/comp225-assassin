import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';

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
      <View style={baseStyle.container}>
        <View style={{flex: 1}} />{/*spacer*/}
        <View style={{flex: 2}} >
          <Text style={baseStyle.inputLabel}>Enter game code:</Text>
          <View style={{flex: .2}} />{/*spacer*/}
          <TextInput
              style={baseStyle.inputText}
              keyboardType={"number-pad"}
              onChangeText={(text) => global.code = text}
              // onSubmitEditing={event => Alert.alert(global.code)}
              placeholder={"Game code"}
              autoFocus={true}
              maxLength={5}
          />
          <View style={{flex: 1}} />{/*spacer*/}
          <TouchableOpacity style ={baseStyle.widebutton} onPress={this.next.bind(this)}>
            <Text style={baseStyle.text}> Join Game </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}} />{/*spacer*/}
      </View>
       </LinearGradient>
    );
  }
}

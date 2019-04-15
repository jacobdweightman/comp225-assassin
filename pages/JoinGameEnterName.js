import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';

import global from '../Global';

// TODO: On submit, server has to check if name is duplicate, if not add player and
// send information for the game waiting / running page
export default class JoinGameEnterName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: this.props.navigation.getParam("player"),
      game: this.props.navigation.getParam("game"),
      firstName: "",
      lastName: "",
    }
  }


  async submit() {
    if (this.state.firstName.length === 0) { // basic input validation
      Alert.alert("Please enter your first name");
    }
    else if (this.state.lastName.length === 0) {
      Alert.alert("Please enter your last name");
    }
    else {
      try {
        let response = await fetch(global.BASE_URL + "player_access/add_player", {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            player_first_name: this.state.firstName,
            player_last_name: this.state.lastName,
            is_creator: this.state.player.creator ? 1 : 0,
            game_code: this.state.game.code,
          }),
        });

        if(response.status === 200) {
          global.firstName = this.state.firstName;
          global.lastName = this.state.lastName;
          return this.props.navigation.navigate("gameWaiting");
        } else {
          alert("A network error occurred.");
          console.log(response);
        }

      } catch(error) {
        alert("An error occured while creating your game.");
        console.log(error);
      }

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
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={baseStyle.container}>
        <View style={{flex: 2.6}} >
          <View style={{flex: 1}} />{/*spacer*/}
          <Text style={[baseStyle.title, styles.title]}>{global.gameName}</Text>
          <Text style={baseStyle.subTitle}>Game Code: #{global.code}</Text>
          <View style={{flex: 0.70}} />{/*spacer*/}
          <Text style={baseStyle.subTitle}>Enter your name!</Text>
          <Text style={baseStyle.infoText}>
            This should be your real name, so that people in the game know who you
            are.
          </Text>
          <View style={{flex: 0.20}} />{/*spacer*/}
          <TextInput
              style={baseStyle.subTitle}
              onChangeText={(firstName) => this.setState({firstName})} //(first) => global.firstName = first}
              placeholder={"First name"}
              placeholderTextColor={"#eee"}
              autoFocus={true}
          />
          <View style={{flex: 0.20}} />{/*spacer*/}
          <TextInput
              style={baseStyle.subTitle}
              onChangeText={(lastName) => this.setState({lastName})} //(last) => global.lastName = last}
              placeholder={"Last name"}
              placeholderTextColor={"#eee"}
          />
          <View style={{flex: 0.7}} />{/*spacer*/}
           <TouchableOpacity style={baseStyle.widebutton} onPress={this.submit.bind(this)}>
          <Text style={baseStyle.text}> submit </Text>
        </TouchableOpacity>
        <Text>{this.state.firstName}</Text>
        <Text>{this.state.lastName}</Text>
        </View>
        <View style={{flex: 2}} />{/*spacer*/}
      </View>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 50
  },
});

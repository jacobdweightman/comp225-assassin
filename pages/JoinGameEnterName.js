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
      playerID: undefined,
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
          let json = await response.json();
          global.playerID = json.player_id;
          global.playersKillCode = json.player_kill_code
          this.setState({playerID: json.player_id})
        } else {
          alert("A network error occurred.");
          console.log(response);
        }

      } catch(error) {
        alert("An error occured while creating your game.");
        console.log(error);
      }


      params = {
        game: this.state.game,
        player: this.state.player,
      }
      params.player.firstName = this.state.firstName;
      params.player.lastName = this.state.lastName;
      params.player.playerID = this.state.playerID;

      console.log(params);

      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'gameWaiting',
            params: params
          })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={[baseStyle.container, styles.container]}>
          <Text style={[baseStyle.title, styles.title]}>{this.state.game.name}</Text>
          <Text style={baseStyle.subTitle}>Game Code: #{this.state.game.code}</Text>
          <View style={{flex: 0.07}} />{/*spacer*/}
          <Text style={[baseStyle.subTitle, {paddingRight: "40%"}]}>Enter your name!</Text>
          <Text style={[baseStyle.infoText, {fontSize:17}, {paddingLeft: '4%'}]}>
            This should be your real name, so that people in the game know who you
            are.
          </Text>
          <View style={{flex: 0.07}} />{/*spacer*/}
          <TextInput
              style={[baseStyle.inputText, styles.inputText]}
              onChangeText={(firstName) => this.setState({firstName})}
              placeholder={"First name"}
              placeholderTextColor={"#a9a9a9"}
              autoFocus={true}
          />
          <View style={{flex: 0.06}} />{/*spacer*/}
          <TextInput
              style={[baseStyle.inputText,styles.inputText]}
              onChangeText={(lastName) => this.setState({lastName})}
              placeholder={"Last name"}
              placeholderTextColor={"#a9a9a9"}
          />
          <View style={{flex: 0.10}} />{/*spacer*/}
           <TouchableOpacity style={baseStyle.button} onPress={this.submit.bind(this)}>
          <Text style={baseStyle.text}> submit </Text>
        </TouchableOpacity>
        <View style={{flex: 2}} />{/*spacer*/}
      </View>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    justifyContent: 'flex-start',
    top:"3%"
  },
  title: {
    fontSize: 50
  },
   subTitle:{
    color:'black'
   },
   inputText:{
    flex: 0.35,
    fontSize: 23
   }
});

import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
    this.state.firstName= this.state.firstName.trim()
    this.state.lastName= this.state.lastName.trim()

    if (this.state.firstName.length === 0) { // basic input validation
      Alert.alert("Please enter your first name.","There must be a character other than space.");
    }
    else if (this.state.lastName.length === 0) {
      Alert.alert("Please enter your last name.","There must be a character other than space.");
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
          let json = await response.json();
          global.storeAccessToken(json.access_token);
          this.advance(json.player_kill_code);
        } else {
          let json = await response.json();
          alert(json.message);
        }

      } catch(error) {
        alert("An error occured while creating your game.");
        console.log(error);
      }
    }
  }

  advance(killCode) {
    params = {
      game: this.state.game,
      player: this.state.player,
    };

    params.player.firstName = this.state.firstName;
    params.player.lastName = this.state.lastName;
    params.player.killCode = killCode;

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

  render() {
    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
        <View style={[baseStyle.container, styles.container]}>
            <Text style={[baseStyle.subTitle]}>{this.state.game.name}</Text>
            <View style={{flex: 0.07}} />{/*spacer*/}
            <Text style={[baseStyle.title, styles.title]}>Enter your name!</Text>
            <Text style={[baseStyle.infoText, {fontSize:20, textAlign: 'center'}, {paddingLeft: '4%'}]}>
              This should be your real name, so that people in the game know who you
              are.
            </Text>
            <View style={{flex: 0.07}} />{/*spacer*/}
            <TextInput
                style={[baseStyle.inputText]}
                onChangeText={(firstName) => this.setState({firstName})}
                placeholder={"First name"}
                placeholderTextColor={"#a9a9a9"}
                autoFocus={true}
                maxLength={30}
            />
            <View style={{flex: 0.06}} />{/*spacer*/}
            <TextInput
                style={[baseStyle.inputText]}
                onChangeText={(lastName) => this.setState({lastName})}
                placeholder={"Last name"}
                placeholderTextColor={"#a9a9a9"}
                maxLength={30}
            />
            <View style={{flex: 0.10}} />{/*spacer*/}
            <TouchableOpacity style={baseStyle.button} onPress={this.submit.bind(this)}>
              <Text style={baseStyle.text}> Submit </Text>
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

  inputText:{
    flex:.25
  },


  title:{
    fontSize:wp("12%")
  }
});

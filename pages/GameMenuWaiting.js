import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo';


import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import PlayerList from '../components/PlayerList';
import global from '../Global';

export default class GameMenuWaiting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: this.props.navigation.getParam("player"),
      game: this.props.navigation.getParam("game"),
    }

    this.updateGame();
  }

  updateGame() {
    fetch(global.BASE_URL + "player_access/get_game_info", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        game_code: this.state.game.code,
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      let game = this.state.game;

      game.name = json.game_name;
      game.rules = json.game_rules;

      this.setState({game});
    })
    .catch((error) => console.log(error));
  }

  advance() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'gameRunning' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  hunt= async()=> {
    try {
        let response = await fetch(global.BASE_URL + "creator_access/start_hunt", {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            player_id: global.playerID,
          }),
        });

        if(response.status === 200) {
          //go to the next screen
        } else {
          alert(response.status);
          console.log(response);
        }
    } catch(error) {
      alert("Just kidding. It went through–haha idk why there's this error");
      console.log(error);
    }
  }

  startHuntDialog() {
    Alert.alert(
      'Are you ready to start the game?',
      'Additional players cannot be added, and this operation cannot be undone.',
      [
        {text: "Start", onPress: this.hunt},
        {text: "Cancel", onPress: () => {}}
      ]
    )
  }

  render() {
    const vSpace = 50;

    var advance;

    if (global.creator) {
      advance = (
        <View>
        <TouchableOpacity style = {baseStyle.button} onPress={this.startHuntDialog}>
          <Text style = {baseStyle.text}> Start Round </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {baseStyle.button} onPress={this.advance.bind(this)}>
          <Text style = {baseStyle.text}> Go check your target </Text>
        </TouchableOpacity>
        </View>
      );
    } else {
      advance = (
        <Text style={[baseStyle.subTitle, {textDecorationLine: "none"}, {color: 'black'}]}>
          Waiting for game creator to start game
        </Text>
      );
    }

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={baseStyle.container}>
        <Text style={[baseStyle.title, styles.title]}>{this.state.game.name}</Text>
        <View style={{flex: 0.1}}/>
        <Text style={[baseStyle.subTitle, styles.subTitle]}>Game Rules:</Text>
        <Text style={baseStyle.infoText}>
          {this.state.game.rules}
        </Text>
        <View style={{flex: 0.1}}/>
        {global.creator && <PlayerList players={[]} style={{flex: 1}}></PlayerList>}
        {advance}
      </View>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 50,
  },

  subTitle: {
    fontSize: 35,
    color: 'white',
    textDecorationLine: "underline"
  }

});

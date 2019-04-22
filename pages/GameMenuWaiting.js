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

    if(!this.state.player.creator) {
      console.log("not creator!");
      this.interval = setInterval(this.pollGameStart, 3000);
    }
  }

  pollGameStart = async() => {
    console.log("poll game start");
    try {
        let response = await fetch(global.BASE_URL + "status_access/is_game_started", {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            game_code: global.code,
          }),
        });

        if(response.status === 200) {
          json = await response.json();
          if(json.game_state === 1) {
            this.advance("gameRunning");
          }
        } else {
          alert(response.status);
          console.log(response);
        }
    } catch(error) {
      console.log(error);
    }
  }

  advance(screen) {
    // Do not continue to poll on the next screen!
    if(this.interval !== undefined) {
      clearInterval(this.interval);
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: screen,
        params: this.props.navigation.state.params,
      })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  hunt = async()=> {
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

        json = await response.json();
        if (response.status === 200) {
          screen = json.win ? "win" : "gameRunning";
          this.advance(screen);
        } else {
          alert(json.message);
          console.log(response);
        }
    } catch(error) {
      console.log(error);
    }
  }

  startHuntDialog = () => {
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
        </View>
      );
    } else {
      advance = (
        <Text style={[baseStyle.subTitle, {textDecorationLine: "none"}, {color: '#831a19'}]}>
          Waiting for all assassins
        </Text>
      );
    }

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={baseStyle.container}>
        <Text style={[baseStyle.title, styles.title]}>{this.state.game.name}</Text>
        <View style={{flex: 0.01}}/>
        <Text style={baseStyle.subTitle}> Game Code: {global.code} </Text>
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

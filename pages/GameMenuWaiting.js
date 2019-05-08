import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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

    // if access token is gone, exit the game
    if(global.accessToken === null) {
      this.advance('home');
    }

    if(!this.state.player.creator) {
      this.interval = setInterval(this.pollGameStart, 3000);
    }
  }

  pollGameStart = async() => {
    try {
        let response = await fetch(global.BASE_URL + "status_access/game_state", {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            game_code: this.state.game.code,
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
          method: 'GET',
          headers: {
            'Authorization' : 'Bearer '+ global.accessToken,
          }
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

  confirmQuit() {
    Alert.alert(
      'Are you sure you want to leave the game?',
      null,
      [
        {text: 'Yes', onPress: this.quitGame.bind(this)},
        {text: 'No', onPress: () => {}}
      ]
    );
  }

  async quitGame() {
    try {
      const response = await fetch(global.BASE_URL + "player_access/quit_game", {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + global.accessToken,
        }
      });

      if (response.status === 200) {
        global.clearAccessToken();
        this.advance('home');
      } else {
        console.log(response);
        json = await response.json();
        Alert.alert(json.message);
      }

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const vSpace = 50;

    var advance;

    if (this.state.player.creator) {
      advance = (
        <TouchableOpacity style = {baseStyle.button} onPress={this.startHuntDialog}>
          <Text style = {baseStyle.text}> Start Round </Text>
        </TouchableOpacity>
      );
    } else {
      advance = (
        <View style={baseStyle.container}>
          <Text style={[baseStyle.subTitle, {textDecorationLine: "none"}, {color: '#831a19'}]}>
          Waiting for all assassins
          </Text>
          <View style={{height:hp("1%")}}></View>
          <TouchableOpacity style = {[baseStyle.button, {backgroundColor: '#990F0F'}]} onPress= {this.confirmQuit.bind(this)}>
            <Text style= {baseStyle.text}> Quit Game </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
        <View style={[baseStyle.container, styles.container]}>
          <View style={styles.spacer}/>
          <Text style={baseStyle.subTitle}>{this.state.game.name}</Text>
          <View style={styles.spacer}/>
          <Text style={[baseStyle.title]}> Game Code: {this.state.game.code} </Text>
          <View style={{height:hp("1%")}}/>
          <Text style={[baseStyle.infoText, {textAlign:'center'}]}>
            Give players this code to let them join your game
          </Text>
          <View style={styles.spacer}/>
          <Text style={[baseStyle.subTitle, styles.subTitle]}>Game Rules:</Text>
          <ScrollView style = {{height:hp("8%")}}>
            <Text style={baseStyle.infoText}>
              {this.state.game.rules}
            </Text>
          </ScrollView>
          <View style={styles.spacer}/>
          {this.state.player.creator && <PlayerList players={[]} style={{flex: 5, justifyContent:"flex-start"}}></PlayerList>}
          <View style={styles.spacer}/>
          {advance}
        </View>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({

  container:{
    justifyContent: 'flex-start',
  },
  spacer:{
    height:hp("3%")
  },
  subTitle:{
    fontSize:wp("8%")
  }
});

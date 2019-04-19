import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { AppLoading, Font, LinearGradient, SecureStore } from 'expo';

import Palette from '../UI/defaultStyles/Palette';
import font from '../assets/fonts/IcelandReg.ttf';
import baseStyle from '../UI/defaultStyles/DefaultStyle';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoading: false,
    }

    this.loadState();
  }

  async componentWillMount(){
    await Expo.Font.loadAsync({
      font,
    });
    this.setState({fontLoading:true});
  }

  async loadState() {
    /* Load registration data from persistent storage, and navigate to the
     * game menu if the player is in a game already. */
    let player, game; // undefined, not null

    SecureStore.getItemAsync('player')
    .then((storedPlayer) => {
      player = JSON.parse(storedPlayer);

      // if player exists in the key store
      if(player !== null) {
        // if game exists in the key store and has been loaded
        if(game !== undefined && game !== null) {
          this.jumpToGame(player, game);
      }
    });

    SecureStore.getItemAsync('game')
    .then((storedGame) => {
      game = JSON.parse(storedGame);

      // if game exists in the key store
      if(game !== null) {
        // if player exists in the key store and has been loaded
        if(player !== undefined && player !== null) {
          this.jumpToGame(player, game);
        }
      }
    });
  }

  jumpToGame(player, game) {
    let param = {
      player: player,
      game: game,
    }

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
    const {navigate} = this.props.navigation;
    if (!this.state.fontLoading) {
      return <Expo.AppLoading />
    }
    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={baseStyle.container}>
          <Text style={[baseStyle.title, styles.title]}>Assassin </Text>
          <TouchableOpacity style = {baseStyle.button} onPress={()=>navigate("join1")}>
            <Text style = {baseStyle.text}> Join Game </Text>
          </TouchableOpacity>
          <Text style={{flex: 0.05}}> </Text>{/*spacer*/}
          <TouchableOpacity  style = {baseStyle.button} onPress={()=>navigate("create")}>
            <Text style = {baseStyle.text}> Create Game </Text>
          </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    flex: 0.30,
    fontSize: 100
  },
});

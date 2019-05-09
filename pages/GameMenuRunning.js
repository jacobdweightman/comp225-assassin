import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import global from '../Global';

export default class GameMenuRunning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false, // controls whether to show input for entering kill code
      loading: true,
      targetMessage: undefined,
      game: this.props.navigation.getParam("game"),
      player: this.props.navigation.getParam("player"),
      enteredKillCode: undefined,
    };

    this.interval = setInterval(this.pollIsAlive, 3000);
    this.interval2 = setInterval(this.pollDidWin, 3000);
    this.pollIsAlive(); // poll once immediately in case player died while app was closed
  }

  // Get the player's target before screen loads
  async componentDidMount(){
    try {
      const response = await fetch(global.BASE_URL + "player_access/request_target", {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + global.accessToken,
        }
      });

      json = await response.json();
      if (response.status === 200) {
        const target = json.target_first_name + " " + json.target_last_name;
        this.setState({targetMessage: "You are hunting " + target})
      } else if(response.status === 422) {
        // JWT is corrupted/lost
        global.clearAccessToken();
        Alert.alert("An error has occurred. You have been removed from your game.");
        this.advance("home");
      } else {
        this.setState({targetMessage: json.message})
      }
    } catch (e) {
      console.log(e);
    }
    this.setState({loading: false});
    return;
  }

  pollIsAlive = async() => {
    try {
        let response = await fetch(global.BASE_URL + "status_access/is_alive", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + global.accessToken,
          }
        });

        if(response.status === 200) {
          json = await response.json();
          if(json.is_alive === false) {
            this.advance("loss");
          }
        } else {
          alert(response.status);
          console.log(response);
        }
    } catch(error) {
      console.log(error);
    }
  }

  pollDidWin = async() => {
    await fetch(global.BASE_URL + "status_access/game_state", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_code: this.state.game.code,
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json.game_state);
      if(json.game_state == 2) {
        this.advance("win");
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // Check the inputed kill code
  async verifyKillCode() {
    try {
      let response = await fetch(global.BASE_URL + "player_access/got_target", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.accessToken,
        },
        body: JSON.stringify({
          guessed_target_kill_code: this.state.enteredKillCode,
        }),
      });

      json = await response.json();
      if (response.status === 200) {
        screen = json.win ? "win" : "congrats";
        this.advance(screen);
      } else {
        Alert.alert("That's not your target's confirmation code");
      }

    } catch (error) {
      console.log(error);
    }
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

      if (response.status === 200 || response.status === 500) {
        global.clearAccessToken();
        this.advance('home');
      } else {
        json = await response.json();
        Alert.alert(json.message);
      }

    } catch (error) {
      console.log(error);
    }
  }


  // Navigates to either the win, loss, or gameRunning based on screen parameter
  advance(screen) {
    // Do not continue to poll on the next screen!
    clearInterval(this.interval);
    clearInterval(this.interval2);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: screen,
        params: {
          player: this.state.player,
          game: this.state.game,
        },
      })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />
    }


    var controls;
    if(this.state.showInput) {
      controls = (
        <View style={[baseStyle.container, styles.container]}>
          <TextInput
              style={[baseStyle.inputText, styles.inputText]}
              keyboardType={"number-pad"}
              onChangeText={(enteredKillCode) => this.setState({enteredKillCode})}
              placeholder={"Code"}
              placeholderTextColor={"#a9a9a9"}
              autoFocus={true}
              maxLength={4}
          />
          <View style={{height:hp("1%")}}></View>
          <Text style={[baseStyle.infoText, {textAlign:'center'}]}> Enter your target's confirmation code to confirm their assassination </Text>
          <View style={styles.spacer} />{/*spacer*/}
          <TouchableOpacity style = {baseStyle.button} onPress= {this.verifyKillCode.bind(this)}>
            <Text style= {baseStyle.text}> Verify Code </Text>
          </TouchableOpacity>
          <View style={{height:hp("1%")}}></View>
          <TouchableOpacity style = {baseStyle.button} onPress= {() => this.setState({showInput: !this.state.showInput})}>
            <Text style= {baseStyle.text}> Cancel </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      controls = (
      <View style={[baseStyle.container, styles.container]}>
        <TouchableOpacity style = {baseStyle.button} onPress={() => this.setState({showInput: !this.state.showInput})}>
          <Text style= {baseStyle.text}> Got Target </Text>
        </TouchableOpacity>
        <View style={{height:hp("1%")}}></View>
        <TouchableOpacity style = {[baseStyle.button, {backgroundColor: '#990F0F'}]} onPress= {this.confirmQuit.bind(this)}>
          <Text style= {baseStyle.text}> Quit Game </Text>
        </TouchableOpacity>
      </View>);
    }

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
        <View style={[baseStyle.container, styles.container]}>
        <View style={styles.spacer}></View>
        <Text style= {[baseStyle.subTitle, styles.subTitle]}> {"Your Confirmation Code is: " + this.state.player.killCode}</Text>
        <View style={styles.spacer}></View>
        <Text style={[baseStyle.subTitle, styles.subTitle]}>{this.state.targetMessage}</Text>
        <View style={styles.spacer}></View>
        {controls}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent:"flex-start"
  },

  subTitle:{
    fontSize:wp("8%")
  },

  inputText:{
    width: wp('50%'),
    textAlign:'center',
  },

  spacer:{
    height: hp("4%")
  },
});

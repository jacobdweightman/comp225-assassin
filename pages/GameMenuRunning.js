import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import global from '../Global';

export default class GameMenuRunning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theyGotGot: false,
      loading: true,
      targetMessage: undefined,
      playerID: this.props.navigation.getParam("player").playerID,
      killCode: null,
    };
  }

  // Get the player's target before screen loads
  async componentDidMount(){
    try {
      const response = await fetch(global.BASE_URL + "player_access/request_target", {
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
        const target = json.target_first_name + " " + json.target_last_name;
        this.setState({targetMessage: "You are hunting " + target})
      }
      else {
        this.setState({targetMessage: json.message})
      }
    } catch (e) {
      console.error(e);
    }
    this.setState({loading: false});
    return;
  }

  // Show or hide the text input for kill code
  enterKillCode() {
    this.setState(() => ({
      theyGotGot: !this.state.theyGotGot
    }));
  }

  // Check the inputed kill code
  async verifyKillCode() {
    try {
      let response = await fetch(global.BASE_URL + "player_access/got_target", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id: this.state.playerID,
          guessed_target_kill_code: this.state.killCode,
        }),
      });

      json = await response.json();
      if (response.status === 200) {
        screen = json.win ? "win" : "gameRunning";
        this.advance(screen);
      } else {
        Alert.alert("Psych! That's the wrong number!");
      }

    } catch (error) {
      console.log(error);
    }
  }

  // Navigates to either the win or gameRunning screen
  advance(screen) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: screen,
        params: {
          player: {
            playerID: this.state.playerID
          },
        },
      })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />
    }

    const vSpace = 50;
    var controls;
    if(this.state.theyGotGot) {
      controls = (
        <View>
        <TextInput
            style={baseStyle.subTitle}
            onChangeText={(c) => this.setState({killCode: c})}
            placeholder={"Kill code"}
            placeholderTextColor={"white"}
            autoFocus={true}
        />
        <TouchableOpacity style = {baseStyle.button} onPress= {this.verifyKillCode.bind(this)}>
          <Text style= {baseStyle.text}> Verify code </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {baseStyle.button} onPress= {this.enterKillCode.bind(this)}>
          <Text style= {baseStyle.text}> Cancel </Text>
        </TouchableOpacity>
        </View>
      );
    } else {
      controls = (
      <TouchableOpacity style = {baseStyle.button} onPress={this.enterKillCode.bind(this)}>
        <Text style= {baseStyle.text}> They got got </Text>
      </TouchableOpacity>);
    }

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={[baseStyle.container, styles.container]}>
        <Text style={[baseStyle.title, styles.title]}>{global.firstName}</Text>
        <Text style= {baseStyle.subTitle}> {global.playersKillCode}</Text>
        <View style={{height: vSpace}}></View>
        <Text style={[baseStyle.subTitle, styles.subTitle]}>{this.state.targetMessage}</Text>
        <View style={{height: vSpace}}></View>
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

  title: {
    fontSize: 40
  },
  subTitle: {
    fontSize: 30
  }
});

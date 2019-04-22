import React from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';

import global from '../Global';

// TODO: pressing join game button will have to querry the server to see if the game
// code is valid and respond back
export default class JoinGameEnterCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameCode: "",
    }
  }

  async gameExists() {
    try {
      console.log(JSON.stringify({
        game_code: this.state.gameCode
      }));
      const response = await fetch(global.BASE_URL + "player_access/get_game_info", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          game_code: this.state.gameCode,
        }),
      });

      json = await response.json();
      if (response.status === 200) {
        this.setState({gameName: json.game_name, gameRules: json.game_rules, loading: false});
        return true;
      } else {
        Alert.alert(json.message);
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async next() {
    if (await this.gameExists() === true) {
      global.creator = false;
      global.code = this.state.gameCode;
      const {navigate} = this.props.navigation;
      return navigate("join2", {
        player: {
          creator: false,
        },
        game: {
          code: this.state.gameCode,
          name: this.state.gameName,
          rules: this.state.gameRules
        }
      });
    }
  }

  render() {
    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={[baseStyle.container, {alignItems: 'center'}]}>
        <View style={{flex: 1}} />{/*spacer*/}
        <View style={{flex: 2}} >
          <Text style={[baseStyle.inputLabel, {fontSize: 45}]}>Enter game code:</Text>
          <View style={{flex: .2}} />{/*spacer*/}
          <TextInput
              style={[baseStyle.inputText, styles.inputText]}
              keyboardType={"number-pad"}
              onChangeText={(gameCode) => this.setState({gameCode})}
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

var styles = StyleSheet.create({
  inputText:{
    flex: 0.8, 
    paddingLeft: "6%"
  }
});





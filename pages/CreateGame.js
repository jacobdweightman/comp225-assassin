import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';

import global from '../Global';


export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameName: "default name",
      gameRules: "default rules",
    }
  }

  async create() {
    // validate input
    if (this.state.gameName.length < 2) {
      Alert.alert("Please enter a valid game name");
      return;
    }

    try {
      let response = await fetch(global.BASE_URL + "creator_access/create_game", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          game_name: this.state.gameName,
          game_rules: this.state.gameRules,
        }),
      });

      if(response.status === 200) {
        let json = await response.json();
        global.creator = 1;
        global.code = json.game_code;
        global.gameName = this.state.gameName;
        global.gameRules = this.state.gameRules;

        return this.props.navigation.navigate("join2", {
          player: {
            creator: true,
          },
          game: {
            code: json.game_code,
            name: this.state.gameName,
            rules: this.state.gameRules,
          }
        });
      } else {
        alert("A network error occurred.");
        console.log(response);
      }

    } catch(error) {
      alert("An error occured while creating your game.");
      console.log(error);
    }
  }

  render() {
    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={[baseStyle.container, styles.container]}>
        <Text style={[baseStyle.inputLabel, styles.inputLabel ]}>Game name:</Text>
        <TextInput
            style={baseStyle.inputText}
            onChangeText={(gameName) => this.setState({gameName})}
            placeholderTextColor= 'white'
            placeholder= "Game Name"
            autoFocus={true}
        />
        <View style={{flex: 0.05}} />
        <Text style={baseStyle.inputLabel}>Game rules:</Text>
        <TextInput
            style={baseStyle.inputText}
            multiline={true}
            numberOfLines={4}
            textAlignVertical={'top'}
            onChangeText={(gameRules) => this.setState({gameRules})}
            placeholder="This is the place to list any safe zones / how players
            will be assassinated"
            placeholderTextColor={"#eee"}
        />
        <View style={{flex: 0.1}} />
        <TouchableOpacity style= {baseStyle.button} onPress={this.create.bind(this)}>
          <Text style={baseStyle.text}>Join Game</Text>
        </TouchableOpacity>

      </View>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:0.60
  },
  inputLabel: {
    flex: 0.20
  },
});

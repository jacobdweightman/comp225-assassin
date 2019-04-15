import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList, Alert} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo';


import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import global from '../Global';

export default class GameMenuWaiting extends React.Component {
  doNothing() {

  }

  advance() {
    const {navigate} = this.props.navigation;

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'gameRunning' })],
    });

    this.props.navigation.dispatch(resetAction);
  }
  hunt= async () => {
    try {
        let response = await fetch(global.BASE_URL + "creator_access/start_hunt", {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            is_creator: global.creator,
            game_code: global.code,
            player_id: global.playerID,
          }),
        });

        if(response.status === 200) {
          let json = await response.json();
          global.playersKillCode = json.player_kill_code;
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
  render() {
    const {navigate} = this.props.navigation;
    const vSpace = 50;

    var advance;
    var playerList;

    if (global.creator) {
      advance = (
        <View>
        <TouchableOpacity style = {baseStyle.button} onPress={this.hunt}>
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

    playerList = (
      <FlatList
        numColumns={1}
        horizontal={false}
        data={global.playerList}
        renderItem={({item}) => <Text style={baseStyle.listItem}>{item.first},&#9;&#9;{item.last}</Text>}
        keyExtractor={(item,index)=>item.last}
      />
    );

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={baseStyle.container}>
        <Text style={[baseStyle.title, styles.title]}>{global.gameName}</Text>
        <View style={{flex: 0.1}}/>
        <Text style={[baseStyle.subTitle, styles.subTitle]}>Game Rules:</Text>
        <Text style={baseStyle.infoText}>
          {global.gameRules}
        </Text>
        <View style={{flex: 0.1}}/>
        <Text style={[baseStyle.subTitle, styles.subTitle]}>Player List:</Text>
        {playerList}
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

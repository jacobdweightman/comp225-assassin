import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo';


import App, { Palette } from '../App';
import baseStyle from '../UI/defaultStyles/DefaultStyle';

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

  render() {
    const {navigate} = this.props.navigation;
    const vSpace = 50;

    var advance;
    var playerList;

    if (global.creator) {
      advance = (
        <TouchableOpacity style = {baseStyle.button} onPress={this.advance.bind(this)}>
          <Text style = {baseStyle.text}> Start Round </Text>
        </TouchableOpacity>
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

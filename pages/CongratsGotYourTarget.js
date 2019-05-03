import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import global from '../Global';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Victory extends React.Component {
  advance() {
    // Do not continue to poll on the next screen!
    clearInterval(this.interval);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: "gameRunning",
        params: {
          player: {
            playerID: this.props.navigation.getParam("player").playerID,
          },
        },
      })],
    });
    this.props.navigation.dispatch(resetAction);
  }

render() {
    return (
      <LinearGradient colors= {Palette.gotAnother} style ={Palette.place}>
      <View style={[baseStyle.container, {justifyContent:'flex-start'}, {paddingTop :wp("40%")}]}>
        <Text style= {[baseStyle.title, {color: 'white'}]}> {global.firstName}, you got someone!</Text>
        <Text style={{flex: 0.50}}> </Text>
        <TouchableOpacity style = {baseStyle.button} onPress={this.advance.bind(this)}>
          <Text style = {baseStyle.text}> Get Your Next Target </Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }
}


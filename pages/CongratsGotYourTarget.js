import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import global from '../Global';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Victory extends React.Component {
  goingHome = async () => {
    const {navigate} = this.props.navigation;
    return navigate("home");
  }


render() {
    return (
      <LinearGradient colors= {Palette.gotAnother} style ={Palette.place}>
      <View style={[baseStyle.container, {justifyContent:'flex-start'}, {paddingTop :wp("40%")}]}>
        <Text style= {[baseStyle.title, {color: 'white'}]}> {global.firstName} you have </Text>
        <Text style={{flex: 0.15}}> </Text>
        <Text style= {[baseStyle.title, {color: 'white'}]}> ## Kills</Text>
        <Text style={{flex: 0.50}}> </Text>
        <TouchableOpacity style = {baseStyle.button} onPress={this.goingHome.bind(this)}>
          <Text style = {baseStyle.text}> Home </Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }
}


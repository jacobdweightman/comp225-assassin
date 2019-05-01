import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import global from '../Global';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class Victory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerID: this.props.navigation.getParam("player").playerID,
    };
  }

  goingHome = async () => {
    try {
      const response = await fetch(global.BASE_URL + "player_access/remove_from_game", {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + global.accessToken,
        },
      });

      if (response.status === 200) {
        const {navigate} = this.props.navigation;
        return navigate("home");
      }
      else {
        json = await response.json();
        alert("A network error occurred.");
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <LinearGradient colors= {Palette.winColors} style ={Palette.place}>
      <View style={baseStyle.container}>
        <Text style= {[baseStyle.title, styles.title]}> You Won!</Text>
        <View style={{height:hp("1%")}}></View>
        <View style={{flex: 0.3}}>
          <TouchableOpacity style = {[baseStyle.button, styles.button]} onPress={this.goingHome.bind(this)}>
            <Text style = {baseStyle.text}> Home </Text>
          </TouchableOpacity>
        </View>
      </View>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: wp("22%"),
    flex: 0.3
  },
  button:{
    backgroundColor: '#DAA520'
  }
});

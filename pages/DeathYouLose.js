import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import global from '../Global';

export default class DeathYouLose extends React.Component {
  constructor(props) {
    super(props);
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
        Alert.alert(json.message);
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <LinearGradient colors= {Palette.deathColors} style ={Palette.place}>
      <View style={baseStyle.container}>
        <Text style= {[baseStyle.title, styles.title]}> You Got Got!</Text>
        <Text> </Text>
        <View style={{flexDirection: 'row'}}>
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
    fontSize: 90,
    textAlign:'center',
    flex: 0.3
  },
  button:{
    width: 150,
    backgroundColor: 'black'
  }
});

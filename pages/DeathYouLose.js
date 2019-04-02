import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';

import App, { Palette} from '../App';
import baseStyle from '../UI/defaultStyles/DefaultStyle';

export default class DeathYouLose extends React.Component {
  render() {
    return (
      <LinearGradient colors= {Palette.deathColors} style ={Palette.place}>
      <View style={baseStyle.container}>
        <Text style= {[baseStyle.title, styles.title]}> You Got Got!</Text>
        <Text> </Text>  
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style = {[baseStyle.button, styles.button]}>
            <Text style = {baseStyle.text}> Deny </Text>  
          </TouchableOpacity>
          <Text>      </Text>
          <TouchableOpacity style = {[baseStyle.button, styles.button]}>
            <Text style = {baseStyle.text}> Confirm </Text>  
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
    width: 150
  }
});




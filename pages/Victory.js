import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';

export default class Victory extends React.Component {
  constructor(props) {
    super(props);
  }
  goingHome(){
  const {navigate} = this.props.navigation;
  return navigate("home");
  }
  render() {
    return (
      <LinearGradient colors= {Palette.winColors} style ={Palette.place}>
      <View style={baseStyle.container}>
        <Text style= {[baseStyle.title, styles.title]}> Victor!</Text>
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
    backgroundColor: '#DAA520'
  }
});

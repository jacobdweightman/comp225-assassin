import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import { LinearGradient } from 'expo';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import global from '../Global';

export default class GameMenuRunning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iGotGot: false,
      theyReallyGotGot: false
    };
  }

  gotGot() {
    this.setState(() => ({
      theyGotGot: true
    }));
  }

  approvedGot(){
    this.setState(() => ({
      theyReallyGotGot: true
    }));
  }

  render() {

    const {navigate} = this.props.navigation;
    const vSpace = 50;
    const shouldBeNumber = Math.floor(Math.random() * global.playerList.length); // random int
    // [0,playerlist.length]
    const target = global.playerList[shouldBeNumber];
    var controls;
    if(this.state.theyGotGot) {
      controls = (
        <View>
         <TextInput
        style={baseStyle.subTitle}
        onChangeText={(code) => global.killCode = code}
        placeholder={"Life Code"}
        placeholderTextColor={"white"}
        autoFocus={true}
        />
        <Text> </Text>
        <TouchableOpacity style = {baseStyle.button} onPress= {this.approvedGot.bind(this)}>
      <Text style= {baseStyle.text}> Die </Text>
      </TouchableOpacity>
      </View>);
    } else {
      controls = (
      <TouchableOpacity style = {baseStyle.button} onPress={this.gotGot.bind(this)}>
        <Text style= {baseStyle.text}> They got got </Text>
      </TouchableOpacity>);
    }

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={[baseStyle.container, styles.container]}>
        <Text style={[baseStyle.title, styles.title]}>{global.firstName}</Text>
        <Text> {global.playersKillCode}</Text>
        <View style={{height: vSpace}}></View>
        <Text style={[baseStyle.subTitle, styles.subTitle]}>You are hunting {target.first} {target.last}</Text>
        <View style={{height: vSpace}}></View>
        {controls}
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent:"flex-start"
  },

  title: {
    fontSize: 40
  },
  subTitle: {
    fontSize: 30
  }
});

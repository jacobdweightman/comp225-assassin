import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import { LinearGradient } from 'expo';

import App, { Palette } from '../App';
import baseStyle from '../UI/defaultStyles/DefaultStyle';

export default class GameMenuRunning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iGotGot: false,
      theyGotGot: false
    };
  }

  gotGot() {
    this.setState(() => ({
      theyGotGot: true
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
      controls = (<Text style={[baseStyle.subTitle, {color: "black"}]}>Waiting for target to confirm assassination</Text>);
    } else {
      controls = (
        <TouchableOpacity style = {baseStyle.button} onPress={this.gotGot.bind(this)}>
      <Text style= {baseStyle.text}> They got got </Text>
      </TouchableOpacity>);
    }

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={baseStyle.container}>
        <Text style={[baseStyle.title, styles.title]}>{global.gameName}</Text>
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
  title: {
    fontSize: 40
  },
  subTitle: {
    fontSize: 30
  }
});

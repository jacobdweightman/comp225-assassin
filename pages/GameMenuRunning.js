import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import App, { Palette } from '../App';

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
      controls = (<Text style={[styles.subTitle, {color: "steelblue"}]}>Waiting for target to confirm assassination</Text>);
    } else {
      controls = (<Button onPress={this.gotGot.bind(this)} title="They got got" color={Palette.color1} />);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{global.gameName}</Text>
        <View style={{height: vSpace}}></View>
        <Text style={styles.subTitle}>You are hunting {target.first} {target.last}</Text>
        <View style={{height: vSpace}}></View>
        {controls}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  title: {
    fontSize: 40,
    color: "#eee"
  },

  subTitle: {
    fontSize: 24,
    color: "#ddd"
  }
});

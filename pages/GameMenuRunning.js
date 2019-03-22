import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { Font, AppLoading } from 'expo';
import { LinearGradient } from 'expo';

import Store from '../components/Store';

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

    var controls;
    if(this.state.theyGotGot) {
      controls = (<Text style={styles.subTitle}>Waiting for target to confirm assassination</Text>);
    } else {
      controls = (
      <TouchableOpacity
      style = {styles.button}
      onPress={this.gotGot.bind(this)}>
      <Text style= {styles.text}> They got got </Text>
      </TouchableOpacity>
      );
    }

    return (
      <LinearGradient colors= { ['#101010', '#7e8e9e','#7e8e9e','#F0F8FF']} style ={{position :'absolute', left: 0, bottom: 0, right: 0, top:0}}>
      <View style={styles.container}>
        <Text style={styles.title}>Mac Assassin 2k19</Text>
        <View style={{height: vSpace}}></View>
        <Text style={styles.subTitle}>You are hunting Corey</Text>
        <View style={{height: vSpace}}></View>
        {controls}
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  title: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'font'
  },

  subTitle: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'font'
  },
    button: {
    width:250,
    height:50,
    backgroundColor: "slategray",
    borderRadius: 50,
    justifyContent: 'center',
  },

  text: {
    color: 'white',
    fontSize:24, 
    textAlign: 'center', 
    fontFamily: 'font'

  }

});

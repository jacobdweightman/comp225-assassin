import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo';
import {Font, AppLoading} from 'expo';
import { Dimensions } from 'react-native';

import Palette from '../UI/defaultStyles/Palette';
import font from '../assets/fonts/IcelandReg.ttf';
import baseStyle from '../UI/defaultStyles/DefaultStyle';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }
   state = {
    fontLoading: false
  }
  async componentWillMount(){
    await Expo.Font.loadAsync({
      font,
    });
    this.setState({fontLoading:true});
  }

  render() {
    const {navigate} = this.props.navigation;
    if (!this.state.fontLoading) {
      return <Expo.AppLoading />
    }
    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={baseStyle.container}>
          <Text style={[baseStyle.title, styles.title]}> Assassin </Text>
          <TouchableOpacity style = {baseStyle.button} onPress={()=>navigate("join1")}>
            <Text style = {baseStyle.text}> Join Game </Text>
          </TouchableOpacity>
          <Text style={{flex: 0.05}}> </Text>{/*spacer*/}
          <TouchableOpacity  style = {baseStyle.button} onPress={()=>navigate("create")}>
            <Text style = {baseStyle.text}> Create Game </Text>
          </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: wp("25%"),
    flex: 0.30
  },
});

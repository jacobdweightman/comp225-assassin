import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';


export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
  }

  create() {
    if (global.gameName.length < 2) { // basic input validation
      Alert.alert("Please enter a valid game name");
    }
    else {
      global.creator = true;
      global.code = 1234; // probably something else
      const {navigate} = this.props.navigation;
      return navigate("join2");
    }
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={[baseStyle.container, styles.container]}>
        <Text style={[baseStyle.inputLabel, styles.inputLabel ]}>Game name:</Text>
        <TextInput
            style={baseStyle.inputText}
            onChangeText={(text) => global.gameName = text}
            placeholderTextColor= 'white'
            placeholder= "Game Name"
            autoFocus={true}
        />
        <View style={{flex: 0.05}} />
        <Text style={baseStyle.inputLabel}>Game rules:</Text>
        <TextInput
            style={baseStyle.inputText}
            multiline={true}
            numberOfLines={4}
            textAlignVertical={'top'}
            onChangeText={(text) => global.gameRules = text}
            placeholder="This is the place to list any safe zones / how players
            will be assassinated"
            placeholderTextColor={"#eee"}
        />
        <View style={{flex: 0.1}} />
        <TouchableOpacity style= {baseStyle.button} onPress={this.create.bind(this)}>
          <Text style={baseStyle.text}>Join Game</Text>
        </TouchableOpacity>

      </View>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:0.60
  },
  inputLabel: {
    flex: 0.20
  },
});

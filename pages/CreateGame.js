import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Font, AppLoading } from 'expo';
import { LinearGradient } from 'expo';

import Store from '../components/Store';

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      rules: ""
    };
  }

  create() {
    const {navigate} = this.props.navigation;

    Store.creator = true;

    return navigate("join2");
  }

  nameChanged(text) {
    this.setState({text});
    Store.gameName = text;
  }

  rulesChanged(text) {
    this.setState({text});
    Store.gameRules = text;
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <LinearGradient colors= { ['#101010', '#7e8e9e','#7e8e9e','#F0F8FF']} style ={{position :'absolute', left: 0, bottom: 0, right: 0, top:0}}>
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Game Name:</Text>
        <TextInput
            style={styles.inputText}
            onChangeText={this.nameChanged.bind(this)}
            placeholderTextColor={"#888"}  
            autoFocus={true}
        />
        <Text style={styles.inputLabel}>Game Rules:</Text>
        <TextInput
            style={styles.inputText}
            multiline={true}
            textAlignVertical={'top'}
            onChangeText={this.rulesChanged.bind(this)}
            placeholderTextColor={"#888"}
        />
        <TouchableOpacity
            style= {styles.button}
            onPress={this.create.bind(this)}>
            <Text style={styles.text}>Join Game</Text>
        </TouchableOpacity>
            
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 100
  },

  inputLabel: {
    fontSize: 40,
    color: "#eee",
    fontFamily: 'font'
  },

  inputText: {
    fontSize: 24,
    color: "#ddd",
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
    fontSize: 24, 
    textAlign: 'center', 
    fontFamily: 'font'

  }

});

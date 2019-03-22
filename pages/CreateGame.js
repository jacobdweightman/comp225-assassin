import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';

import App, { Palette } from '../App';

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
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Game name:</Text>
        <TextInput
            style={styles.inputText}
            onChangeText={(text) => global.gameName = text}
            placeholderTextColor={"#888"}
            autoFocus={true}
        />
        <View style={{flex: 0.05}} />
        <Text style={styles.inputLabel}>Game rules:</Text>
        <TextInput
            style={styles.inputText}
            multiline={true}
            numberOfLines={4}
            textAlignVertical={'top'}
            onChangeText={(text) => global.gameRules = text}
            placeholder="This is the place to list any safe zones / how players
            will be assassinated"
            placeholderTextColor={"#888"}
        />
        <View style={{flex: 0.1}} />
        <Button
            onPress={this.create.bind(this)}
            title="Join Game"
            color={Palette.color1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    // alignItems: 'center',
    padding: 20
  },

  inputLabel: {
    fontSize: 36,
    color: "#eee",
    textAlign: 'center'
  },

  inputText: {
    fontSize: 24,
    color: "#ddd",
    borderColor: "gray",
    borderWidth: 1,
    alignItems: 'flex-start'
  }
});

import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

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
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Game Name:</Text>
        <TextInput
            style={styles.inputText}
            onChangeText={this.nameChanged.bind(this)}
            placeholderTextColor={"#888"}
            autoFocus={true}
        />
        <Text style={styles.inputLabel}>Game rules:</Text>
        <TextInput
            style={styles.inputText}
            multiline={true}
            textAlignVertical={'top'}
            onChangeText={this.rulesChanged.bind(this)}
            placeholderTextColor={"#888"}
        />
        <Button
            onPress={this.create.bind(this)}
            title="Join Game"
            color="#7d97c1"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    padding: 20
  },

  inputLabel: {
    fontSize: 36,
    color: "#eee"
  },

  inputText: {
    fontSize: 24,
    color: "#ddd"
  }
});

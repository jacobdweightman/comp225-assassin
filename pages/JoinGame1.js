import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

import Store from '../components/Store'

export default class JoinGame1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameCode: ""
    };
  }

  next() {
    const {navigate} = this.props.navigation;

    Store.creator = false;

    return navigate("join2");
  }

  render() {


    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={{flex: 2}}>
          <Text style={styles.inputLabel}>Enter game code:</Text>
          <View style={{flex: 1}} />
          <TextInput
              style={styles.inputText}
              keyboardType={"number-pad"}
              onChangeText={(text) => this.setState({text})}
              placeholder={"Game code"}
              placeholderTextColor={"#888"}
              autoFocus={true}
          />
          <View style={{flex: 1}} />
          <Button
              onPress={this.next.bind(this)}
              title="Join Game"
              color="#7d97c1"
          />
        </View>
        <View style={{flex: 3}} />
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

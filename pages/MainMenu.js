import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Store from '../components/Store';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    Store.creator = false;
    Store.gameName = "Mac Assassin 2k19";
    Store.gameRules = "This is a place for the game creator to write some text about the house rules--for instance, in this game assassinations are made by publically serenading your target. For the target to die of embarassment, there must be a section ofCOMP-225 present.";
    Store.code = "0000";
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={{flex: 2}}>
          <Text style={styles.title}>Assassin</Text>
          <Button onPress={()=>navigate("join1")} title="Join Game" color="#7d97c1" />
          <View style={{flex: 1}} />
          <Button onPress={()=>navigate("create")} title="Create Game" color="#7d97c1" />
        </View>
        <View style={{flex: 2}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    padding:20
  },

  title: {
    fontSize: 80,
    color: "#eee",
    flex: 4
  },

  button: {

  }
});

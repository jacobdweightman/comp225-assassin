import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

export default class GameMenuWaiting extends React.Component {
  doNothing() {

  }

  advance() {
    const {navigate} = this.props.navigation;

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'gameRunning' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const {navigate} = this.props.navigation;
    const vSpace = 50;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mac Assassin 2k19</Text>
        <View style={{height: vSpace}}></View>
        <Text style={styles.subTitle}>Game Rules:</Text>
        <Text style={styles.infoText}>
          This is a place for the game creator to write some text about the
          "house rules" &mdash; for instance, in this game assassinations are
          made by publically serenading your target. For the target to die of
          embarassment, there must be a section ofCOMP-225 present.
        </Text>
        <View style={{height: vSpace}}></View>
        <Text style={styles.subTitle}>
          Waiting for game creator to start game
        </Text>
        <Button
            onPress={this.advance.bind(this)}
            title="This shouldn't be here but take me forward"
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
    justifyContent: 'center',
  },

  title: {
    fontSize: 40,
    color: "#eee"
  },

  subTitle: {
    fontSize: 24,
    color: "#ddd"
  },

  infoText: {
    fontSize: 16,
    color: "#ccc"
  }
});

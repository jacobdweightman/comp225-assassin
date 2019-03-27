import React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo';

import App, { Palette } from '../App';

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

    var advance;
    var playerList;

    if (global.creator) {
      advance = (
        <Button
            onPress={this.advance.bind(this)}
            title="Start Round"
            color={Palette.color1}
        />
      );
    } else {
      advance = (
        <Text style={[styles.subTitle, {textDecorationLine: "none"}]}>
          Waiting for game creator to start game
        </Text>
      );
    }

    playerList = (
      <FlatList
        numColumns={1}
        horizontal={false}
        data={global.playerList}
        renderItem={({item}) => <Text style={styles.listItem}>{item.first},&#9;&#9;{item.last}</Text>}
        keyExtractor={(item,index)=>item.last}
      />
    );

    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={styles.container}>
        <Text style={styles.title}>{global.gameName}</Text>
        <View style={{flex: 0.1}}/>
        <Text style={styles.subTitle}>Game Rules:</Text>
        <Text style={styles.infoText}>
          {global.gameRules}
        </Text>
        <View style={{flex: 0.1}}/>
        <Text style={styles.subTitle}>Player List:</Text>
        {playerList}
        {advance}
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
    color: "#eee",
    // textDecorationLine: "underline",
  },

  subTitle: {
    fontSize: 24,
    color: "#ddd",
    textDecorationLine: "underline"
  },

  infoText: {
    fontSize: 16,
    color: "#ccc"
  },

  listItem: {
    fontSize: 18,
    color: "#ddd"
  }
});

import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Font, AppLoading } from 'expo';
import { LinearGradient } from 'expo';

import Store from '../components/Store'
import font from '../assets/fonts/Iceland_Regular.ttf';

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
    if(Store.creator) {
      advance = (
        <TouchableOpacity
            style = {styles.button}
            onPress={this.advance.bind(this)}>
            <Text style = {styles.text}> Start Round </Text>
        </TouchableOpacity>
      );

      playerList = (
        <FlatList
          numColumns={1}
          horizontal={false}
          data={[
            {first: 'Jacob', last: 'Weightman'},
            {first: 'Ellen', last: 'Graham'},
            {first: 'Corey', last: 'Pieper'},
            {first: 'Analeidi', last: 'Barrera'}
          ]}
          renderItem={({item}) => <Text style={styles.listItem}>{item.last},&#9;&#9;{item.first}</Text>}
          keyExtractor={(item,index)=>item.last}
        />
      );
    } else {
      advance = (
        <Text style={styles.subTitle}>
          Waiting for game creator to start game
        </Text>
      );

      playerList = <View />;
    }

    return (
      <LinearGradient colors= { ['#101010', '#7e8e9e','#7e8e9e','#F0F8FF']} style ={{position :'absolute', left: 0, bottom: 0, right: 0, top:0}}>
      <View style={styles.container}>
        <Text style={styles.title}>{Store.gameName}</Text>
        <View style={{height: vSpace}}></View>
        <Text style={styles.subTitle}>Game Rules:</Text>
        <Text style={styles.infoText}>
          {Store.gameRules}
        </Text>
        <View style={{height: vSpace}}></View>
        {advance}
        {playerList}
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
    fontFamily: 'font'
  },

  subTitle: {
    fontSize: 24,
    color: "#ddd", 
    fontFamily: 'font'
  },

  infoText: {
    fontSize: 16,
    color: "#ccc",
    fontFamily: 'font'
  },

  listItem: {
    fontSize: 18,
    color: "#ddd"
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

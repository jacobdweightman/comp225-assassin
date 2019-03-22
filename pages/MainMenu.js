import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import App, { Palette } from '../App'; // App for global variables, Palette for colors

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />{/*spacer*/}
        <View style={{flex: 2}} >
          {/*content*/}
          <Text style={styles.title}>Assassin</Text>
          <Button onPress={()=>navigate("join1")} title="Join Game" color={Palette.color1}  />
          <View style={{flex: 1}} />{/*spacer*/}
          <Button onPress={()=>navigate("create")} title="Create Game" color={Palette.color1} />
        </View>
        <View style={{flex: 2}} />{/*spacer*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({ // set styles for view components
  container: {
    flex: 1,
    backgroundColor: '#222',
    // alignItems: 'stretch',
    padding:20
  },

  title: {
    fontSize: 80,
    color: "#eee",
    flex: 4,
    textAlign: "center"
  },

  button: {

  }
});

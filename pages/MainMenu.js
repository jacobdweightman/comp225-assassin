import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class MainMenu extends React.Component {
  /*static navigationOptions = {
    title: "Assassin"
  }*/

  doNothing() {

  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Assassin</Text>
        <Button onPress={()=>navigate("join1")} title="Join Game" color="#7d97c1" />
        <Button onPress={this.doNothing} title="Create Game" color="#7d97c1" />
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
    fontSize: 80,
    color: "#eee"
  }
});

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class MainMenu extends React.Component {
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

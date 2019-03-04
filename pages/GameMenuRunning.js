import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Store from '../components/Store';

export default class GameMenuRunning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iGotGot: false,
      theyGotGot: false
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    const vSpace = 50;

    var adminControls
    if(Store.creator) {
      adminControls = (
        <Button onPress={()=>navigate("gameWaiting")} title="End Round" color="#7d97c1" />
      );
    } else {
      adminControls = <View />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mac Assassin 2k19</Text>
        <View style={{height: vSpace}}></View>
        <Text style={styles.subTitle}>You are hunting Corey</Text>
        <View style={{height: vSpace}}></View>
        <Button onPress={()=>navigate("join1")} title="They got got" color="#7d97c1" />
        {adminControls}
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
    padding: 20
  },

  title: {
    fontSize: 40,
    color: "#eee"
  },

  subTitle: {
    fontSize: 24,
    color: "#ddd"
  }
});

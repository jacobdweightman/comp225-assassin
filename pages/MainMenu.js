import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { LinearGradient } from 'expo';
import {Font, AppLoading} from 'expo';

import App, { Palette} from '../App'; // App for global variables, Palette for colors
import font from '../assets/fonts/IcelandReg.ttf';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }
   state = {
    fontLoading: false
  }
  async componentWillMount(){
    await Expo.Font.loadAsync({
      font,
    });
    this.setState({fontLoading:true});
  }

  render() {
    const {navigate} = this.props.navigation;
      if (!this.state.fontLoading) {
      return <Expo.AppLoading />;
    }
    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={styles.container}>
        <View style={{flex: 1}} />{/*spacer*/}
        <View style={{flex: 2}} >
          {/*content*/}
          <Text style={styles.title}>Assassiiiiiin</Text>
          <Button onPress={()=>navigate("join1")} title="Join Game" color={Palette.color1}  />
          <View style={{flex: 1}} />{/*spacer*/}
          <Button onPress={()=>navigate("create")} title="Create Game" color={Palette.color1} />
        </View>
        <View style={{flex: 2}} />{/*spacer*/}
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({ // set styles for view components
 container :{flex: 1, 
  padding:20
  },
  title: {
    fontSize: 80,
    fontFamily: 'font',
    color: "#eee",
    flex: 4,
    textAlign: "center"
  },

  button: {

  }
});












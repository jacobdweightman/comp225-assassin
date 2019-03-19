import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import { Font, AppLoading } from 'expo';
import { LinearGradient } from 'expo';



import Store from '../components/Store';
import font from '../assets/fonts/Iceland_Regular.ttf';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    Store.creator = false;
    Store.gameName = "Mac Assassin 2k19";
    Store.gameRules = "This is a place for the game creator to write some text about the house rules--for instance, in this game assassinations are made by publically serenading your target. For the target to die of embarassment, there must be a section ofCOMP-225 present.";
    Store.code = "0000";
  }
  state = {
    fontLoading: false
  }
  async componentWillMount() {
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
      <LinearGradient colors= { ['#000000', '#778899','#B0C4DE']} style ={{position :'absolute', left: 0, bottom: 0, right: 0, top:0}}>
      <View style={styles.container}>
      <Text style={styles.title}>Assassin</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={()=>navigate("join1")}> 
          <Text style={styles.text}> Join Game </Text>
        </TouchableOpacity>
          <Text style={{flex:0.05}}> </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={()=>navigate("create")}>
          <Text style={styles.text}> Create Game </Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  container: { 
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
  },
  title: {
    flex: 0.30,
    fontFamily: 'font',
    fontSize: 100,
    color: 'lightgray'
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











import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { LinearGradient } from 'expo';
import baseStyle from '../UI/defaultStyles/DefaultStyle';
import Palette from '../UI/defaultStyles/Palette';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import global from '../Global';


export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);

    this.pendingRequest = false;
    console.log("pending <- false");

    this.state = {
      gameName: "",
      gameRules: "",
    }
    onBackPress = () =>{ this.onBackPress.bind(this)}
  }

  async create() {
    // prevent multiple requests from being sent
    if(this.pendingRequest) {
      console.log("request already in progress");
      return;
    }

    // validate input
    this.state.gameName= this.state.gameName.trim();
    if (this.state.gameName.length < 2) {
      Alert.alert("Please enter a valid game name");
      return;
    }

    this.pendingRequest = true;
    console.log("pending <- true");

    try {
      let response = await fetch(global.BASE_URL + "creator_access/create_game", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          game_name: this.state.gameName,
          game_rules: this.state.gameRules,
        }),
      });

      if(response.status === 200) {
        let json = await response.json();

        return this.props.navigation.navigate("join2", {
          player: {
            creator: true,
          },
          game: {
            code: json.game_code,
            name: this.state.gameName,
            rules: this.state.gameRules,
          }
        });
      } else {
        this.pendingRequest = false;
        console.log("pending <- false");
        alert("A network error occurred.");
        console.log(response);
      }

    } catch(error) {
      this.pendingRequest = false;
      console.log("pending <- false");
      alert("An error occured while creating your game.");
      console.log(error);
    }
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () =>{
    if(this.state.gameName !== "" || this.state.gameRules !== "") {
      Alert.alert(
        'Your information will not be saved!',
        'Do you still wish to continue?',
        [
          {text: 'Yes', onPress: () => this.props.navigation.goBack(null)},
          {text: 'No', onPress: () => {}}
        ]
      );
    } else {
      this.props.navigation.goBack(null);
    }
    return true;
  }

  render() {
    return (
      <LinearGradient colors= {Palette.gradientCol} style ={Palette.place}>
      <View style={[baseStyle.container, styles.container]}>
        <Text style={[baseStyle.inputLabel, styles.inputLabel ]}>Game name:</Text>
        <View style={styles.spacer} />
        <TextInput
            style={baseStyle.inputText}
            onChangeText={(gameName) => this.setState({gameName})}
            placeholder= "Game Name"
            autoFocus={true}
            placeholderTextColor= '#a9a9a9'
            maxLength={50}
        />
        <View style={styles.spacer} />
        <Text style={[baseStyle.inputLabel]}>Game rules:</Text>
        <View style={styles.spacer} />
        <TextInput
            style={[baseStyle.inputText, styles.inputText]}
            multiline={true}
            numberOfLines={4}
            textAlignVertical={'top'}
            onChangeText={(gameRules) => this.setState({gameRules})}
            placeholder="List your safe zones and or how players can kill their target"
            placeholderTextColor= '#a9a9a9'
            maxLength={500}
        />
        <View style={styles.spacer} />
        <TouchableOpacity style= {baseStyle.button} onPress={this.create.bind(this)}>
          <Text style={baseStyle.text}>Join Game</Text>
        </TouchableOpacity>
      </View>
     </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:0.60,
    justifyContent: 'flex-start',
    top:hp("4%")
  },

  inputText:{
    flex: 0.35,
  },
  spacer:{
    flex:0.07,
  }
});

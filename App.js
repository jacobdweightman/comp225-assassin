import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Platform, StyleSheet} from 'react-native';
import font from './assets/fonts/IcelandReg.ttf';
import React from 'react';

import MainMenu from './pages/MainMenu';
import CreateGame from './pages/CreateGame';
import JoinGameEnterCode from './pages/JoinGameEnterCode';
import JoinGameEnterName from './pages/JoinGameEnterName';
import GameMenuWaiting from './pages/GameMenuWaiting';
import GameMenuRunning from './pages/GameMenuRunning';
import DeathYouLose from './pages/DeathYouLose';
import Victory from './pages/Victory';
import CongratsGotYourTarget from './pages/CongratsGotYourTarget';

import Storage from './api/Storage';

const Navigator = createStackNavigator(
{ // Navigator for pages
  home: {screen: MainMenu},
  create: {screen: CreateGame}, //creategame!
  join1: {screen: JoinGameEnterCode},
  join2: {screen: JoinGameEnterName},
  gameWaiting: {screen: GameMenuWaiting},
  gameRunning: {screen: GameMenuRunning},
  loss: {screen: DeathYouLose},
  win: {screen: Victory},
  congrats: {screen:CongratsGotYourTarget},
}, {
  headerMode: Platform.OS === 'ios' ? 'float' : 'none',
  initialRouteName: 'home'
});

const NavContainer = createAppContainer(Navigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoading: false,
    }
  }

  async componentWillMount(){
    await Expo.Font.loadAsync({
      font,
    });
    this.setState({fontLoading:true});
  }

  render() {
    // wait for font to finish loading
    if (!this.state.fontLoading) {
      return <Expo.AppLoading />
    }

    return <NavContainer persistenceKey={"NavigationState"} />;
  }
}

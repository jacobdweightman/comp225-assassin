import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Platform, StyleSheet} from 'react-native';






// Declare global variables in App.js
global.creator;
global.gameName = "Mac Assassin 2019";
global.gameRules = "This is a place for the game creator to write some text about the house rules--for instance, in this game assassinations are made by publically serenading your target. For the target to die of embarassment, there must be a section ofCOMP-225 present.";
global.code;
global.firstName = "";
global.lastName = "";
global.playerList = [
  {first: 'Jacob', last: 'Weightman'},
  {first: 'Ellen', last: 'Graham'},
  {first: 'Corey', last: 'Pieper'},
  {first: 'Analeidi', last: 'Barrera'},
  {first: 'Paul', last: 'Cantrell'}
];

import MainMenu from './pages/MainMenu';
import CreateGame from './pages/CreateGame';
import JoinGame1 from './pages/JoinGameEnterCode';
import JoinGame2 from './pages/JoinGameEnterName';
import GameMenuWaiting from './pages/GameMenuWaiting';
import GameMenuRunning from './pages/GameMenuRunning';

const Navigator = createStackNavigator(
{ // Navigator for pages
  home: {screen: MainMenu},
  create: {screen: CreateGame},
  join1: {screen: JoinGame1},
  join2: {screen: JoinGame2},
  gameWaiting: {screen: GameMenuWaiting},
  gameRunning: {screen: GameMenuRunning}
}, {
  headerMode: Platform.OS === 'ios' ? 'float' : 'none',
  initialRouteName: 'home'
});

const App = createAppContainer(Navigator);


export class Palette {
    static color1 = "#7d97c1";
    static color2 = "#FFC107";
    static gradientCol = ['#101010','#7e8e9e','#7e8e9e','#F0F8FF'];
    static place = {position :'absolute', left: 0, bottom: 0, right: 0, top:0};
}




export default App;







































import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Platform, StyleSheet} from 'react-native';

import MainMenu from './pages/MainMenu';
import CreateGame from './pages/CreateGame';
import JoinGame1 from './pages/JoinGameEnterCode';
import JoinGame2 from './pages/JoinGameEnterName';
import GameMenuWaiting from './pages/GameMenuWaiting';
import GameMenuRunning from './pages/GameMenuRunning';
import DeathYouLose from './pages/DeathYouLose';
import Victory from './pages/Victory';

const Navigator = createStackNavigator(
{ // Navigator for pages
  home: {screen: MainMenu},
  create: {screen: CreateGame}, //creategame!
  loss: {screen: MainMenu},
  join1: {screen: JoinGame1},
  join2: {screen: JoinGame2},
  gameWaiting: {screen: GameMenuWaiting},
  gameRunning: {screen: GameMenuRunning}
}, {
  headerMode: Platform.OS === 'ios' ? 'float' : 'none',
  initialRouteName: 'home'
});

const App = createAppContainer(Navigator);

export default App;

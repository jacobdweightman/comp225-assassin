import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Platform, StyleSheet} from 'react-native';

import MainMenu from './pages/MainMenu';
import CreateGame from './pages/CreateGame';
import JoinGameEnterCode from './pages/JoinGameEnterCode';
import JoinGameEnterName from './pages/JoinGameEnterName';
import GameMenuWaiting from './pages/GameMenuWaiting';
import GameMenuRunning from './pages/GameMenuRunning';
import DeathYouLose from './pages/DeathYouLose';
import Victory from './pages/Victory';
import CongratsGotYourTarget from './pages/CongratsGotYourTarget';

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

const App = createAppContainer(Navigator);

export default App;

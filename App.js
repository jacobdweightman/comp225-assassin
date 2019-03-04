import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import Store from './components/Store';

import MainMenu from './pages/MainMenu';
import CreateGame from './pages/CreateGame';
import JoinGame1 from './pages/JoinGame1';
import JoinGame2 from './pages/JoinGame2';
import GameMenuWaiting from './pages/GameMenuWaiting';
import GameMenuRunning from './pages/GameMenuRunning';

Store.ingame = false;
Store.creator = false;

const Navigator = createStackNavigator({
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

export default App;

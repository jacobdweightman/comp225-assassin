import {createStackNavigator, createAppContainer} from 'react-navigation';

import MainMenu from './pages/MainMenu';
import JoinGame1 from './pages/JoinGame1';
import JoinGame2 from './pages/JoinGame2';
import GameMenuWaiting from './pages/GameMenuWaiting';
import GameMenuRunning from './pages/GameMenuRunning';

const Navigator = createStackNavigator({
  home: {screen: MainMenu},
  join1: {screen: JoinGame1},
  join2: {screen: JoinGame2},
  gameWaiting: {screen: GameMenuWaiting},
  gameRunning: {screen: GameMenuRunning}
});

const App = createAppContainer(Navigator);

export default App;

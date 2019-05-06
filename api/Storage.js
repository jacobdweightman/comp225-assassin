import { SecureStore } from 'expo';

export default class Storage {
  /* This class contains methods for handling permanent storage on the device.
   * the application state data that is stored is an object (thought to be)
   * structured as follows. The data is stored in SecureStore as a single
   * serialization.
   *
   * {
   *   game: {
   *     code: the code of the game as a number,
   *     name: the name of the game as a string,
   *     rules: the (cached) rules for the game as a string,
   *     state: one of 'NOT_IN_GAME', 'GAME_WAITING', or 'GAME_PLAYING',
   *   },
   *   player: {
   *     creator: true or false,
   *     firstName: the player's first name as a string,
   *     lastName: the player's last name as a string,
   *     accessToken: the player's JavaScript web token as a string,
   *   }
   * }
   */

  static async storeState(state) {
    SecureStore.setItemAsync('state', JSON.stringify(state));
  }

  static async readPreviousState() {
    return SecureStore.getItemAsync('state')
    .then((state) => {
      return JSON.parse(state);
    });
  }
}

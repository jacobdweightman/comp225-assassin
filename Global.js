import { SecureStore } from 'expo';

class Global {
    constructor() {
        this.BASE_URL = "http://10.0.2.2:5000/"; //"https://elcoanja.herokuapp.com/"
        // NOTE: this is the loopback address for Android Studio, using localhost / 127.0.0.1 will not work
        // see:   https://developer.android.com/studio/run/emulator-networking
        this.accessToken;
    }

    async storeAccessToken(token) {
      this.accessToken = token;
      await SecureStore.setItemAsync('accessToken', token);
    }

    // this function is called when the app starts in App.js
    async loadAccessToken() {
      await SecureStore.getItemAsync('accessToken')
      .then((accessToken) => {
        this.accessToken = accessToken;
      });
    }

    // this function should be called whenever the user leaves a game
    async clearAccessToken() {
        console.log("token cleared!");
      await SecureStore.deleteItemAsync('accessToken');
    }
}

global = new Global();
export default global;

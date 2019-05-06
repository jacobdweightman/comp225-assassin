class Global {
    constructor() {
        this.BASE_URL = "http://10.0.2.2:5000/"; //"https://elcoanja.herokuapp.com/"
        // NOTE: this is the loopback address for Android Studio, using localhost / 127.0.0.1 will not work
        // see:   https://developer.android.com/studio/run/emulator-networking
        this.accessToken;
    }
}

global = new Global();
export default global;

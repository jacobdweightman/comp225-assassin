class Global {
    constructor() {
        this.creator;
        this.gameName;
        this.gameRules;
        this.code;
        this.playerID = undefined;
        this.playersKillCode = undefined;
        this.firstName = "";
        this.lastName = "";
        this.playerList = [
          {first: 'Jacob', last: 'Weightman'},
          {first: 'Ellen', last: 'Graham'},
          {first: 'Corey', last: 'Pieper'},
          {first: 'Analeidi', last: 'Barrera'},
          {first: 'Paul', last: 'Cantrell'}
        ];
        this.BASE_URL = "http://10.0.2.2:5000/"
        // NOTE: this is the loopback address for Android Studio, using localhost / 127.0.0.1 will not work
        // see:   https://developer.android.com/studio/run/emulator-networking
        this.target;
    }
}

global = new Global();
export default global;

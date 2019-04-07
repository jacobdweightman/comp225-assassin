class Global {
    constructor() {
        this.creator;
        this.gameName = "Mac Assassin 2019";
        this.gameRules = "This is a place for the game creator to write some text about the house rules--for instance, in this game assassinations are made by publically serenading your target. For the target to die of embarassment, there must be a section ofCOMP-225 present.";
        this.code;
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
    }
}

global = new Global();
export default global;

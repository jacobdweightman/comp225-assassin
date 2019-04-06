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
    }
}

global = new Global();
export default global;

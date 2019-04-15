import React from 'react';

export default class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
    };
  }

  refreshList() {
    if(!this.props.creator) {
      // Right now, this just fetches the player list from global. Later, it should
      // be adapted to use the API.
      this.setState(prev => {

      })
    }
  }

  render() {
    if(this.props.creator) {
      return (
        <View></View>
      );
    } else {
      return <View></View>;
    }
  }
}

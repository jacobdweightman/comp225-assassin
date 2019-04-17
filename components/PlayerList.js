import React from 'react';
import { FlatList, Text, View } from 'react-native';

import baseStyle from '../UI/defaultStyles/DefaultStyle';
import global from '../Global';

export default class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: props.players || [],
    };

    this.refreshList();
  }

  refreshList() {
    fetch(global.BASE_URL + "creator_access/player_list", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        player_id: global.playerID,
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      let players = [];

      for(player of json.players) {
        players.push({
          first: player.player_first_name,
          last: player.player_last_name,
        });
      }

      this.setState({players});
    })
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text style={baseStyle.subTitle}>Player List:</Text>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={this.state.players}
          renderItem={({item}) => <Text style={baseStyle.listItem}>{item.last},&#9;&#9;{item.first}</Text>}
          keyExtractor={(item,index)=>item.last}
        />
      </View>
    );
  }
}

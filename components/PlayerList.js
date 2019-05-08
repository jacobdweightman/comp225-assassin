import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import baseStyle from '../UI/defaultStyles/DefaultStyle';
import global from '../Global';

export default class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: props.players || [],
    };

    this.refreshList();
    this.interval = setInterval(this.refreshList, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refreshList = () => {
    fetch(global.BASE_URL + "creator_access/player_list", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + global.accessToken,
      }
    })
    .then((response) => {
      if(response.status === 200) {
        return response.json();
      } else {
        return {players: []};
      }
    })
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
        <Text style={[baseStyle.subTitle, styles.subTitle]}>Player List:</Text>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={this.state.players}
          renderItem={({item}) => <Text style={baseStyle.listItem}>{item.last},&#9;&#9;{item.first}</Text>}
          keyExtractor={(item,index) => "item-" + index}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  subTitle:{
    fontSize:wp("8%")
  }
});

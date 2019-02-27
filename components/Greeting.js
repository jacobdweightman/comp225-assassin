import React from 'react';
import { View, Text, Button } from 'react-native';

class Greeting extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello, {this.props.name}</Text>
        <Button title="Join Game" color="#CCC" />
        <Button title="Create Game" color="#CCC" />
      </View>
    );
  }
}

export default Greeting;

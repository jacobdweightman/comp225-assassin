import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default class JoinGame1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameCode: ""
    };
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Enter game code:</Text>
        <TextInput
            style={styles.inputText}
            onChangeText={(text) => this.setState({text})}
            placeholder={"Game code"}
            placeholderTextColor={"#888"}
            autoFocus={true}
        />
        <Button
            onPress={()=>navigate("join2")}
            title="Join Game"
            color="#7d97c1"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputLabel: {
    fontSize: 36,
    color: "#eee"
  },

  inputText: {
    fontSize: 24,
    color: "#ddd"
  }
});

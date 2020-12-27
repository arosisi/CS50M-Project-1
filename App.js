import React from "react";
import { StyleSheet, View } from "react-native";

import Timer from "./Timer";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Timer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

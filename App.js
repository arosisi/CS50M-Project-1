import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import Settings from "./Settings";
import Timer from "./Timer";

const SECS_FOR_WORK = 25 * 60;
const SECS_FOR_REST = 5 * 60;

export default class App extends React.Component {
  state = {
    secsForWork: SECS_FOR_WORK,
    secsForRest: SECS_FOR_REST
  };

  setDurations = (secsForWork, secsForRest) => {
    this.setState({ secsForWork, secsForRest });
  };

  render() {
    const { secsForWork, secsForRest } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.settings}>
          <Settings
            secsForWork={secsForWork}
            secsForRest={secsForRest}
            setDurations={this.setDurations}
          />
        </View>
        <View style={styles.timer}>
          <Timer secsForWork={secsForWork} secsForRest={secsForRest} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settings: {
    marginTop: Constants.statusBarHeight,
    alignItems: "flex-end"
  },
  timer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

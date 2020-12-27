import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

import { vibrate } from "./utils";

const styles = StyleSheet.create({
  buttons: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  time: {
    fontSize: 50,
    textAlign: "center"
  },
  text: {
    marginTop: 20,
    textAlign: "center"
  }
});

const SECS_FOR_WORK = 25 * 60;
const SECS_FOR_REST = 5 * 60;

STATUSES = {
  NOT_STARTED: "NOT_STARTED",
  STARTED: "STARTED",
  PAUSED: "PAUSED"
};

export default class Timer extends React.Component {
  state = {
    secsForWork: SECS_FOR_WORK,
    secsForRest: SECS_FOR_REST,
    status: STATUSES.NOT_STARTED,
    isManagingWorkTime: true
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  resetTimer = () => {
    this.stopTimer();
    this.setState({
      secsForWork: SECS_FOR_WORK,
      secsForRest: SECS_FOR_REST,
      isManagingWorkTime: true
    });
  };

  startTimer = () => {
    this.stopTimer();
    if (this.state.isManagingWorkTime) {
      this.interval = this.setWorkInterval();
    } else {
      this.interval = this.setRestInterval();
    }
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  setWorkInterval = () =>
    setInterval(
      () =>
        this.setState(
          prevState => ({
            secsForWork: prevState.secsForWork - 1
          }),
          this.checkAndHandleTimerReachesZero
        ),
      1000
    );

  setRestInterval = () =>
    setInterval(
      () =>
        this.setState(
          prevState => ({
            secsForRest: prevState.secsForRest - 1
          }),
          this.checkAndHandleTimerReachesZero
        ),
      1000
    );

  checkAndHandleTimerReachesZero = () => {
    const { secsForWork, secsForRest, isManagingWorkTime } = this.state;
    if (isManagingWorkTime) {
      if (!secsForWork) {
        this.setState(
          {
            secsForWork: SECS_FOR_WORK,
            isManagingWorkTime: false
          },
          this.startTimer
        );
        vibrate();
      }
    } else {
      if (!secsForRest) {
        this.setState(
          {
            secsForRest: SECS_FOR_REST,
            isManagingWorkTime: true
          },
          this.startTimer
        );
        vibrate();
      }
    }
  };

  getMinsAndSecs = totalSecs => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs - mins * 60;
    const minsStr = mins < 10 ? `0${mins}` : mins;
    const secsStr = secs < 10 ? `0${secs}` : secs;
    return `${minsStr}:${secsStr}`;
  };

  render() {
    const { secsForWork, secsForRest, status, isManagingWorkTime } = this.state;
    const minsAndSecs = isManagingWorkTime
      ? this.getMinsAndSecs(secsForWork)
      : this.getMinsAndSecs(secsForRest);
    const text =
      status === STATUSES.NOT_STARTED
        ? "Press START to start timer."
        : status === STATUSES.STARTED
        ? isManagingWorkTime
          ? "Are you working hard?"
          : "Are you enjoying your break?"
        : "Timer is paused.";
    return (
      <View>
        <View style={styles.buttons}>
          <Button
            title='Start'
            disabled={status === STATUSES.STARTED}
            onPress={() =>
              this.setState({ status: STATUSES.STARTED }, this.startTimer)
            }
          />
          <Button
            title='Stop'
            disabled={status !== STATUSES.STARTED}
            onPress={() =>
              this.setState({ status: STATUSES.PAUSED }, this.stopTimer)
            }
          />
          <Button
            title='Reset'
            disabled={status === STATUSES.NOT_STARTED}
            onPress={() =>
              this.setState({ status: STATUSES.NOT_STARTED }, this.resetTimer)
            }
          />
        </View>
        <Text style={styles.time}>{minsAndSecs}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

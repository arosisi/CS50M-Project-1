import React from "react";
import { StyleSheet, View, Modal, Button, TextInput, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 35,
    paddingHorizontal: 50,
    alignItems: "center",
    elevation: 5
  },
  input: {
    height: 40,
    width: 150,
    marginBottom: 20,
    borderColor: "gray",
    borderRadius: 1,
    borderWidth: 1,
    textAlign: "center",
    fontSize: 20
  },
  buttons: {
    width: 140,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const secsToMins = secs => (secs / 60).toString();

export default class Settings extends React.Component {
  static propTypes = {
    secsForWork: PropTypes.number.isRequired,
    secsForRest: PropTypes.number.isRequired,
    setDurations: PropTypes.func.isRequired
  };

  state = {
    showSettingsModal: false,
    minsForWork: secsToMins(this.props.secsForWork),
    minsForRest: secsToMins(this.props.secsForRest)
  };

  closeSettingsModal = () => this.setState({ showSettingsModal: false });

  closeSettingsModalAndReset = () =>
    this.setState({
      showSettingsModal: false,
      minsForWork: secsToMins(this.props.secsForWork),
      minsForRest: secsToMins(this.props.secsForRest)
    });

  setMinsForWork = text => {
    if (!text || text.match(/^[1-9]+[0-9]*$/)) {
      this.setState({ minsForWork: text });
    }
  };

  setMinsForRest = text => {
    if (!text || text.match(/^[1-9]+[0-9]*$/)) {
      this.setState({ minsForRest: text });
    }
  };

  render() {
    const { minsForWork, minsForRest } = this.state;
    return (
      <View>
        <FontAwesome.Button
          name='cog'
          backgroundColor='white'
          color='black'
          onPress={() => this.setState({ showSettingsModal: true })}
        >
          Settings
        </FontAwesome.Button>

        <Modal
          transparent={true}
          visible={this.state.showSettingsModal}
          onRequestClose={this.closeSettingsModalAndReset}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text>Work duration in mins:</Text>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                onChangeText={this.setMinsForWork}
                value={minsForWork}
              />

              <Text>Rest duration in mins:</Text>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                onChangeText={this.setMinsForRest}
                value={minsForRest}
              />

              <View style={styles.buttons}>
                <Button
                  title='Cancel'
                  color='#7B7B7B'
                  onPress={this.closeSettingsModalAndReset}
                />
                <Button
                  title='Save'
                  disabled={!minsForWork || !minsForRest}
                  onPress={() => {
                    this.props.setDurations(
                      parseInt(minsForWork) * 60,
                      parseInt(minsForRest) * 60
                    );
                    this.closeSettingsModal();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

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

export default class Settings extends React.Component {
  static propTypes = {
    secsForWork: PropTypes.number.isRequired,
    secsForRest: PropTypes.number.isRequired,
    setDurations: PropTypes.func.isRequired
  };

  state = {
    showSettingsModal: false,
    secsForWork: this.props.secsForWork,
    secsForRest: this.props.secsForRest
  };

  closeSettingsModal = () => this.setState({ showSettingsModal: false });

  closeSettingsModalAndReset = () =>
    this.setState({
      showSettingsModal: false,
      secsForWork: this.props.secsForWork,
      secsForRest: this.props.secsForRest
    });

  setSecsForWork = text => {
    const mins = parseInt(text) || 0;
    this.setState({ secsForWork: mins * 60 });
  };

  setSecsForRest = text => {
    const mins = parseInt(text) || 0;
    this.setState({ secsForRest: mins * 60 });
  };

  render() {
    const { secsForWork, secsForRest } = this.state;
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
                onChangeText={this.setSecsForWork}
                value={(secsForWork / 60 || "").toString()}
              />

              <Text>Rest duration in mins:</Text>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                onChangeText={this.setSecsForRest}
                value={(secsForRest / 60 || "").toString()}
              />

              <View style={styles.buttons}>
                <Button
                  title='Cancel'
                  color='#7B7B7B'
                  onPress={this.closeSettingsModalAndReset}
                />
                <Button
                  title='Save'
                  disabled={!secsForWork || !secsForRest}
                  onPress={() => {
                    this.props.setDurations(secsForWork, secsForRest);
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

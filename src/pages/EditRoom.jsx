import React, { Component } from "react";
import RoomForm from "../components/RoomForm.jsx";
import {
  fetchAppliances,
  retrieveRoom,
  fetchApplianceTypes,
  putRoom,
  postApp,
  deleteAppliance
} from "../restapis/restApis.js";

class EditRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { applianceTypes: [], room: {}, appliances: [] };
  }
  cancel(event) {
    this.props.history.goBack();
  }

  componentDidMount() {
    this.fetchRoom();
  }

  handleAddAppliance(appliance) {
    if (this.state.appliances.length === 0) {
      appliance.td = 1;
    } else {
      appliance.td =
        this.state.appliances[this.state.appliances.length - 1].td + 1;
    }
    this.setState({ appliances: [...this.state.appliances, appliance] });
  }

  fetchRoom() {
    retrieveRoom(this.props.match.params.roomId).then(resp => {
      this.setState({ room: resp.data[0] });
      fetchAppliances(this.props.match.params.roomId).then(appliances => {
        appliances.data.forEach(e => (e.td = e.id));
        this.setState({ appliances: appliances.data });
        fetchApplianceTypes().then(e => {
          this.setState({ applianceTypes: e.data });
        });
      });
    });
  }

  deleteAppliance(id) {
    this.setState({
      appliances: this.state.appliances.filter(appl => appl.td !== id)
    });
  }

  handleSubmit(event, appliances) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.updateRoom(form.elements.name.value);
    }
  }

  updateRoom(roomName) {
    putRoom(this.state.room, roomName, this.props.match.params.houseId)
      .then(resp => {
        this.updateAppliances();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateAppliances() {
    fetchAppliances(this.state.room.id)
      .then(resp => {
        if (resp.data.length !== 0) {
          this.deleteApplianceCall(
            resp.data,
            this.state.appliances,
            resp.data[0],
            0
          );
        } else {
          if (this.state.appliances.length !== 0) {
            this.postAppliance(
              this.state.appliances,
              this.state.appliances[0],
              0
            );
          } else {
            this.props.history.goBack();
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteApplianceCall(appliances, updatedList, appliance, index) {
    return deleteAppliance(appliance.id).then(resp => {
      index++;
      if (index !== appliances.length) {
        this.deleteApplianceCall(
          appliances,
          updatedList,
          appliances[index],
          index
        );
      } else {
        if (updatedList.length !== 0) {
          this.postAppliance(updatedList, updatedList[0], 0);
        } else {
          this.props.history.goBack();
        }
      }
    });
  }

  postAppliance(appliances, appliance, index) {
    return postApp(
      appliance.onOff,
      appliance.tag,
      appliance.type,
      appliance.temperature,
      this.state.room.id
    ).then(resp => {
      index++;
      if (index !== appliances.length) {
        this.postAppliance(appliances, appliances[index], index);
      } else {
        this.props.history.goBack();
      }
    });
  }

  render() {
    return (
      <RoomForm
        edit
        room={this.state.room}
        handleSubmit={(event, appliances) =>
          this.handleSubmit(event, appliances)
        }
        handleAddAppliance={e => this.handleAddAppliance(e)}
        deleteAppliance={e => this.deleteAppliance(e)}
        applianceTypes={this.state.applianceTypes}
        appliances={this.state.appliances}
        cancel={() => {
          this.props.history.goBack();
        }}
      />
    );
  }
}

export default EditRoom;

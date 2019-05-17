import React, { Component } from "react";
import RoomForm from "../components/RoomForm.jsx";
import {
  fetchApplianceTypes,
  postRoom,
  postApp
} from "../restapis/restApis.js";

const roomDefaultValue = {
  humidity: 36,
  roomTemp: 28
};

class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { applianceTypes: [], appliances: [] };
  }
  cancel(event) {
    this.props.history.goBack();
  }

  componentDidMount() {
    this.fetchApplianceTypes();
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

  fetchApplianceTypes() {
    fetchApplianceTypes()
      .then(resp => {
        this.setState({ applianceTypes: resp.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      postRoom(
        form.elements.name.value,
        roomDefaultValue.humidity,
        roomDefaultValue.roomTemp,
        this.props.match.params.houseId
      )
        .then(resp => {
          if (this.state.appliances.length !== 0) {
            this.postAppliance(
              this.state.appliances,
              this.state.appliances[0],
              resp.data.id,
              0
            );
          } else {
            this.props.history.goBack();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  postAppliance(appliances, appliance, roomId, index) {
    return postApp(
      "OFF",
      appliance.tag,
      appliance.type,
      appliance.temperature,
      roomId
    ).then(resp => {
      index++;
      if (index !== appliances.length) {
        this.postAppliance(appliances, appliances[index], roomId, index);
      } else {
        this.props.history.goBack();
      }
    });
  }

  deleteAppliance(id) {
    this.setState({
      appliances: this.state.appliances.filter(appl => appl.td !== id)
    });
  }

  render() {
    return (
      <RoomForm
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

export default AddRoom;

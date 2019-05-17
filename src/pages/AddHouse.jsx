import React, { Component } from "react";
import HouseForm from "../components/HouseForm.jsx";
import { postHouse } from "../restapis/restApis.js";

const houseDefaultValue = {
  humidity: 36,
  outsideTemp: 24,
  avgHouseTemp: 28,
  openDevices: 0
};

class AddHouse extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      lat: 39.9334,
      lng: 32.8597,
      address: "ANKARA",
      country: "ANKARA",
      city: "ANKARA"
    };
  }

  cancel(event) {
    this.props.history.goBack();
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      postHouse(
        form.elements.name.value,
        houseDefaultValue.humidity,
        houseDefaultValue.outsideTemp,
        houseDefaultValue.avgHouseTemp,
        this.state.address,
        this.state.country,
        this.state.city,
        this.state.lat,
        this.state.lng
      )
        .then(resp => {
          console.log(resp.data);
          this.props.history.push("/houses");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  setLatLng(lat, lng) {
    this.setState({ lat: lat, lng: lng });
  }
  setCityCountryAddress(city, country, address) {
    this.setState({
      address: address,
      country: country,
      city: city
    });
  }
  render() {
    return (
      <HouseForm
        handleSubmit={e => this.handleSubmit(e)}
        cancel={e => this.cancel(e)}
        setLatLng={(lat, lng) => this.setLatLng(lat, lng)}
        setCityCountryAddress={(city, country, address) =>
          this.setCityCountryAddress(city, country, address)
        }
        lat={this.state.lat}
        lng={this.state.lng}
      />
    );
  }
}

export default AddHouse;

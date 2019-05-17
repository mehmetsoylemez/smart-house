import React, { Component } from "react";
import HouseForm from "../components/HouseForm.jsx";
import { editHouse, retrieveHouse } from "../restapis/restApis.js";

class EditHouse extends Component {
  constructor(props) {
    super(props);
    this.state = { house: { rooms: [] } };
  }
  componentDidMount() {
    this.fetchHouse();
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
      editHouse(this.state.house, form.elements.name.value)
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
    var house = { ...this.state.house };
    house.lat = lat;
    house.lng = lng;
    this.setState({ house });
  }
  setCityCountryAddress(c, cou, addr) {
    var house = { ...this.state.house };
    house.address = addr;
    house.country = cou;
    house.city = c;
    this.setState({ house });
  }

  fetchHouse() {
    retrieveHouse(this.props.match.params.houseId)
      .then(resp => {
        this.setState({ house: resp.data[0] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <HouseForm
        edit
        house={this.state.house}
        handleSubmit={e => this.handleSubmit(e)}
        cancel={e => this.cancel(e)}
        setLatLng={(lat, lng) => this.setLatLng(lat, lng)}
        setCityCountryAddress={(city, country, address) =>
          this.setCityCountryAddress(city, country, address)
        }
        lat={this.state.house.lat}
        lng={this.state.house.lng}
      />
    );
  }
}

export default EditHouse;

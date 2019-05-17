import React from "react";
import {
  Form,
  Button,
  Col,
  Container,
  ButtonToolbar,
  Jumbotron
} from "react-bootstrap";
import GoogleMap from "./GoogleMapContainer.jsx";
import Geocode from "react-geocode";

class HouseForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      validated: false
    };
    Geocode.setApiKey("AIzaSyAovxsdHSsV8s9G6633T_ISO9T7h5StJtA");
  }

  cancel(event) {
    this.props.cancel();
  }

  isFiltered(item, filterType) {
    let country = false;
    item.forEach(type => {
      if (type === filterType) {
        country = true;
      }
    });
    return country;
  }
  handleHouseLocationChange(latitude, longtitude) {
    this.props.setLatLng(latitude, longtitude);

    Geocode.fromLatLng(latitude, longtitude).then(
      response => {
        const address = response.results[0].formatted_address;
        let resList = response.results[0].address_components.filter(item =>
          this.isFiltered(item.types, "country")
        );
        let cityList = response.results[0].address_components.filter(item =>
          this.isFiltered(item.types, "locality")
        );
        cityList =
          cityList.length > 0
            ? cityList
            : response.results[0].address_components.filter(item =>
                this.isFiltered(item.types, "administrative_area_level_1")
              );
        let countryName = resList.length > 0 ? resList[0].long_name : "Unknown";
        let cityName = cityList.length > 0 ? cityList[0].long_name : "Unknown";
        this.props.setCityCountryAddress(cityName, countryName, address);
      },
      error => {
        console.error(error);
      }
    );
  }
  handleSubmit(event) {
    this.setState({ validated: true });
    this.props.handleSubmit(event);
  }

  render() {
    const { validated } = this.state;
    return (
      <Jumbotron>
        <Container>
          <Form
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
          >
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="House Name"
                  defaultValue={
                    this.props.edit === true
                      ? this.props.house.name
                      : "My House"
                  }
                  name="name"
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Location</Form.Label>
                <GoogleMap
                  dynamicCenter={{
                    lat: this.props.lat,
                    lng: this.props.lng
                  }}
                  dynamicZoom={14}
                  onHouseLocationChange={(lat, lng) =>
                    this.handleHouseLocationChange(lat, lng)
                  }
                  markerText={"My House"}
                />
              </Form.Group>
            </Form.Row>
            <ButtonToolbar style={{ padding: "10px" }}>
              <Button type="submit">
                {this.props.edit === true ? "Edit House" : "Add House"}
              </Button>
              <Button
                variant="outline-primary"
                style={{ marginLeft: "10px" }}
                onClick={e => this.cancel(e)}
              >
                Cancel
              </Button>
            </ButtonToolbar>
          </Form>
        </Container>
      </Jumbotron>
    );
  }
}

export default HouseForm;

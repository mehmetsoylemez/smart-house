import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function HouseDetailProperties(props) {
  return (
    <ListGroup className="list-group-flush">
      <ListGroupItem>
        Outside Temp : {props.house.outsideTemp} &deg;C
      </ListGroupItem>
      <ListGroupItem>
        Avg House Temp : {props.house.avgHouseTemp} &deg;C
      </ListGroupItem>
      <ListGroupItem>Humidity : {props.house.humidity} %</ListGroupItem>
    </ListGroup>
  );
}

export default HouseDetailProperties;

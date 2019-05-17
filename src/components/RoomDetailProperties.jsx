import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function RoomDetailProperties(props) {
  return (
    <ListGroup className="list-group-flush">
      <ListGroupItem>
        Avg Room Temp : {props.room.roomTemp} &deg;C
      </ListGroupItem>
      <ListGroupItem>Humidity : {props.room.humidity} %</ListGroupItem>
    </ListGroup>
  );
}

export default RoomDetailProperties;

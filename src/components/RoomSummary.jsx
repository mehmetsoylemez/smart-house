import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CustomInput from "./InputWithOutsideClickHandler.jsx";
import RoomDetailProperties from "./RoomDetailProperties.jsx";

function RoomSummary(props) {
  const [simpleEditClicked, setSimpleEditClicked] = useState(false);
  const [roomName, setRoomName] = useState(props.room.name);
  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          {simpleEditClicked ? (
            <CustomInput
              handleOutsideClick={value => {
                props.editRoom(props.room, value);
                setSimpleEditClicked(false);
                setRoomName(value);
              }}
              defaultValue={roomName}
            />
          ) : (
            <LinkContainer to={`/house/room/detail/${props.room.id}`}>
              <Card.Link>
                <div>
                  <i
                    className="fa fa-universal-access fa-2x"
                    style={{ color: "#D78687" }}
                  />
                  <Card.Title
                    className="text-center"
                    style={{
                      fontSize: "30px",
                      color: "#D78687",
                      textDecoration: "underline"
                    }}
                  >
                    {roomName}
                  </Card.Title>
                </div>
              </Card.Link>
            </LinkContainer>
          )}
        </Card.Header>
        <RoomDetailProperties room={props.room} />
        <Card.Body>
          <Card.Link
            href=""
            onClick={event => {
              event.preventDefault();
              props.deleteRoom(props.room.id);
            }}
          >
            Delete
          </Card.Link>
          <Card.Link
            href=""
            onClick={event => {
              event.preventDefault();
              setSimpleEditClicked(true);
            }}
          >
            Simple Edit
          </Card.Link>
          <LinkContainer
            to={`/house/room/edit/${props.room.id}/${props.house.id}`}
          >
            <Card.Link>Edit</Card.Link>
          </LinkContainer>
        </Card.Body>
      </Card>
    </div>
  );
}
export default RoomSummary;

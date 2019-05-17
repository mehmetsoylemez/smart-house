import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import CustomInput from "./InputWithOutsideClickHandler.jsx";
import Switch from "@material-ui/core/Switch";
import { putApplianceProperty } from "../restapis/restApis.js";

function DefaultApplianceSummary(props) {
  const [simpleEditClicked, setSimpleEditClicked] = useState(false);
  const [applianceName, setApplianceName] = useState(props.appliance.tag);
  const [checked, setChecked] = useState(
    props.appliance.onOff === "ON" ? true : false
  );

  const handleOnOffChange = event => {
    putApplianceProperty(
      props.appliance,
      event.target.checked === true ? "ON" : "OFF",
      "undefined",
      props.room.id
    )
      .then(resp => {
        setChecked(resp.data.onOff === "ON" ? true : false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          {simpleEditClicked ? (
            <CustomInput
              handleOutsideClick={value => {
                props.editAppliance(props.appliance, value);
                setSimpleEditClicked(false);
                setApplianceName(value);
              }}
              defaultValue={applianceName}
            />
          ) : (
            <Card.Link>
              <div>
                <i
                  className="fa fa-sitemap fa-2x"
                  style={{ color: "#D78687" }}
                />
                <Card.Title
                  className="text-center"
                  style={{
                    fontSize: "30px",
                    color: "#D78687"
                  }}
                >
                  {applianceName}
                </Card.Title>
              </div>
            </Card.Link>
          )}
        </Card.Header>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <p
              className="text-center"
              style={{
                fontWeight: "bold",
                color: "#D78612"
              }}
            >
              {props.appliance.type}
            </p>
          </ListGroupItem>
          <ListGroupItem>
            <p className="text-center">
              <Switch checked={checked} onChange={handleOnOffChange} />
            </p>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link
            href=""
            onClick={event => {
              event.preventDefault();
              props.deleteAppliance(props.appliance.id);
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
            Edit
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}
export default DefaultApplianceSummary;

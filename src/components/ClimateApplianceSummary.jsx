import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import CustomInput from "./InputWithOutsideClickHandler.jsx";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import { putApplianceProperty } from "../restapis/restApis.js";

const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
};

function ClimateApplianceSummary(props) {
  const [simpleEditClicked, setSimpleEditClicked] = useState(false);
  const [applianceName, setApplianceName] = useState(props.appliance.tag);
  const [checked, setChecked] = useState(
    props.appliance.onOff === "ON" ? true : false
  );
  const [temperature, setTemperature] = useState(
    typeof props.appliance.temperature === "undefined"
      ? 0
      : props.appliance.temperature
  );

  const handleNext = () => {
    editTemperature(temperature + 1);
  };

  const handleBack = () => {
    editTemperature(temperature - 1);
  };

  const editTemperature = newTemperature => {
    putApplianceProperty(
      props.appliance,
      checked === true ? "ON" : "OFF",
      newTemperature,
      props.room.id
    )
      .then(resp => {
        setTemperature(newTemperature);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const { classes, theme } = props;

  const handleOnOffChange = event => {
    putApplianceProperty(
      props.appliance,
      event.target.checked === true ? "ON" : "OFF",
      temperature,
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
          <ListGroupItem>
            <p className="text-center">{temperature} &deg;C</p>
            <MobileStepper
              variant="progress"
              steps={40}
              position="static"
              activeStep={temperature}
              className={classes.root}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={temperature === 40}
                >
                  Up
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={temperature === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Down
                </Button>
              }
            />
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
ClimateApplianceSummary.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(ClimateApplianceSummary);

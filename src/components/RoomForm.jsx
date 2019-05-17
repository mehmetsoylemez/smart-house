import React, { useState } from "react";
import { Form, Button, Col, ButtonToolbar, Jumbotron } from "react-bootstrap";
import ApplianceForm from "../components/ApplianceForm.jsx";
import ApplianceTable from "../components/ApplianceTable.jsx";

const RoomForm = props => {
  const [validated, setValidated] = useState(false);

  const cancel = event => {
    props.cancel();
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValidated(true);
    props.handleSubmit(event);
  };

  return (
    <Jumbotron>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{ marginLeft: "30px" }}
      >
        <Form.Row>
          <Form.Group as={Col} sm controlId="validationCustom01">
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              defaultValue={props.edit === true ? props.room.name : ""}
              name="name"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            sm
            controlId="validationCustom02"
            style={{ marginLeft: "30px" }}
          >
            <ApplianceForm
              handleAddAppliance={e => props.handleAddAppliance(e)}
              applianceTypes={props.applianceTypes}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm controlId="validationCustom03">
            <Form.Label>Appliance List</Form.Label>
            <ApplianceTable
              appliances={props.appliances}
              deleteAppliance={e => props.deleteAppliance(e)}
            />
          </Form.Group>
        </Form.Row>
        <ButtonToolbar style={{ padding: "10px" }}>
          <Button type="submit">
            {props.edit === true ? "Edit Room" : "Add Room"}
          </Button>
          <Button
            variant="outline-primary"
            style={{ marginLeft: "10px" }}
            onClick={cancel}
          >
            Cancel
          </Button>
        </ButtonToolbar>
      </Form>
    </Jumbotron>
  );
};

export default RoomForm;

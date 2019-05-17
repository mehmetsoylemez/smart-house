import React, { useState } from "react";
import { Form, Button, Col, ButtonToolbar } from "react-bootstrap";

const ApplianceForm = props => {
  const initialFormState = { tag: "", type: "Curtain" };
  const [appliance, setAppliance] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setAppliance({ ...appliance, [name]: value });
  };

  const onAddClick = event => {
    event.preventDefault();
    if (!appliance.tag || !appliance.type) {
      return;
    }

    props.handleAddAppliance(appliance);
    setAppliance(initialFormState);
  };

  const invalid = () => {
    if (!appliance.tag || !appliance.type) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Form.Group as={Col} sm>
        <Form.Label>Tag</Form.Label>
        <Form.Control
          type="text"
          placeholder="Tag"
          name="tag"
          onChange={handleInputChange}
          value={appliance.tag}
          isInvalid={invalid()}
        />
      </Form.Group>
      <Form.Group as={Col} sm>
        <Form.Label>Appliance Type</Form.Label>

        <select
          name="type"
          className="custom-select"
          onChange={handleInputChange}
          defaultValue="Curtain"
        >
          {props.applianceTypes.map(appType =>
            appType.type === "Curtain" ? (
              <option selected key={appType.type} value={appType.type}>
                {appType.type}
              </option>
            ) : (
              <option key={appType.type} value={appType.type}>
                {appType.type}
              </option>
            )
          )}
        </select>
      </Form.Group>
      <Form.Group as={Col} sm>
        <Form.Label />
        <ButtonToolbar style={{ padding: "7px" }}>
          <Button onClick={onAddClick}>Add Appliance</Button>
        </ButtonToolbar>
      </Form.Group>
    </div>
  );
};

export default ApplianceForm;

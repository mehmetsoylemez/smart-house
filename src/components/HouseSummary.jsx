import React from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import HouseDetailItems from "./HouseDetailProperties.jsx";

function HouseSummary(props) {
  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          <LinkContainer to={`/house/detail/${props.house.id}`}>
            <Card.Link>
              <div>
                <i className="fa fa-home fa-3x" style={{ color: "#D78687" }} />
                <Card.Title
                  className="text-center"
                  style={{
                    fontSize: "30px",
                    color: "#D78687",
                    textDecoration: "underline"
                  }}
                >
                  {props.house.name}
                </Card.Title>
              </div>
            </Card.Link>
          </LinkContainer>
        </Card.Header>
        <Card.Body>
          <Card.Text>{props.house.address}</Card.Text>
        </Card.Body>
        <HouseDetailItems house={props.house} />
        <Card.Body>
          <Card.Link
            href=""
            onClick={event => {
              event.preventDefault();
              props.delete(props.house.id);
            }}
          >
            Delete
          </Card.Link>
          <LinkContainer to={`/house/edit/${props.house.id}`}>
            <Card.Link>Edit</Card.Link>
          </LinkContainer>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HouseSummary;

import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import HouseDetailItems from "../components/HouseDetailProperties.jsx";
import RoomSummary from "../components/RoomSummary.jsx";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  putRoom,
  retrieveHouse,
  retrieveRooms,
  deleteRoom
} from "../restapis/restApis.js";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});
class HouseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { house: {}, rooms: [] };
  }
  componentDidMount() {
    this.fetchHouse();
  }

  fetchHouse() {
    retrieveHouse(this.props.match.params.houseId).then(resp => {
      this.setState({ house: resp.data[0] });
      retrieveRooms(this.props.match.params.houseId).then(rooms => {
        this.setState({ rooms: rooms.data });
      });
    });
  }

  editRoom(room, value) {
    putRoom(room, value, this.state.house.id)
      .then(resp => {})
      .catch(error => {
        console.log(error);
      });
  }

  deleteRoom(id) {
    deleteRoom(id)
      .then(resp => {
        this.fetchHouse();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Jumbotron>
        <h1
          className="text-center"
          style={{
            fontSize: "50px",
            color: "#D78687"
          }}
        >
          <i className="fa fa-home fa-2x" style={{ color: "#D78687" }} />
          {this.state.house.name}
        </h1>
        <p />
        <p style={{ textAlign: "center" }}>{this.state.house.address}</p>
        <HouseDetailItems house={this.state.house} />
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={16}
            >
              {typeof this.state.rooms !== "undefined" ? (
                this.state.rooms.map(room => (
                  <Grid key={room.id} item>
                    <RoomSummary
                      house={this.state.house}
                      key={room.id}
                      room={room}
                      editRoom={(room, value) => this.editRoom(room, value)}
                      deleteRoom={id => this.deleteRoom(id)}
                    />
                  </Grid>
                ))
              ) : (
                <p />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Jumbotron>
    );
  }
}

export default withStyles(styles)(HouseDetail);

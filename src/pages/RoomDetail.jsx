import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import RoomDetailItems from "../components/RoomDetailProperties.jsx";
import DefaultApplianceSummary from "../components/DefaultApplianceSummary.jsx";
import ClimateApplianceSummary from "../components/ClimateApplianceSummary.jsx";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  retrieveAppliances,
  retrieveRoom,
  deleteAppliance,
  putAppliance
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
class RoomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { room: {}, appliances: [] };
  }
  componentDidMount() {
    this.fetchRoom();
  }

  fetchRoom() {
    retrieveRoom(this.props.match.params.roomId).then(resp => {
      this.setState({ room: resp.data[0] });
      retrieveAppliances(this.props.match.params.roomId).then(appliances =>
        this.setState({ appliances: appliances.data })
      );
    });
  }

  editAppliance(appliance, value) {
    putAppliance(appliance, value, this.state.room.id)
      .then(resp => {
        this.fetchRoom();
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteAppliance(id) {
    deleteAppliance(id)
      .then(resp => {
        this.fetchRoom();
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
          <i
            className="fa fa-universal-access fa-2x"
            style={{ color: "#D78687" }}
          />
          {this.state.room.name}
        </h1>
        <p />
        <RoomDetailItems room={this.state.room} />
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={16}
            >
              {typeof this.state.appliances !== "undefined" ? (
                this.state.appliances.map(appliance => (
                  <Grid key={appliance.id} item>
                    {appliance.type !== "Climate" ? (
                      <DefaultApplianceSummary
                        room={this.state.room}
                        key={appliance.id}
                        appliance={appliance}
                        editAppliance={(appliance, value) =>
                          this.editAppliance(appliance, value)
                        }
                        deleteAppliance={id => this.deleteAppliance(id)}
                      />
                    ) : (
                      <ClimateApplianceSummary
                        room={this.state.room}
                        key={appliance.id}
                        appliance={appliance}
                        editAppliance={(appliance, value) =>
                          this.editAppliance(appliance, value)
                        }
                        deleteAppliance={id => this.deleteAppliance(id)}
                      />
                    )}
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

export default withStyles(styles)(RoomDetail);

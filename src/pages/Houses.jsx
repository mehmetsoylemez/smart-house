import React, { Component } from "react";
import HouseSummary from "../components/HouseSummary.jsx";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  deleteHouse,
  retrieveHouses,
  retrieveHousesBySearchKey
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
class Houses extends Component {
  constructor(props) {
    super(props);
    this.state = { houses: [] };
  }
  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses() {
    let promise =
      typeof this.props.location.searchKey === "undefined"
        ? retrieveHouses()
        : retrieveHousesBySearchKey(this.props.location.searchKey);

    promise
      .then(resp => {
        this.setState({ houses: resp.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidUpdate(preProps) {
    if (this.props.location.searchKey !== preProps.location.searchKey) {
      this.fetchHouses();
    }
  }

  delete(houseId) {
    deleteHouse(houseId)
      .then(resp => {
        this.fetchHouses();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={16}
          >
            {this.state.houses.map(house => (
              <Grid key={house.id} item>
                <HouseSummary
                  key={house.id}
                  house={house}
                  delete={e => this.delete(e)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Houses);

import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import Houses from "./pages/Houses.jsx";
import Footer from "./components/Footer.jsx";
import AddHouse from "./pages/AddHouse.jsx";
import EditHouse from "./pages/EditHouse.jsx";
import HouseDetail from "./pages/HouseDetail.jsx";
import AddRoom from "./pages/AddRoom.jsx";
import EditRoom from "./pages/EditRoom.jsx";
import RoomDetail from "./pages/RoomDetail.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/MainNavigationbar.jsx";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (localStorage.getItem("user") === "YES") {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

function App() {
  return (
    <Router>
      <div style={{ maxHeight: "100%", maxWidth: "100%" }}>
        <Navbar />
        <PrivateRoute path="/home" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        {/* <Route path="/" component={HomePage} /> */}
        <PrivateRoute path="/houses" component={Houses} />
        <PrivateRoute path="/house/add" component={AddHouse} />
        <PrivateRoute path="/house/detail/:houseId" component={HouseDetail} />
        <PrivateRoute path="/house/edit/:houseId" component={EditHouse} />
        <PrivateRoute path="/house/room/add/:houseId" component={AddRoom} />
        <PrivateRoute path="/activities" component={<p> Future Work </p>} />
        <PrivateRoute path="/alerts" component={<p> Future Work </p>} />
        <PrivateRoute
          path="/house/room/edit/:roomId/:houseId"
          component={EditRoom}
        />
        <PrivateRoute
          path="/house/room/detail/:roomId"
          component={RoomDetail}
        />

        <Footer />
      </div>
    </Router>
  );
}

export default App;

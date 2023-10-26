import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {  
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark" style={{'backgroundColor': '#008fc3'}}>
        <div className="container">
          <div class="logo-container">
            <img  src="./img/vca_logo.png" alt="logo"/>
          </div>
          <Link className="navbar-brand" to="/calendar/">
            Viva con Agua - Calendar Microservice
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/calendar/" ? "active" : ""
                }`}
              >

                <Link className="nav-link" to="/calendar/">
                  Calendar
                  <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li
                className={`nav-item  ${
                  props.location.pathname === "/calendar/createAppointment" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/calendar/createAppointment">
                  Create an appointment
                </Link>
              </li>
              
              <li
                className={`nav-item  ${
                  props.location.pathname === "/calendar/contact" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/calendar/contact">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);

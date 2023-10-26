import React from 'react';
import Appointments from './Appointments';
import CreateAppointment from './CreateAppointment';
import UpdateAppointment from './UpdateAppointment';
import { createBrowserHistory } from 'history';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Contact } from "./";



function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/calendar" exact component={() => <Appointments />} />
          <Route path="/calendar/createAppointment" exact component={() => <CreateAppointment />} />
          <Route path="/calendar/updateAppointment" exact component={() => <UpdateAppointment />} />
          <Route path="/calendar/contact" exact component={() => <Contact />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));


export { default as Navigation } from "./Navigation";
export { default as Footer } from "./Footer";
export { default as Appointments } from "./Appointments";
export { default as CreateAppointment} from "./CreateAppointment";
export { default as Contact } from "./Contact";
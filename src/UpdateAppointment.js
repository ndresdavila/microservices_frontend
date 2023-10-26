import $ from 'jquery';
import React from 'react';
import swal from 'sweetalert';

const xhr = new XMLHttpRequest();

export default class Appointment extends React.Component {

    //appointment component
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            start_date: null,
            start_time: null,
            location: '',
            region: '',
            tasks: '',
            domain: '',
            access: 'FREE',
            participants: ''
        };

        this.nowDate = new Date();
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() + 4);


        //associate appointment attributes with input field functions
        this.nameChange = this.nameChange.bind(this);
        this.startDateChange = this.startDateChange.bind(this);
        this.startTimeChange = this.startTimeChange.bind(this);
        this.locationChange = this.locationChange.bind(this);
        this.regionChange = this.regionChange.bind(this);
        this.tasksChange = this.tasksChange.bind(this);
        this.participantsChange = this.participantsChange.bind(this);
        this.domainChange = this.domainChange.bind(this);
        this.accessChange = this.accessChange.bind(this);
        this.sendData = this.sendData.bind(this);

        this.defaultValueName = JSON.parse(localStorage.getItem('dataToUpdatePage')).name;
        this.defaultValueDate = new Date(JSON.parse(localStorage.getItem('dataToUpdatePage')).start_date).toISOString().substr(0,10);
        this.defaultValueTime = JSON.parse(localStorage.getItem('dataToUpdatePage')).start_time;
        this.defaultValueLocation = JSON.parse(localStorage.getItem('dataToUpdatePage')).location;
        this.defaultValueRegion = JSON.parse(localStorage.getItem('dataToUpdatePage')).region;
        this.defaultValueTasks = JSON.parse(localStorage.getItem('dataToUpdatePage')).tasks;
        this.defaultValueParticipants = JSON.parse(localStorage.getItem('dataToUpdatePage')).participants_string;
        this.defaultValueDomain = JSON.parse(localStorage.getItem('dataToUpdatePage')).domain;
        this.defaultValueAccess = JSON.parse(localStorage.getItem('dataToUpdatePage')).name;

    }

    startingZero(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }

    getDateFormatedString(date) {

        if (date instanceof Date) {
            return `${date.getFullYear()}-${this.startingZero(date.getMonth() + 1)}-${this.startingZero(date.getDate())}`;
        }
        else throw new Error('date is not a Date instance.');
    }

    getTimeFromatedString(date) {
        if (date instanceof Date) {
            return `${this.startingZero(date.getHours())}:${this.startingZero(date.getMinutes())}`;
        }
        else throw new Error('date is not a Date instance.');
    }




    render() {
        return <div>
            <span>
                <img src="./img/logo1.png" width='5%' alt="logo" />
            </span>

            <table style={{ width: '700px', margin: '10px auto' }}>
                <caption style={{ captionSide: 'top' }}>
                    <strong>Termin hinzufügen:</strong>
                </caption>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="name">Name:</label>
                        </td>
                        <td>
                            <input defaultValue={JSON.parse(localStorage.getItem('dataToUpdatePage')).name} type="text" id="name" name="name" maxLength="100" onChange={this.nameChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="datum">Datum:</label>
                        </td>
                        <td>
                            <input defaultValue={this.defaultValueDate} type="date" id="datum" name="startDate" onChange={this.startDateChange} ></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="uhrzeit">Uhrzeit:</label>
                        </td>
                        <td>
                            <input defaultValue={JSON.parse(localStorage.getItem('dataToUpdatePage')).start_time} type="time" id="uhrzeit" name="startTime" onChange={this.startTimeChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="bereich">Bereich:</label>
                        </td>
                        <td>
                            <input defaultValue={JSON.parse(localStorage.getItem('dataToUpdatePage')).domain} type="text" id="bereich" onChange={this.domainChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="ort">Ort</label>
                        </td>
                        <td>
                            <input defaultValue={JSON.parse(localStorage.getItem('dataToUpdatePage')).location} type="text" name="location" id="ort" onChange={this.locationChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="region" >Region:</label>
                        </td>
                        <td>
                            <input defaultValue={JSON.parse(localStorage.getItem('dataToUpdatePage')).region} type="text" id="region" onChange={this.regionChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="zugangsverfahren">Zugangsverfahren:</label>
                        </td>
                        <td>
                            <select name="access" id="zugangsverfahren" onChange={this.accessChange} > 
                                <option defaultValue={JSON.parse(localStorage.getItem('dataToUpdatePage')).region} selected>{JSON.parse(localStorage.getItem('dataToUpdatePage')).access}</option>
                                <option value="FREE" >FREE</option>
                                <option value="REGISTRATION">REGISTRATION</option>
                                <option value="APPLICATION">APPLICATION</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="tasks">Aufgabe:</label>
                        </td>
                        <td>
                            <input defaultValue={JSON.parse(localStorage.getItem('dataToUpdatePage')).tasks} type="text" id="tasks" name="tasks" onChange={this.tasksChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="participants">Teilnehmer:</label>
                        </td>
                        <td>
                            <input defaultValue={JSON.parse(localStorage.getItem('dataToUpdatePage')).participants_string} type="text" id="participants" name="participants" onChange={this.participantsChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <button onClick={this.sendData} className="btn btn-secondary btn-sm m-1" id="addAppointmentButton" >Update appointment
                            </button>

                            <button type="home" onClick={() => { window.location.href = './' }} className="btn btn-secondary btn-sm m-1" id="Appointments">
                                Show all appointments
                            </button>

                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    };



    sendData() {

        if (this.state.name === "") {
            console.log('Default: ', this.defaultValueName);
            this.state.name = this.defaultValueName;
        }
        if (this.state.start_date === null) {
            this.state.start_date = this.defaultValueDate;
        }
        if (this.state.start_time === null) {
            this.state.start_time = this.defaultValueTime;
        }
        if (this.state.location === "") {
            this.state.location = this.defaultValueLocation;
        }
        if (this.state.region === "") {
            this.state.region = this.defaultValueRegion;
        }
        if (this.state.tasks === "") {
           this.state.tasks = this.defaultValueTasks;
        }
        if (this.state.domain === "") {
            this.state.domain =  this.defaultValueDomain;
        }
        if (this.state.access === "") {
            this.state.access =  this.defaultValueAccess;
        }
        if (this.state.participants === "") {
            this.state.participants = this.defaultValueParticipants;
        }



        //check for empty fields
        if (this.state.name === "" || this.state.start_date === null ||
            this.state.start_time === null || this.state.location === "" ||
            this.state.region === "" || this.state.tasks === "" ||
            this.state.domain === "" || this.state.access === "" || this.state.participants === "") {
            swal({
                icon: 'error',
                title: 'Form incomplete',
                text: 'Please fill all the fields of the form'
            });
            return;
        }

        //check data format
        var date = new Date($('#datum').val());
        var year_int = JSON.stringify(date.getFullYear());
        if (!((year_int <= 9999) && (year_int >= 2021))) {
            swal({
                icon: 'error',
                title: 'Year is invalid',
                text: 'Please enter a 4-digit year'
            });
            return;
        }

        this.state.start_date = new Date(this.state.start_date).toISOString().split("T")[0].split("-").join("");
        console.log('DATUM: ', this.state.start_date);



        //send data
        console.log('STATE:', this.state);
        let json = JSON.stringify(this.state);
        xhr.open('PUT', 'http://localhost:3000/calendar-api/appointment/' + JSON.parse(localStorage.getItem('dataToUpdatePage')).id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(json);
        swal({
            icon: 'success',
            title: 'Appointment was updated'
        });
        localStorage.removeItem('dataToUpdatePage');
        setTimeout(() => {
            window.location.href = './';
        }, 1000);
        return;
    }

    nameChange(event) {
        this.setState({ name: event.target.value })
    }

    startDateChange(event) {
        let date = new Date(event.target.value);
        if (date < this.minDate || date > this.maxDate) {
            swal({
                icon: 'error',
                title: 'Slected date is invalid',
                text: 'Please select a valid date!'
            });
            this.setState({ start_date: this.getDateFormatedString(this.nowDate) });
        }
        else {
            this.setState({ start_date: event.target.value });
        }
    }
    startTimeChange(event) {
        let time = event.target.value;
        let date = new Date(this.state.start_date + " " + time);

        console.log(date);

        if (date < this.nowDate) {
            swal({
                icon: 'error',
                title: 'Slected time is invalid',
                text: 'Please select a time in future!'
            });
        }
        else {
            this.setState({ start_time: event.target.value });
        }
    }
    locationChange(event) {
        this.setState({ location: event.target.value })
    }
    domainChange(event) {
        this.setState({ domain: event.target.value })
    }

    regionChange(event) {
        this.setState({ region: event.target.value })
    }

    accessChange(event) {
        this.setState({ access: event.target.value })

    }

    tasksChange(event) {
        this.setState({ tasks: event.target.value })
    }

    participantsChange(event) {
        this.setState({ participants: event.target.value })
    }

}

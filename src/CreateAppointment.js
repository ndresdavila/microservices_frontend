import $ from 'jquery';
import React from 'react';
import swal from 'sweetalert';

const xhr = new XMLHttpRequest();

export default class Appointment extends React.Component {
     
    //appointment component
    constructor(props) {
         super(props);
         this.nowDate = new Date();
         this.maxDate = new Date();
         this.maxDate.setFullYear(this.maxDate.getFullYear() + 2);
         this.state = {
            name: '',
            start_date: null,
            start_time: null, 
            min_date: this.getDateFormatedString(this.nowDate),
            max_date: this.getDateFormatedString(this.maxDate),
            location:'',
            region:'',
            tasks:'',
            domain: '',            
            access: 'FREE',
            participants: ''
        };

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

             <table style={{width: '700px', margin: '10px auto'}}>
                 <caption style={{captionSide: 'top'}}>
                     <h3 className="font-weight-light">Create appointment:</h3>
                 </caption>
                 <tbody>
                    <tr>
                        <td>
                            <label htmlFor="name">Name:</label>
                        </td>
                        <td>
                            <input type="text" id="name" name="name" maxLength="100" value={this.state.testValue} onChange={this.nameChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="datum">Datum:</label>
                        </td>
                        <td>
                            <input type="date" id="datum" name="startDate" onChange={this.startDateChange} ></input>
                        </td>                     
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="uhrzeit">Uhrzeit:</label>
                        </td>
                        <td>
                            <input type="time" id="uhrzeit" name="startTime" onChange={this.startTimeChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="bereich">Bereich:</label>
                        </td>
                        <td>
                            <input type="text" id="bereich" onChange={this.domainChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="ort">Ort</label>
                        </td>
                        <td>
                            <input type="text" name="location" id="ort" onChange={this.locationChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="region" >Region:</label>
                        </td>
                        <td>
                            <input type="text" id="region" onChange={this.regionChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="zugangsverfahren">Zugangsverfahren:</label>
                        </td>
                        <td>
                            <select name="access" id="zugangsverfahren" onChange={this.accessChange}>
                                <option value="FREE" selected>Frei zugänglich</option>
                                <option value="REGISTRATION">Anmeldung erforderlich</option>
                                <option value="APPLICATION">Bewerbung erforderlich</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="tasks">Aufgabe:</label>
                        </td>
                        <td>
                            <input type="text" id="tasks" name="tasks" onChange={this.tasksChange}></input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="participants">Teilnehmer:</label>
                        </td>
                        <td>
                            <input type="text" id="participants" name="participants" onChange={this.participantsChange}></input>
                        </td>
                    </tr>

                    <tr>
                     <td colSpan="2">
                        <button onClick={this.sendData} className="btn btn-secondary btn-sm m-1" id="addAppointmentButton" >Add appointment 
                        </button>

                        <button type="home" onClick={()=>{window.location.href='./'}}  className="btn btn-secondary btn-sm m-1" id="Appointments">
                            Show all appointments
                        </button>                        

                     </td>
                 </tr>

                </tbody>
             </table>
        </div>
    };  
    
    

    sendData() {

        //check for empty fields
        if(this.state.name === "" || this.state.start_date === null ||
           this.state.start_time === null || this.state.location === "" ||
           this.state.region === "" || this.state.tasks === "" ||
           this.state.domain === "" || this.state.access === "" || this.state.participants === "" ){
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
        if(!((year_int <= 9999) && (year_int >= 0))){
            swal({
                icon: 'error',
                title: 'Year is invalid',
                text: 'Please enter a 4-digit year'
            });
            return;
        }

        let state = this.state;
        
        // this.state.start_date = new Date(this.state.start_date).toISOString().split("T")[0].split("-").join("");
        // console.log('DATUM: ', this.state.start_date);
        
        let obj = {
            name: state.name,
            start_date: state.start_date,
            start_time: state.start_time,
            location: state.location,
            region: state.region,
            tasks: state.tasks,
            domain: state.domain,
            access: state.access,
            participants: state.participants
        }


        //send data
        console.log('STATE:', this.state);
        let json = JSON.stringify(obj);
        xhr.open('POST', 'http://localhost:3000/calendar-api/appointment/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(json);
        swal({
            icon: 'success',
            title:'Appointment was saved'
        });
        setTimeout(() => {
            window.location.href = './';
        }, 1000);
        return;       
    }

    nameChange(event) {
        this.setState({name: event.target.value});        
    }

    startDateChange(event) {
        //let dateString = event.target.value;

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
        console.log(event.target.value);
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
    locationChange(event){
        this.setState({location: event.target.value})
    }
    domainChange(event) {
        this.setState({domain: event.target.value})
    }
    regionChange(event) {
        this.setState({region: event.target.value})
    }
    accessChange(event) {
        console.log(event.target);
        this.setState({access: event.target.value})
    }
    tasksChange(event) {
        this.setState({tasks: event.target.value})
    }
    participantsChange(event) {
        this.setState({participants: event.target.value})
    }
}

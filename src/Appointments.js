import React from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';

import swal from 'sweetalert';

const xhr = new XMLHttpRequest();

export default function Appointments() {
  $(function () {
    let dataToUpdatePage;


    let table = $('#appointments_table').DataTable({

      "ajax": {
        url: "http://localhost:3000/calendar-api/appointments/",
        dataSrc: 'appointments'
      },
      "columns": [
        { "data": "id" },
        { "data": "name" },
        {
          "data": "start_date", "render": function (data) {
            let date;
            date = new Date(data).toISOString().split("T")[0];
            return date;
          }
        },
        { "data": "start_time" },
        { "data": "location" },
        { "data": "region" },
        { "data": "tasks" },
        { "data": "domain" },
        { "data": "access" },
        {
          "data": "participants", "render": function (data, type, row, meta) {
            console.log(data);
            let participant = '';
            data.forEach(element => {
              participant += element.name + '<br>';

            });
            return participant;
          }
        }
      ],
      "bDestroy": true,

    });

    let selectedRaw;


    $('#appointments_table').on('click', 'tr', function () {
      $(this).toggleClass('selected');
      selectedRaw = table.row('tr.selected').data();
      if (selectedRaw) {
        $.get('http://localhost:3000/calendar-api/appointment/' + selectedRaw.id, function (response) {
          dataToUpdatePage = JSON.stringify(response.appointment);
          console.log('TEST!: ', dataToUpdatePage);
          localStorage.setItem('dataToUpdatePage', dataToUpdatePage);
        });
      }
    });

    $('#updateAppointment').on('click', function (event) {
      if (selectedRaw) {

      } else {
        event.preventDefault();
        swal({
          icon: 'error',
          title: 'Please choose an appointment'
        });

      }
    });

    $('#deleteAppointment').on('click', function (event) {
      if (selectedRaw) {
        xhr.open('DELETE', 'http://localhost:3000/calendar-api/appointment/' + selectedRaw.id, true);
        xhr.onload = function () {
          if (xhr.status == "200") {
            window.location.reload();
          } else {
            swal({
              icon: 'error',
              title: 'Appointment could not be deleted'
            });
          }
        }
        xhr.send(null);
      } else {
        event.preventDefault();
        swal({
          icon: 'error',
          title: 'Please choose an appointment'
        });
      }
    });


    function convertDate(date) {
      var event = new Date(date).toISOString();
      event = event.split("T")[0];
      event = event.split("-");
      event = event.join("");
      return event;
    }
    var icsFile;

    function makeIcsFile(input) {
      icsFile =
        "BEGIN:VCALENDAR\n" +
        "CALSCALE:GREGORIAN\n" +
        "METHOD:PUBLISH\n" +
        "PRODID:-//Test Cal//EN\n" +
        "VERSION:2.0\n" +
        "BEGIN:VEVENT\n" +
        "UID:test-1\n" +
        "DTSTART;VALUE=DATE:" +
        convertDate(input.start_date) +
        "\n" +
        "DTEND;VALUE=DATE:" +
        convertDate(input.start_date) +
        "\n" +
        "SUMMARY:" +
        input.name + ' at ' + input.location +
        "\n" +
        "DESCRIPTION:" + ' TODO: ' +
        input.tasks + ';' + ' Participants: ' + input.participants_string +
        "\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR";
    }

    $('#export').on('click', function (event) {
      if (selectedRaw) {
        console.log('TEST1:', selectedRaw.id);
        makeIcsFile(selectedRaw);
        //window.open("data:text/calendar;charset=utf8," + escape(icsFile));
        var uri = "data:text/calendar;charset=utf8," + escape(icsFile);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "display:none";
        link.download = `${selectedRaw.name}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } else {
        event.preventDefault();
        swal({
          icon: 'error',
          title: 'Please choose an appointment'
        });
      }

    });

  });

  return (
    <div>
      <br></br>
      <div className="table">
        <div className="table_title">
          <button className="btn btn-outline-secondary" style={{ 'float': 'left' }} type="button">
            <a href="./CreateAppointment">
              New appointment
            </a>
          </button>
          <button className="btn btn-outline-secondary" style={{ 'float': 'left' }} id='updateAppointment' type="button">
            <a href="./UpdateAppointment">
              Update appointment
            </a>
          </button>
          <button className="btn btn-outline-secondary" style={{ 'float': 'left' }} id='deleteAppointment' type="button">
            Delete appointment
          </button>
          <button className="btn btn-outline-secondary" style={{ 'float': 'left' }} id='export' type="button">
            Export appointment as ICS file
          </button>
          <br></br>
          <br></br>
        </div>
        <table style={{ 'borderRadius': '5px' }} id='appointments_table' >
          <thead style={{ 'backgroundColor': '#55a4b5' }}>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Datum</th>
              <th>Uhrzeit</th>
              <th>Ort</th>
              <th>Region</th>
              <th>Aufgaben</th>
              <th>Bereich</th>
              <th>Zugangsverfahren</th>
              <th>Teilnehmer</th>
            </tr>
          </thead>
        </table>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  )
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
function Get_appointments() {
  const [appointments, setappointments] = useState([]);

  useEffect(() => {
    getappointments();
  }, []);

  const getappointments = () => {
    axios
      .post("http://localhost/hospital_manegment/backend/api/appointment.php")
      .then(function (result) {
        setappointments(result.data);
      });
  };

  const deleteappointment = (id) => {
    axios.delete(
      `http://localhost/hospital_manegment/backend/api/edit_appointment.php/${id}`
    );
    getappointments();
  };
  return (
    <div>
      <h1>appointment List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient_name</th>
            <th>Doctor_name</th>
            <th>Appointment_date</th>
            <th>Room_id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, key) => (
            <tr key={key}>
              <td>{appointment.appointment_id}</td>
              <td>{appointment.patient_name}</td>
              <td>{appointment.doctor_name}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.room_id}</td>
              <td>
                <Link
                  className="link"
                  to={`/${appointment.appointment_id}/edit_appointment`}
                >
                  Edit
                </Link>
                <button
                  className="delete"
                  onClick={() => deleteappointment(appointment.appointment_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Get_appointments;

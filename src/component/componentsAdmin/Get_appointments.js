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
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getappointments();
  }, []);

  const getappointments = async () => {
    try {
      const result = await axios.post(
        "http://localhost/hospital_manegment/backend/api/appointment.php"
      );
      setAppointments(result.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(
        `http://localhost/hospital_manegment/backend/api/edit_appointment.php/${id}`
      );
      getappointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      deleteAppointment(id);
    }
  };

  return (
    <div>
      <h1>Appointment List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
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
                  onClick={() => confirmDelete(appointment.appointment_id)}
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

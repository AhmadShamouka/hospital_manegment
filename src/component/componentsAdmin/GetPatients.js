import axios from "axios";
import "./index.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
  useParams,
} from "react-router-dom";
function GetPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getpatients();
  }, []);

  const getpatients = () => {
    axios
      .post(
        "http://localhost/hospital_manegment/backend/api/selectPatients.php"
      )
      .then(function (result) {
        setPatients(result.data);
      });
  };
  const deletePatient = (id) => {
    axios.delete(
      `http://localhost/hospital_manegment/backend/api/edit_patients.php/${id}`
    );
    getpatients();
  };

  return (
    <div>
      <h1>Patients List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Disease</th>
            <th>Room</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, key) => (
            <tr key={key}>
              <td>{patient.patient_id}</td>
              <td>{patient.fname}</td>
              <td>{patient.lname}</td>
              <td>{patient.number}</td>
              <td>{patient.email}</td>
              <td>{patient.disease}</td>
              <td>{patient.room_id}</td>
              <td>
                <Link
                  className="link"
                  to={`/${patient.patient_id}/edit_patients`}
                >
                  Edit
                </Link>
                <button
                  className="delete"
                  onClick={() => deletePatient(patient.patient_id)}
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

export default GetPatients;

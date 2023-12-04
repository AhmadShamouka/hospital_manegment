import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
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

  return (
    <div>
      <h1>Patients List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Disease</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, key) => (
            <tr key={key}>
              <td>{patient.patient_id}</td>
              <td>{patient.fname}</td>
              <td>{patient.lname}</td>
              <td>{patient.email}</td>
              <td>{patient.disease}</td>
              <td>
                <Link to={`${patient.patient_id}/edit_patients`}>Edit</Link>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetPatients;

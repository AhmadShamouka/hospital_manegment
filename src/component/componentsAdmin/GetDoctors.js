import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
function GetDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = () => {
    axios
      .post("http://localhost/hospital_manegment/backend/api/selectDoctors.php")
      .then(function (result) {
        setDoctors(result.data);
      });
  };

  const deleteDoctor = (id) => {
    axios.delete(
      `http://localhost/hospital_manegment/backend/api/edit_doctor.php/${id}`
    );
    getDoctors();
  };
  return (
    <div>
      <h1>Doctor List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Expirtise</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, key) => (
            <tr key={key}>
              <td>{doctor.doctor_id}</td>
              <td>{doctor.fname}</td>
              <td>{doctor.lname}</td>
              <td>{doctor.email}</td>
              <td>{doctor.expertise}</td>
              <td>
                <Link className="link" to={`/${doctor.doctor_id}/edit_doctor`}>
                  Edit
                </Link>
                <button
                  className="delete"
                  onClick={() => deleteDoctor(doctor.doctor_id)}
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

export default GetDoctors;

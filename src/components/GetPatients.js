import axios from "axios";
import React, { useEffect, useState } from "react";

function GetPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getpatients();
  }, []);

  const getpatients = () => {
    axios
      .post("http://localhost/hospital_manegment/backend/api/selectPatients.php")
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Disease</th>
          </tr>
        </thead>
        <tbody>
            {patients.map((patient) => 
               <tr key={patient.patient_id}>
               <td>{patient.fname}</td>
               <td>{patient.lname}</td>
               <td>{patient.email}</td>
               <td>{patient.Disease}</td>
             </tr>
            )} 
        </tbody>
      </table>
    </div>
  );
}

export default GetPatients;


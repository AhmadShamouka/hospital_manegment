import axios from "axios";
import React, { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Doctor List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Expirtise</th>
          </tr>
        </thead>
        <tbody>

            {doctors.map((doctor) => 
               <tr key={doctor.doctor_id}>
               <td>{doctor.fname}</td>
               <td>{doctor.lname}</td>
               <td>{doctor.email}</td>
               <td>{doctor.expertise}</td>
             </tr>
            )} 
        </tbody>
      </table>
    </div>
  );
}

export default GetDoctors;


import axios from "axios";
import React, { useState, useEffect } from "react";

const Add_appointment = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    roomId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = () => {
    axios
      .post("http://localhost/hospital_manegment/backend/api/selectDoctors.php")
      .then(function (result) {
        console.log(result.data);
        setDoctors(result.data);
      });
  };

  return (
    <div>
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="doctorId">Doctor:</label>
        <select
          id="doctorId"
          name="doctorId"
          value={doctors.doctorId}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Doctor
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              {doctor.fname} {doctor.lname}
            </option>
          ))}
        </select>

        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="roomId">Room ID:</label>
        <input
          type="text"
          id="roomId"
          name="roomId"
          value={formData.roomId}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
};

export default Add_appointment;

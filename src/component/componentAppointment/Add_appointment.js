import axios from "axios";
import React, { useState, useEffect } from "react";
import "../componentsAdmin/index.css";
import { useParams } from "react-router-dom";

const Add_appointment = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    patientId: id,
    doctor_id: "",
    appointmentDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/hospital_manegment/backend/api/add_appointment.php",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
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
    const getDoctors = () => {
      axios
        .post(
          "http://localhost/hospital_manegment/backend/api/selectDoctors.php"
        )
        .then(function (result) {
          console.log(result.data);
          setDoctors(result.data);
        });
    };
    getDoctors();
  }, []);

  return (
    <div>
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="doctor_id">Doctor:</label>
        <select
          id="doctor_id"
          name="doctor_id"
          value={formData.doctor_id}
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

        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
};

export default Add_appointment;

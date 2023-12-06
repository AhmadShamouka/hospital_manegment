import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit_appointment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getappointment();
  }, []);

  const getappointment = () => {
    axios
      .get(
        `http://localhost/hospital_manegment/backend/api/edit_appointment.php/${id}`
      )
      .then(function (result) {
        console.log(result.data);
        setInputs(result.data);
        setFormData(result.data); // Initialize formData with current values
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost/hospital_manegment/backend/api/edit_appointment.php/${id}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
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
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getPatient = () => {
      axios
        .post(
          "http://localhost/hospital_manegment/backend/api/selectPatients.php"
        )
        .then(function (result) {
          console.log(result.data);
          setPatients(result.data);
        });
    };
    getPatient();
  }, []);

  return (
    <div>
      <h1>Edit appointment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="doctor_id">Doctor:</label>
        <select
          id="doctor_id"
          name="doctor_id"
          value={formData.doctor_id}
          onChange={handleChange}
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
        <label htmlFor="patient_id">Patient:</label>
        <select
          id="patient_id"
          name="patient_id"
          value={formData.patient_id}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Doctor
          </option>
          {patients.map((patient) => (
            <option key={patient.patient_id} value={patient.patient_id}>
              {patient.fname} {patient.lname}
            </option>
          ))}
        </select>

        <label htmlFor="appointment_date">Appointment date:</label>
        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="room_id">Room ID:</label>
        <input
          type="number"
          name="room_id"
          value={formData.room_id || ""}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Edit_appointment;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../componentsAdmin/index.css";
function Signin_admin(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/hospital_manegment/backend/api/signin_patient.php",
        formData
      );

      console.log(response.data);
      const id = response.data.patient_id;
      // Check the properties of the response data
      if (response.data.status === "success") {
        navigate(`/${id}/patient`);
      } else {
        alert("User not found or wrong inputs");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div>
      <h1>Patient SignIn Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />

        <button>button</button>
      </form>
    </div>
  );
}

export default Signin_admin;

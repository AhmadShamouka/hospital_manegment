import React, { useState } from "react";
import axios from "axios";
import "../componentsAdmin/index.css";
import { useNavigate } from "react-router-dom";
function Signup_doctor() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/hospital_manegment/backend/api/add_doctor.php",
        formData
      );
      console.log(response.data);
      navigate("/signin_doctor");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div>
      <h1>Doctor Registration Form:</h1>

      <form className="formSignup" onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          name="fname"
          id="fname"
          onChange={handleChange}
          required
        />
        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          name="lname"
          id="lname"
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />

        <label htmlFor="expertise">Expertise:</label>
        <input type="text" name="expertise" onChange={handleChange} required />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Signup_doctor;

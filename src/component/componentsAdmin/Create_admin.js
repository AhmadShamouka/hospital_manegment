import React, { useState, useEffect } from "react";
import "../componentsAdmin/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Create_admin() {
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
        "http://localhost/hospital_manegment/backend/api/add_admin.php",
        formData
      );
      navigate("/admin");

      console.log(response.data);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div>
      <h1>Admin Registration Form</h1>

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

        <button>Submit</button>
      </form>
    </div>
  );
}
export default Create_admin;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Add_patient(props) {
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
        "http://localhost/hospital_manegment/backend/api/add_patients.php",
        formData
      );

      console.log(response.data);
      navigate("/get_patients");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Patien Registration form</h1>
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
        <label htmlFor="disease">Disease:</label>
        <input type="text" name="disease" onChange={handleChange} required />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Add_patient;

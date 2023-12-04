import React, { useState } from "react";
import axios from "axios";

function AddDoctor() {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(
      "http://localhost/hospital_manegment/backend/api/add_doctor.php",
      formData
    );
    console.log(formData);
  };

  return (
    <div>
      <h2>Doctor Registration Form</h2>

      <form onSubmit={handleSubmit}>
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

export default AddDoctor;

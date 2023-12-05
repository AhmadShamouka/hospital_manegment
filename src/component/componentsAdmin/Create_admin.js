import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Create_admin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const adminPass = "SEfactory";
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };
  const goBack = () => {
    navigate("/");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/hospital_manegment/backend/api/add_admin.php",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  const Input_pass = prompt("Enter Admin password");

  if (Input_pass == adminPass) {
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
  } else {
    return (
      <div>
        <h2>"Invalid password. Do you want to go back to the home page?"</h2>
        <form onSubmit={goBack}>
          <button>Go Back</button>
        </form>
      </div>
    );
  }
}
export default Create_admin;

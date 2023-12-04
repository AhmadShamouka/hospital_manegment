import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost/hospital_manegment/backend/api/signin_admin.php",
        formData
      );
      console.log(response.data);

      if (response.data == "success") {
        navigate("/get_patients");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  return (
    <div>
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

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Jwt } from "jsonwebtoken";
function Signin_admin(props) {
  const adminPass = "SEfatory";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const goBack = () => {
    navigate("/");
  };
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

      // Assuming the server returns the token upon successful login
      const token = response.data.token;

      // Verify the token (optional step based on your requirements)
      const decodedToken = jwt.verify(token, "");
      console.log(decodedToken);

      // Store the token in localStorage
      localStorage.setItem("token", token);

      console.log(response.data);

      if (response.data == "success") {
        navigate("/get_patients");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const Input_pass = prompt("Enter Admin password");

  if (Input_pass == adminPass) {
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
export default Signin_admin;

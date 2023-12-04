import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
  useParams,
} from "react-router-dom";
function Edit_patients() {
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getpatient();
  }, []);

  const getpatient = () => {
    axios
      .get(
        `http://localhost/hospital_manegment/backend/api/edit_patients.php/${id}`
      )
      .then(function (result) {
        console.log(result.data);
        setInputs(result.data);
      });
  };

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost/hospital_manegment/backend/api/edit_patients.php/${id}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name:</label>
        <input
          name="fname"
          defaultValue={inputs.fname}
          onChange={handleChange}
          required
        />
        <label htmlFor="lname">Last Name:</label>
        <input
          name="lname"
          defaultValue={inputs.lname}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          defaultValue={inputs.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="disease">Disease:</label>
        <input
          name="disease"
          defaultValue={inputs.diesease}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Edit_patients;

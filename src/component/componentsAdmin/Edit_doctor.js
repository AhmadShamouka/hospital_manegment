import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";
function Edit_doctor() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getdoctor();
  }, []);

  const getdoctor = () => {
    axios
      .get(
        `http://localhost/hospital_manegment/backend/api/edit_doctor.php/${id}`
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
        `http://localhost/hospital_manegment/backend/api/edit_doctor.php/${id}`,
        formData
      );
      console.log(response.data);
      navigate("/get_doctors");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  return (
    <div>
      <h1>Edit Doctor</h1>
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
        <label htmlFor="expertise">expertise:</label>
        <input
          name="expertise"
          defaultValue={inputs.expertise}
          onChange={handleChange}
          required
        />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Edit_doctor;

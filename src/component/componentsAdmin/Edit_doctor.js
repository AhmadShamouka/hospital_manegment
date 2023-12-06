import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit_doctor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [formData, setFormData] = useState({});

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
        setFormData(result.data); // Initialize formData with current values
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
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
          value={formData.fname || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="lname">Last Name:</label>
        <input
          name="lname"
          value={formData.lname || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="expertise">Expertise:</label>
        <input
          name="expertise"
          value={formData.expertise || ""}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Edit_doctor;

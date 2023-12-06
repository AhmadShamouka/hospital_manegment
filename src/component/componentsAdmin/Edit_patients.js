import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit_patients() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [formData, setFormData] = useState({});

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
        `http://localhost/hospital_manegment/backend/api/edit_patients.php/${id}`,
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
      <h1>Edit Patient</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name:</label>
        <input
          name="fname"
          defaultValue={inputs.fname || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="lname">Last Name:</label>
        <input
          name="lname"
          defaultValue={inputs.lname || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          defaultValue={inputs.email || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="disease">Disease:</label>
        <input
          name="disease"
          defaultValue={inputs.diesease || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="room_id">Room:</label>
        <input
          name="room_id"
          defaultValue={inputs.room_id || ""}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Edit_patients;

import React from "react";
import Add_doctor from "./componentsAdmin/Add_doctor";
import Add_patient from "./componentsAdmin/Add_patient";
import GetPatients from "./componentsAdmin/GetPatients";
import GetDoctors from "./componentsAdmin/GetDoctors";

function Admin() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <Add_doctor />
        <Add_patient />
        <GetDoctors />
        <GetPatients />
      </div>
    </div>
  );
}

export default Admin;

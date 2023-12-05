import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add_doctor from "./component/componentsAdmin/Add_doctor";
import Add_patient from "./component/componentsAdmin/Add_patient";
import Edit_patients from "./component/componentsAdmin/Edit_patients";
import GetDoctors from "./component/componentsAdmin/GetDoctors";
import GetPatients from "./component/componentsAdmin/GetPatients";
import Signin_doctor from "./component/componentDoctor/Signin_doctor";
import Signin_admin from "./component/componentsAdmin/Signin_admin";
import Create_admin from "./component/componentsAdmin/Create_admin";
import Admin from "./component/Admin";
import Landing from "./component/componentLanding/Landing";
import Edit_doctor from "./component/componentsAdmin/Edit_doctor";
import Add_appointment from "./component/componentAppointment/Add_appointment";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <Routes>
            <Route path="/appointment" element={<Add_appointment />} />
            <Route path="/" element={<Landing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/add_doctor" element={<Add_doctor />} />
            <Route path="/add_patient" element={<Add_patient />} />
            <Route path="/get_patients" element={<GetPatients />} />
            <Route path="/get_doctors" element={<GetDoctors />} />
            <Route path="/signin_admin" element={<Signin_admin />} />
            <Route path="/signin_doctor" element={<Signin_doctor />} />
            <Route path="/create_admin" element={<Create_admin />} />
            <Route path="/:id/edit_patients" element={<Edit_patients />} />
            <Route path="/:id/edit_doctor" element={<Edit_doctor />} />
            <Route path="admin/:id/edit_patients" element={<Edit_patients />} />
          </Routes>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;

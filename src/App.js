import "./App.css";
import Add_doctor from "./components/Add_doctor";
import Add_patient from "./components/Add_patient";
import Edit_patients from "./components/Edit_patients";
import GetDoctors from "./components/GetDoctors";
import Admin from "./components/GetDoctors";
import GetPatients from "./components/GetPatients";
import Signin_doctor from "./components/Signin_doctor";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/add_doctor" element={<Add_doctor />} />
          <Route path="/add_patient" element={<Add_patient />} />
          <Route path="/get_patients" element={<GetPatients />} />
          <Route path="/get_doctors" element={<GetDoctors />} />
          <Route
            path="/get_patients/:id/edit_patients"
            element={<Edit_patients />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

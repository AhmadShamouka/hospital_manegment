import "./App.css";
import Add_doctor from "./components/Add_doctor";
import Add_patient from "./components/Add_patient";
import Admin from "./components/GetDoctors";
import GetPatients from "./components/GetPatients";
import Signin_doctor from "./components/Signin_doctor";

function App() {
  return (
    <div className="App">
      <GetPatients />
    </div>
  );
}

export default App;

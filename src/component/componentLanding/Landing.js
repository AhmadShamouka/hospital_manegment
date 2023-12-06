import React from "react";
import "../componentsAdmin/index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
function Landing(props) {
  const adminPass = "SEfactory";
  const navigate = useNavigate();
  const signinAdmin = () => {
    const Input_pass = prompt("Enter Admin password");
    if (Input_pass === adminPass) {
      navigate("/create_admin");
    } else {
      alert("Wrong Pass");
    }
  };
  const signUpAdmin = () => {
    const Input_pass = prompt("Enter Admin password");
    if (Input_pass === adminPass) {
      navigate("/create_admin");
    } else {
      alert("Wrong Pass");
    }
  };

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="banner-image-doctor"> </div>
          <h1>Doctor</h1>
          <p>
            HELP US <br />
            JOIN US HERE
          </p>
        </div>
        <div className="button-wrapper">
          <Link to="/signup_doctor" className="btn outline">
            SignUp
          </Link>
          <Link to={`/signin_doctor`} className="btn fill">
            SignIn
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="wrapper">
          <div className="banner-image-patient"> </div>
          <h1>Paitent</h1>
          <p>
            LET US HELP YOU <br />
            JOIN US HERE
          </p>
        </div>
        <div className="button-wrapper">
          <Link to={`/signup_patient`} className="btn outline">
            SignUp
          </Link>
          <Link to={`/signin_patient`} className="btn fill">
            SignIn
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="wrapper">
          <div className="banner-image-admin"> </div>
          <h1>Admin</h1>
          <p>
            MANAGE US! <br />
            JOIN US HERE
          </p>
        </div>
        <div className="button-wrapper">
          <button class="btn outline" onClick={signUpAdmin}>
            SignUp
          </button>
          <button className="btn fill" onClick={signinAdmin}>
            SignIn
          </button>
        </div>
      </div>
    </section>
  );
}

export default Landing;

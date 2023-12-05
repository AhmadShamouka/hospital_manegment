import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
function Landing(props) {
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
          <Link to="/add_doctor" className="btn outline">
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
          <Link to={`/add_patient`} className="btn outline">
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
          <Link to={`/create_admin`} className="btn outline">
            SignUp
          </Link>
          <Link to={`/signin_admin`} className="btn fill">
            SignIn
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;

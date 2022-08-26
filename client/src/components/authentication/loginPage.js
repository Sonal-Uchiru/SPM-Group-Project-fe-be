import React, { useState } from "react";
import "../authentication/loginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;
const sleye = <FontAwesomeIcon icon={faEyeSlash} />;

export default function Login() {

  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="container login">
      <div className="card">
        <div className="card-body">
          <br />
          <div className="logo text-center">
            <img
              src="./images/SPMLogo.png"
              width="420"
              height="320"
              className="img-fluid logoImage"
              alt="Logo"
            />
          </div>
          <br />
          <br />
          <form>
            <div className="mb-3 input">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>

            <div className="mb-3 input">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type={passwordShown ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
              />
              <span className="p-viewer">
                <i
                  id="eyeIcon"
                  className={`fa ${
                    passwordShown ? "fa-eye" : "fa-eye-slash"
                  } password-icon`}
                  onClick={togglePasswordVisibility}
                >
                  {" "}
                </i>
              </span>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-primary loginButton">
                Log In
              </button>
            </div>
          </form>

          <span className="text-center" id="links">
            <a id="clickme">Join Now</a>
            <br id="clikmeBr" />
            <a id="clickme">Start Hiring</a>
          </span>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

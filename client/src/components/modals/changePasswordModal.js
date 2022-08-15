import React, { useState } from "react";
import "./changePasswordModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import PasswordStrengthMeter from "../external_components/passwordStrengthIndecator";

const eye = <FontAwesomeIcon icon={faEye} />;
const sleye = <FontAwesomeIcon icon={faEyeSlash} />;

export default function ChangePasswordModal() {
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [passwordShown3, setPasswordShown3] = useState(false);
  const [password, setPassword] = useState("");
  // Password toggle handler
  const togglePasswordVisibility1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordShown2(!passwordShown2);
  };
  const togglePasswordVisibility3 = () => {
    setPasswordShown3(!passwordShown3);
  };
  return (
    <div className="container change-modal">
      <h3>Change Password</h3>
      <form>
        <div className="mt-3 mb-3 input">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Current Password
          </label>
          <input
            type={passwordShown1 ? "text" : "password"}
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <span className="p-viewer">
            <i
              id="eyeIcon"
              className={`fa ${
                passwordShown1 ? "fa-eye" : "fa-eye-slash"
              } password-icon`}
              onClick={togglePasswordVisibility1}
            >
              {" "}
            </i>
          </span>
        </div>
        <div className="mb-3 input">
          <label htmlFor="exampleInputPassword1" className="form-label">
            New Password
          </label>
          <input
              type={passwordShown2 ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
          />
          <span className="p-viewer">
            <i
                id="eyeIcon"
                className={`fa ${
                    passwordShown2 ? "fa-eye" : "fa-eye-slash"
                } password-icon`}
                onClick={togglePasswordVisibility2}
            >
              {" "}
            </i>
          </span>
        </div>
        <div className="meter container">
          <PasswordStrengthMeter password={password}/>
        </div>
        <div className="mb-3 input">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
              type={passwordShown3 ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Password"
          />
          <span className="p-viewer">
            <i
              id="eyeIcon"
              className={`fa ${
                passwordShown1 ? "fa-eye" : "fa-eye-slash"
              } password-icon`}
              onClick={togglePasswordVisibility3}
            >
              {" "}
            </i>
          </span>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-success confirmButton">
            Save Changes
          </button>
          <button type="button" className="btn btn-danger cancelButton">
            Cancel
          </button>
        </div>
      </form>
      <br />
      <br />
    </div>
  );
}

import React, {useState} from "react";
import "./css/confirmModal.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye}/>;
const sleye = <FontAwesomeIcon icon={faEyeSlash}/>;

export default function ConfirmModal(props) {

  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  return (
      <div>

        <div className="container confirm-modal">
          <h3>Confirm Password</h3>
          <form>
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
              <button
                  type="button"
                  className="btn btn-success confirmButton"
              >
                Confirm
              </button>
              <button type="button" className="btn btn-danger cancelButton" onClick={() => props.onCancel()}>
                Cancel
              </button>
            </div>
          </form>
          <br />
          <br />
        </div>

      </div>
  );
}

import React, { useState } from "react";
import "./css/changePasswordModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  isPasswordComplex,
  PasswordStrengthMeter,
} from "../validations/passwordStrengthIndecator";
import { changePassword } from "../../../api/shared/sharedApi";
import { ErrorAlert } from "../../../sweet_alerts/error";
import { SuccessAlert } from "../../../sweet_alerts/success";
import { Modal } from "react-bootstrap";

const eye = <FontAwesomeIcon icon={faEye} />;
const sleye = <FontAwesomeIcon icon={faEyeSlash} />;

export default function ChangePasswordModal(props) {
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [passwordShown3, setPasswordShown3] = useState(false);
  // const [password, setPassword] = useState("");
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
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

  const handleChangePasswordFormOnChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangePassword = async () => {
    if (!isPasswordComplex(password.newPassword)) {
      await ErrorAlert("Not a Strong Password!");
      return;
    } else if (password.newPassword !== password.confirmPassword) {
      await ErrorAlert("Password Mismatch!");
      return;
    } else {
      try {
        const content = await changePassword(
          {
            password: password.currentPassword,
            newPassword: password.newPassword,
          },
          props.userRole
        );

        if (content) {
          SuccessAlert("Password Changed Successfully!");
        }
      } catch (e) {
        if (e.response.status === 401) {
          ErrorAlert("Invalid Credentials");
          return;
        }
        ErrorAlert("Something went wrong!");
      }
    }
  };
  return (
    <div className="modal">
      <Modal show={true} size="lg">
        <Modal.Header>
          <div>
            <h4 className="ms-4 modal-title">
              <b>Edit Company </b>
            </h4>
          </div>
          <button
            type="button"
            className="btn"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              props.closePasswordModal();
            }}
          >
            <span aria-hidden="true">
              <b>&times;</b>
            </span>
          </button>
        </Modal.Header>
        <Modal.Body>
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
                  name="currentPassword"
                  onChange={handleChangePasswordFormOnChange}
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
                  name="newPassword"
                  onChange={handleChangePasswordFormOnChange}
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
                <PasswordStrengthMeter password={password.newPassword} />
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
                  name="confirmPassword"
                  onChange={handleChangePasswordFormOnChange}
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
                <button
                  type="button"
                  className="btn btn-success confirmButton"
                  onClick={handleChangePassword}
                >
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
        </Modal.Body>
      </Modal>
    </div>
  );
}

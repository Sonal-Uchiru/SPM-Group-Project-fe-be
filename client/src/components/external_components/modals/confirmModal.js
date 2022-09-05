import React, { useState } from "react";
import "./css/confirmModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { deleteUserProfile, saveUser } from "../../../api/managements/userApi";
import { SuccessAlert } from "../../../sweet_alerts/success";
import { ErrorAlert } from "../../../sweet_alerts/error";
import { deleteCompanyProfile } from "../../../api/managements/companyAPI";

const eye = <FontAwesomeIcon icon={faEye} />;
const sleye = <FontAwesomeIcon icon={faEyeSlash} />;

export default function ConfirmModal(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const [confirm, setConfirm] = useState({
    password: "",
  });

  const handleDeleteProfile = (e) => {
    setConfirm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // Password toggle handler
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const deleteUser = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const content =
        props.userType === "company"
          ? await deleteCompanyProfile(confirm)
          : await deleteUserProfile(confirm);

      if (content) {
        await SuccessAlert("Successfully Deleted Account!");
        // navigate("/login")
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        await ErrorAlert("Invalid Credentials");
        return;
      }
      await ErrorAlert("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="modal">
        <Modal show={openModal} size="lg">
          <Modal.Header>
            <h3>Confirm Password</h3>
            <button
              type="button"
              className="btn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => props.onCancel()}
            >
              <span aria-hidden="true">
                <b>&times;</b>
              </span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="container confirm-modal">
              <form>
                <div className="mb-3 input">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleDeleteProfile}
                    value={confirm.password}
                    required
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
                    onClick={deleteUser}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger cancelButton"
                    onClick={() => props.onCancel()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <br />
            <br />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

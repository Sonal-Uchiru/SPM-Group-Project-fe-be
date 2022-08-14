import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ConfirmModal from "./confirmModal";
import ChangePasswordModal from "./changePasswordModal";
import "./baseModal.css";

export default function BaseModal() {
  let [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="base-modal">
      <div className="">
        <button
          className="btn btn-primary"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Open Modal
        </button>
        <Modal show={modalOpen} size="lg">
          <Modal.Header>
            <button
              type="button"
              className="btnClose"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <ChangePasswordModal />

          <Modal.Body></Modal.Body>
        </Modal>
      </div>

      <br />
      <br />
    </div>
  );
}

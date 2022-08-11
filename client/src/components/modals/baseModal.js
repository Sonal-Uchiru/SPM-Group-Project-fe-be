import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ConfirmModal from "./confirmModal";
import ChangePasswordModal from "./changePasswordModal";

export default function BaseModal() {
  let [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container base-modal">
      <div className="card">
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
              className="btn float-right"
              data-dismiss="modal"
              aria-label="close"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>

          <Modal.Body>
            <ChangePasswordModal />
          </Modal.Body>
        </Modal>
      </div>

      <br />
      <br />
    </div>
  );
}

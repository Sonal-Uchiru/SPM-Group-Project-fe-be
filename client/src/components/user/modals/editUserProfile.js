import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import '../css/editUserProfile.css'
import PasswordStrengthMeter from "../../external_components/passwordStrengthIndecator";

export default function EditUserProfile() {

    const [openModal, setOpenModal] = useState(true)
    const [imgData, setImgData] = useState('')
    const [picture, setPicture] = useState('')
    let [placeHolder, setPlaceHolder] = useState(false)

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            setPlaceHolder(true)
            setPicture(e.target.files)
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImgData(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <div className="editUserProfile">
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setOpenModal(true)
                    }}
                    className="primary"
                >
                    Edit Profile

                </button>
            </div>
            <div className="modal">
                <Modal show={openModal} size="lg">
                    <Modal.Header>
                        <div>
                            <h4 className="ms-4 modal-title"><b>Edit Profile</b>
                            </h4>
                        </div>
                        <button
                            type="button"
                            className="btn"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            <span aria-hidden="true"><b>&times;</b></span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="edit-user-profile">
                            <form className="ms-4 me-4">
                                <div>
                                    <br/>
                                    <span>
                    <center>
                      <div className='box'>
                        <img
                            className='z-depth-2 Img1'
                            alt='profile_image'
                            src='./images/user (8).png'
                            data-holder-rendered='true'
                            hidden={placeHolder}
                        />

                        <img
                            className='z-depth-2 Img1'
                            alt='profile_image'
                            src={imgData}
                            id='movieImage'
                            data-holder-rendered='true'
                            hidden={!placeHolder}
                        />

                        <div className='image-upload'>
                          <label htmlFor='file-input'>
                            <img
                                src='./images/gallery.png'
                                className='Img2'
                                id='image-upload-btn'
                                alt='upload_image'
                            />
                          </label>
                          <input
                              id='file-input'
                              type='file'
                              onChange={onChangePicture}
                          />
                        </div>
                      </div>
                    </center>
                  </span>
                                    <br/>

                                    <div className="row">
                                        <div className="col-sm">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    First Name
                                                    <mark className="required-icon">
                                                        *
                                                    </mark>

                                                </label>
                                                <input type="text" className="form-control custom-input-fields"
                                                       id="email"
                                                       placeholder="First Name"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Last Name
                                                    <mark className="required-icon">
                                                        *
                                                    </mark>

                                                </label>
                                                <input type="text" className="form-control custom-input-fields"
                                                       placeholder="Last Name"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Phone Number
                                                    <mark className="required-icon">
                                                        *
                                                    </mark>

                                                </label>
                                                <input type="text" className="form-control custom-input-fields"
                                                       id="phone"
                                                       placeholder="Phone Number"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Date of Birth
                                                </label>
                                                <input type="date" className="form-control custom-input-fields"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='email'
                                        >
                                            Email
                                            <mark className="required-icon">
                                                *
                                            </mark>
                                        </label>
                                        <input
                                            type='email'
                                            id='form3Example3'
                                            className='form-control form-control-lg'
                                            placeholder='Email'
                                        />
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='address'
                                        >
                                            Address
                                        </label>
                                        <input
                                            type='text'
                                            id='address'
                                            className='form-control form-control-lg'
                                            placeholder='Address'
                                        />
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='gender'
                                        >
                                            Gender
                                        </label>
                                        <select
                                            className='form-select mb-3'
                                            aria-label='.form-select-lg example'
                                        >
                                            <option selected disabled>Gender</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='aboutMe'
                                        >
                                            About Me
                                        </label>
                                        <textarea className="form-control" id="aboutMe" rows="2"
                                                  placeholder='A small description about yourself...'/>
                                    </div>

                                    <div className="text-center mt-3">
                                        <Button type="button" className="btn btn-primary changePswButton">Change
                                            Password</Button>
                                    </div>
                                    <div className="text-center mt-1">
                                        <div className="btn-group me-2">
                                            <button type="button" className="btn btn-primary saveButton">Save Changes
                                            </button>
                                        </div>
                                        <div className="btn-group me-2">
                                            <button type="button" className="btn btn-primary cancelButton">Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

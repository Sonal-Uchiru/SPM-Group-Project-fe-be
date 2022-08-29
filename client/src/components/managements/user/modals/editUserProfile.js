import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import '../css/editUserProfile.css'
import {getUserDetails} from "../../../../api/managements/userApi";
import moment from 'moment';

export default function EditUserProfile(props) {

    const [openModal, setOpenModal] = useState(true)
    const [imgData, setImgData] = useState('')
    const [picture, setPicture] = useState('')
    let [placeHolder, setPlaceHolder] = useState(false)
    const [user, setUser] = useState('');


    async function getUser() {
        const content = await getUserDetails()
        setUser(content.data)
        console.log(content.data)
    }

    useEffect(() => {
        getUser();
    }, [])

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
                            onClick={() => props.onCancel2()}
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
                          {!user.profilePicture &&
                              <img
                                  className='z-depth-2 Img1'
                                  alt='profile_image'
                                  src="./images/user (8).png"
                                  data-holder-rendered='true'
                                  hidden={placeHolder}
                              />
                          }
                          {user.profilePicture &&
                              <img
                                  className='z-depth-2 Img1'
                                  alt='profile_image'
                                  src={user.profilePicture}
                                  data-holder-rendered='true'
                                  hidden={placeHolder}
                              />
                          }

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
                                                       id="firstName"
                                                       value={user.firstName}
                                                       placeholder="First Name"
                                                />
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
                                                       placeholder="Last Name"
                                                       value={user.lastName}
                                                />
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
                                                       placeholder="Phone Number"
                                                       value={user.mobile}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Date of Birth
                                                </label>
                                                <input type="date" className="form-control custom-input-fields"
                                                       value={moment(user.dob).format("YYYY-MM-DD")}
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
                                            value={user.email}
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
                                            value={user.address}
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
                                            value={user.gender}
                                        >
                                            <option selected disabled value=''>Select Your Gender</option>
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
                                                  placeholder='A small description about yourself...'
                                                  value={user.aboutMe}
                                        />
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
                                            <button type="button" className="btn btn-primary cancelButton"
                                                    onClick={() => props.onCancel2()}>Cancel
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

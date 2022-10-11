import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import '../css/editUserProfile.css'
import {editUserProfile, getUserDetails, saveUser} from "../../../../api/managements/userApi";
import moment from 'moment';
import {isPasswordComplex} from "../../../external_components/validations/passwordStrengthIndecator";
import {ErrorAlert} from "../../../../sweet_alerts/error";
import {SuccessAlert} from "../../../../sweet_alerts/success";
import Loading from "../../../external_components/spinners/loading";
import {uploadFile} from "../../../../firebase/uploadFile";

export default function EditUserProfile(props) {

    const [openModal, setOpenModal] = useState(true)
    const [imgData, setImgData] = useState('')
    const [picture, setPicture] = useState('')
    let [placeHolder, setPlaceHolder] = useState(false)
    const [loading, setLoading] = useState(false)


    async function getUser() {
        const content = await getUserDetails()
        setUpdateUser(content.data)
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


    const [updateUser, setUpdateUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        dob: "",
        aboutMe: "",
        gender: "",
        profilePicture: ""
    })

    const handleEditUserProfile = (e) => {
        setUpdateUser(prev => ({...prev, [e.target.name]: e.target.value}))
    }


    const UpdateUser = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)

            let imageUrl = "";

            if (picture !== "") {
                imageUrl = await uploadFile(picture, "userProfilePicture")
            }

            const editUser = {
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                dob: updateUser.dob,
                address: updateUser.address,
                mobile: updateUser.mobile,
                aboutMe: updateUser.aboutMe,
                profilePicture: imageUrl === "" ? updateUser.profilePicture ? updateUser.profilePicture : "" : imageUrl,
                gender: updateUser.gender
            }

            const cleanEditUser = Object.fromEntries(Object.entries(editUser).filter(([_, v]) => v !== ''))


            const content = await editUserProfile(cleanEditUser)

            if (content) {
                await SuccessAlert("Successfully Updated Your Account!")
                // window.location.reload();

            }

            setLoading(false)

        } catch (error) {
            setLoading(false)
            if (error.response.status === 409) {
                await ErrorAlert("Email already exists");
                return;
            }
            await ErrorAlert("Something went wrong!");
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
                            <form className="ms-4 me-4" onSubmit={UpdateUser}>
                                <div>
                                    <br/>
                                    <span>
                    <center>
                      <div className='box'>
                          {!updateUser.profilePicture &&
                              <img
                                  className='z-depth-2 Img1'
                                  alt='profile_image'
                                  src="./images/user (8).png"
                                  data-holder-rendered='true'
                                  hidden={placeHolder}
                              />
                          }

                          {updateUser.profilePicture &&
                              <img
                                  className='z-depth-2 Img1'
                                  alt='profile_image'
                                  src={updateUser.profilePicture}
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
                                                       name="firstName"
                                                       Value={updateUser.firstName}
                                                       onChange={handleEditUserProfile}
                                                       placeholder="First Name"
                                                       required
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
                                                       name="lastName"
                                                       Value={updateUser.lastName}
                                                       onChange={handleEditUserProfile}
                                                       required
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
                                                       name="mobile"
                                                       placeholder="Phone Number"
                                                       Value={updateUser.mobile}
                                                       onChange={handleEditUserProfile}
                                                       required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Date of Birth
                                                </label>
                                                <input type="date" className="form-control custom-input-fields"
                                                       name="dob"
                                                       id="dob"
                                                       max={moment().format("YYYY-MM-DD")}
                                                       Value={moment(updateUser.dob).format("YYYY-MM-DD")}
                                                       onChange={handleEditUserProfile}
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
                                            name="email"
                                            id='form3Example3'
                                            className='form-control form-control-lg'
                                            placeholder='Email'
                                            Value={updateUser.email}
                                            readOnly
                                            required
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
                                            name="address"
                                            className='form-control form-control-lg'
                                            placeholder='Address'
                                            Value={updateUser.address}
                                            onChange={handleEditUserProfile}
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
                                            value={updateUser.gender}
                                            name="gender"
                                            onChange={handleEditUserProfile}
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
                                                  name="aboutMe"
                                                  value={updateUser.aboutMe}
                                                  onChange={handleEditUserProfile}

                                        />
                                    </div>

                                    {loading && <Loading/>}
                                    <div className="text-center mt-3">
                                        <Button type="button" className="btn btn-primary changePswButton">Change
                                            Password</Button>
                                    </div>
                                    <div className="text-center mt-1">
                                        <div className="btn-group me-2">
                                            <button type="submit" className="btn btn-primary saveButton"
                                                    onClick={UpdateUser}>Save Changes
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

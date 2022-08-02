import React, {useEffect, useState} from 'react'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import '../css/allUserTable.css'
import axios from 'axios'
import {getTokenFromLocalStorage} from '../../external_components/tokenHandling'
import showAlerts from '../../external_components/sweetAlerts'
import Modal from 'react-bootstrap/Modal'
import '../css/updateStaffModal.css'
import '../css/staffDetails.css'
import Swal from 'sweetalert2'
import {uploadFile} from '../../../firebase/uploadFile'

export default function AllStaff() {

    const [staffMembers, setStaffMembers] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openDetailsModal, setOpenDetailsModal] = useState(false)
    const [updateFirstName, setUpdateFirstName] = useState('')
    const [updateLastName, setUpdateLastName] = useState('')
    const [updateAcademicRank, setUpdateAcademicRank] = useState('')
    const [updateEmail, setUpdateEmail] = useState('')
    const [imgData, setImgData] = useState('')
    const [picture, setPicture] = useState('')
    let [moviePlaceHolder, setMoviePlaceHolder] = useState(true)
    const [updatePhone, setUpdatePhone] = useState('')
    const [updateFaculty, setUpdateFaculty] = useState('')
    const [updateDepartment, setUpdateDepartment] = useState('')
    const [updateResearchFields, setUpdateResearchFields] = useState('')
    const [updateUsername, setUpdateUsername] = useState('')
    const [id, setID] = useState('')
    const [faculty, setFaculty] = useState('')
    const [department, setDepartment] = useState('')

    const faculties = ['Faculty of Computing', 'Faculty of Engineering', 'Faculty of Business']
    const DepartmentsofComputing = ['Department of Information Technology', 'Department of Computer Systems Engineering', 'Department of Computer Science and Software Engineering', '']
    const DepartmentsofEngineering = ['Department of Civil Engineering', ' Department of Mechanical Engineering', ' Department of Materials Engineering', 'Electrical & Electronic Engineering View ProfileFaculty of Engineering']
    const DepartmentsofBusiness = ['Department of Business Management', 'Department of Information Management']
    const [loadingStatus, setLoadingStatus] = useState(true)
    let [subDepartment, setSubDepartment] = useState([])

    function displayFiles() {
        document.getElementById('fileSelection').click()
    }

    function updateStaffModalOpen(data) {
        setUpdateFirstName(data.first_name)
        setUpdateLastName(data.last_name)
        setUpdateAcademicRank(data.academic_rank)
        setUpdateEmail(data.email)
        setUpdatePhone(data.phone_number)
        setUpdateFaculty(data.faculty)
        setUpdateUsername(data.username)
        setUpdateDepartment(data.department)
        setUpdateResearchFields(data.research_fields)
        setImgData(data.profile_image_url)
        setID(data._id)
        setOpenModal(true)
        console.log(data)
    }

    function StaffDetailsModalOpen(data) {
        setUpdateFirstName(data.first_name)
        setUpdateLastName(data.last_name)
        setUpdateAcademicRank(data.academic_rank)
        setUpdateEmail(data.email)
        setUpdatePhone(data.phone_number)
        setUpdateFaculty(data.faculty)
        setUpdateUsername(data.username)
        setUpdateDepartment(data.department)
        setUpdateResearchFields(data.research_fields)
        setImgData(data.profile_image_url)
        setID(data._id)
        setOpenDetailsModal(true)
        console.log(data)
    }

    function assignSubDepartment(e) {
        setFaculty(e.target.value)
        let type = e.target.value

        if (type === 'Faculty of Computing') {
            setSubDepartment(DepartmentsofComputing)

        } else if (type === 'Faculty of Engineering') {
            setSubDepartment(DepartmentsofEngineering)

        } else {
            setSubDepartment(DepartmentsofBusiness)
        }

    }

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            setMoviePlaceHolder(true)
            setPicture(e.target.files)
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImgData(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }


    useEffect(() => {
        function getAllStaffMembers() {
            axios({
                url: 'http://localhost:8080/api/staffs/get',
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + getTokenFromLocalStorage(),
                },
            }).then((res) => {
                setStaffMembers(res.data.staff)
                $('#staffTable').DataTable()
            }).catch(async (err) => {
                await showAlerts(2, 'Something went wrong!')
            })
        }

        getAllStaffMembers()
    }, [])


    async function updateStaffProfile(id) {
// console.log(id)
        setLoadingStatus(false)
        if (inputValidation()) {
            setLoadingStatus(true)
            return false
        }
        await Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if (picture) {
                    uploadFile(picture, 'StaffProfile(images)')
                        .then(async (res) => {
                            await updateDB(res, id)
                        })
                        .catch(async (err) => {
                            await showAlerts(2, 'Something went wrong!')
                        })
                    return
                }
                await updateDB(null, id)
            } else if (result.isDenied) {
                await Swal.fire('Changes are not saved', '', 'info')
                setLoadingStatus(false)
            }
        })
    }

    async function updateDB(imageUrl, id) {

        if (!imageUrl) {
            imageUrl = imgData
        }

        const content = {
            first_name: document.getElementById('firstname').value,
            last_name: document.getElementById('lastname').value,
            phone_number: document.getElementById('Mobile').value,
            academic_rank: document.getElementById('Academic_Rank').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            faculty: document.getElementById('faculty').value,
            department: document.getElementById('department').value,
            research_fields: document.getElementById('Research_field').value,
            profile_image_url: imageUrl,
        }

        // console.log(content)
        await axios({
            url: 'http://localhost:8080/api/staffs/' + id,
            method: 'PUT',
            data: content,
            headers: {
                Authorization: 'Bearer ' + getTokenFromLocalStorage(),
            },
        })
            .then(async (res) => {
                await Swal.fire('Successfully Updated!', '', 'success')
                window.location.reload();
            })
            .catch(async (err) => {
                await showAlerts(2, 'Something went wrong!')
            })
        setLoadingStatus(true)
    }

    function inputValidation() {
        let firstname = document.getElementById('firstname').value
        let lastname = document.getElementById('lastname').value
        let email = document.getElementById('email').value
        let phone = document.getElementById('Mobile').value
        let username = document.getElementById('username').value

        if (firstname.length === 0) {
            Swal.fire('First Name is required')
            return true
        }

        if (lastname.length === 0) {
            Swal.fire('Last Name is required')
            return true
        }

        if (email.length === 0) {
            Swal.fire('Email is required')
            return true
        }


        if (username.length === 0) {
            Swal.fire('Username is required')
            return true
        }

        if (phone.length === 0) {
            Swal.fire('Phone Number is required')
            return true

        } else if (phone.length !== 10) {
            Swal.fire('Phone Number must be 10 digit')
            return true
        }

    }

    async function deleteStaffMember(id) {

        axios({
            url: 'http://localhost:8080/api/staffs/' + id,
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + getTokenFromLocalStorage(),
            },
        }).then(async (res) => {
            await Swal.fire('Successfully Deleted!', '', 'success')
            window.location.reload();
        }).catch(async (err) => {
            await showAlerts(2, 'Something went wrong!')
        })
    }


    return (
        <div className='all-user-table'>
            <div className='col-md-12 staff-table-div'>
                <div className='col-md-12 scrollbar'>

                    <table
                        id='staffTable'
                        className='table table-bordered table-sm nowrap table-hover staff-table'
                    >
                        <thead>
                        <tr>
                            <th>User Profile</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Faculty</th>
                            <th>Department</th>
                            <th>Academic Rank</th>
                            <th>Research Interest</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {staffMembers.map((staffMember) => {
                            return (
                                <tr>
                                    <td>
                                        <img
                                            src={staffMember.profile_image_url}
                                            className='tableImg'
                                            alt='ProImage'
                                        />
                                    </td>
                                    <td>{staffMember.username}</td>
                                    <td>{staffMember.first_name} {staffMember.last_name}</td>
                                    <td>{staffMember.email}</td>
                                    <td>{staffMember.faculty}</td>
                                    <td>{staffMember.department}</td>
                                    <td>{staffMember.academic_rank}</td>
                                    <td>{staffMember.research_fields}</td>
                                    <td>{staffMember.phone_number}</td>
                                    <td>
                                        <button className='btn ' onClick={() => updateStaffModalOpen(staffMember)}>
                                            <img
                                                src='./../images/editing.png'
                                                className='tableEdit'
                                                alt='EditIcon'
                                            />
                                        </button>

                                        <button className='btn' onClick={() => {
                                            StaffDetailsModalOpen(staffMember)
                                        }}>
                                            <img src='./../images/view.png' className='tableEdit' alt='viewIcon'/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*View Details Modal*/}

            <Modal show={openModal}>
                <Modal.Header>
                    <div className='row'>
                        <h4 className='main-topic'>Update Staff</h4>
                    </div>
                    <button
                        type='button'
                        className='btn close-btn'
                        data-dismiss='modal'
                        aria-label='Close'
                        onClick={() => {
                            setOpenModal(false)
                        }}
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className='update-staff container'>
                        <div className='container'>
                            <div className='col-md-12 d-flex justify-content-center'>
                                <span><img src={imgData} className='user-img rounded-circle' alt='userImg'
                                           hidden={!moviePlaceHolder}/>
                                  <img src='./../images/editing.png' className='edit-img' onClick={() => displayFiles()}
                                       alt='userImg'/></span>
                                <input type='file' id='fileSelection' className='d-none' onChange={onChangePicture}/>
                            </div>
                            <div className='row mb-3 mt-3'>
                                <div className='col-md-6 mb-3'>
                                    <label className='form-label'>First Name</label>
                                    <input placeholder='First Name' id='firstname' type='text' name='firstname'
                                           className='form-control' Value={updateFirstName} required/>
                                </div>
                                <div className='col-md-6 '>
                                    <label className='form-label'>Last Name</label>
                                    <input placeholder='Last Name' id='lastname' type='text' name='lastname'
                                           className='form-control' Value={updateLastName} required/>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <div className='col-md-6 mb-3'>
                                    <label className='form-label'>Academic Rank</label>
                                    <select
                                        className='form-select'
                                        aria-label='.form-select-lg example'
                                        id='Academic_Rank'
                                    >
                                        <option value={updateAcademicRank} selected
                                                disabled>{updateAcademicRank}</option>
                                        <option value='Senior Professor'>Senior Professor</option>
                                        <option value='Professor'>Professor</option>
                                        <option value='Senior Lecturer'>Senior Lecturer</option>
                                        <option value='Lecturer'>Lecturer</option>
                                    </select>
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label className='form-label'>Email</label>
                                    <input placeholder='SLIIT Email' id='email' type='text' name='email'
                                           className='form-control' Value={updateEmail}/>
                                </div>

                                <div className='col-md-12'>
                                    <label className='form-label'>Username</label>
                                    <input placeholder='Username' id='username' type='text' name='username'
                                           className='form-control' Value={updateUsername}/>
                                </div>

                            </div>
                            <div className='row mb-3'>
                                <div className='col-md-12'>
                                    <label className='form-label'>Phone Number</label>
                                    <input placeholder='076521xxx' id='Mobile' type='text' name='contact'
                                           className='form-control' Value={updatePhone} required/>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-md-12'>
                                    <label className='form-label'>Faculty</label>
                                    <select
                                        className='form-select'
                                        aria-label='.form-select-lg example'
                                        id='faculty'
                                        onChange={(e) => {
                                            assignSubDepartment(e)
                                        }}
                                    >
                                        <option value={updateFaculty} selected
                                                disabled>{updateFaculty}</option>
                                        <option value='Faculty of Computing'>Faculty of Computing</option>
                                        <option value='Faculty of Engineering'>Faculty of Engineering</option>
                                        <option value='Faculty of Business'>Faculty of Business</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <label className='form-label'>
                                        Department
                                    </label>
                                    <select
                                        className='form-select mb-3'
                                        aria-label='.form-select-lg example'
                                        id='department'
                                        onChange={(e) => {
                                            setDepartment(e.target.value)
                                        }}
                                    >
                                        <option value={updateDepartment} selected
                                                disabled>{updateDepartment}</option>
                                        {subDepartment.map((post) => {
                                            return (
                                                <option value={post}>
                                                    {post}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <div className='col-md-12'>
                                    <label className='form-label' id='faculty'>
                                        Research Interests
                                    </label>

                                    <select className='form-select' aria-label='Default select example'
                                            id='Research_field'>
                                        <option value={updateResearchFields} selected
                                                disabled>{updateResearchFields}</option>
                                        <option value='Human Computer Interaction (HCI)'>Human Computer Interaction
                                            (HCI)
                                        </option>
                                        <option value='Machine Learning, Health Informatics, and Computer Linguistics'>
                                            Machine Learning, Health Informatics, and Computer
                                            Linguistics
                                        </option>
                                        <option value='Teaching and Learning, Data Analytics'>
                                            Teaching and Learning, Data Analytics
                                        </option>
                                        <option value='Mechatronics; Integrated and Automated Design'>
                                            Mechatronics; Integrated and Automated Design
                                        </option>
                                        <option value='High temperature materials'>
                                            High temperature materials
                                        </option>
                                        <option value='Stream, river and urban waterways rehabilitation'>
                                            Stream, river and urban waterways rehabilitation
                                        </option>
                                        <option value='Business Process Management (BPM)'>
                                            Business Process Management (BPM)
                                        </option>
                                        <option value='Social media Marketing'>
                                            Social media Marketing
                                        </option>
                                        <option value='eLearning'>
                                            eLearning {' '}
                                        </option>
                                    </select>

                                </div>
                            </div>

                        </div>

                    </div>
                </Modal.Body>
                <div className='row d-flex justify-content-end buttns'>
                    <button className='btn update-btn  mt-3' onClick={() => {
                        updateStaffProfile(id)
                    }}>Update
                    </button>
                    <button className='btn delete-btn  mt-3' onClick={() => {
                        deleteStaffMember(id)
                    }}>Delete
                    </button>
                </div>
            </Modal>
            <br/>

            <Modal show={openDetailsModal} size="md">
                <Modal.Header>
                    <span> </span>

                    <button
                        type="button"
                        className="btn close-btn"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                            setOpenDetailsModal(false);
                        }}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="d-flex justify-content-center">
                            <img
                                src={imgData}
                                alt="Staff Image"
                                className="staff-image rounded-circle"
                            />
                        </div>

                        <h3 className="mt-4 text-gold"> Personal Information</h3>

                        {/* Personal Information */}
                        <div className="d-flex flex-row mt-3">
                            <img
                                src="./../images/user (1).png"
                                alt="User Icon"
                                className="icon-image"
                            />

                            <p className="fw-bold ms-2">{updateFirstName} {updateLastName} ({updateFaculty})</p>
                        </div>

                        <div className="d-flex flex-row mt-1">
                            <img
                                src="./../images/email (1).png"
                                alt="Email Icon"
                                className="icon-image"
                            />

                            <p className="fw-bold ms-2">{updateEmail}</p>
                        </div>

                        <div className="d-flex flex-row mt-1">
                            <img
                                src="./../images/face-id (1).png"
                                alt="Supervisor Icon"
                                className="icon-image"
                            />

                            <p className="fw-bold ms-2">Supervisor</p>
                        </div>
                        <div className="d-flex flex-row mt-1">
                            <img
                                src="./../images/mortarboard.png"
                                alt="Lecturer Icon"
                                className="icon-image"
                            />

                            <p className="fw-bold ms-2">{updateAcademicRank}</p>
                        </div>
                        <div className="d-flex flex-row mt-1">
                            <img
                                src="./../images/mobile.png"
                                alt="Mobile Icon"
                                className="icon-image"
                            />

                            <p className="fw-bold ms-2">{updatePhone}</p>
                        </div>

                        <h3 className="mt-2 text-gold"> Research Interests</h3>
                        <div className="d-flex justify-content-start">
                            <ul>
                                <li>{updateResearchFields}</li>
                            </ul>
                        </div>

                        {/*<h3 className="mt-2 text-gold">Groups In-Charge of</h3>*/}
                        {/*{sample.map((item) => {*/}
                        {/*    return (*/}
                        {/*        <div class="row group-row">*/}
                        {/*            <div class="col">*/}
                        {/*                <p>Group 1</p>*/}
                        {/*            </div>*/}

                        {/*            <div class="col">*/}
                        {/*                <p>G.A Dananjaya(Leader)</p>*/}
                        {/*            </div>*/}
                        {/*            <div class="col">*/}
                        {/*                <p>IT20179924</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    );*/}
                        {/*})}*/}
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    )
}

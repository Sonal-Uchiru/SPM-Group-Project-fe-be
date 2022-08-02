import React, {useState, useEffect} from 'react'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import '../css/allUsers.css'
import UserSummary from '../cards/userSummary'
import AllStudents from './../data_tables/allStudents'
import AllStaff from './../data_tables/allStaff'
import axios from 'axios'
import {getTokenFromLocalStorage} from '../../external_components/tokenHandling'
import showAlerts from '../../external_components/sweetAlerts'

export default function AllUsers() {

    let [selectType, setSelectType] = useState('staff')

    const [computingCount, setComputingCount] = useState(0);
    const [engineeringCount, setEngineeringCount] = useState(0);
    const [businessCount, setBusinessCount] = useState(0);

    const [computingCountStudent, setComputingCountStudent] = useState(0);
    const [engineeringCountStudent, setEngineeringCountStudent] = useState(0);
    const [businessCountStudent, setBusinessCountStudent] = useState(0);
    const [staffMembers, setStaffMembers] = useState([])
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function getAllStaffMembers() {
            axios({
                url: 'http://localhost:8080/api/staffs/get',
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + getTokenFromLocalStorage(),
                },
            }).then(async (res) => {
                await setStaffMembers(res.data.staff)
                getStaffCount(res.data.staff)
            }).catch(async (err) => {
                await showAlerts(2, 'Something went wrong!')
            })
        }

        getAllStaffMembers()
    }, [])

    useEffect(() => {
        function getAllStudents() {
            axios({
                url: 'http://localhost:8080/api/students/get',
                method: "GET",
                headers: {
                    Authorization: "Bearer " + getTokenFromLocalStorage(),
                },

            }).then((res) => {
                setStudents(res.data.student);
                getStudentCount(res.data.student)
            }).catch(async (err) => {
                await showAlerts(2, "Something went wrong!");
            })
        }

        getAllStudents();
    }, []);


    useEffect(() => {
        $('#studentTable').DataTable()
    }, [])

    function swapUserTable(type) {
        type === 'staff' ? setSelectType('staff') : setSelectType('student')
    }

    function getStaffCount(staff) {
        let computing = 0;
        let business = 0;
        let engineering = 0;
        staff.map((post) => {
            if (post.faculty === "Faculty of Computing") {
                computing++;
            } else if (post.faculty === "Faculty of Engineering") {
                engineering++;
            } else if (post.faculty === "Faculty of Business") {
                business++;
            }
        })
        setComputingCount(computing);
        setBusinessCount(business);
        setEngineeringCount(engineering);
    }

    function getStudentCount(student) {
        let computingStudents = 0;
        let businessStudents = 0;
        let engineeringStudents = 0;
        student.map((post) => {
            if (post.faculty === "Faculty of Computing") {
                computingStudents++;
            } else if (post.faculty === "Faculty of Engineering") {
                engineeringStudents++;
            } else if (post.faculty === "Faculty of Business") {
                businessStudents++;
            }
        })
        setComputingCountStudent(computingStudents);
        setBusinessCountStudent(businessStudents);
        setEngineeringCountStudent(engineeringStudents);
    }


    return (
        <div className='all-users'>
            <div className='row'>
                <div className='col-md-4'>
                    <UserSummary
                        staffNum={computingCount}
                        studentNum={computingCountStudent}
                        faculty={'Faculty of Computing'}
                    />
                </div>
                <div className='col-md-4'>
                    <UserSummary
                        staffNum={engineeringCount}
                        studentNum={engineeringCountStudent}
                        faculty={'Faculty of Engineering'}
                    />
                </div>
                <div className='col-md-4'>
                    <UserSummary
                        staffNum={businessCount}
                        studentNum={businessCountStudent}
                        faculty={'Faculty of Business'}
                    />
                </div>
            </div>
            <div className='row d-flex justify-content-center mt-4'>
                <button
                    onClick={() => swapUserTable('staff')}
                    type='button'
                    className='btn1 btn-lg me-2'
                >
                    Staff
                </button>

                <button
                    onClick={() => swapUserTable('student')}
                    type='button'
                    className='btn2 btn-lg ms-2'
                >
                    Students
                </button>
            </div>
            {selectType === 'staff' ? <AllStaff/> : <AllStudents/>}
        </div>
    )
}

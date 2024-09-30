import { ErrorMessage, Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import Swal from 'sweetalert2'

function Signup() {
    let navigate = useNavigate()
    let [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    let schema = yup.object().shape({
        name: yup.string().matches(/[A-Za-z]/).required(),
        email: yup.string().email().required("Enter Correct Email"),
        password: yup.string().matches(/[a-zA-Z0-9]/).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password and Confirm password must be match').required()
    })

    let handleUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    let handleSubmit = () => {
        sessionStorage.setItem('email', user.email)
        sessionStorage.setItem('password', user.password)
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "created account",
            showConfirmButton: false,
            timer: 1500
        });
        navigate('/')
    }
    return (
        <div>
            <Formik initialValues={user} validationSchema={schema}
                onSubmit={handleSubmit}>
                {({ handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='loginbox'>
                            <div className='login-content'>
                                <div className='login-input'>
                                    <h3>SignUp</h3>
                                    <div className='inputbox2'>
                                        <input type='text' placeholder='Enter name' name='name' value={user.name} onChange={(e) => { handleChange(e); handleUser(e) }} /><br />
                                        <ErrorMessage name='name' component='div' className='errMsg' />
                                        <input type='text' placeholder='Enter Email' name='email' value={user.email} onChange={(e) => { handleChange(e); handleUser(e) }} /><br />
                                        <ErrorMessage name='email' component='div' className='errMsg' />
                                        <input type='password' placeholder='Enter Password' name='password' value={user.password} onChange={(e) => { handleChange(e); handleUser(e) }} /><br />
                                        <ErrorMessage name='password' component='div' className='errMsg' />
                                        <input type='password' placeholder='Enter confirm password' name='confirmPassword' value={user.confirmPassword} onChange={(e) => { handleChange(e); handleUser(e) }} /><br />
                                        <ErrorMessage name='confirmPassword' component='div' className='errMsg' />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        <button type='submit' className='signup'>SignUp</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                )}
            </Formik>
        </div>
    )
}
export default Signup

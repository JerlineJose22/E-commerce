import { ErrorMessage, Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Swal from 'sweetalert2'

function Login() {
    let navigate = useNavigate()
    let [user, setUser] = useState({
        email: "",
        password: ''
    })
    let schema = yup.object().shape({
        email: yup.string().email('Enter correct Email').required(),
        password: yup.string().matches(/[a-zA-Z0-9]/).required()
    })

    let handleUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    let handleSubmit = () => {
        if (sessionStorage.getItem('email') === user.email && sessionStorage.getItem('password') === user.password) {
            sessionStorage.setItem('auth', 'true')
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Login Success ",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/home')


        } else if (sessionStorage.getItem('email') === null) {
            Swal.fire({
                icon: "error",
                title: "Invalid",
                text: "Please Signup",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/signup')
        } else {
            Swal.fire({
                icon: "error",
                title: "Invalid",
                text: "Invalid User",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div>
            <Formik initialValues={user} validationSchema={schema}
                onSubmit={handleSubmit}>
                {({ handleSubmit, handleChange }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='loginbox'>
                            <div className='login-content'>
                                <div className='login-input'>
                                    <h3>Login</h3>
                                    <div className='inputbox'>
                                        <input type='text' placeholder='Enter email' name='email' value={user.email} onChange={(e) => { handleUser(e); handleChange(e) }} /><br />
                                        <ErrorMessage name='email' component='div' className='errMsg'/>
                                        <input type='password' placeholder='enter password' name='password' value={user.password} onChange={(e) => { handleUser(e); handleChange(e) }} /><br />
                                        <ErrorMessage name='password' component='div' className='errMsg' />
                                    </div>
                                    <div className='sbtn'>
                                        <button type='submit'>Login</button>
                                        <p>if your new user <a href=' /signup'>Signup</a></p>
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

export default Login

import React, { useState } from 'react'
import authSvg from '../assests/auth.svg'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { authenticate, isAuth } from '../helpers/auth.js'

const Login = ({history}) => {

    const [formData, setFormData] = useState({
        
        email: "",
        password1: "",
        
    })

    const { email, password1 } = formData

    //handle change from inputs
    const handleChange = text => e => {
        // console.log(name, email, password1, password2)
        setFormData({ ...formData, [text]: e.target.value })
    }

    //submit data to backend
    const handleSubmit = e => {

        e.preventDefault()
        if (  email && password1) {

           

                axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                     email, password: password1
                })
                .then(res => {
                    authenticate(res, () => {
                      setFormData({
                        ...formData,
                        email: '',
                        password1: '',
                        
                      });

                    //   if role is admin goto admin otherwise private
                      isAuth() && isAuth().role === 'admin'
                        ? history.push('/admin')
                        : history.push('/private');
                      toast.success(`Hey ${res.data.user.name}, Welcome back!`);

                    
                    });
                  })

                    .catch(err => {
                        toast.error('email or password does not match')
                    })

           

        } else {
            toast.error('please fill all fields')
        }

    }


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            {/* {isAuth ? <Redirect to='/' /> : null} */}

          <ToastContainer></ToastContainer>

            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>

                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Sign In for User
                        </h1>

                        {/* form */}

                        <form className='w-full flex-1 mt-8 text-indigo-500' onSubmit={handleSubmit}>

                            
                            {/* email */}
                            <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                type='email'
                                placeholder='Email'
                                onChange={handleChange('email')}
                                value={email}
                            />

                            {/* password */}
                            <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                type='password'
                                placeholder='Password'
                                onChange={handleChange('password1')}
                                value={password1}
                            />

                           

                            {/* button */}
                            <button
                                type='submit'
                                className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                            >Sign In
                                {/* <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                                <span className='ml-3'>{textChange}</span> */}
                            </button>

                            <div className='my-12 border-b text-center'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Or sign with email or social login
                                </div>
                            </div>

                            {/* login */}
                            <div className='flex flex-col items-center'>
                                <a
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                    href='/register'
                                    target='_self'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                    <span className='ml-4'>Sign Up</span>
                                </a>
                            </div>

                        </form>

                    </div>
                </div>
                
                {/* side img */}
                <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                    <div
                        className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                        style={{ backgroundImage: `url(${authSvg})` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Login
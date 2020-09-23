import React, { Component } from 'react'
import authSvg from '../assests/home.svg'

export class Home extends Component {
    render() {
        return (
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
             
    
               
    
                <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                    <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                        <div className='mt-12 flex flex-col items-center'>
    
                        <div className='my-12 border-b text-center'>
                                
                               
                                  <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                     <h3>Login </h3>
                                      </div>
                              </div>
    
                            
                            {/* sign in */}
                            

                            <div className='flex flex-col items-center'>
                                <a
                                    className='btn btn-success px-5 py-2'
                                    href='/login'
                                    target='_self'
                                >
                                   
                                    <span>Sign In</span>
                                </a>
                               
                            </div>
    
                            <br></br>
                            <div className='my-12 border-b text-center'>
                                
                             
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                   <h3>Register</h3>
                                    </div>
                            </div>
    
                            {/* signup */}
                            <div className='flex flex-col items-center'>
                                <a
                                    className='btn btn-danger px-5 py-2'
                                    href='/register'
                                    target='_self'
                                >
                                   
                                    <span>Sign Up</span>
                                </a>
                            </div>
    
    
    
    
    
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
}

export default Home

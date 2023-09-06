import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { reset, logout } from '../features/auth/authSlice';
import { BiLogIn } from 'react-icons/bi';


function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.auth.user);


  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  

  return (
    <>
    <nav>
      <header className='header-top-strip py-2'>
        <div className='container-xxl'>
          <div className='row d-flex align-items-center'>
            <div className='col-6 '>
              <div className='header-login d-flex flex-wrap align-items-center justify-content-end gap-3 mx-3'>
          
                {user !== null ? (
                  <div>
                    <div className='d-flex gap-3 align-items-center dropdown '>
                      <div>
                        <img
                          className='rounded-circle'
                          src={`/public/images/profiles/${userState.profile}`}
                          alt='profile'
                          height={32}
                          width={32}
                        />
                      </div>
                      <div
                        role='button'
                        id='dropdownMenuLink'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'>
                        <p className='mb-0 fw-bold '>
                          {userState.firstname} {userState.lastname}
                        </p>
                      </div>
                      <div
                        style={{ zIndex: 3 }}
                        className='dropdown-menu '
                        aria-labelledby='dropdownMenuLink'>
                   

                        <li
                          className='dropdown-item py-2 mb-1'
                          style={{ height: 'auto', lineHeight: '13px' }}>
                          <Button
                            type='submit'
                            onClick={onLogout}
                            className='dropdown-item fs-6'>
                            Sign Out
                          </Button>
                        </li>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <Link
                        to='/login'
                        className='d-flex justify-content-end gap-10 text-dark'>
                        <BiLogIn className='fs-4' />
                        <p className='mb-0 fs-6'>Log In</p>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className='header-upper py-2 '>
        <div className='container-xxl'>
          <div className='row d-flex align-items-center'>
            <div className='col-2'>
              <Link to='/'>
                <img width={150} src='/images/HouseLogoGrey.svg' alt='logo' />
              </Link>
            </div>
         
            
              </div>
            </div>
       
      
      </header>
      </nav>
    </>
  );
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {



  return (
    <>
      <nav>
        <header className='header-top-strip py-2'>
          <div className='container-xxl'>
            <div className='row d-flex align-items-center'>
              <div className='col-2 '>
                <div className='header-login d-flex flex-wrap align-items-center justify-content-end gap-3 mx-3'>
                  <img src='../../public/images/HouseLogoGrey.svg' alt='logo'></img>

                  <div className='col-2 '>

                  </div>
                  <div className='col-2 '>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className='col-2'>
          <Link to='/'>
            <img width={150} src='/images/HouseLogoGrey.svg' alt='logo' />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

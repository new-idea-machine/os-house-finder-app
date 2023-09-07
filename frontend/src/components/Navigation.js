import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-xxl bg-body-tertiary">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="align-items-center pt-5 px-5">
            <a className="navbar-brand fw-bold fs-5" href="#">
              <img width={130} src="/images/HouseLogoGrey.svg" alt="logo" />
              <div>  House Finder</div>
            </a>
          </div>

          <div className="d-flex align-items-center px-5">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-3">
                <a className="nav-link fw-bold fs-6 btn btn-secondary" href="#">
                  How Scoring SYSTEM works
                </a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link fw-bold fs-6 btn btn-secondary" href="#">
                  FAQ
                </a>
              </li>
              <li className="nav-item me-5">
                <a className="nav-link fw-bold fs-6 btn btn-secondary" href="#">
                  Login/Signup
                </a>
              </li>
            </ul>

            {/* Dummy user, should turn on/off based on login state */}
            <a className='text-primary fw-bold fs-5 text-decoration-none' href="#">
              <img
                width={120}
                src="/images/DummyUserPhoto.jpg"
                alt="user"
                style={{ borderRadius: '50%' }}
              />
              User01
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navigation;

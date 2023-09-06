import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineLocationCity } from 'react-icons/md';
import { MdOutlinePhoneIphone } from 'react-icons/md';


const PropertyCard = (props) => {
  // const API_URL = 'http://localhost:5000';
  return (
    <>
      <div className='property-card'>
        <Link
          to={`/pets/${props.petId}`}
          className='product-card position-relative py-3'>
          <div className='pet-image'>
            <img
              // src={`${API_URL}/public/images/pets/${props.img}`}
              src={`/public/images/pets/${props.img}`}
              alt={props.img}
              className='pet-card-img img-fluid  rounded-3'
            />
          </div>
          <div className='pet-details p-1'>
            <h6 className='breder pt-2 text-dark fw-bolder '>
              <span className='font-weight-normal'>
                <PetIcon species={props.species} />
              </span>{' '}
              {props.name}
            </h6>
            <p className='text-dark pet-card-breed fs-6'> {props.breed}</p>
            <p className='text-dark pet-card-desc fs-6'>{props.desc}</p>
            <div className=' info pt-1 pet-card-address'>
              {props.address ? <div className='text-dark d-flex flex-wrap mb-1 gap-2 row'>
                <div className='col-md-1'>
                  <MdOutlineLocationCity
                    className='mb-0 mt-1'
                    style={{ color: '#50D9A3', fontSize: '20px' }}
                  />
                </div>
                <div className='col-md-9'>{props.address}</div>
              </div> : null}
              {props.tel ? <p className='text-dark d-flex flex-wrap aligin-items-start mb-1 gap-2 '>
                <MdOutlinePhoneIphone
                  className='mb-0 mt-1 fw-bold'
                  style={{ color: '#50D9A3', fontSize: '20px' }}
                />
                {props.tel}
              </p> : null}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PropertyCard;

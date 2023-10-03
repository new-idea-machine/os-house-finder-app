import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import decision from '../assets/images/Decision.jpg';
import dummyHouse from '../assets/images/DummyHouse.png';

function HomeCarousel() {
  return (
    <div className="container-xl d-flex justify-content-center align-items-center py-2">
      <div style={{ display: 'block', width: 1100, height: 500, padding: 30 }}>
        <Carousel>
          <Carousel.Item interval={10000}>
            <img className="d-block w-100" src={decision} alt="One" />
            <Carousel.Caption>
              <h3>A website helps you make a wise decision</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img className="d-block w-100" src={dummyHouse} alt="Two" />
            <Carousel.Caption>
              <h3>A website helps you find a dream house</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default HomeCarousel;

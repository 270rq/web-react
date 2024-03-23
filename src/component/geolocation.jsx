import React from 'react';
import { Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import './grid.css';

const GeoLocation = () => {
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        alert(`Your current location is: Latitude ${latitude}, Longitude ${longitude}`);
      }, (error) => {
        console.error(error.message);
        alert('Failed to retrieve location. Please enable location services.');
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <Button
      type="primary"
      className='GeiLocation-button'
      style={{ backgroundColor: '#4CBB17', transition: 'background-color 0.3s' }}
      onClick={handleGetLocation}
    >
      <AimOutlined />
      Текущее местоположение
    </Button>
  );
};

export default GeoLocation;
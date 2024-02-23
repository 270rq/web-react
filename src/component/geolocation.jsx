import React from 'react';
import { Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import './grid.css'

const GeoLocation = () => (
  <Button type="primary"  className='GeiLocation-button' style={{ backgroundColor: '#4CBB17', transition: 'background-color 0.3s' }}><AimOutlined />
    Current Location
  </Button>
);

export default GeoLocation;
// type="success" 
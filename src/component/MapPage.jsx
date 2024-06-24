import React from 'react';
import MapComponent from './map';
import './MapPage.css';

const MapPage = () => {
  return (
    <div className="map-page-container">
      <div className="map-component-container">
        <div className="map-wrapper">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
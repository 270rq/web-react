import React from 'react';
import MapComponent from './map';
import GridMapTable from './infornation';
import './MapPage.css'; // Создайте файл стилей (например, MapPage.css)

const MapPage = () => {
  return (
    <div className="map-page-container">
      <div className="grid-map-table-container">
        <GridMapTable />
      </div>
      <div className="map-component-container">
        <div className="map-wrapper">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
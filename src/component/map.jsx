import React, { useState } from 'react';
import { YMaps, Map, RoutePanel, GeolocationControl } from '@pbe/react-yandex-maps';

const MapComponent = () => {
  const [destination, setDestination] = useState([55.751574, 37.573856]);

  const handleGeolocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setDestination([latitude, longitude]);
    });
  };

  return (
    <YMaps query={{ apikey: "ed158a2d-97a9-49a1-8011-28555c611f7a" }}>
      <div>
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 10 }}
          style={{ width: '100%', height: '400px' }}
          defaultOptions={{ suppressMapOpenBlock: true }}
        >
          <RoutePanel visible={true} destination={destination} />
          <GeolocationControl options={{ float: 'right' }} onClick={handleGeolocationClick} />
        </Map>
      </div>
    </YMaps>
  );
};

export default MapComponent;
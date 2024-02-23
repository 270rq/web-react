import React from 'react';
import { YMaps, Map} from '@pbe/react-yandex-maps';

const MapComponent = () => {
  return (
    <YMaps>
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 10 }}
          style={{ width: '100%', height: '100%' }}
          defaultOptions={{ suppressMapOpenBlock: true }}
        >
        </Map>
    </YMaps>
  );
};

export default MapComponent;
import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, RoutePanel } from '@pbe/react-yandex-maps';
import { Cascader, Slider, Form, Button } from 'antd';
import axios from 'axios';

const MapComponent = () => {
  const [flowerOptions, setFlowerOptions] = useState([]);
  const [selectedAllergen, setSelectedAllergen] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [hour, setHour] = useState(new Date().getHours()); // Установка начального значения слайдера равного текущему часу

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/family");
        if (!response.data) {
          throw new Error("Network response for family data was not valid");
        }
        const data = response.data;
        const newFlowerOptions = data.map((family) => ({
          value: family.id,
          label: family.name,
          children: family.flower.map((flower) => ({
            value: flower.id,
            label: flower.name,
          })),
        }));

        setFlowerOptions(newFlowerOptions);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAllergenChange = async (value, hour) => {
    setSelectedAllergen(value);
    try {
      const response = await axios.get(`http://your-api-url/geyByFlowerAndTime?flowerId=${value[1]}&hour=${hour}`);
      if (response.data) {
        const allergenData = response.data;
        const newMarkers = allergenData.map((item) => ({
          geometry: item.geometry,
          properties: {
            hintContent: item.name,
            balloonContent: item.description,
          },
        }));
        setMarkers(newMarkers);
      }
    } catch (error) {
      console.error("Error fetching allergen data:", error.message);
    }
  };

  const handleSliderChange = (value) => {
    setHour(value);
    handleAllergenChange(selectedAllergen, value);
  };

  const handleFormSubmit = async (values) => {
    const flowerId = values.TreeSelect[1]; // ID выбранного аллергена
    const hourValue = hour; // выбранный час

    try {
      const response = await axios.get(`http://your-api-url/geyByFlowerAndTime?flowerId=${flowerId}&hour=${hourValue}`);
      if (response.data) {
        const allergenData = response.data;
        const newMarkers = allergenData.map((item) => ({
          geometry: item.geometry,
          properties: {
            hintContent: item.name,
            balloonContent: item.description,
          },
        }));
        setMarkers(newMarkers); // Обновление координат аллергена на карте
      }
    } catch (error) {
      console.error("Error fetching allergen data:", error.message);
    }
  };

  return (
    <YMaps query={{ apikey: "ed158a2d-97a9-49a1-8011-28555c611f7a" }}>
      <div>
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 10 }}
          style={{ position: 'relative', width: '100%', height: '400px' }}
          defaultOptions={{ suppressMapOpenBlock: true }}
        >
          {markers.map((marker, index) => (
            <Placemark key={index} geometry={marker.geometry} properties={marker.properties} />
          ))}
          <RoutePanel visible={true} destination={[55.751574, 37.573856]} />
          
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
            <Form onFinish={handleFormSubmit} style={{ width: '200px' }}>
              <Form.Item name="TreeSelect" label="Аллерген" rules={[{ required: true, message: 'Пожалуйста, выберите аллерген!' }]}>
                <Cascader
                  options={flowerOptions}
                  placeholder="Выберите аллерген"
                  changeOnSelect
                />
              </Form.Item>
              <Form.Item name="Slider" label="Выберите час" rules={[{ required: true, message: 'Пожалуйста, выберите час!' }]}>
                <Slider min={new Date().getHours()} max={23} onChange={handleSliderChange} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Показать на карте</Button>
              </Form.Item>
            </Form>
          </div>
        </Map>
      </div>
    </YMaps>
  );
};

export default MapComponent;
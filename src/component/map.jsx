import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Cascader, Form, Button, Segmented } from "antd";
import GridMapTable from "./infornation";
import axios from "axios";
import "./map.css";

const ScrollableSegmented = ({ options, onChange }) => {
  return (
    <div className="scrollable-segmented-wrapper">
      <Segmented
        className="scrollable-segmented"
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

const MapComponent = () => {
  const [flowerOptions, setFlowerOptions] = useState([]);
  const [selectedAllergen, setSelectedAllergen] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedHour, setHour] = useState(new Date().getHours());

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

  useEffect(() => {
    const fetchData = async () => {
      if (selectedAllergen) {
        try {
          const date = new Date();
          const curHour = date.getHours();
          const addHour = selectedHour - curHour;
          date.setHours(curHour, 0, 0, 0);
          date.setMinutes(date.getMinutes() + addHour * 60);
          const response = await axios.get(
            `http://localhost:3000/api/map/flower/${selectedAllergen['TreeSelect'][1]}?date=${date}`
          );
          if (response.data) {
            const allergenData = response.data;
            const newMarkers = allergenData.map((item) => ({
              geometry: [item.x, item.y],
              properties: {
                hintContent: item.flowerId,
                balloonContent: item.lvl,
              },
            }));
            setMarkers(newMarkers);
          }
        } catch (error) {
          console.error("Error fetching allergen data:", error.message);
        }
      }
    };
    fetchData();
  }, [selectedHour, selectedAllergen]);

  const handleAllergenChange = (value) => {
    setSelectedAllergen(value);
    // Make API call based on selected allergen and hour
  };

  const handleSliderChange = (value) => {
    setHour(value);
    handleAllergenChange(selectedAllergen);
  };

  const renderSliderOptions = () => {
    const options = [];
    const currentHour = new Date().getHours();

    for (let i = currentHour; i < currentHour + 48; i++) {
      const hour = i % 24;
      options.push({
        label: `${hour}:00`,
        value: i,
      });
    }

    return options;
  };

  return (
    <YMaps query={{ apikey: "ed158a2d-97a9-49a1-8011-28555c611f7a" }}>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 10 }}
          style={{ width: "100%", height: "100%" }}
          defaultOptions={{ suppressMapOpenBlock: true }}
        >
          {markers.map((marker, index) => (
            <Placemark
              key={index}
              geometry={marker.geometry}
              properties={marker.properties}
            />
          ))}

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "10%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              zIndex: 999,
            }}
          >
            <div
              className="grid-map-table-container"
              style={{ position: "relative", marginBottom: "20px" }}
            >
              <GridMapTable />
            </div>
            <Form onFinish={handleAllergenChange} style={{ width: "200px" }}>
              <Form.Item
                name="TreeSelect"
                label="Аллерген"
                rules={[
                  { required: true, message: "Пожалуйста, выберите аллерген!" },
                ]}
              >
                <Cascader
                  options={flowerOptions}
                  placeholder="Выберите аллерген"
                  changeOnSelect
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Показать на карте
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Map>
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "5%",
            right: "5%", 
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 999,
            height: "100px",
            overflowY: "hidden",
            overflowX: "auto",
            width: "auto",
            margin: "0 auto",
          }}
        >
          <Form.Item name="Slider" label="Выберите час">
            <ScrollableSegmented
              options={renderSliderOptions()}
              onChange={handleSliderChange}
            />
          </Form.Item>
        </div>
      </div>
    </YMaps>
  );
};

export default MapComponent;
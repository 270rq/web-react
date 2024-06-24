import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Cascader, Form, Segmented } from "antd";
import GridMapTable from "./infornation";
import axios from "axios";
import "./map.css";
import GridLvlTable from "./allergen.lvl";
import { config } from "../config/config";

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
        const response = await axios.get(`${config.host}/family`);
        if (!response.data) {
          throw new Error("Сетевой ответ для данных о семье был недействителен");
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
        console.error("Ошибка при получении данных:", error.message);
      }
    };
    fetchData();
  }, []);

    const fetchAllergens = async () => {
      if (selectedAllergen) {
        try {
          const date = new Date();
          const curHour = date.getHours();
          const addHour = selectedHour - curHour;
          date.setHours(curHour-1, 0, 0, 0);
          date.setMinutes(date.getMinutes() + addHour * 60);
          const response = await axios.get(
            `${config.host}/map/flower/${selectedAllergen[1]}?date=${date}`
          );
          if (response.data) {
            const allergenData = response.data;
            const newMarkers = allergenData.map((item) => ({
              geometry: [item.x, item.y],
              properties: {
                hintContent: item.flowerId,
                balloonContent: item.lvl,
                iconColor: getColorForLevel(item.lvl),
              },
            }));
            setMarkers(newMarkers);
          }
        } catch (error) {
          console.error("Ошибка при получении данных об аллергене:", error.message);
        }
      }
    };

  const handleAllergenChange = (value) => {
    setSelectedAllergen(value);
    fetchAllergens()
  };

  const handleSliderChange = (value) => {
    console.log(value)
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

  const getColorForLevel = (lvl) => {
    let color = "#bcbcbc";
  
    if (lvl >= 1 && lvl <= 10) {
      color = "#00ff00";
    } else if (lvl >= 11 && lvl <= 100) {
      color = "#ffff00";
    } else if (lvl >= 101 && lvl <= 1000) {
      color = "#ffa500";
    } else if (lvl >= 1001) {
      color = "#ff0000";
    }
  
    return color;
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
              options={{
                iconColor: marker.properties.iconColor, 
              }}
            />
          ))}

          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "15%",
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
            <Form style={{ width: "300px" }}>
              <Form.Item
                name="TreeSelect"
                label="Аллерген"
                rules={[
                  { required: true, message: "Пожалуйста, выберите аллерген!" },
                ]}
              >
                <Cascader
                  options={flowerOptions}
                  onChange={handleAllergenChange}
                  placeholder="Выберите аллерген"
                  changeOnSelect
                />
              </Form.Item>
            </Form>
            <GridLvlTable/>
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
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { config } from "../config/config";

const CitySearch = ({ setCity, setRegion }) => {
  const [allCities, setAllCities] = useState([]);

  useEffect(() => {
    const searchCities = async () => {
      try {
        const response = await axios.get(`${config.host}/region`);
        const data = response.data;
        const citiesData = data.flatMap((region) =>
          region.city.map((city) => `${region.name} ${city.name}`)
        );
        setAllCities(citiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    searchCities();
  }, []);
  const onChange = (value) => {
    const words = value.split(/\s+/).filter(Boolean); // Разделение строки по пробелам и удаление пустых элементов
    const city = words.pop(); // Получение и удаление последнего слова
    const region = words.join(" ");
    setCity(city);
    setRegion(region);
    console.log(`selected ${value}`);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      style={{ width: "70%" }}
      showSearch
      placeholder="Выбери город"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={filterOption}
      options={allCities.map((city) => ({ label: city, value: city }))}
    />
  );
};

export default CitySearch;

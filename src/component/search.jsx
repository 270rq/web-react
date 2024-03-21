import React, {useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';


const CitySearch = () => {
  const [allCities, setAllCities] = useState([]);

  useEffect(()=>{
const searchCities = async () => {
try {
const response = await axios.get('http://localhost:3000/api/region');
const data = response.data;
const citiesData = data.flatMap(region=>region.city.map(city=> `${region.name} ${city.name}`))
setAllCities(citiesData);
} catch (error) {
console.error('Error fetching data:', error);
}
};
searchCities();
    
  },[])
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
     <Select
     style={{ width: "70%" }}
    showSearch
    placeholder="Выбери город"
    optionFilterProp="children"
    onChange={onChange}
    filterOption={filterOption}
    options={allCities.map(city=>({label:city,value:city}))}
  />
    


);
};

export default CitySearch;
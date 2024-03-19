import React, {useEffect, useState } from 'react';
import { Input, List } from 'antd';
import axios from 'axios';

const { Search } = Input;

const CitySearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cities, setCities] = useState([]);
  const [allCities, setAllCities] = useState([]);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      setCities(allCities.filter(city=>city.toLowerCase().includes(searchValue.toLocaleLowerCase()))); } 
     else {
      setCities([]);
    }
  }, [allCities, searchValue]);
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
  
  const onSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <Search 
        placeholder="Поиск города..." 
        onSearch={onSearch} 
        style={{ margin: "0 1rem", width: "73%" }} 
      />
      <List
        dataSource={cities}
        renderItem={(city, index) => (
          <List.Item key={index}>
            {city}
          </List.Item>
        )}
        style={{ margin: "1rem 1rem", width: "73%" }}
      />
    

</div>

);
};

export default CitySearch;
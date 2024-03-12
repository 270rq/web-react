import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

const { Search } = Input;


const CitySearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cities, setCities] = useState([{
    id: 1, region:"Коми", city: "Ухта"
  }]);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      searchCities();
    } else {
      setCities([]);
    }
  }, [searchValue]);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const searchCities = debounce(async (value) => {
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
      const data = await response.json();
      const citiesData = data.hits.hits.map((el) => el._source);
      setCities(citiesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 1000);

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    setSearchValue(value);
  };

  

  return (
    <div>
      <Search 
        placeholder="Поиск города..." 
        onSearch={onSearch} 
        style={{ margin: "0 1rem", width: "73%" }} 
      />
    </div>
  );
};

export default CitySearch;
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const CitySearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
  }, [searchValue]);

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
      
      <ul>
        {cities.map(city => (
          <li key={city.id}>{city.city}, {city.region}</li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch;
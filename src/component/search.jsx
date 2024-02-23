import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info?.source, value);

const SearchCity= () => (
  <Space direction="vertical">
    <Search placeholder="Поиск города..." onSearch={onSearch} style={{ width:'50rem', height:'4rem'}} />
  </Space>
);

export default SearchCity;
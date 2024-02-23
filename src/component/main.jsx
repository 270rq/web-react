import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import GridTable from './grid';
import Login from './login';
import MapPage from './MapPage';
import SearchCity from './search';
import GeoLocation from './geolocation';
import SwitchTemp from './switch';

const { Header, Sider, Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('weather'); // Страница по умолчанию - погода

  const renderPage = () => {
    switch (currentPage) {
      case 'weather':
        return <GridTable />;
      case 'map':
        return <MapPage/>;
      case 'login':
        return <Login/>;
      default:
        return <GridTable />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['weather']}
          onSelect={({ key }) => setCurrentPage(key)}
        >
          <Menu.Item key="weather" icon={<UserOutlined />}>
            Погода
          </Menu.Item>
          <Menu.Item key="map" icon={<VideoCameraOutlined />}>
            Карта
          </Menu.Item>
          <Menu.Item key="login" icon={<UploadOutlined />}>
            Вход
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <span>Menu</span>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SearchCity />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <GeoLocation />
            <div style={{ marginLeft: '10px' }}>
              <SwitchTemp />
            </div>
          </div>
        </Header>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import GridTable from './grid';
import Login from './login';
import MapPage from './MapPage';
import SearchCity from './search';
import GeoLocation from './geolocation';

const { Header, Sider, Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('weather'); // Страница по умолчанию - погода
  const afterLogin = () => {
    setCurrentPage('weather');
    
  }
  const renderPage = () => {
    switch (currentPage) {
      case 'weather':
        return <GridTable />;
      case 'map':
        return <MapPage/>;
      case 'login':
        return <Login onLogin={afterLogin}/>;
      default:
        return <GridTable />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className={!collapsed ? "sider":"sider-non-active"} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[`${currentPage}`]}
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
          <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: "4rem",
                height: "100%",
                flexShrink: "0",
              }}
            />
            <span>Menu</span>
            <SearchCity />
            <GeoLocation />
          </div>  
        </Header>
      <Content className={!collapsed?'hideContent':''} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
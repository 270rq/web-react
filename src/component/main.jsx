import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import GridTable from "./grid";
import Login from "./login";
import MapPage from "./MapPage";
import SearchCity from "./search";
import Profile from "./profile";
import FeedbackForm from "./feedback";

const { Header, Sider, Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [city, setCity] = useState("Беломорск");
  const [region, setRegion] = useState("Карелия");
  const [currentPage, setCurrentPage] = useState("weather"); // Страница по умолчанию - погода

  const afterLogin = () => {
    setCurrentPage("profile");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "weather":
        return <GridTable city={city} region={region} />;
      case "map":
        return <MapPage />;
      case "login":
        return <Login onLogin={afterLogin}  onLogout={() => {
          setCurrentPage("login");
        }}/>;
      case "profile":
        return (
          <Profile
            onLogout={() => {
              setCurrentPage("login");
            }}
          />
        );
      case "feedback": // Добавляем обработку для страницы обратной связи
        return <FeedbackForm />;
      default:
        return <GridTable />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className={!collapsed ? "sider" : "sider-non-active"}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[`${currentPage}`]}
          defaultSelectedKeys={["weather"]}
          onSelect={({ key }) => setCurrentPage(key)}
        >
          <Menu.Item key="weather" icon={<HomeOutlined />}>
            Погода
          </Menu.Item>
          <Menu.Item key="map" icon={<EnvironmentOutlined />}>
            Карта
          </Menu.Item>
          {localStorage.getItem("id") ? (
            <>
              <Menu.Item key="profile" icon={<UserOutlined />}>
                Профиль
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key="login" icon={<UserOutlined />}>
              Вход
            </Menu.Item>
          )}
          <Menu.Item key="feedback" icon={<CommentOutlined />}>
            Обратная связь
          </Menu.Item>{" "}
          {/* Добавляем кнопку обратной связи в меню */}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: "4rem",
                height: "100%",
                flexShrink: "0",
              }}
            />
            {currentPage === "weather" && (
              <>
                <SearchCity setCity={setCity} setRegion={setRegion} />
              </>
            )}
          </div>
        </Header>
        <Content
          className={!collapsed ? "hideContent" : ""}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;

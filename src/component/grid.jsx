import React, { useEffect, useState } from "react";
import { Row, Card, Col, Space } from "antd";
import "./grid.css";
import "./font.css";
import arow_wind from "../icon/arow-wind.svg";
import sunrise from "../icon/sunrise-svgrepo-com.svg";
import sunset from "../icon/sunset-svgrepo-com.svg";
import humidity from "../icon/water-svgrepo-com.svg";
import wind_speed from "../icon/wind-svgrepo-com.svg";
import pressure from "../icon/gauge-high-svgrepo-com.svg";
import uv from "../icon/uv-index.svg";
import CurrentDateTime from "../component/time";
import axios from "axios";
import iconMappings from "./icon";
import { getWindRotationAngle } from "./windArrow";

const WeatherType = {
  Fog: "Туманно",
  Sunny: "Солнечно",
  Cloudy: "Пасмурно",
  Rain: "Дождь",
  Snow: "Снег",
  Windy: " Ветренно",
  Storm: "Гроза",
};

const GridTable = ({ city, region }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [sunData, setSunData] = useState({});
  const [curMenu, setCurMenu] = useState({});
  const [fiveDays, setFiveDays] = useState([]);

  function groupMenuByDay(menus) {
    const groupedDates = {};

    menus.forEach((menu) => {
      // Преобразуем дату в формат 'YYYY-MM-DD' (без времени), чтобы использовать как ключ
      const formattedDate = new Date(menu.date).toISOString().split("T")[0]; // Получаем 'YYYY-MM-DD'

      // Если ключа для этой даты еще нет, создаем новый массив
      if (!groupedDates[formattedDate]) {
        groupedDates[formattedDate] = [];
      }

      // Добавляем текущую дату в массив для соответствующего ключа (дня)
      groupedDates[formattedDate].push(menu);
    });

    return groupedDates;
  }

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        const weatherUrl = `http://localhost:3000/api/menu/getWeather/${region}/${city}/${formattedDate}`;

        const responseWeather = await axios.get(weatherUrl);
        console.log(responseWeather.data);
        if (responseWeather.data.menuData.city) {
          let currentMenu = responseWeather.data.menuData.data[0];
          let time =
            new Date().getTime() -
            new Date(responseWeather.data.menuData.data[0].date).getTime();
          time = Math.abs(time);
          responseWeather.data.menuData.data.forEach((menu) => {
            const curTime =
              new Date().getTime() - new Date(menu.date).getTime();
            currentMenu = time > Math.abs(curTime) ? menu : currentMenu;
            time = time > Math.abs(curTime) ? curTime : time;
          });
          setCurMenu(currentMenu);
        } else {
          setCurMenu({});
        }
        setSunData(responseWeather.data.sunData[0] || []);
        const hourly = {};

        // Итерируемся по каждому элементу массива
        responseWeather.data.weatherForFiveHours.forEach((item) => {
          // Получаем дату и час из даты
          const date = new Date(item.date).getUTCDay();
          const hour = new Date(item.date).getUTCHours();
          const key = `${date}_${hour}`;

          // Если комбинация даты и часа уже есть в объекте averageTemperatures, добавляем температуру к сумме и увеличиваем счетчик
          if (hourly[key]) {
            hourly[key] = item
          } else {
            // Если комбинации даты и часа еще нет, создаем ее в объекте averageTemperatures
            hourly[key] = item;
          }
        });
        setHourlyData(Object.values(hourly).sort((a,b)=>new Date(a.date) - new Date(b.date)));
        // Группируем данные по дням
        const fiveDaysObject = groupMenuByDay(
          responseWeather.data.weatherForFiveDays
        );
        // Создаем массив для хранения данных по дням
        const daysArray = [];

        // Получаем ключи (даты) из объекта пяти дней
        const fiveDaysKeys = Object.keys(fiveDaysObject);

        // Проходимся по каждой дате
        fiveDaysKeys.forEach((key) => {
          let day = fiveDaysObject[key][0]; // Берем первый элемент из массива данных для текущей даты
          let date = new Date(key); // Создаем объект Date из текущей даты
          date.setHours(12, 0, 0); // Устанавливаем время 12:00 для текущей даты
          // Если есть данные для текущей даты, выбираем наиболее релевантные
          if (fiveDaysObject[key].length > 1) {
            let index = Math.abs(
              date.getMinutes() -
                new Date(fiveDaysObject[key][0].date).getMinutes()
            ); // Вычисляем разницу времени с первым элементом

            // Проходимся по каждому элементу для текущей даты
            fiveDaysObject[key].forEach((el) => {
              const curIndex = Math.abs(
                date.getMinutes() - new Date(el.date).getMinutes()
              ); // Вычисляем разницу времени с текущим элементом
              // Если текущий элемент более релевантен, обновляем данные
              if (index < curIndex) {
                index = curIndex;
                day = el;
              }
            });
          }
          daysArray.push(day); // Добавляем выбранный элемент в массив данных для дня
        });
        setFiveDays(daysArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city, region]);
  return (
    <div className="grid-table-container">
      <Row
        gutter={[8, 16]}
        style={{ marginBottom: "1rem", justifyContent: "center" }}
      >
        <Card className="card-weather-t">
          <div className="font city-name">
            {region} {city}
          </div>
          <CurrentDateTime />
        </Card>
        <Card className="card-weather-detail">
          <Row className="card-weather-detail-container" flexDirection="row">
            <div className="time-weather-complain">
              <Card
                className="detail-card detail-card-temp "
                style={{ marginRight: "16px" }}
              >
                <Col className="detail-card-column" gutter={[16, 8]}>
                  <div className="font detail-card-content detail-card-temperature">
                    {curMenu.temperature}
                    °C
                  </div>
                  <div className="sun-content">
                    <div className="sunrise-content">
                      <img
                        className="sunrise-icon"
                        src={sunrise}
                        alt={`Иконка восхода`}
                      />
                      <div className="sunrise-time">
                        <p className="font sunrise-label">Восход</p>
                        <p className="font sunrise-time-text">
                          {sunData.sunrise &&
                            new Date(sunData.sunrise).toLocaleTimeString(
                              "en-US",
                              {
                                hour12: false,
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "UTC",
                              }
                            )}
                        </p>
                      </div>
                    </div>
                    <div className="sunset-content">
                      <img
                        className="sunset-icon"
                        src={sunset}
                        alt={`Иконка захода`}
                      />
                      <div className="sunset-time">
                        <p className="font sunset-label">Заход</p>
                        <p className="font sunset-time-text">
                          {sunData.sunset &&
                            new Date(sunData.sunset).toLocaleTimeString(
                              "en-US",
                              {
                                hour12: false,
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "UTC",
                              }
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Card>
              <Card
                className="detail-card detail-card-weather"
                style={{ marginRight: "16px" }}
              >
                <Col className="weather-description" gutter={[16, 8]}>
                  <img
                    src={iconMappings[curMenu.weatherType]}
                    style={{ height: "7rem" }}
                    alt={`Погода`}
                  />
                  <div className="font detail-card-content detail-card-description">
                    {WeatherType[curMenu.weatherType]}
                  </div>
                </Col>
              </Card>
            </div>
            <Card className="detail-card detail-card-param">
              <Col className="all-detail-content">
                <Row>
                  <div className="detail-content">
                    <img
                      className="humidity-icon"
                      src={humidity}
                      alt={`Иконка влажности`}
                    />
                    <p className="font humidity-text">{curMenu.humidity}%</p>
                    <p className="font humidity-label">Влажность</p>
                  </div>
                  <div className="detail-content">
                    <img
                      className="wind-speed-icon"
                      src={wind_speed}
                      alt={`Иконка скорсоти ветра`}
                    />
                    <p className="font wind-speed-text">
                      {curMenu.windSpeed} км/ч
                    </p>
                    <p className="font wind-speed-label">Скорость ветра</p>
                  </div>
                </Row>
                <Row>
                  <div className="detail-content">
                    <img
                      className="pressure-icon"
                      src={pressure}
                      alt={`Иконка давления`}
                    />
                    <p className="font pressure-text">{curMenu.pressure}</p>
                    <p className="font pressure-label">Давление</p>
                  </div>
                  <div className="detail-content">
                    <img className="uv-icon" src={uv} alt={`Иконка uv`} />
                    <p className="font uv-text">{curMenu.uv}</p>
                    <p className="font uv-label">UV</p>
                  </div>
                </Row>
              </Col>
            </Card>
          </Row>
        </Card>
      </Row>
      <Row gutter={[8, 16]} style={{ justifyContent: "center" }}>
        <Card
          className="card-weather-5-days"
          size="small"
          style={{ background: "some" }}
          title={<div className="font card-title">Погода на 5 дней</div>}
        >
          <Row
            gutter={[1, 2]}
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              flexWrap: "nowrap",
            }}
          >
            {fiveDays &&
              fiveDays.map((day, index) => (
                <Row
                  className="card-weather-5-days-row"
                  gutter={[4, 4]}
                  key={index}
                >
                  <Space size={100}>
                    <img
                      className="card-weather-5-days-icon"
                      src={iconMappings[day.weatherType]}
                      alt={`Погода`}
                    />
                    <div className="font card-weather-5-days-temperature">
                      {day.temperature}°C
                    </div>
                    <div>
                      {new Date(day.date).getUTCDate()}{" "}
                      {months[new Date(day.date).getMonth()]}
                    </div>
                  </Space>
                </Row>
              ))}
          </Row>
        </Card>

        <Card
          className="card-weather-hourly"
          size="small"
          styles={{ body: { height: "85%" } }}
          title={<div className="font card-title">Почасовая погода</div>}
        >
          <div className="card-weather-hourly-container">
            {hourlyData &&
              hourlyData.map((hour, index) => {
                return (
                  <Card
                    className="hourly-card"
                    key={index}
                    style={{ height: "100%", width: "5rem" }}
                  >
                    <Row
                      gutter={[16, 8]}
                      align="center"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className="font hourly-card-content hourly-card-content-time">
                        {" "}
                        {new Date(hour.date).getHours()}:00
                      </div>
                      <img
                        style={{ width: "2.5rem", height: "2.5rem" }}
                        src={iconMappings[hour.weatherType]}
                        alt={`Погода ${index + 1}`}
                      />
                      <div className="font hourly-card-content hourly-card-content-temperature">
                        {hour.temperature}C
                      </div>
                      <img
                        src={arow_wind}
                        alt={`Ветер ${index + 1}`}
                        style={{
                          transform: `rotate(${getWindRotationAngle(
                            hour.windType
                          )}deg)`,
                        }}
                      />
                      <div
                        style={{ width: "4rem" }}
                        className="font hourly-card-content hourly-card-content-wind"
                      >
                        {hour.windSpeed} м/с
                      </div>
                    </Row>
                  </Card>
                );
              })}
          </div>
        </Card>
      </Row>
    </div>
  );
};

export default GridTable;

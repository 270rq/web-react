import React, { useEffect, useState } from 'react';
import { Row, Card, Col, Space } from 'antd';
import './grid.css';
import './font.css';
import arow_wind from '../icon/arow-wind.svg';
import weather_description from '../weather3d/01_sunny_color.svg';
import sunrise from '../icon/sunrise-svgrepo-com.svg';
import sunset from '../icon/sunset-svgrepo-com.svg';
import humidity from '../icon/water-svgrepo-com.svg';
import wind_speed from '../icon/wind-svgrepo-com.svg';
import pressure from '../icon/gauge-high-svgrepo-com.svg';
import uv from '../icon/uv-index.svg';
import CurrentDateTime from '../component/time';
import axios from 'axios';

const GridTable = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [fiveDays, setFiveDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/menu/Калужская область/Киров/2024-03-24T13%3A54%3A35.478Z');
        setWeatherData(response.data);

        const generateDaysOfWeek = () => {
          const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
          const today = new Date().getDay();
          const daysFromTomorrow = days.slice(today + 1, today + 6);

          return daysFromTomorrow.map((day, index) => {
            const currentDate = new Date();
            const nextDay = new Date(currentDate.getTime() + (index + 1) * 24 * 60 * 60 * 1000);
            const dayOfWeek = day;
            const date = nextDay.getDate();
            const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
            const month = monthNames[nextDay.getMonth()];

            return { dayOfWeek, date: `${date} ${month}` };
          });
        };

        const daysOfWeek = generateDaysOfWeek();
        setFiveDays(daysOfWeek);

      } catch (error) {
        console.error('Error fetching weather data: ', error);
      }
    };

    fetchData();
  }, []);

  return(
  
  <div className="grid-table-container">
    <Row gutter={[8, 16]} style={{marginBottom:"1rem", justifyContent:"center"}}>
      
    <Card className="card-weather-t">
  <div className="font city-name">Athens</div>
  <CurrentDateTime />
  </Card>
  <Card className="card-weather-detail">
  <Row className='card-weather-detail-container' flexDirection="row">
    <div className='time-weather-complain'>
    <Card className="detail-card detail-card-temp " style={{ marginRight: '16px' }}>
  <Col className='detail-card-column' gutter={[16, 8]}>
    <div className="font detail-card-content detail-card-temperature">{weatherData.temperature}°C</div>
    <div className="sun-content">
      <div className="sunrise-content">
        <img className="sunrise-icon" src={sunrise} alt={`Иконка восхода`} />
        <div className="sunrise-time">
          <p className="font sunrise-label">Восход</p>
          <p className="font sunrise-time-text">06:37</p>
        </div>
      </div>
      <div className="sunset-content">
        <img className="sunset-icon" src={sunset} alt={`Иконка захода`} />
        <div className="sunset-time">
          <p className="font sunset-label">Заход</p>
          <p className="font sunset-time-text">16:37</p>
        </div>
      </div>
    </div>
  </Col>
</Card>
    <Card className="detail-card detail-card-weather" style={{ marginRight: '16px' }}>
      <Col className='weather-description' gutter={[16, 8]}>
        <img src={weather_description} alt={`Погода`}/>
        <div className="font detail-card-content detail-card-description">Солнечно</div>
      </Col>
    </Card></div>
    <Card className="detail-card detail-card-param">
        <Col className='all-detail-content'>
          <Row>
          <div className='detail-content'>
            <img className="humidity-icon" src={humidity} alt={`Иконка влажности`} />
            <p className="font humidity-text">%</p>
  <p className="font humidity-label">Влажность</p>
          </div>
          <div className='detail-content'>
            <img className="wind-speed-icon" src={wind_speed} alt={`Иконка скорсоти ветра`} />
            <p className="font wind-speed-text">2km/h</p>
  <p className="font wind-speed-label">Скорость ветра</p>
          </div>
          </Row>
          <Row>
          <div className='detail-content'>
            <img className="pressure-icon" src={pressure} alt={`Иконка давления`} />
            <p className="font pressure-text">988</p>
  <p className="font pressure-label">Давление</p>
          </div>
          <div className='detail-content'>
            <img className="uv-icon" src={uv} alt={`Иконка uv`} />
            <p className="font uv-text">8</p>
  <p className="font uv-label">UV</p>
          </div>
          </Row>
        </Col>
    </Card>
  </Row>
</Card>
      
    </Row>
    <Row gutter={[8, 16]} style={{ justifyContent:"center"}}>
    
    <Card className="card-weather-5-days" size='small' style={{background:"some"}}  title={<div className="font card-title">Погода на 5 дней</div>}>
  <Row gutter={[1, 2]} style={{ flexDirection: 'column', justifyContent: "space-between", height:"100%" }}>
   {fiveDays && fiveDays.map((day, index) => (
  <Row className="card-weather-5-days-row" gutter={[4, 4]} key={index}>
    <Space size={100}>
      <img className="card-weather-5-days-icon" src={arow_wind} alt={`Погода`} />
      <div className="font card-weather-5-days-temperature">20°C</div>
      <div>{day.dayOfWeek}, {day.date}</div>
    </Space>
  </Row>
))}
  </Row>
</Card>
      
      
<Card className="card-weather-hourly" size='small' title={<div className="font card-title">Почасовая погода</div>}>
  <div className='card-weather-hourly-container'>
    {[...Array(5)].map((_, index) => {
      const curHour = new Date().getHours();
      const nextHour = (curHour + index + 1) % 24; // Начинаем с часа после текущего часа
      return (
        <Card className="hourly-card" key={index}>
          <Row gutter={[16, 8]} align="center" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="font hourly-card-content hourly-card-content-time"> {nextHour}:00</div>
            <img src={arow_wind} alt={`Погода ${index + 1}`} />
            <div className="font hourly-card-content hourly-card-content-temperature">20°C</div>
            <img src={arow_wind} alt={`Ветер ${index + 1}`} />
            <div className="font hourly-card-content hourly-card-content-wind">3m/s</div>
          </Row>
        </Card>
      );
    })}
  </div>
</Card>
    
    </Row>
  </div>

)}

export default GridTable;
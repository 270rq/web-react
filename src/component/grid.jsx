import React from 'react';
import { Row, Card } from 'antd';
import './grid.css';

const GridTable = () => (
  <div className="grid-table-container">
    <Row gutter={[8, 16]}>
      
        <Card className="card-weather-t">Погода+t</Card>
      
        <Card className="card-weather-detail">
  <Row gutter={[1, 2]} style={{ width: '100%' }}>
    <Card className="group-card">
      <p>Погода день 1</p>
    </Card>
    <Card className="group-card">
      <p>Погода день 3</p>
    </Card>
    <Card className="group-card">
      <p>Погода день 5</p>
    </Card>
  </Row>
</Card>
      
    </Row>
    <Row gutter={[1, 2]}>
    
    <Card className="card-weather-5-days" title="Прогноз на 5 дней" >
  <Row gutter={[1, 2]} style={{ flexDirection: 'column' }}>
    {[...Array(5)].map((_, index) => (
      <Card key={index} style={{ width: '25rem', height: '2.8rem' }} headStyle={{ display: 'none' }}>
      </Card>
    ))}
  </Row>
</Card>
      
      
        <Card className="card-weather-hourly"  title="Почасовая погода">
          <Row gutter={[0.25, 0.25]} justify="space-between">
            {[...Array(5)].map((_, index) => (
             
                <Card className="hourly-card">
                  <p>Погода часы {index + 1}</p>
                </Card>
       
            ))}
          </Row>
        </Card>
    
    </Row>
  </div>
);

export default GridTable;
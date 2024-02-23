import React from 'react';
import { Col, Row, Card } from 'antd';

const GridMapTable = () => (
  <>
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card style={{ width: '40rem', height: '20rem' }}>инфа про аллерген</Card>
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card style={{width: '40rem', height: '20rem' }}>
          рекомендации
          <Row gutter={[16, 16]}>
            {[...Array(6)].map((_, index) => (
              <Col span={8} key={index}>
                <Card>{index + 1}</Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
    </Row>
  </>
);

export default GridMapTable;
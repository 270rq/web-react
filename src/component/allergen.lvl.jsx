import React from 'react';
import pollen from '../icon/pollen.svg';

const GridLvlTable = () => {
  const recommendations = [
    { icon: pollen, text: "Нет пыльцы" },
    { icon: pollen, text: "Низкий" },
    { icon: pollen, text: "Средний" },
    { icon: pollen, text: "Высокий" },
    { icon: pollen, text: "Очень высокий" }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginLeft: '8px' }}>
        {recommendations.map((rec, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <img src={rec.icon} alt="Иконка аллергена" style={{ width: '20px', marginRight: '8px' }} />
            <span>{rec.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLvlTable;

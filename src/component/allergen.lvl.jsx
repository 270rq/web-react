import React from 'react';
import pollen0 from '../icon/lvl/lvl0_allergen.svg';
import pollen1 from '../icon/lvl/lvl1_allergen.svg';
import pollen2 from '../icon/lvl/lvl2_allergen.svg';
import pollen3 from '../icon/lvl/lvl3_allergen.svg';
import pollen4 from '../icon/lvl/lvl4_allergen.svg';

const GridLvlTable = () => {
  const recommendations = [
    { icon: pollen0, color: "green", text: "Нет пыльцы" },
    { icon: pollen1, color: "yellow", text: "Низкий" },
    { icon: pollen2, color: "orange", text: "Средний" },
    { icon: pollen3, color: "red", text: "Высокий" },
    { icon: pollen4, color: "darkred", text: "Очень высокий" }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginLeft: '8px' }}>
        {recommendations.map((rec, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <img src={rec.icon} alt="Иконка аллергена" style={{ width: '20px', marginRight: '8px' }} className={`icon-color ${rec.color}`} />
            <span>{rec.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLvlTable;